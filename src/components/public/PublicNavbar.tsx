import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Calculator,
  Bot,
  Sparkles,
  Menu,
  X,
  Store,
  DollarSign,
  Search,
  Zap,
  Layers,
  FileSpreadsheet,
  MessageSquare,
  Users,
  BarChart3,
  Globe,
  GraduationCap,
  Award,
  Building2,
  Tractor,
  Briefcase,
  Stethoscope,
  Utensils,
  ShoppingBag,
  HardHat,
  Car,
  Phone,
  HelpCircle,
  CheckCircle2,
  Command,
  ExternalLink
} from 'lucide-react';
import { ClientumLogo } from '../common/ClientumLogo';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath, PRODUCT_SUBNAV, INDUSTRIES_SUBNAV } from './publicRoutes';

interface PublicNavbarProps {
  currentPath: string;
  onNavigate: (path: PublicRoutePath) => void;
  currency: 'ARS' | 'USD';
  onToggleCurrency: () => void;
  onOpenWizard: () => void;
  onOpenSimulator: () => void;
  onOpenAudit: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPath,
  onNavigate,
  currency,
  onToggleCurrency,
  onOpenWizard,
  onOpenSimulator,
  onOpenAudit,
}) => {
  const { enterApp, setIsAuthModalOpen, isAuthenticated } = useCRM();

  // Dropdown states
  const [activeMenu, setActiveMenu] = useState<'product' | 'industries' | 'resources' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'product' | 'industries' | 'resources' | null>('product');

  // Interactive Quick Search / Command Palette in header
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (⌘K or Ctrl+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleNavClick = (path: PublicRoutePath) => {
    onNavigate(path);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search results calculation
  const allSearchableItems = [
    { title: 'CRM 360° Comercial', category: 'Producto', path: '/clientum-crm' as PublicRoutePath, desc: 'Pipeline Kanban, gestión de tratos y forecast' },
    { title: 'WhatsApp Multiagente & Baileys', category: 'Producto', path: '/producto/whatsapp-ia' as PublicRoutePath, desc: 'Centraliza números comerciales con QR' },
    { title: 'Facturación AFIP con CAE', category: 'Fiscal & ERP', path: '/producto/erp' as PublicRoutePath, desc: 'Facturas A, B, C automáticas con QR fiscal' },
    { title: 'Agente OS Autónomo (Gemini 3.7)', category: 'Inteligencia Artificial', path: '/producto/agentes-ia' as PublicRoutePath, desc: '14 roles IA para ventas, soporte y finanzas' },
    { title: 'Planes y Precios', category: 'Comercial', path: '/precios' as PublicRoutePath, desc: 'Tarifas transparentes en ARS y USD' },
    { title: 'Casos de Éxito Reales', category: 'Empresa', path: '/casos' as PublicRoutePath, desc: 'PyMEs y corporativos que escalaron con Clientum' },
    { title: 'Academia LMS & Certificaciones', category: 'Educación', path: '/academia' as PublicRoutePath, desc: 'Cursos interactivos con diploma digital' },
    { title: 'Agroindustria & Acopios', category: 'Industrias', path: '/industrias/agro' as PublicRoutePath, desc: 'Solución para maquinaria, insumos y acopios' },
    { title: 'Distribuidoras Mayoristas', category: 'Industrias', path: '/industrias/distribuidoras' as PublicRoutePath, desc: 'Ventas por volumen, listas de precios y logística' },
    { title: 'Estudios Contables & Jurídicos', category: 'Industrias', path: '/industrias/estudios-contables' as PublicRoutePath, desc: 'Gestión masiva de clientes y AFIP' },
    { title: 'Salud & Clínicas Médicas', category: 'Industrias', path: '/industrias/salud' as PublicRoutePath, desc: 'Turnos automáticos y recordatorios de citas' },
    { title: 'Inmobiliarias & Desarrollos', category: 'Industrias', path: '/industrias/inmobiliaria' as PublicRoutePath, desc: 'Tasaciones, propiedades y contratos' },
    { title: 'Tienda Digital Oficial', category: 'Herramientas', path: '/tienda/central' as PublicRoutePath, desc: 'Catálogo público con cotización y checkout' },
    { title: 'Gestor de Dominios & DNS Cloudflare', category: 'Herramientas', path: '/dominios' as PublicRoutePath, desc: 'Zona DNS, SSL y auditoría SEO On-Page' },
    { title: 'Servicios Profesionales de Migración', category: 'Servicios', path: '/servicios' as PublicRoutePath, desc: 'Puesta en marcha e integración llave en mano' },
    { title: 'Contacto & Agendar Demostración', category: 'Contacto', path: '/contacto' as PublicRoutePath, desc: 'Habla con un consultor comercial sénior' }
  ];

  const searchResults = searchQuery.trim()
    ? allSearchableItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSearchableItems.slice(0, 6);

  // Industry icons map
  const getIndustryIcon = (path: string) => {
    if (path.includes('agro')) return <Tractor className="w-4 h-4 text-emerald-600" />;
    if (path.includes('estudios')) return <Briefcase className="w-4 h-4 text-blue-600" />;
    if (path.includes('distribuidoras')) return <Building2 className="w-4 h-4 text-amber-600" />;
    if (path.includes('salud')) return <Stethoscope className="w-4 h-4 text-rose-600" />;
    if (path.includes('inmobiliaria')) return <Building2 className="w-4 h-4 text-indigo-600" />;
    if (path.includes('gastronomia')) return <Utensils className="w-4 h-4 text-orange-600" />;
    if (path.includes('ecommerce')) return <ShoppingBag className="w-4 h-4 text-cyan-600" />;
    if (path.includes('construccion')) return <HardHat className="w-4 h-4 text-yellow-600" />;
    if (path.includes('automotor')) return <Car className="w-4 h-4 text-slate-700" />;
    return <Briefcase className="w-4 h-4 text-blue-600" />;
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR */}
      <div className="bg-slate-50 border-b border-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-slate-600 text-[11px]">
          
          {/* Left Highlights */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Novedades 2026
            </span>
            <span className="truncate hidden md:inline">
              🇦🇷 Facturación AFIP CAE homologada en tiempo real • 🤖 IA Gemini 3.7 integrada
            </span>
          </div>

          {/* Right Utilities & Quick Modals */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Interactive Tool Badges */}
            <div className="hidden lg:flex items-center gap-1.5 border-r border-slate-200 pr-2.5">
              <button
                onClick={onOpenWizard}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors cursor-pointer font-medium"
              >
                <Calculator className="w-3 h-3 text-blue-600" />
                <span>Cotizador ROI</span>
              </button>
              <button
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer font-medium"
              >
                <Bot className="w-3 h-3 text-emerald-600" />
                <span>Simulador Bot</span>
              </button>
              <button
                onClick={onOpenAudit}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors cursor-pointer font-medium"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Auditoría 60s</span>
              </button>
            </div>

            {/* Currency Selector Pill */}
            <button
              onClick={onToggleCurrency}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-blue-400 text-slate-800 font-bold shadow-2xs transition-all cursor-pointer text-[10px]"
              title="Cambiar moneda de planes y cotizaciones"
            >
              <span className="text-[11px]">{currency === 'ARS' ? '🇦🇷' : '🇺🇸'}</span>
              <span>{currency}</span>
            </button>

            {/* Session action */}
            {isAuthenticated ? (
              <button
                onClick={enterApp}
                className="font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer hidden sm:inline"
              >
                Ir al Dashboard
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer hidden sm:inline"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVIGATION HEADER */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs font-['Plus_Jakarta_Sans',sans-serif]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo Placeholder & ClientumCRM Title */}
          <div
            id="public-header-brand"
            className="flex items-center gap-3.5 cursor-pointer select-none group shrink-0"
            onClick={() => handleNavClick('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('/');
              }
            }}
            aria-label="ClientumCRM Inicio"
          >
            {/* Professional Minimalist Brand Logo Placeholder */}
            <div
              id="brand-logo-placeholder"
              className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-200/90 shadow-xs flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md transition-all duration-200 shrink-0 overflow-visible"
              title="ClientumCRM Brand Logo"
            >
              {/* Inner geometric logo emblem with subtle gradient */}
              <div className="w-full h-full rounded-[11px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center p-1.5 overflow-hidden">
                <ClientumLogo className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-200" />
              </div>

              {/* Minimalist Live Service Pulse Indicator */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Plataforma Operativa 99.9% Uptime"
              />
            </div>

            {/* ClientumCRM Title & Subtitle with Optical Alignment */}
            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Clientum
                </span>
                <span className="text-xl font-extrabold text-blue-600 tracking-tight">
                  CRM
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 leading-none">
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  Suite Comercial
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[10px] text-blue-600 font-bold tracking-tight">
                  AFIP CAE
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Primary Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700">
            {/* Inicio */}
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                currentPath === '/'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>

            {/* 1. PRODUCTO MEGA-MENU TRIGGER */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'product' ? null : 'product')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMenu === 'product' || currentPath.startsWith('/producto') || currentPath === '/clientum-crm'
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Producto</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'product' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* PRODUCT MEGA-MENU DROPDOWN */}
              {activeMenu === 'product' && (
                <div className="absolute top-full left-0 mt-2 w-[760px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-5">
                    
                    {/* Left: Product Modules (8 cols) */}
                    <div className="col-span-8 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Módulos Centrales de la Suite
                        </span>
                        <button
                          onClick={() => handleNavClick('/producto')}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Ver arquitectura completa</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleNavClick('/clientum-crm')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                              CRM 360° Omnicanal
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">Principal</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Pipeline Kanban, scoring MEDDIC y seguimiento de oportunidades.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/whatsapp-ia')}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                              WhatsApp Multiagente
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">Baileys QR</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Atención simultánea de varios vendedores con bot IA 24/7.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/erp')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <FileSpreadsheet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                              Facturación AFIP CAE
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">WSFE</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Facturas A, B, C y notas de crédito en &lt; 2s con código QR oficial.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/agentes-ia')}
                          className="p-2.5 rounded-xl hover:bg-purple-50/70 border border-transparent hover:border-purple-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-purple-700 flex items-center gap-1.5">
                              Agente OS Autónomo
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 font-bold">14 Roles</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Organigrama corporativo autónomo con modelos Gemini 3.7.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/automatizaciones')}
                          className="p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">Automatizaciones DAG</div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Editor visual de flujos sin código para tareas y alertas automáticas.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/bi')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Business Intelligence</div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Forecast, tasa de conversión y analítica por vendedor.</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right: Featured Callout Banner (4 cols) */}
                    <div className="col-span-4 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Pruébalo en Vivo</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                          Simulador Interactivo de WhatsApp con IA
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                          Experimenta en tiempo real cómo responde un bot de ventas o soporte antes de activarlo en tu negocio.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-blue-100/80">
                        <button
                          onClick={() => {
                            setActiveMenu(null);
                            onOpenSimulator();
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Abrir Simulador WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleNavClick('/tienda/central')}
                          className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Store className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ver Catálogo en Tienda</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2. INDUSTRIAS MEGA-MENU TRIGGER */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'industries' ? null : 'industries')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMenu === 'industries' || currentPath.startsWith('/industrias')
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Industrias</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">10</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'industries' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* INDUSTRIES MEGA-MENU DROPDOWN */}
              {activeMenu === 'industries' && (
                <div className="absolute top-full left-0 mt-2 w-[720px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Soluciones Especializadas por Sector
                    </span>
                    <button
                      onClick={() => handleNavClick('/industrias')}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver todas las 10 verticales</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRIES_SUBNAV.map((ind) => (
                      <button
                        key={ind.path}
                        onClick={() => handleNavClick(ind.path)}
                        className="p-2 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors shrink-0 mt-0.5">
                          {getIndustryIcon(ind.path)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">
                            {ind.label}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {ind.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-xs text-slate-700 font-semibold">¿Tu sector requiere una integración personalizada?</span>
                    </div>
                    <button
                      onClick={() => handleNavClick('/contacto')}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Consultar con un especialista →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Precios (Direct Link with Badge) */}
            <button
              onClick={() => handleNavClick('/precios')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPath === '/precios'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <span>Precios</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                {currency}
              </span>
            </button>

            {/* 3. RECURSOS & EMPRESA DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'resources' ? null : 'resources')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMenu === 'resources' ||
                  currentPath === '/casos' ||
                  currentPath === '/recursos' ||
                  currentPath === '/academia' ||
                  currentPath === '/servicios' ||
                  currentPath === '/about'
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Recursos</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'resources' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeMenu === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-[340px] bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    Centro de Recursos & Empresa
                  </div>

                  <button
                    onClick={() => handleNavClick('/casos')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Casos de Éxito Reales</div>
                      <div className="text-[11px] text-slate-500">Métricas y testimonios verificados de clientes.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/academia')}
                    className="w-full p-2.5 rounded-xl hover:bg-amber-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">Campus Academia LMS</div>
                      <div className="text-[11px] text-slate-500">Capacitación comercial interactiva con diploma.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/servicios')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Servicios de Migración</div>
                      <div className="text-[11px] text-slate-500">Acompañamiento e implementación en tu empresa.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/dominios')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-slate-900">Gestor de Dominios & DNS</div>
                      <div className="text-[11px] text-slate-500">Cloudflare Proxy, certificados SSL y SEO.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/about')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-slate-900">Sobre Clientum Latam</div>
                      <div className="text-[11px] text-slate-500">Nuestra historia, infraestructura y valores.</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Contacto Directo */}
            <button
              onClick={() => handleNavClick('/contacto')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                currentPath === '/contacto' || currentPath === '/demo'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Quick Search, Auth & Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Interactive Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 text-xs transition-colors cursor-pointer shadow-2xs"
              title="Buscar en todo el sitio (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Buscar...</span>
              <kbd className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Secondary CTA: Pedir Demo */}
            <button
              onClick={() => handleNavClick('/contacto')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 font-bold text-xs transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Pedir Demo</span>
            </button>

            {/* Primary CTA: dashboard access */}
            <button
              onClick={enterApp}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>{isAuthenticated ? 'Ir al Dashboard' : 'Ingresar al CRM'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* 3. MOBILE INTERACTIVE DRAWER / ACCORDION */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 max-h-[85vh] overflow-y-auto space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
            
            {/* Mobile Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar módulo, industria o solución..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Quick Mobile Category Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                onClick={() => setMobileSection('product')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                  mobileSection === 'product' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Producto
              </button>
              <button
                onClick={() => setMobileSection('industries')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                  mobileSection === 'industries' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Industrias (10)
              </button>
              <button
                onClick={() => setMobileSection('resources')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                  mobileSection === 'resources' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Recursos
              </button>
            </div>

            {/* Mobile Content Based on Selected Tab */}
            {mobileSection === 'product' && (
              <div className="space-y-1.5">
                <button
                  onClick={() => handleNavClick('/clientum-crm')}
                  className="w-full p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-left flex items-center justify-between text-xs font-bold text-blue-900"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    CRM 360° Omnicanal
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200 text-blue-800">Ver Demo</span>
                </button>
                <button
                  onClick={() => handleNavClick('/producto/whatsapp-ia')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs text-slate-800 font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  WhatsApp Multiagente & Baileys
                </button>
                <button
                  onClick={() => handleNavClick('/producto/erp')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs text-slate-800 font-semibold"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  Facturación AFIP con CAE (WSFE)
                </button>
                <button
                  onClick={() => handleNavClick('/producto/agentes-ia')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs text-slate-800 font-semibold"
                >
                  <Bot className="w-4 h-4 text-purple-600" />
                  Agente OS Autónomo (Gemini 3.7)
                </button>
                <button
                  onClick={() => handleNavClick('/producto/automatizaciones')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs text-slate-800 font-semibold"
                >
                  <Zap className="w-4 h-4 text-amber-600" />
                  Automatizaciones & Flujos DAG
                </button>
                <button
                  onClick={() => handleNavClick('/producto/bi')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs text-slate-800 font-semibold"
                >
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Business Intelligence & Forecast
                </button>
              </div>
            )}

            {mobileSection === 'industries' && (
              <div className="grid grid-cols-2 gap-1.5">
                {INDUSTRIES_SUBNAV.map((ind) => (
                  <button
                    key={ind.path}
                    onClick={() => handleNavClick(ind.path)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left text-xs font-semibold text-slate-800 flex items-center gap-2 truncate"
                  >
                    {getIndustryIcon(ind.path)}
                    <span className="truncate">{ind.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {mobileSection === 'resources' && (
              <div className="space-y-1.5">
                <button
                  onClick={() => handleNavClick('/precios')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between text-xs font-semibold text-slate-800"
                >
                  <span>🏷️ Planes & Precios</span>
                  <span className="text-[10px] text-blue-600 font-bold">Desde $15.000</span>
                </button>
                <button
                  onClick={() => handleNavClick('/casos')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs font-semibold text-slate-800"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  Casos de Éxito & Clientes
                </button>
                <button
                  onClick={() => handleNavClick('/academia')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs font-semibold text-slate-800"
                >
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  Academia LMS Clientum
                </button>
                <button
                  onClick={() => handleNavClick('/servicios')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs font-semibold text-slate-800"
                >
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Servicios de Implementación
                </button>
                <button
                  onClick={() => handleNavClick('/tienda/central')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs font-semibold text-slate-800"
                >
                  <Store className="w-4 h-4 text-emerald-600" />
                  Tienda Digital Oficial
                </button>
                <button
                  onClick={() => handleNavClick('/dominios')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 text-xs font-semibold text-slate-800"
                >
                  <Globe className="w-4 h-4 text-blue-600" />
                  Gestor de Dominios & Cloudflare
                </button>
              </div>
            )}

            {/* Quick Interactive Tool Cards in Mobile */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Herramientas Interactivas Gratuitas
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenWizard();
                  }}
                  className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-center text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Cotizador</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSimulator();
                  }}
                  className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Simulador</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAudit();
                  }}
                  className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-center text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Auditoría</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Moneda de visualización:</span>
                <button
                  onClick={onToggleCurrency}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-bold text-slate-800"
                >
                  {currency === 'ARS' ? '🇦🇷 Pesos (ARS)' : '🇺🇸 Dólares (USD)'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 text-center"
                  >
                    Iniciar Sesión
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    enterApp();
                  }}
                  className={`py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md shadow-blue-600/20 ${
                    isAuthenticated ? 'col-span-2' : ''
                  }`}
                >
                  {isAuthenticated ? 'Ir al Dashboard' : 'Ingresar al CRM'}
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* 4. COMMAND PALETTE / QUICK FINDER MODAL (⌘K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="max-w-xl w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Input Bar */}
            <div className="p-3.5 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe para buscar cualquier módulo, industria o herramienta..."
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {searchQuery.trim() ? `Resultados (${searchResults.length})` : 'Sugerencias Populares'}
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No se encontraron resultados para "{searchQuery}". Prueba con "AFIP", "WhatsApp", "Agro" o "Precios".
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item.path)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700 flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-normal px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 ml-2" />
                  </button>
                ))
              )}
            </div>

            {/* Footer tips */}
            <div className="bg-slate-50 p-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
              <span>Presiona <strong>ESC</strong> para cerrar</span>
              <span>Clientum Suite Latam</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
