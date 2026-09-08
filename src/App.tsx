import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CRMProvider, useCRM } from './context/CRMContext';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { PublicSite } from './components/public/PublicSite';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { isPrivateAppPath } from './lib/navigation';

const PrivateEnvironment = React.lazy(() => import('./components/app/PrivateEnvironment').then((module) => ({
  default: module.PrivateEnvironment,
})));

const AppContent: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { isPublicSiteVisible, isAuthenticated, isAuthReady, openPublicSite, enterApp } = useCRM();
  const [pathname, setPathname] = React.useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  const isPrivateRoute = isPrivateAppPath(pathname);

  // Keep browser navigation and the context's environment state in sync.
  React.useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (!isAuthReady) return;

    if (isPrivateRoute && isAuthenticated) {
      if (isPublicSiteVisible) enterApp();
      return;
    }

    if (isPrivateRoute && !isAuthenticated) {
      // Replace an unauthorized deep link so Back does not return to a
      // private URL that can never be rendered.
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      openPublicSite();
      return;
    }

    // A public URL always renders the public environment, even if a stale
    // sessionStorage view flag says "app".
    if (!isPrivateRoute && !isPublicSiteVisible) openPublicSite();
  }, [enterApp, isAuthReady, isAuthenticated, isPrivateRoute, isPublicSiteVisible, openPublicSite]);

  const publicEnvironment = (
    <div data-theme={resolvedTheme} className="min-h-screen w-screen overflow-x-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PublicSite />
      <AuthModal />
      <ToastContainer />
    </div>
  );

  const privateEnvironment = (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#0a0c10] text-sm text-slate-400">
          Cargando Clientum CRM…
        </div>
      }
    >
      <PrivateEnvironment />
    </React.Suspense>
  );

  if (!isAuthReady && isPrivateRoute) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#07090e] text-sm text-slate-300">
        Verificando tu sesión segura…
      </div>
    );
  }

  return (
    <ProtectedRoute
      isAuthenticated={isPrivateRoute && isAuthenticated}
      fallback={publicEnvironment}
    >
      {privateEnvironment}
    </ProtectedRoute>
  );
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <CRMProvider>
        <AppContent />
      </CRMProvider>
    </ThemeProvider>
  );
}
