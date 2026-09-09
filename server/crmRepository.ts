import type { Pool } from "pg";
import { randomBytes } from "node:crypto";

export const CRM_ENTITY_TYPES = [
  "opportunities",
  "companies",
  "people",
  "tasks",
  "activities",
] as const;

export type CrmEntityType = (typeof CRM_ENTITY_TYPES)[number];

type JsonRecord = Record<string, unknown>;

const createId = (prefix: string) => `${prefix}-${Date.now()}-${randomBytes(5).toString("hex")}`;

const isCrmEntityType = (value: string): value is CrmEntityType =>
  CRM_ENTITY_TYPES.includes(value as CrmEntityType);

export async function listCrmRecords(pool: Pool | null, tenantId: string): Promise<Record<CrmEntityType, JsonRecord[]>> {
  const empty = {
    opportunities: [],
    companies: [],
    people: [],
    tasks: [],
    activities: [],
  } satisfies Record<CrmEntityType, JsonRecord[]>;

  if (!pool) return empty;

  const result = await pool.query<{ entity_type: CrmEntityType; data: JsonRecord }>(
    `SELECT entity_type, data
     FROM clientum_crm_records
     WHERE tenant_id = $1
     ORDER BY updated_at DESC`,
    [tenantId],
  );

  for (const row of result.rows) {
    if (isCrmEntityType(row.entity_type)) empty[row.entity_type].push(row.data);
  }
  return empty;
}

export async function countCrmRecords(pool: Pool | null, tenantId: string): Promise<number> {
  if (!pool) return 0;
  const result = await pool.query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM clientum_crm_records WHERE tenant_id = $1",
    [tenantId],
  );
  return Number(result.rows[0]?.count || 0);
}

export async function upsertCrmRecords(
  pool: Pool | null,
  tenantId: string,
  records: Partial<Record<CrmEntityType, JsonRecord[]>>,
): Promise<number> {
  if (!pool) return 0;
  let written = 0;
  await pool.query("BEGIN");
  try {
    for (const entityType of CRM_ENTITY_TYPES) {
      const values = records[entityType];
      if (!Array.isArray(values)) continue;
      for (const record of values) {
        const entityId = typeof record.id === "string" ? record.id : "";
        if (!entityId || !record || typeof record !== "object") continue;
        await pool.query(
          `INSERT INTO clientum_crm_records
            (tenant_id, entity_type, entity_id, data, created_at, updated_at)
           VALUES ($1, $2, $3, $4::jsonb, COALESCE(($4::jsonb->>'createdAt')::timestamptz, NOW()), NOW())
           ON CONFLICT (tenant_id, entity_type, entity_id)
           DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
          [tenantId, entityType, entityId, JSON.stringify(record)],
        );
        written += 1;
      }
    }
    await pool.query("COMMIT");
    return written;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}

export async function deleteCrmRecord(
  pool: Pool | null,
  tenantId: string,
  entityType: string,
  entityId: string,
): Promise<boolean> {
  if (!pool || !isCrmEntityType(entityType)) return false;
  const result = await pool.query(
    `DELETE FROM clientum_crm_records
     WHERE tenant_id = $1 AND entity_type = $2 AND entity_id = $3`,
    [tenantId, entityType, entityId],
  );
  return (result.rowCount || 0) > 0;
}

export interface AgentTaskInput {
  kind: string;
  dueAt?: string;
  priority?: number;
  maxAttempts?: number;
  input?: JsonRecord;
  source?: string;
  targetType?: string;
  targetId?: string;
}

export async function createAgentTask(
  pool: Pool | null,
  tenantId: string,
  userId: string,
  task: AgentTaskInput,
) {
  if (!pool) throw new Error("PostgreSQL is required for durable Agent OS tasks.");
  const id = createId("agent-task");
  const result = await pool.query(
    `INSERT INTO clientum_agent_tasks
      (id, tenant_id, requested_by_user_id, kind, due_at, priority, max_attempts,
       input, source, target_type, target_id)
     VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()), $6, $7, $8::jsonb, $9, $10, $11)
     RETURNING id, kind, status, priority, due_at, attempts, max_attempts,
       input, source, target_type, target_id, created_at, updated_at`,
    [
      id,
      tenantId,
      userId,
      task.kind,
      task.dueAt || null,
      Number.isFinite(task.priority) ? task.priority : 50,
      Number.isFinite(task.maxAttempts) ? task.maxAttempts : 3,
      JSON.stringify(task.input || {}),
      task.source || "user",
      task.targetType || null,
      task.targetId || null,
    ],
  );
  return result.rows[0];
}

export async function claimDueAgentTasks(pool: Pool | null, tenantId: string, limit = 10) {
  if (!pool) return [];
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 50);
  const result = await pool.query(
    `WITH claimable AS (
       SELECT id
       FROM clientum_agent_tasks
       WHERE tenant_id = $1
         AND (
           (status = 'pending' AND due_at <= NOW())
           OR (status = 'running' AND leased_until < NOW())
         )
         AND attempts < max_attempts
       ORDER BY priority DESC, due_at ASC
       FOR UPDATE SKIP LOCKED
       LIMIT $2
     )
     UPDATE clientum_agent_tasks AS task
     SET status = 'running',
         attempts = task.attempts + 1,
         leased_until = NOW() + INTERVAL '10 minutes',
         updated_at = NOW()
     FROM claimable
     WHERE task.id = claimable.id
     RETURNING task.*`,
    [tenantId, safeLimit],
  );
  return result.rows;
}

export async function finishAgentTask(
  pool: Pool | null,
  tenantId: string,
  taskId: string,
  result: { status: "completed" | "failed" | "cancelled"; output?: JsonRecord; error?: string },
) {
  if (!pool) return false;
  const query = result.status === "completed"
    ? `UPDATE clientum_agent_tasks
       SET status = $4, output = $5::jsonb, error = NULL, leased_until = NULL,
           completed_at = NOW(), updated_at = NOW()
       WHERE tenant_id = $1 AND id = $2 AND status = 'running'`
    : `UPDATE clientum_agent_tasks
       SET status = $4, output = $5::jsonb, error = $6, leased_until = NULL,
           completed_at = CASE WHEN $4 = 'cancelled' OR attempts >= max_attempts THEN NOW() ELSE completed_at END,
           updated_at = NOW()
       WHERE tenant_id = $1 AND id = $2 AND status = 'running'`;
  const params = result.status === "completed"
    ? [tenantId, taskId, null, result.status, JSON.stringify(result.output || {})]
    : [tenantId, taskId, null, result.status, JSON.stringify(result.output || {}), result.error || null];
  const updated = await pool.query(query, params);
  return (updated.rowCount || 0) > 0;
}

export async function recordEvidence(
  pool: Pool | null,
  tenantId: string,
  userId: string | null,
  input: {
    entityType: string;
    entityId: string;
    fieldName?: string;
    observedValue: unknown;
    sourceType: string;
    sourceRef?: string;
    status?: "observed" | "suggested" | "accepted" | "rejected";
    metadata?: JsonRecord;
  },
) {
  if (!pool) throw new Error("PostgreSQL is required for evidence tracking.");
  const id = createId("evidence");
  const result = await pool.query(
    `INSERT INTO clientum_crm_evidence
      (id, tenant_id, entity_type, entity_id, field_name, observed_value, source_type,
       source_ref, status, metadata, created_by_user_id)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10::jsonb, $11)
     RETURNING *`,
    [
      id,
      tenantId,
      input.entityType,
      input.entityId,
      input.fieldName || null,
      JSON.stringify(input.observedValue),
      input.sourceType,
      input.sourceRef || null,
      input.status || "observed",
      JSON.stringify(input.metadata || {}),
      userId,
    ],
  );
  return result.rows[0];
}

export async function recordAiChange(
  pool: Pool | null,
  tenantId: string,
  input: {
    actorUserId?: string | null;
    model?: string;
    action: string;
    entityType: string;
    entityId: string;
    beforeData?: unknown;
    afterData?: unknown;
    reason?: string;
    evidenceIds?: string[];
    status?: "proposed" | "applied" | "rejected" | "rolled_back";
  },
) {
  if (!pool) throw new Error("PostgreSQL is required for AI change auditing.");
  const id = createId("ai-change");
  const result = await pool.query(
    `INSERT INTO clientum_ai_change_audit
      (id, tenant_id, actor_user_id, model, action, entity_type, entity_id,
       before_data, after_data, reason, evidence_ids, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11::jsonb, $12)
     RETURNING *`,
    [
      id,
      tenantId,
      input.actorUserId || null,
      input.model || null,
      input.action,
      input.entityType,
      input.entityId,
      input.beforeData === undefined ? null : JSON.stringify(input.beforeData),
      input.afterData === undefined ? null : JSON.stringify(input.afterData),
      input.reason || null,
      JSON.stringify(input.evidenceIds || []),
      input.status || "applied",
    ],
  );
  return result.rows[0];
}

export async function recordServerAudit(
  pool: Pool | null,
  tenantId: string,
  input: {
    userId?: string | null;
    actorType?: string;
    action: string;
    entityType?: string;
    entityId?: string;
    beforeData?: unknown;
    afterData?: unknown;
    metadata?: JsonRecord;
  },
) {
  if (!pool) return null;
  const id = createId("audit");
  const result = await pool.query(
    `INSERT INTO clientum_server_audit_logs
      (id, tenant_id, user_id, actor_type, action, entity_type, entity_id,
       before_data, after_data, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10::jsonb)
     RETURNING *`,
    [
      id,
      tenantId,
      input.userId || null,
      input.actorType || "user",
      input.action,
      input.entityType || null,
      input.entityId || null,
      input.beforeData === undefined ? null : JSON.stringify(input.beforeData),
      input.afterData === undefined ? null : JSON.stringify(input.afterData),
      JSON.stringify(input.metadata || {}),
    ],
  );
  return result.rows[0];
}

export async function listEvidence(pool: Pool | null, tenantId: string, entityType?: string, entityId?: string) {
  if (!pool) return [];
  const result = await pool.query(
    `SELECT *
     FROM clientum_crm_evidence
     WHERE tenant_id = $1
       AND ($2::text IS NULL OR entity_type = $2)
       AND ($3::text IS NULL OR entity_id = $3)
     ORDER BY observed_at DESC
     LIMIT 500`,
    [tenantId, entityType || null, entityId || null],
  );
  return result.rows;
}

export async function listAiChanges(pool: Pool | null, tenantId: string, entityType?: string, entityId?: string) {
  if (!pool) return [];
  const result = await pool.query(
    `SELECT *
     FROM clientum_ai_change_audit
     WHERE tenant_id = $1
       AND ($2::text IS NULL OR entity_type = $2)
       AND ($3::text IS NULL OR entity_id = $3)
     ORDER BY created_at DESC
     LIMIT 500`,
    [tenantId, entityType || null, entityId || null],
  );
  return result.rows;
}