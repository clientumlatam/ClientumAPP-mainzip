import React, { useState } from 'react';
import {
  Check,
  Receipt,
  HelpCircle,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';

interface PublicPricingPageProps {
  currency: 'ARS' | 'USD';
  onToggleCurrency: () => void;
  onNavigate: (path: PublicRoutePath) => void;
  onOpenWizard: () => void;
}

export const PublicPricingPage: React.FC<PublicPricingPageProps> = ({
  currency,
  onToggleCurrency,
  onNavigate,
}) => {
  const { enterApp } = useCRM();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const isAnnual = billingCycle === 'annual';

  const displayPlans = [
    {
      id: 'inicial',
      name: 'Plan Inicial',
      tagline: 'Para profesionales y pequeños equipos comerciales de hasta 3 personas.',
      priceUSD: isAnnual ? 17 : 20,
      priceARS: isAnnual ? 20000 : 24000,
      badge: null,
      popular: false,
      features: [
        'Hasta 3 usuarios comerciales',
        'Pipeline Kanban personalizable',
        'Gestión de hasta 500 contactos y empresas',
        'Conexión WhatsApp Web básica',
        'Reportes de ventas mensuales',
        'Soporte por email y documentación',
      ],
      ctaText: 'Comenzar Gratis',
    },
    {
      id: 'pyme',
      name: 'Plan PyME Pro',
      tagline: 'El más elegido por distribuidores, agro y comercios en expansión.',
      priceUSD: isAnnual ? 38 : 45,
      priceARS: isAnnual ? 45000 : 54000,
      badge: 'Más Elegido en Latam',
      popular: true,
      features: [
        'Hasta 10 usuarios comerciales',
        'Pipelines ilimitados & Scoring MEDDIC',
        'Agente IA WhatsApp 24/7 (Gemini 3.6)',
        'Facturación electrónica AFIP (Facturas A, B, C con CAE)',
        'Gestión de cobros e inventario básico',
        'Automatizaciones de correo y WhatsApp sin código',
        'Soporte prioritario por WhatsApp directo',
      ],
      ctaText: 'Probar Demo en Vivo',
    },
    {
      id: 'pro',
      name: 'Plan Pro / Corporativo',
      tagline: 'Para compañías con múltiples sucursales y alto volumen de leads.',
      priceUSD: isAnnual ? 68 : 80,
      priceARS: isAnnual ? 80000 : 96000,
      badge: 'Escala Total',
      popular: false,
      features: [
        'Usuarios comerciales ilimitados',
        'Entrenamiento de IA a medida con catálogo propio',
        'Multi-empresa y multi-sucursal',
        'Integración con ERPs externos y APIs REST',
        'Atribución avanzada de ingresos y BI a medida',
        'Servidores dedicados y SLA 99.9% garantizado',
        'Gerente de cuenta exclusivo y onboarding asistido',
      ],
      ctaText: 'Hablar con Consultor',
    },
    {
      id: 'especializado',
      name: 'Plan Especializado',
      tagline: 'Infraestructura dedicada, desarrollos a medida y modelos LLM privados.',
      priceUSD: isAnnual ? 210 : 250,
      priceARS: isAnnual ? 250000 : 300000,
      badge: 'Custom Enterprise',
      popular: false,
      features: [
        'Desarrollo de módulos e interfaces a medida',
        'Integraciones directas con SAP, Tango, Bejerman',
        'Cluster privado de datos y hosting soberano',
        'Soporte 24/7 con teléfono de guardia',
        'Capacitación presencial o virtual a todo el equipo',
      ],
      ctaText: 'Consultar Proyecto',
    }
  ];

  const services = [
    {
      title: 'Onboarding Express (< 5 días)',
      desc: 'Configuración llave en mano de etapas, embudos y migración de contactos desde Excel.',
      price: '$90.000 ARS / Pago Único'
    },
    {
      title: 'Entrenamiento de Bot WhatsApp IA',
      desc: 'Carga de catálogo, árbol de decisiones, FAQs complejas y conexión a API oficial.',
      price: '$140.000 ARS / Pago Único'
    },
    {
      title: 'Homologación Fiscal AFIP Llave en Mano',
      desc: 'Puesta en marcha de certificados digitales AFIP y puntos de venta electrónicos.',
      price: '$70.000 ARS / Pago Único'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* Title & Controls */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-xs">
          <Receipt className="w-3.5 h-3.5 text-blue-600" />
          <span>Precios Transparentes • Sin Costos Ocultos</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Planes adaptados al tamaño y ritmo de tu empresa
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Facturación en pesos argentinos con comprobante oficial AFIP (Factura A o B). Cancela o cambia de plan en cualquier momento.
        </p>

        {/* Toggles: Monthly/Annual + Currency */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Billing Cycle */}
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-bold shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Pago Anual</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                -15% OFF
              </span>
            </button>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            Ver en {currency === 'ARS' ? 'USD (Dólares)' : 'ARS (Pesos)'}
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
              plan.popular
                ? 'bg-blue-50/40 border-2 border-blue-600 shadow-xl shadow-blue-500/10'
                : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-md uppercase tracking-wider">
                {plan.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.tagline}</p>
              </div>

              {/* Price display */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {currency === 'ARS'
                      ? `$${plan.priceARS.toLocaleString('es-AR')}`
                      : `$${plan.priceUSD}`}
                  </span>
                  <span className="text-xs text-slate-500">/ mes</span>
                </div>
                <div className="text-[11px] text-blue-600 font-semibold mt-0.5">
                  {isAnnual ? 'Facturado anualmente (15% ahorro)' : 'Sin permanencia mínima'}
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="pt-4 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Incluye:
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  if (plan.popular) {
                    enterApp();
                  } else {
                    onNavigate('/contacto');
                  }
                }}
                className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Implementation Services Row */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Servicios Adicionales
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Puesta en Marcha Llave en Mano & Migración Asistida
          </h2>
          <p className="text-xs text-slate-600">
            Nuestro equipo de consultores e ingenieros se encarga de dejar tu sistema 100% operativo sin requerir departamento de IT interno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="font-bold text-slate-900 text-xs">{srv.title}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{srv.desc}</p>
              <div className="pt-1 text-xs font-bold text-blue-600">{srv.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ on Billing */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Preguntas Frecuentes sobre Facturación y Pagos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Emiten Factura A en Argentina?</div>
            <div>Sí. Emitimos Factura Electrónica A o B según tu condición tributaria con CAE directo de AFIP. Podés computar el 21% de crédito fiscal de IVA.</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Cuáles son los medios de pago habilitados?</div>
            <div>Transferencia bancaria con CBU/CVU local, débito automático mensual, MercadoPago o tarjetas de crédito corporativas nacionales e internacionales.</div>
          </div>
        </div>
      </section>

    </div>
  );
};
