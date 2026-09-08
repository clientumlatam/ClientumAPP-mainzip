import React, { useState } from 'react';
import {
  TrendingUp,
  Briefcase,
  Target,
  DollarSign,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Plus,
  ArrowRight,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
  Sparkles,
  Bot,
  CheckCheck,
  X,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

const DASHBOARD_DEALS: MockDeal[] = [
  // Nuevo
  { id: 'd-1', name: 'Importación de equipos', company: 'TechGlobal S.A.', amount: 7500, stage: 'nuevo', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-2', name: 'Consultoría SAP', company: 'DataLogic', amount: 6000, stage: 'nuevo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-3', name: 'Software licencias', company: 'InnovaTech', amount: 5000, stage: 'nuevo', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-4', name: 'Servicios en la nube', company: 'CloudWare', amount: 6000, stage: 'nuevo', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80' },

  // Calificación
  { id: 'd-5', name: 'Desarrollo a medida', company: 'SoftBuild', amount: 12000, stage: 'calificacion', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-6', name: 'Integración de sistemas', company: 'NetSolutions', amount: 9800, stage: 'calificacion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-7', name: 'Soporte 24/7', company: 'AdminCorp', amount: 7500, stage: 'calificacion', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-8', name: 'Renovación de licencias', company: 'CompuStore', amount: 6000, stage: 'calificacion', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80' },

  // Propuesta
  { id: 'd-9', name: 'Plataforma e-learning', company: 'EduSmart', amount: 18000, stage: 'propuesta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-10', name: 'App móvil', company: 'MoviLab', amount: 15000, stage: 'propuesta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-11', name: 'Ciberseguridad', company: 'SecureIT', amount: 17500, stage: 'propuesta', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-12', name: 'Data Analytics', company: 'MetricsPlus', amount: 17300, stage: 'propuesta', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },

  // Negociación
  { id: 'd-13', name: 'ERP Implementación', company: 'GlobalTech', amount: 22000, stage: 'negociacion', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-14', name: 'Outsourcing TI', company: 'BusinessCore', amount: 10000, stage: 'negociacion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: 'd-15', name: 'Infraestructura cloud', company: 'SkyNet', amount: 6000, stage: 'negociacion', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },

  // Cerrado
  { id: 'd-16', name: 'CRM Corporativo', company: 'SalesPro', amount: 18000, stage: 'cerrado', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', won: true },
  { id: 'd-17', name: 'Mesa de ayuda', company: 'HelpDesk', amount: 12000, stage: 'cerrado', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', won: true },
  { id: 'd-18', name: 'Capacitación', company: 'Formación IT', amount: 8200, stage: 'cerrado', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', won: true },
  { id: 'd-19', name: 'Mantenimiento anual', company: 'FactorySoft', amount: 19000, stage: 'cerrado', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', won: true },
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
  { name: 'Referidos', value: 35, count: 44, color: '#059669' },
  { name: 'Web', value: 25, count: 22, color: '#2563eb' },
  { name: 'Redes sociales', value: 20, count: 25, color: '#8b5cf6' },
  { name: 'Eventos', value: 10, count: 13, color: '#f59e0b' },
  { name: 'Otros', value: 10, count: 12, color: '#64748b' },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const ExecutiveDashboardView: React.FC = () => {
  const { setActiveTab, openNewRecordModal, showToast } = useCRM();

  const [deals, setDeals] = useState<MockDeal[]>(DASHBOARD_DEALS);
  const [pipelineFilter, setPipelineFilter] = useState('Todos los pipelines');
  const [isPipelineDropdownOpen, setIsPipelineDropdownOpen] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  // AI Assistant Right Drawer State
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'user',
      text: '¿Cuál es el resumen de mis negocios esta semana?',
      time: '10:30',
    },
    {
      id: 'm-2',
      sender: 'assistant',
      text: 'Tienes 22 negocios activos en pipeline con una proyección de $ 124.800 este mes (+18.8% vs anterior). 4 negocios clave se encuentran listos para envío de contrato AFIP.',
      time: '10:30',
    },
    {
      id: 'm-3',
      sender: 'user',
      text: '¿Qué actividades tengo pendientes para hoy?',
      time: '10:31',
    },
    {
      id: 'm-4',
      sender: 'assistant',
      text: 'Tienes 3 reuniones prioritarias agendadas:\n• 11:30 - Demo técnica con SoftBuild\n• 15:00 - Seguimiento de propuesta con EduSmart\n• 17:30 - Llamada de cierre con GlobalTech',
      time: '10:31',
    },
  ]);

  const stagesConfig: Array<{
    id: MockDeal['stage'];
    label: string;
    countLabel: string;
    dotColor: string;
  }> = [
    { id: 'nuevo', label: 'Nuevo', countLabel: '4 negocios • $24.500', dotColor: 'bg-cyan-500' },
    { id: 'calificacion', label: 'Calificación', countLabel: '4 negocios • $35.300', dotColor: 'bg-emerald-500' },
    { id: 'propuesta', label: 'Propuesta', countLabel: '4 negocios • $67.800', dotColor: 'bg-blue-500' },
    { id: 'negociacion', label: 'Negociación', countLabel: '3 negocios • $38.000', dotColor: 'bg-amber-500' },
    { id: 'cerrado', label: 'Cerrado', countLabel: '4 negocios • $57.200', dotColor: 'bg-teal-500' },
  ];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedDealId(id);
  };

  const handleDrop = (e: React.DragEvent, targetStage: MockDeal['stage']) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (dealId) {
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId
            ? { ...deal, stage: targetStage, won: targetStage === 'cerrado' ? true : deal.won }
            : deal
        )
      );
      showToast(`Negocio movido a ${targetStage}`, 'success');
    }
    setDraggedDealId(null);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    const newMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = 'He actualizado los datos del CRM y registrado tu consulta. ¿Deseas que prepare una propuesta o un recordatorio en tu calendario?';
      const q = userText.toLowerCase();

      if (q.includes('resumen') || q.includes('metricas') || q.includes('ingresos')) {
        reply = 'Resumen ejecutivo actual:\n• Ingresos totales del mes: $ 124.800 (↑ 18.8%)\n• 22 negocios activos en pipeline\n• Tasa de cierre promedio: 32.4%\n• Ticket promedio por cliente: $ 6.218';
      } else if (q.includes('tarea') || q.includes('actividad') || q.includes('hoy')) {
        reply = 'Tienes 5 actividades para hoy:\n• 10:00 Llamada con TechGlobal\n• 11:30 Reunión con SoftBuild\n• 14:00 Enviar propuesta a MoviLab\n• 15:30 Seguimiento con NetSolutions\n• 17:00 Demo técnica EduSmart';
      } else if (q.includes('lead') || q.includes('negocio') || q.includes('crear')) {
        reply = 'Entendido. Puedo dar de alta el negocio directamente o abrir el modal de captura rápida. ¿Cuál es el monto y empresa?';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsAiTyping(false);
    }, 700);
  };

  return (
    <div className="flex-1 flex h-full min-h-0 bg-slate-50 text-slate-900 overflow-hidden">
      {/* Main Center Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar p-5 lg:p-6 space-y-6">
        {/* Top Header: Pipeline de ventas */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Pipeline de ventas
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoreo ejecutivo en tiempo real de oportunidades comerciales
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Pipeline Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPipelineDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer"
              >
                <span>{pipelineFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isPipelineDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-30">
                  {['Todos los pipelines', 'Pipeline B2B', 'Enterprise Latam', 'Pymes & Partners'].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPipelineFilter(p);
                        setIsPipelineDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View / Filter quick icons */}
            <button
              onClick={() => showToast('Filtro de oportunidades aplicado', 'info')}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
              title="Filtrar"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => showToast('Configuración del pipeline', 'info')}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
              title="Opciones"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Toggle Asistente IA */}
            <button
              onClick={() => setIsChatOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isChatOpen
                  ? 'bg-blue-50 border border-blue-200 text-blue-700'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-blue-600" />
              <span>Asistente IA</span>
            </button>
          </div>
        </div>

        {/* 1. Kanban Board Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {stagesConfig.map((st) => {
            const columnDeals = deals.filter((d) => d.stage === st.id);

            return (
              <div
                key={st.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, st.id as MockDeal['stage'])}
                className="flex flex-col bg-slate-100/90 border border-slate-200/80 rounded-xl p-2.5 min-h-[360px]"
              >
                {/* Column Header */}
                <div className="mb-2.5 px-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${st.dotColor} shrink-0`} />
                    <span className="text-xs font-bold text-slate-900 tracking-wide">
                      {st.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 pl-4">
                    {st.countLabel}
                  </div>
                </div>

                {/* Cards List */}
                <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-0.5">
                  {columnDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      className="group bg-white border border-slate-200 hover:border-blue-300 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-md relative"
                    >
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {deal.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 mb-2 line-clamp-1 font-medium">
                        {deal.company}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold font-mono text-slate-800">
                          $ {deal.amount.toLocaleString('es-AR')}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {deal.won && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Ganado
                            </span>
                          )}
                          <img
                            src={deal.avatar}
                            alt="avatar"
                            className="w-5 h-5 rounded-full object-cover border border-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom "+ Nuevo negocio" button */}
                <button
                  onClick={() => openNewRecordModal('opportunity')}
                  className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-white hover:bg-slate-50 border border-dashed border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo negocio</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* 2. Executive KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* KPI 1: Ingresos totales */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Ingresos totales</span>
                <span className="block text-[11px] text-slate-400">Este mes</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-extrabold text-blue-600 tracking-tight font-mono">
                $ 124.800
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span>↑ 18.8%</span>
                <span className="text-slate-400 font-normal">vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* KPI 2: Negocios activos */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Negocios activos</span>
                <span className="block text-[11px] text-slate-400">Este mes</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                22
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span>↑ 15.8%</span>
                <span className="text-slate-400 font-normal">vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Tasa de cierre */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Tasa de cierre</span>
                <span className="block text-[11px] text-slate-400">Este mes</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Target className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                32.4%
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span>↑ 6.2%</span>
                <span className="text-slate-400 font-normal">vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* KPI 4: Ticket promedio */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Ticket promedio</span>
                <span className="block text-[11px] text-slate-400">Este mes</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                $ 6.218
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span>↑ 9.3%</span>
                <span className="text-slate-400 font-normal">vs mes anterior</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Analytics & BI Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 pb-2">
          {/* Left Chart: Ingresos (Area Chart) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-slate-900">Ingresos</h3>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium cursor-pointer">
                    <span>Este año</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block font-normal">Ingresos totales</span>
                  <div className="text-base font-bold text-blue-600 font-mono">
                    $ 1.024.600
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold block">
                    ↑ 22.4% vs año anterior
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Chart */}
            <div className="h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#0f172a',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(val: any) => [`$ ${Number(val).toLocaleString('es-AR')}`, 'Ingresos']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#blueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Chart: Fuentes de negocio (Donut Chart) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Fuentes de negocio</h3>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Donut Graphic with center text */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SOURCES_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {SOURCES_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-extrabold text-slate-900 leading-tight">126</span>
                    <span className="text-[10px] text-slate-400 font-medium">Total</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 space-y-1.5 w-full">
                  {SOURCES_DATA.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-700 text-[11px] font-medium">{item.name}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-900">
                        {item.value}% <span className="text-slate-400 font-normal">({item.count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom link to view complete report */}
            <div className="pt-3 border-t border-slate-100 mt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ver reporte completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right-Hand Panel: Asistente IA (WhatsApp / AI Assistant) */}
      {isChatOpen && (
        <div className="w-[340px] xl:w-[370px] border-l border-slate-200 bg-white flex flex-col shrink-0 h-full">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">Asistente IA</h4>
                <span className="text-[10px] text-emerald-600 font-semibold">En línea</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => showToast('Iniciando llamada de voz con Asistente IA...', 'info')}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Llamada de voz"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => showToast('Videollamada en preparación...', 'info')}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Videollamada"
              >
                <Video className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Cerrar panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-slate-50/50">
            {/* Date separator */}
            <div className="flex justify-center">
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-500 font-medium shadow-2xs">
                Hoy
              </span>
            </div>

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs font-normal'
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && (
                      <CheckCheck className="w-3 h-3 text-blue-200" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isAiTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-2xl px-3 py-2 w-28 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Chat Message Input Bar */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputMessage((prev) => prev + ' 🚀')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Emojis"
              >
                <Smile className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />

              <button
                onClick={() => showToast('Adjuntar archivo...', 'info')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Adjuntar"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                onClick={handleSendMessage}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer"
                title="Enviar mensaje"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
