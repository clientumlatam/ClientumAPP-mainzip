import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCheck,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  WalletCards,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCRM } from '../../context/CRMContext';

interface MockDeal {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: 'nuevo' | 'calificacion' | 'propuesta' | 'negociacion' | 'cerrado';
  avatar: string;
  won?: boolean;
}

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
];

const DASHBOARD_DEALS: MockDeal[] = [
  { id: 'd-1', name: 'Importación de equipos', company: 'TechGlobal S.A.', amount: 7500, stage: 'nuevo', avatar: AVATARS[0] },
  { id: 'd-2', name: 'Consultoría SAP', company: 'DataLogic', amount: 6000, stage: 'nuevo', avatar: AVATARS[1] },
  { id: 'd-3', name: 'Software licencias', company: 'InnovaTech', amount: 5000, stage: 'nuevo', avatar: AVATARS[2] },
  { id: 'd-4', name: 'Servicios en la nube', company: 'CloudWare', amount: 6000, stage: 'nuevo', avatar: AVATARS[3] },
  { id: 'd-5', name: 'Desarrollo a medida', company: 'SoftBuild', amount: 12000, stage: 'calificacion', avatar: AVATARS[4] },
  { id: 'd-6', name: 'Integración de sistemas', company: 'NetSolutions', amount: 9800, stage: 'calificacion', avatar: AVATARS[1] },
  { id: 'd-7', name: 'Soporte 24/7', company: 'AdminCorp', amount: 7500, stage: 'calificacion', avatar: AVATARS[0] },
  { id: 'd-8', name: 'Renovación de licencias', company: 'CompuStore', amount: 6000, stage: 'calificacion', avatar: AVATARS[3] },
  { id: 'd-9', name: 'Plataforma e-learning', company: 'EduSmart', amount: 18000, stage: 'propuesta', avatar: AVATARS[2] },
  { id: 'd-10', name: 'App móvil', company: 'MoviLab', amount: 15000, stage: 'propuesta', avatar: AVATARS[1] },
  { id: 'd-11', name: 'Ciberseguridad', company: 'SecureIT', amount: 17500, stage: 'propuesta', avatar: AVATARS[5] },
  { id: 'd-12', name: 'Data Analytics', company: 'MetricsPlus', amount: 17300, stage: 'propuesta', avatar: AVATARS[0] },
  { id: 'd-13', name: 'ERP Implementación', company: 'GlobalTech', amount: 22000, stage: 'negociacion', avatar: AVATARS[4] },
  { id: 'd-14', name: 'Outsourcing TI', company: 'BusinessCore', amount: 10000, stage: 'negociacion', avatar: AVATARS[1] },
  { id: 'd-15', name: 'Infraestructura cloud', company: 'SkyNet', amount: 6000, stage: 'negociacion', avatar: AVATARS[2] },
  { id: 'd-16', name: 'CRM Corporativo', company: 'SalesPro', amount: 18000, stage: 'cerrado', avatar: AVATARS[2], won: true },
  { id: 'd-17', name: 'Mesa de ayuda', company: 'HelpDesk', amount: 12000, stage: 'cerrado', avatar: AVATARS[0], won: true },
  { id: 'd-18', name: 'Capacitación', company: 'Formación IT', amount: 8200, stage: 'cerrado', avatar: AVATARS[5], won: true },
  { id: 'd-19', name: 'Mantenimiento anual', company: 'FactorySoft', amount: 19000, stage: 'cerrado', avatar: AVATARS[3], won: true },
];

const REVENUE_DATA = [
  { month: 'Ene', value: 18000 },
  { month: 'Feb', value: 34000 },
  { month: 'Mar', value: 48000 },
  { month: 'Abr', value: 68000 },
  { month: 'May', value: 52000 },
  { month: 'Jun', value: 72000 },
  { month: 'Jul', value: 94000 },
  { month: 'Ago', value: 124800 },
  { month: 'Sep', value: 86000 },
  { month: 'Oct', value: 102000 },
  { month: 'Nov', value: 114000 },
  { month: 'Dic', value: 138000 },
];

const SOURCES_DATA = [
  { name: 'Referidos', value: 35, count: 44, color: '#11c5b5' },
  { name: 'Web', value: 25, count: 22, color: '#4388ff' },
  { name: 'Redes sociales', value: 20, count: 25, color: '#8561ff' },
  { name: 'Eventos', value: 10, count: 13, color: '#f59e0b' },
  { name: 'Otros', value: 10, count: 12, color: '#64748b' },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

type StageId = MockDeal['stage'];

const STAGES: Array<{ id: StageId; label: string; color: string }> = [
  { id: 'nuevo', label: 'Nuevo', color: '#3987ff' },
  { id: 'calificacion', label: 'Calificación', color: '#16c7b6' },
  { id: 'propuesta', label: 'Propuesta', color: '#4a8dff' },
  { id: 'negociacion', label: 'Negociación', color: '#9d60ff' },
  { id: 'cerrado', label: 'Cerrado', color: '#20c47b' },
];

const money = (amount: number) => `$ ${amount.toLocaleString('es-AR')}`;

export const ExecutiveDashboardView: React.FC = () => {
  const { setActiveTab, openNewRecordModal, showToast } = useCRM();
  const [deals, setDeals] = useState<MockDeal[]>(DASHBOARD_DEALS);
  const [pipelineFilter, setPipelineFilter] = useState('Todos los pipelines');
  const [isPipelineDropdownOpen, setIsPipelineDropdownOpen] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm-1', sender: 'assistant', text: 'Hola. Puedo resumir tus negocios, revisar pendientes o ayudarte a preparar el próximo paso.', time: 'Ahora' },
  ]);

  const handleDragStart = (event: React.DragEvent, id: string) => {
    event.dataTransfer.setData('text/plain', id);
    setDraggedDealId(id);
  };

  const handleDrop = (event: React.DragEvent, targetStage: StageId) => {
    event.preventDefault();
    const dealId = event.dataTransfer.getData('text/plain') || draggedDealId;
    if (!dealId) return;
    setDeals((previous) => previous.map((deal) => (
      deal.id === dealId ? { ...deal, stage: targetStage, won: targetStage === 'cerrado' ? true : deal.won } : deal
    )));
    showToast(`Negocio movido a ${STAGES.find((stage) => stage.id === targetStage)?.label}`, 'success');
    setDraggedDealId(null);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage.trim();
    setChatMessages((previous) => [...previous, {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputMessage('');
    setIsAiTyping(true);

    window.setTimeout(() => {
      const query = userText.toLowerCase();
      let reply = 'He actualizado los datos del CRM y registrado tu consulta. ¿Deseas que prepare una propuesta o un recordatorio?';
      if (query.includes('resumen') || query.includes('métrica') || query.includes('ingreso')) {
        reply = 'Resumen ejecutivo actual:\n• Ingresos totales del mes: $ 124.800 (↑ 18.8%)\n• 22 negocios activos en pipeline\n• Tasa de cierre promedio: 32.4%\n• Ticket promedio por cliente: $ 6.218';
      } else if (query.includes('tarea') || query.includes('actividad') || query.includes('hoy')) {
        reply = 'Tienes 5 actividades para hoy:\n• 10:00 Llamada con TechGlobal\n• 11:30 Reunión con SoftBuild\n• 14:00 Enviar propuesta a MoviLab\n• 15:30 Seguimiento con NetSolutions\n• 17:00 Demo técnica EduSmart';
      } else if (query.includes('negocio') || query.includes('lead') || query.includes('crear')) {
        reply = 'Puedo dar de alta el negocio directamente o abrir el modal de captura rápida. ¿Cuál es el monto y la empresa?';
      }
      setChatMessages((previous) => [...previous, {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setIsAiTyping(false);
    }, 700);
  };

  return (
    <div className={`crm-dashboard ${isChatOpen ? '' : 'crm-dashboard--chat-closed'}`}>
      <section className="crm-dashboard__content">
        <div className="crm-dashboard__header">
          <div>
            <div className="crm-eyebrow"><span className="crm-status-dot" /> VISTA EJECUTIVA · ACTUALIZADO AHORA</div>
            <h1>Resumen ejecutivo</h1>
            <p>Entendé cómo está el negocio y dónde conviene intervenir hoy.</p>
          </div>
          <div className="crm-dashboard__actions">
            <div className="crm-select-wrap">
              <button className="crm-select-button" onClick={() => setIsPipelineDropdownOpen((open) => !open)}>
                {pipelineFilter}<ChevronDown size={14} />
              </button>
              {isPipelineDropdownOpen && (
                <div className="crm-dropdown">
                  {['Todos los pipelines', 'Pipeline B2B', 'Enterprise Latam', 'Pymes & Partners'].map((item) => (
                    <button key={item} onClick={() => { setPipelineFilter(item); setIsPipelineDropdownOpen(false); }}>{item}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="crm-icon-button" onClick={() => showToast('Filtro de oportunidades aplicado', 'info')} title="Filtrar"><Filter size={15} /></button>
            <button className="crm-icon-button" onClick={() => showToast('Opciones del pipeline', 'info')} title="Más opciones"><MoreHorizontal size={16} /></button>
            <button
              className={`crm-ai-toggle ${isChatOpen ? 'is-active' : ''}`}
              onClick={() => setIsChatOpen((open) => !open)}
              aria-pressed={isChatOpen}
              aria-label={isChatOpen ? 'Ocultar asistente IA' : 'Abrir asistente IA'}
            >
              <Sparkles size={15} /> {isChatOpen ? 'Ocultar asistente' : 'Abrir asistente'} <span className="crm-online-pip" />
            </button>
          </div>
        </div>

        <div className="crm-pipeline-heading">
          <div>
            <span className="crm-section-kicker">Dónde intervenir</span>
            <h2>Pipeline comercial</h2>
          </div>
          <span>Arrastrá un negocio para actualizar su etapa</span>
        </div>

        <div className="crm-board-shell">
          <div className="crm-board-scroll">
            {STAGES.map((stage) => {
              const columnDeals = deals.filter((deal) => deal.stage === stage.id);
              const total = columnDeals.reduce((sum, deal) => sum + deal.amount, 0);
              return (
                <div
                  key={stage.id}
                  className="crm-stage"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, stage.id)}
                  style={{ '--stage-color': stage.color } as React.CSSProperties}
                >
                  <div className="crm-stage__header">
                    <div className="crm-stage__title"><span className="crm-stage__dot" />{stage.label}<span className="crm-stage__count">{columnDeals.length}</span></div>
                    <span className="crm-stage__total">{money(total)}</span>
                  </div>
                  <div className="crm-stage__cards custom-scrollbar">
                    {columnDeals.map((deal) => (
                      <article
                        key={deal.id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, deal.id)}
                        className="crm-deal-card"
                      >
                        <div className="crm-deal-card__top"><span>{deal.company}</span><MoreHorizontal size={13} /></div>
                        <h3>{deal.name}</h3>
                        <div className="crm-deal-card__footer">
                          <strong>{money(deal.amount)}</strong>
                          <div className="crm-deal-card__person">
                            {deal.won && <span className="crm-won"><Check size={10} /> Ganado</span>}
                            <img src={deal.avatar} alt="" />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button className="crm-new-deal" onClick={() => openNewRecordModal('opportunity')}><Plus size={14} /> Nuevo negocio</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="crm-kpi-grid">
          <div className="crm-kpi-card crm-kpi-card--accent">
            <div className="crm-kpi-card__head"><span>Ingresos totales</span><span className="crm-kpi-icon"><TrendingUp size={17} /></span></div>
            <strong>$ 124.800</strong><small><ArrowUpRight size={12} /> 18.8% <em>vs mes anterior</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Negocios activos</span><span className="crm-kpi-icon"><BriefcaseBusiness size={17} /></span></div>
            <strong>22</strong><small><ArrowUpRight size={12} /> 15.8% <em>vs mes anterior</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Tasa de cierre</span><span className="crm-kpi-icon"><Target size={17} /></span></div>
            <strong>32.4%</strong><small><ArrowUpRight size={12} /> 6.2% <em>vs mes anterior</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Ticket promedio</span><span className="crm-kpi-icon"><WalletCards size={17} /></span></div>
            <strong>$ 6.218</strong><small><ArrowUpRight size={12} /> 9.3% <em>vs mes anterior</em></small>
          </div>
        </div>

        <div className="crm-analytics-grid">
          <section className="crm-panel crm-revenue-panel">
            <div className="crm-panel__header">
              <div><div className="crm-panel__title"><BarChart3 size={16} /> Ingresos <button className="crm-period">Este año <ChevronDown size={12} /></button></div><p>Evolución de ingresos por mes</p></div>
              <div className="crm-panel__total"><span>Ingresos totales</span><strong>$ 1.024.600</strong><small><ArrowUpRight size={11} /> 22.4% vs año anterior</small></div>
            </div>
            <div className="crm-revenue-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA} margin={{ top: 12, right: 6, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="crmRevenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1bcfc0" stopOpacity={0.28} /><stop offset="100%" stopColor="#1bcfc0" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="month" stroke="#6f829c" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6f829c" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#101c2e', border: '1px solid #29415a', borderRadius: 10, fontSize: 11, color: '#f4f8ff' }} formatter={(value: any) => [`$ ${Number(value).toLocaleString('es-AR')}`, 'Ingresos']} />
                  <Area type="monotone" dataKey="value" stroke="#1bd3c2" strokeWidth={2.5} fill="url(#crmRevenueGradient)" dot={false} activeDot={{ r: 4, fill: '#1bd3c2', stroke: '#0b1220', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="crm-panel crm-sources-panel">
            <div className="crm-panel__header"><div><div className="crm-panel__title"><span className="crm-title-mark" /> Fuentes de negocio</div><p>Origen de tus oportunidades</p></div><button className="crm-icon-button crm-icon-button--small" onClick={() => showToast('Detalle de fuentes abierto', 'info')}><MoreHorizontal size={15} /></button></div>
            <div className="crm-sources-content">
              <div className="crm-donut">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={SOURCES_DATA} cx="50%" cy="50%" innerRadius={46} outerRadius={66} paddingAngle={3} dataKey="value" stroke="none">{SOURCES_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie></PieChart>
                </ResponsiveContainer>
                <div><strong>126</strong><span>Total</span></div>
              </div>
              <div className="crm-source-list">
                {SOURCES_DATA.map((item) => <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}% <em>({item.count})</em></strong></div>)}
              </div>
            </div>
            <button className="crm-report-link" onClick={() => setActiveTab('analytics')}>Ver reporte completo <ArrowRight size={13} /></button>
          </section>
        </div>
      </section>

      {isChatOpen && (
        <>
          <div className="crm-assistant-backdrop" onClick={() => setIsChatOpen(false)} aria-hidden="true" />
          <aside className="crm-assistant" aria-label="Asistente IA">
            <div className="crm-assistant__header">
              <div className="crm-assistant__identity"><div className="crm-assistant__avatar"><Sparkles size={17} /><span /></div><div><strong>Asistente IA</strong><small>En línea</small></div></div>
              <div className="crm-assistant__tools">
                <button onClick={() => showToast('Iniciando llamada de voz...', 'info')} aria-label="Iniciar llamada de voz"><Phone size={14} /></button>
                <button onClick={() => showToast('Videollamada en preparación...', 'info')} aria-label="Iniciar videollamada"><Video size={14} /></button>
                <button onClick={() => setIsChatOpen(false)} aria-label="Cerrar asistente"><X size={15} /></button>
              </div>
            </div>
            <div className="crm-assistant__intro"><Sparkles size={13} /> Insights automáticos de tu pipeline</div>
            <div className="crm-assistant__messages custom-scrollbar">
              <div className="crm-chat-day">Hoy</div>
              {chatMessages.map((message) => (
                <div key={message.id} className={`crm-message ${message.sender === 'user' ? 'crm-message--user' : ''}`}>
                  <div className="crm-message__bubble"><p>{message.text}</p><span>{message.time} {message.sender === 'user' && <CheckCheck size={12} />}</span></div>
                </div>
              ))}
              {isAiTyping && <div className="crm-message__typing" role="status" aria-label="El asistente está escribiendo"><i /><i /><i /></div>}
            </div>
            <div className="crm-assistant__composer">
              <button onClick={() => setInputMessage((previous) => `${previous} ✨`)} aria-label="Agregar sugerencia"><Smile size={16} /></button>
              <input value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') handleSendMessage(); }} placeholder="Escribe un mensaje..." />
              <button onClick={() => showToast('Adjuntar archivo...', 'info')} aria-label="Adjuntar archivo"><Paperclip size={15} /></button>
              <button className="crm-send-button" onClick={handleSendMessage} aria-label="Enviar mensaje"><Send size={14} /></button>
            </div>
          </aside>
        </>
      )}

      {!isChatOpen && <button className="crm-chat-reopen" onClick={() => setIsChatOpen(true)} aria-label="Abrir asistente IA"><Sparkles size={15} /> Abrir asistente</button>}
    </div>
  );
};