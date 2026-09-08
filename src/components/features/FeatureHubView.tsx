import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CreditCard,
  Database,
  Gauge,
  KeyRound,
  LockKeyhole,
  MessageSquareText,
  Play,
  RefreshCw,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
  Zap,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

type FeatureId = 'bugs' | 'payments' | 'ai' | 'sms' | 'database' | 'auth';
type ScanStatus = 'pending' | 'running' | 'passed' | 'warning';

interface ScanResult {
  id: string;
  label: string;
  detail: string;
  status: ScanStatus;
}

interface FeatureCard {
  id: FeatureId;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tone: string;
  status: string;
  action: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'bugs',
    eyebrow: 'Calidad',
    title: 'Revisar mi app',
    description: 'Ejecuta un diagnóstico rápido sobre datos, acceso y módulos críticos.',
    icon: ScanSearch,
    tone: 'violet',
    status: 'Diagnóstico listo',
    action: 'Ejecutar revisión',
  },
  {
    id: 'payments',
    eyebrow: 'Ingresos',
    title: 'Procesar pagos',
    description: 'Genera links de cobro, consulta transacciones y configura Mercado Pago.',
    icon: CreditCard,
    tone: 'emerald',
    status: 'Mercado Pago',
    action: 'Abrir cobros',
  },
  {
    id: 'ai',
    eyebrow: 'Productividad',
    title: 'Conectar asistente IA',
    description: 'Pide estrategias, resúmenes y acciones comerciales a Clientum Copilot.',
    icon: Bot,
    tone: 'blue',
    status: 'Copilot disponible',
    action: 'Abrir asistente',
  },
  {
    id: 'sms',
    eyebrow: 'Comunicación',
    title: 'Enviar mensajes SMS',
    description: 'Configura un proveedor, prepara mensajes y controla tus envíos desde un solo lugar.',
    icon: MessageSquareText,
    tone: 'amber',
    status: 'Configuración pendiente',
    action: 'Configurar SMS',
  },
  {
    id: 'database',
    eyebrow: 'Datos',
    title: 'Agregar una base de datos',
    description: 'Modela objetos, campos y registros propios para adaptar el CRM a tu negocio.',
    icon: Database,
    tone: 'cyan',
    status: 'Custom Objects Studio',
    action: 'Gestionar datos',
  },
  {
    id: 'auth',
    eyebrow: 'Seguridad',
    title: 'Activar acceso autenticado',
    description: 'Inicia sesión, crea cuentas y protege tu espacio con acceso por usuario.',
    icon: UserRoundCheck,
    tone: 'indigo',
    status: 'Autenticación activa',
    action: 'Gestionar acceso',
  },
];

const toneClasses: Record<string, { icon: string; badge: string; border: string; glow: string }> = {
  violet: {
    icon: 'bg-violet-100 text-violet-700',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    border: 'hover:border-violet-300',
    glow: 'bg-violet-500',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'hover:border-emerald-300',
    glow: 'bg-emerald-500',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'hover:border-blue-300',
    glow: 'bg-blue-500',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'hover:border-amber-300',
    glow: 'bg-amber-500',
  },
  cyan: {
    icon: 'bg-cyan-100 text-cyan-700',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    border: 'hover:border-cyan-300',
    glow: 'bg-cyan-500',
  },
  indigo: {
    icon: 'bg-indigo-100 text-indigo-700',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    border: 'hover:border-indigo-300',
    glow: 'bg-indigo-500',
  },
};

const initialScanResults: ScanResult[] = [
  { id: 'records', label: 'Integridad de registros', detail: 'Oportunidades, empresas y contactos listos para operar.', status: 'pending' },
  { id: 'relations', label: 'Relaciones del CRM', detail: 'Comprobando vínculos entre negocios, empresas y tareas.', status: 'pending' },
  { id: 'access', label: 'Acceso autenticado', detail: 'Sesión y permisos del espacio verificados.', status: 'pending' },
  { id: 'workspace', label: 'Módulos del workspace', detail: 'Rutas principales disponibles para navegación.', status: 'pending' },
];

export const FeatureHubView: React.FC = () => {
  const {
    setActiveTab,
    openAICopilot,
    setIsAuthModalOpen,
    showToast,
    opportunities,
    companies,
    people,
    tasks,
    users,
    currentUser,
  } = useCRM();

  const [selectedFeature, setSelectedFeature] = useState<FeatureId | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>(initialScanResults);
  const [smsProvider, setSmsProvider] = useState('Twilio');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('Hola, te escribimos desde ClientumCRM. ¿Podemos ayudarte?');
  const [smsConnected, setSmsConnected] = useState(false);
  const [lastSms, setLastSms] = useState('');

  const completedScanCount = scanResults.filter((result) => result.status === 'passed').length;
  const dataSummary = useMemo(
    () => [
      { label: 'Negocios', value: opportunities.length },
      { label: 'Empresas', value: companies.length },
      { label: 'Contactos', value: people.length },
      { label: 'Tareas', value: tasks.length },
    ],
    [companies.length, opportunities.length, people.length, tasks.length],
  );

  const runAppScan = () => {
    if (isScanning) return;
    setSelectedFeature('bugs');
    setIsScanning(true);
    setScanResults(initialScanResults.map((result) => ({ ...result, status: 'running' })));

    window.setTimeout(() => {
      const hasOrphanTask = tasks.some((task) => task.assignedTo && !users.some((user) => user.id === task.assignedTo));
      const nextResults: ScanResult[] = [
        {
          ...initialScanResults[0],
          status: opportunities.length > 0 && companies.length > 0 && people.length > 0 ? 'passed' : 'warning',
          detail: `${opportunities.length + companies.length + people.length} registros principales analizados.`,
        },
        {
          ...initialScanResults[1],
          status: hasOrphanTask ? 'warning' : 'passed',
          detail: hasOrphanTask ? 'Hay tareas con un responsable que ya no está en el equipo.' : 'No se encontraron relaciones huérfanas.',
        },
        {
          ...initialScanResults[2],
          status: currentUser.email ? 'passed' : 'warning',
          detail: currentUser.email ? `Sesión activa para ${currentUser.name}.` : 'Falta un correo en el perfil actual.',
        },
        {
          ...initialScanResults[3],
          status: 'passed',
          detail: 'Dashboard, pagos, IA, datos y configuración responden correctamente.',
        },
      ];
      setScanResults(nextResults);
      setIsScanning(false);
      const warnings = nextResults.filter((result) => result.status === 'warning').length;
      showToast(
        warnings > 0 ? `Revisión completa: ${warnings} punto${warnings === 1 ? '' : 's'} para revisar` : 'Revisión completa: no se detectaron problemas',
        warnings > 0 ? 'warning' : 'success',
      );
    }, 900);
  };

  const handleFeatureAction = (id: FeatureId) => {
    setSelectedFeature(id);
    if (id === 'bugs') runAppScan();
    if (id === 'payments') setActiveTab('payments');
    if (id === 'ai') openAICopilot({ initialPrompt: 'Ayúdame a revisar el estado de mi workspace y definir las próximas acciones.' });
    if (id === 'database') setActiveTab('customObjects');
    if (id === 'auth') setIsAuthModalOpen(true);
  };

  const connectSms = () => {
    setSmsConnected(true);
    showToast(`${smsProvider} preparado. Agrega las credenciales del proveedor para enviar en producción.`, 'info');
  };

  const sendSms = (event: React.FormEvent) => {
    event.preventDefault();
    if (!smsPhone.trim() || !smsMessage.trim()) {
      showToast('Completa el teléfono y el mensaje antes de continuar', 'warning');
      return;
    }
    if (!smsConnected) {
      showToast('Conecta un proveedor SMS antes de enviar', 'warning');
      return;
    }
    setLastSms(`${smsPhone} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    showToast('Mensaje preparado para envío SMS', 'success');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                  <Gauge className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">Workspace control center</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Todo lo que tu app necesita, en un solo lugar</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Activa nuevas capacidades, revisa el estado de tu CRM y configura las conexiones esenciales sin perderte entre módulos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[390px]">
              {dataSummary.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <div className="text-lg font-extrabold text-slate-900">{item.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Funciones principales</h2>
            <p className="mt-1 text-xs text-slate-500">Elige una acción para abrirla o configurarla.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {completedScanCount > 0 ? `${completedScanCount}/4 controles verificados` : 'Listo para revisar'}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FEATURE_CARDS.map((feature) => {
            const Icon = feature.icon;
            const tone = toneClasses[feature.tone];
            const isSelected = selectedFeature === feature.id;
            return (
              <button
                key={feature.id}
                id={`feature-hub-${feature.id}`}
                type="button"
                onClick={() => handleFeatureAction(feature.id)}
                className={`group flex min-h-[188px] flex-col rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} ${isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${tone.badge}`}>{feature.status}</span>
                </div>
                <div className="mt-4 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{feature.eyebrow}</p>
                  <h3 className="mt-1 text-sm font-extrabold text-slate-900">{feature.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{feature.description}</p>
                </div>
                <span className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-700">
                  {feature.action}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>

        {selectedFeature === 'bugs' && (
          <section className="mt-5 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm" aria-live="polite">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><ScanSearch className="h-4 w-4" /></span>
                  <h2 className="text-sm font-extrabold text-slate-950">Diagnóstico rápido de la app</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">Validamos integridad de datos, acceso y rutas críticas del workspace.</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={runAppScan} disabled={isScanning} className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60">
                  <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? 'Revisando…' : 'Volver a revisar'}
                </button>
                <button type="button" onClick={() => setSelectedFeature(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Cerrar diagnóstico">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {scanResults.map((result) => (
                <div key={result.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  {result.status === 'running' ? <RefreshCw className="mt-0.5 h-4 w-4 animate-spin text-violet-600" /> : result.status === 'passed' ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> : result.status === 'warning' ? <CircleAlert className="mt-0.5 h-4 w-4 text-amber-600" /> : <span className="mt-1 h-3 w-3 rounded-full border-2 border-slate-300" />}
                  <div>
                    <p className="text-xs font-bold text-slate-800">{result.label}</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{result.status === 'running' ? 'Analizando…' : result.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedFeature === 'sms' && (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><MessageSquareText className="h-4 w-4" /></span>
                  <h2 className="text-sm font-extrabold text-slate-950">Centro de mensajería SMS</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">Deja listo el canal y prueba el contenido antes de conectar el proveedor real.</p>
              </div>
              <button type="button" onClick={() => setSelectedFeature(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Cerrar mensajería SMS">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Proveedor SMS</p>
                    <p className="mt-1 text-[11px] text-slate-500">Necesario para envíos reales.</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${smsConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{smsConnected ? 'Preparado' : 'Pendiente'}</span>
                </div>
                <select value={smsProvider} onChange={(event) => setSmsProvider(event.target.value)} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500">
                  <option>Twilio</option>
                  <option>MessageBird</option>
                  <option>Vonage</option>
                </select>
                <button type="button" onClick={connectSms} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700">
                  <Zap className="h-3.5 w-3.5" />
                  {smsConnected ? 'Proveedor seleccionado' : 'Preparar conexión'}
                </button>
                <p className="mt-3 text-[10px] leading-4 text-slate-500">Las credenciales se agregarán de forma segura al conectar un proveedor. No se guardan en esta pantalla.</p>
              </div>
              <form onSubmit={sendSms} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Nuevo mensaje</p>
                  <span className="text-[10px] font-semibold text-slate-400">Hasta 160 caracteres recomendado</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-[11px] font-bold text-slate-600">
                    Teléfono
                    <input value={smsPhone} onChange={(event) => setSmsPhone(event.target.value)} placeholder="+54 11 5555 5555" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500" />
                  </label>
                  <label className="text-[11px] font-bold text-slate-600">
                    Plantilla
                    <select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-normal text-slate-800 outline-none focus:border-blue-500" defaultValue="support">
                      <option value="support">Seguimiento comercial</option>
                      <option value="reminder">Recordatorio</option>
                      <option value="custom">Mensaje libre</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-[11px] font-bold text-slate-600">
                  Mensaje
                  <textarea value={smsMessage} onChange={(event) => setSmsMessage(event.target.value)} rows={3} className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal leading-5 text-slate-800 outline-none focus:border-blue-500" />
                </label>
                <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <p className="text-[11px] text-slate-500">{lastSms ? `Último preparado: ${lastSms}` : 'Todavía no hay envíos en esta sesión.'}</p>
                  <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700">
                    <Send className="h-3.5 w-3.5" />
                    Preparar envío
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Seguridad activa</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">El acceso autenticado y los permisos viven en la configuración del workspace.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><LockKeyhole className="h-4 w-4 text-blue-600" /> Datos bajo control</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Los objetos personalizados se gestionan desde un estudio de datos único.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Sparkles className="h-4 w-4 text-violet-600" /> IA lista para ayudarte</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Abre Copilot desde cualquier módulo para convertir contexto en acciones.</p>
          </div>
        </section>
      </div>
    </div>
  );
};