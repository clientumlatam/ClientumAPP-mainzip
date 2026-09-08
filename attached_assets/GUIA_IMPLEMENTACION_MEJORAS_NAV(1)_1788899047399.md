# Guía de Implementación: Mejoras de Navegación y Arquitectura
**Versión:** 1.0  
**Fecha:** Agosto 2026  
**Destinatario:** Jonathan (Founder & CEO, Clientum)

---

## TABLA DE CONTENIDOS

1. [Mejora 1: Botón "Volver al Dashboard" en PublicWebsite](#mejora-1)
2. [Mejora 2: ProtectedRoute Guard para /app](#mejora-2)
3. [Mejora 3: Refactorización de PublicWebsite.tsx](#mejora-3)
4. [Mejora 4: Documentación de Rutas](#mejora-4)
5. [Mejora 5: Estructura de Carpetas Recomendada](#mejora-5)
6. [Timeline de Implementación](#timeline)

---

## MEJORA 1: Botón "Volver al Dashboard" en PublicWebsite {#mejora-1}

### Problema Actual

El prop `onBackToEditor` se pasa a PublicWebsite pero no hay UI que lo invoque.

```tsx
// App.tsx (línea 266)
<PublicWebsite 
  onBackToEditor={() => navigate('/app')}  // ← Prop sin usar
  authUser={currentUser}
  // ...
/>
```

### Solución: Añadir Botón Flotante o en Header

#### **Opción A: Botón Flotante (Recomendado)**

```tsx
// src/components/PublicWebsite.tsx
// Cerca del final, dentro del JSX principal

interface PublicWebsiteProps {
  onBackToEditor: () => void;
  authUser: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onLoginSuccess: () => void;
}

export default function PublicWebsite({
  onBackToEditor,
  authUser,
  onOpenLogin,
  onLogout,
  onLoginSuccess,
}: PublicWebsiteProps) {
  // ... código existente ...

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Contenido existente */}
      {/* ... */}

      {/* NUEVO: Botón flotante solo si está autenticado */}
      {authUser && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            onClick={onBackToEditor}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-3 rounded-lg font-medium
              bg-gradient-to-r from-indigo-600 to-blue-600
              text-white shadow-lg hover:shadow-xl
              transition-all flex items-center gap-2
            `}
          >
            <ArrowRight className="w-4 h-4" />
            <span>Ir al Dashboard</span>
          </motion.button>
        </div>
      )}

      {/* Footer u otros elementos */}
    </div>
  );
}
```

#### **Opción B: Botón en Header (Alternativa)**

```tsx
// src/components/PublicWebsite.tsx
// En la cabecera, junto con los botones de login/logout

function PublicWebsiteHeader({
  authUser,
  onBackToEditor,
  onOpenLogin,
  onLogout,
}: {
  authUser: string | null;
  onBackToEditor: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo y navegación */}
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        {/* Botones de autenticación */}
        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span className="text-sm text-slate-400">
                {authUser}
              </span>
              
              {/* Botón nuevo: Ir al Dashboard */}
              <motion.button
                onClick={onBackToEditor}
                whileHover={{ scale: 1.02 }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Dashboard
              </motion.button>

              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
```

#### **Opción C: Badge Contextual en Hero (Más Discreto)**

```tsx
// En la sección Hero de PublicWebsite.tsx

{authUser && (
  <div className="absolute top-8 right-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
    <div className="flex items-center gap-3">
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      <div>
        <p className="text-xs text-slate-400">Sesión activa</p>
        <button
          onClick={onBackToEditor}
          className="text-sm text-emerald-500 hover:text-emerald-400 font-medium flex items-center gap-1"
        >
          Acceder al Dashboard
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
)}
```

### Recomendación Final para Mejora 1

**Usar Opción A (Botón Flotante)** porque:
- ✅ No interfiere con el contenido principal
- ✅ Siempre visible y accesible
- ✅ Patrón familiar en web moderno (chat widgets, etc.)
- ✅ Fácil de ocultar en mobile si es necesario

---

## MEJORA 2: ProtectedRoute Guard para /app {#mejora-2}

### Problema Actual

Un usuario NO autenticado puede acceder a `/app` y ver la UI del dashboard.

```tsx
// App.tsx línea 288-294
<Route path="/app/*" element={
  <DashboardApp 
    currentUser={currentUser}  // Puede ser null
    handleLogout={handleLogout}
    resetModalElement={resetModalElement}
  />
} />
```

### Solución: Crear Componente ProtectedRoute

#### **Paso 1: Crear ProtectedRoute.tsx**

```tsx
// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from './common/Loader';

interface ProtectedRouteProps {
  element: React.ReactElement;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

export function ProtectedRoute({
  element,
  isAuthenticated,
  isLoading = false,
}: ProtectedRouteProps) {
  // Mientras se valida la sesión
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <Loader />
      </div>
    );
  }

  // Usuario autenticado: renderizar el elemento
  if (isAuthenticated) {
    return element;
  }

  // Usuario NO autenticado: redirigir a login
  return <Navigate to="/" replace />;
}
```

#### **Paso 2: Actualizar App.tsx**

```tsx
// src/App.tsx

import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data?.user?.username || null);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.warn('[App] Session check failed:', err);
        setCurrentUser(null);
      } finally {
        setIsLoadingSession(false);  // Importante: marcar como completado
      }
    };

    fetchSession();
  }, []);

  // ... resto del código ...

  return (
    <Routes>
      <Route path="/" element={
        <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
          <PublicWebsite 
            onBackToEditor={() => navigate('/app')}
            authUser={currentUser}
            onOpenLogin={() => {
              window.dispatchEvent(new CustomEvent('open-login-modal'));
            }}
            onLogout={handleLogout}
            onLoginSuccess={() => navigate('/app')}
          />
          <div className="hidden">
            <AuthButton onLoginSuccess={() => navigate('/app')} />
          </div>
          {resetModalElement}
        </div>
      } />

      {/* Rutas alias públicas */}
      <Route path="/sitio/*" element={<Navigate to="/" replace />} />
      <Route path="/web/*" element={<Navigate to="/" replace />} />
      <Route path="/portal/*" element={<Navigate to="/" replace />} />
      <Route path="/lms/*" element={<Navigate to="/" replace />} />

      {/* NUEVA: Ruta protegida */}
      <Route 
        path="/app/*" 
        element={
          <ProtectedRoute
            element={
              <DashboardApp 
                currentUser={currentUser || ''}
                handleLogout={handleLogout}
                resetModalElement={resetModalElement}
              />
            }
            isAuthenticated={currentUser !== null}
            isLoading={isLoadingSession}
          />
        } 
      />

      {/* Rutas alias privadas */}
      <Route path="/dashboard/*" element={<Navigate to="/app" replace />} />
      <Route path="/crm/*" element={<Navigate to="/app" replace />} />
      <Route path="/erp/*" element={<Navigate to="/app" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
```

### Validación de ProtectedRoute

```typescript
// Test E2E (Pseudocódigo)

describe('ProtectedRoute Guard', () => {
  test('usuario no autenticado → redirige a /', async () => {
    render(<App />);
    await userEvent.goto('/app');
    expect(window.location.pathname).toBe('/');
  });

  test('usuario autenticado → accede a /app', async () => {
    // Mock autenticación
    mockFetch('/api/auth/me', { ok: true, user: { username: 'jonathan' } });
    
    render(<App />);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/app');
    });
  });

  test('session valida → muestra DashboardApp', async () => {
    mockFetch('/api/auth/me', { ok: true, user: { username: 'jonathan' } });
    
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/overview/i)).toBeInTheDocument();
    });
  });
});
```

---

## MEJORA 3: Refactorización de PublicWebsite.tsx {#mejora-3}

### Problema Actual

El archivo tiene 5,795 líneas, lo que lo hace difícil de mantener, testear y navegar.

### Solución: División Modular

#### **Estructura Actual (ANTES)**

```
src/components/
├── PublicWebsite.tsx (5,795 líneas) ❌
```

#### **Estructura Propuesta (DESPUÉS)**

```
src/components/
├── PublicWebsite/
│   ├── index.tsx                    (200 líneas) ← Orquestador
│   ├── sections/
│   │   ├── Hero.tsx                 (300 líneas)
│   │   ├── Services.tsx             (400 líneas)
│   │   ├── Pricing.tsx              (600 líneas)
│   │   ├── CaseStudies.tsx          (500 líneas)
│   │   ├── Academy.tsx              (800 líneas)
│   │   ├── Blog.tsx                 (400 líneas)
│   │   ├── Testimonials.tsx         (200 líneas)
│   │   └── Contact.tsx              (300 líneas)
│   ├── components/
│   │   ├── PricingCard.tsx          (100 líneas)
│   │   ├── ServiceCard.tsx          (80 líneas)
│   │   ├── CourseCard.tsx           (120 líneas)
│   │   ├── CaseStudyCard.tsx        (100 líneas)
│   │   ├── BlogPostCard.tsx         (90 líneas)
│   │   └── Header.tsx               (150 líneas)
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useNavigation.ts
│   └── data/
│       ├── services.ts
│       ├── pricing.ts
│       ├── testimonials.ts
│       └── faqs.ts
```

#### **Implementación: PublicWebsite/index.tsx**

```tsx
// src/components/PublicWebsite/index.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSelector } from '../../LanguageSelector';
import { useLanguage } from '../../lib/i18n';

// Secciones
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Pricing } from './sections/Pricing';
import { Academy } from './sections/Academy';
import { CaseStudies } from './sections/CaseStudies';
import { Blog } from './sections/Blog';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

// Header personalizado
import { PublicWebsiteHeader } from './components/Header';

interface PublicWebsiteProps {
  onBackToEditor: () => void;
  authUser: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onLoginSuccess: () => void;
}

export default function PublicWebsite({
  onBackToEditor,
  authUser,
  onOpenLogin,
  onLogout,
  onLoginSuccess,
}: PublicWebsiteProps) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden">
      {/* Header */}
      <PublicWebsiteHeader
        authUser={authUser}
        onBackToEditor={onBackToEditor}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      {/* Contenido principal */}
      <main className="relative">
        <Hero
          onStarted={() => {
            if (!authUser) {
              onOpenLogin();
            } else {
              onBackToEditor();
            }
          }}
        />

        <Services />
        <Pricing />
        <CaseStudies />
        <Academy />
        <Blog />
        <Contact onLoginSuccess={onLoginSuccess} />
      </main>

      {/* Footer */}
      <Footer authUser={authUser} onOpenLogin={onOpenLogin} />

      {/* Botón flotante (alternativa a Header) */}
      {authUser && (
        <motion.button
          onClick={onBackToEditor}
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Ir al Dashboard</span>
        </motion.button>
      )}
    </div>
  );
}
```

#### **Implementación: PublicWebsite/sections/Hero.tsx**

```tsx
// src/components/PublicWebsite/sections/Hero.tsx

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStarted: () => void;
}

export function Hero({ onStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-sm text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Suite de Automación Inteligente</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Clientum OS
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            CRM Inteligente, Facturación AFIP y WhatsApp IA para PyMEs argentinas
          </p>

          <motion.button
            onClick={onStarted}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-bold flex items-center gap-2 mx-auto hover:shadow-lg transition-all"
          >
            Comenzar ahora
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
```

#### **Implementación: PublicWebsite/sections/Pricing.tsx**

```tsx
// src/components/PublicWebsite/sections/Pricing.tsx

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { PRICING_PLANS } from '../data/pricing';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Planes Transparentes
        </motion.h2>

        {/* Toggle ciclo de facturación */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'annual'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            Anual
            <span className="text-xs text-emerald-400 ml-2">-20%</span>
          </button>
        </div>

        {/* Grid de planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PricingCard
                plan={plan}
                billingCycle={billingCycle}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Beneficios de la Refactorización

✅ **Mantenibilidad:**
- Cada sección en su propio archivo (200-800 líneas)
- Cambios en Hero no afectan Pricing

✅ **Testing:**
- Tests independientes para cada sección
- Mocking más fácil de datos

✅ **Performance:**
- Lazy loading de secciones posible
- Code splitting automático

✅ **Desarrollo en equipo:**
- Múltiples personas pueden trabajar en paralelo
- Menos merge conflicts

---

## MEJORA 4: Documentación de Rutas {#mejora-4}

### Crear NAVIGATION.md

```markdown
# Estructura de Rutas - Clientum OS

## Jerarquía de Rutas

### Sitio Público (No requiere autenticación)
- **Ruta primaria:** `/`
- **Aliases:** `/sitio`, `/web`, `/portal`, `/lms`
- **Componente:** `PublicWebsite.tsx`
- **Secciones:**
  - Hero / Landing
  - Catálogo de Servicios
  - Planes de Precios
  - Casos de Éxito
  - Academia / LMS
  - Blog
  - Contacto

### Dashboard Privado (Requiere autenticación)
- **Ruta primaria:** `/app`
- **Aliases:** `/dashboard`, `/crm`, `/erp`
- **Componente:** `DashboardApp.tsx`
- **Módulos principales:**
  - CRM 360° (Kanban, Contacts, Pipeline)
  - Marketing Suite (Email, Content, SEO)
  - IA Agents (Prospector, Enricher, Orchestrator)
  - Admin Console (Settings, Logs, Backups)
  - ERP / VS-CRM (Invoicing, Expenses, Time)

## Flujo de Navegación

```
Visitante anónimo:
  GET /
  ↓
  PublicWebsite (sitio público)
  ↓
  [Click "Iniciar Sesión"]
  ↓
  AuthButton modal
  ↓
  POST /api/auth/login
  ↓
  navigate('/app')
  ↓
  DashboardApp (protegida por ProtectedRoute)

Usuario autenticado en /:
  GET /
  ↓
  PublicWebsite (con botón "Ir al Dashboard" visible)
  ↓
  [Click botón]
  ↓
  navigate('/app')
  ↓
  DashboardApp

Usuario en /app:
  GET /app/*
  ↓
  ProtectedRoute valida sesión
  ↓
  DashboardApp
  ↓
  [Click "Volver a Sitio Público"]
  ↓
  navigate('/')
  ↓
  PublicWebsite
```

## Cómo Añadir Nuevas Rutas Públicas

1. Crear componente en `src/components/`
2. Importar en `App.tsx`
3. Añadir ruta en sección pública

```tsx
// App.tsx
<Route path="/blog/:slug" element={<BlogPostDetail />} />
```

## Cómo Añadir Nuevas Rutas Privadas

1. Crear componente en `src/components/crm-full/` o módulo correspondiente
2. Importar en `DashboardApp.tsx`
3. Actualizar `activeTab` en `types.ts`
4. Añadir case en renderizado de DashboardApp

```tsx
// DashboardApp.tsx
{activeTab === 'new_feature' && <NewFeatureTab />}
```

## Rutas de API (Backend - server.ts)

| Ruta | Método | Autenticación | Descripción |
|------|--------|---------------|------------|
| `/api/auth/me` | GET | ✅ | Obtener usuario actual |
| `/api/auth/login` | POST | ❌ | Login |
| `/api/auth/logout` | POST | ✅ | Logout |
| `/api/crm/*` | GET/POST/PUT | ✅ | Operaciones CRM |
| `/api/marketing/*` | GET/POST/PUT | ✅ | Marketing Suite |
| `/api/agents/*` | POST | ✅ | Agentes IA |
| `/api/admin/*` | GET/POST/PUT | ✅ | Admin Console |

## Guía de Seguridad

- ✅ **Rutas públicas:** Sin validación de servidor
- ✅ **Rutas privadas:** Validar autenticación en cliente (ProtectedRoute)
- ✅ **APIs privadas:** Validar token/sesión en servidor
- ✅ **CORS:** Solo localhost:5173 + clientum.com.ar en producción

## Variables de Entorno Relacionadas

```env
VITE_API_BASE_URL=http://localhost:3000/api
```
```

---

## MEJORA 5: Estructura de Carpetas Recomendada {#mejora-5}

### Antes (Actual)

```
src/
├── App.tsx
├── components/
│   ├── PublicWebsite.tsx (5,795 líneas) ❌
│   ├── DashboardApp/ ✅
│   ├── crm-full/
│   ├── vscrm/
│   ├── Academia/
│   ├── shared/
│   └── ... (40+ otros archivos)
├── lib/
├── pages/
├── platform/
├── services/
├── store/
├── utils/
└── data/
```

### Después (Propuesto)

```
src/
├── App.tsx
├── types.ts
│
├── components/
│   ├── common/                    ← UI compartida
│   │   ├── Loader.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ...
│   │
│   ├── PublicWebsite/             ← Refactorizado
│   │   ├── index.tsx
│   │   ├── sections/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   └── types.ts
│   │
│   ├── Dashboard/                 ← Reorganizado
│   │   ├── DashboardApp.tsx
│   │   ├── Layout/
│   │   ├── modules/
│   │   │   ├── CRM/
│   │   │   ├── Marketing/
│   │   │   ├── SEO/
│   │   │   ├── IA/
│   │   │   └── Admin/
│   │   └── shared/
│   │
│   ├── Auth/
│   │   ├── AuthButton.tsx
│   │   ├── LoginModal.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   └── Legacy/                    ← A deprecar post-refactor
│       ├── vscrm/
│       ├── platform/
│       └── ...
│
├── hooks/
│   ├── useAuth.ts
│   ├── useNavigation.ts
│   └── ...
│
├── lib/
│   ├── auth.ts
│   ├── api.ts
│   ├── i18n.tsx
│   └── ...
│
├── services/
│   ├── api/
│   ├── auth/
│   └── ...
│
├── store/
│   ├── authStore.ts
│   └── ...
│
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── ...
│
├── data/
│   ├── pricing.ts
│   ├── services.ts
│   └── ...
│
└── styles/
    ├── globals.css
    └── ...
```

### Pasos de Migración

**Fase 1: Crear estructura base (1-2 días)**
```bash
mkdir -p src/components/Dashboard/modules/{CRM,Marketing,SEO,IA,Admin}
mkdir -p src/components/PublicWebsite/{sections,components,hooks,data}
mkdir -p src/components/Auth
mkdir -p src/hooks
```

**Fase 2: Mover y refactorizar PublicWebsite (3-5 días)**
- Dividir PublicWebsite.tsx en secciones
- Crear componentes reutilizables
- Tests unitarios para cada sección

**Fase 3: Reorganizar Dashboard (2-3 días)**
- Mover componentes a módulos
- Actualizar imports en DashboardApp
- Tests E2E

**Fase 4: Deprecar código legacy (2-3 días)**
- Marcar archivos como deprecated
- Crear guía de migración
- Remover código muerto

---

## TIMELINE DE IMPLEMENTACIÓN {#timeline}

### Semana 1: Mejoras Críticas

| Tarea | Estimado | Estado |
|-------|----------|--------|
| Mejora 1: Botón "Volver al Dashboard" | 2 horas | 🟡 Para hacer |
| Mejora 2: ProtectedRoute Guard | 3 horas | 🟡 Para hacer |
| Tests E2E de navegación | 2 horas | 🟡 Para hacer |

**Entregable:** Navegación fluida entre entornos ✅

### Semana 2: Documentación y Refactor Base

| Tarea | Estimado | Estado |
|-------|----------|--------|
| Mejora 4: NAVIGATION.md | 2 horas | 🟡 Para hacer |
| Mejora 5: Estructura de carpetas base | 4 horas | 🟡 Para hacer |
| Crear estructura de PublicWebsite/ | 2 horas | 🟡 Para hacer |

**Entregable:** Documentación clara + estructura base 📋

### Semana 3-4: Refactorización Completa

| Tarea | Estimado | Estado |
|-------|----------|--------|
| Refactorizar PublicWebsite.tsx | 16-20 horas | 🟡 Para hacer |
| Unit tests para secciones | 8 horas | 🟡 Para hacer |
| Reorganizar Dashboard modules | 12 horas | 🟡 Para hacer |

**Entregable:** Código mantenible y testeado ✅

### Post-Refactor (Q4 2026)

- [ ] Iniciar migración a Turborepo
- [ ] Extraer server.ts a NestJS routers
- [ ] Implementar lazy loading en Dashboard
- [ ] Mejorar performance del sitio público

---

## CHECKLIST DE VALIDACIÓN

### Antes de Commit

- [ ] Código formateado (prettier/eslint)
- [ ] Tests pasen (npm test)
- [ ] TypeScript no tenga errores (npm run lint)
- [ ] Navegación testeda manualmente

### Antes de Merge a Main

- [ ] Code review aprobado
- [ ] Tests E2E pasen en CI/CD
- [ ] Performance metrics no degradados
- [ ] Documentación actualizada

### Antes de Deploy a Producción

- [ ] Tested en staging
- [ ] Rollback plan en lugar
- [ ] Monitoring en lugar
- [ ] Notificación a equipo

---

## RECURSOS Y REFERENCIAS

### Documentos Relacionados
- ARQUITECTURA_AUDITORIA_ENTORNOS_2026.md
- server.ts (necesita análisis posterior)
- types.ts (para ActiveTab)

### Ejemplos de Código
- Componentes compartidos: src/components/common/
- Hooks: src/hooks/
- Utilities: src/utils/

### Testing
- Componentes: Vitest + React Testing Library
- E2E: Playwright o Cypress

---

## SOPORTE Y PREGUNTAS

Para preguntas sobre implementación:
1. Revisar la auditoría de arquitectura
2. Consultar ejemplos de código en esta guía
3. Revisar documentación de React Router v7

---

**Versión:** 1.0  
**Última actualización:** Agosto 2026  
**Próxima revisión:** Octubre 2026
