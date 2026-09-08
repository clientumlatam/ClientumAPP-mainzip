import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { KanbanView } from './components/opportunities/KanbanView';
import { TableView } from './components/opportunities/TableView';
import { ExecutiveDashboardView } from './components/dashboard/ExecutiveDashboardView';
import { CompaniesView } from './components/companies/CompaniesView';
import { PeopleView } from './components/people/PeopleView';
import { TasksView } from './components/tasks/TasksView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { PowerSuiteView } from './components/power/PowerSuiteView';
import { ErpView } from './components/power/ErpView';
import { RestaurantView } from './components/power/RestaurantView';
import { EcommerceView } from './components/power/EcommerceView';
import { SaaSClusterView } from './components/power/SaaSClusterView';
import { SitesView } from './components/power/SitesView';
import { SaaSThemeView } from './components/power/SaaSThemeView';
import { SubscriptionsView } from './components/power/SubscriptionsView';
import { ContactsView } from './components/power/ContactsView';
import { CustomerSegmentsView } from './components/power/CustomerSegmentsView';
import { ChatbotView } from './components/power/ChatbotView';
import { AutomationView } from './components/power/AutomationView';
import { KnowledgeBaseView } from './components/power/KnowledgeBaseView';
import { WhatsAppView } from './components/whatsapp/WhatsAppView';
import { CustomObjectsView } from './components/custom/CustomObjectsView';
import { WorkflowsView } from './components/workflows/WorkflowsView';
import { CSVStudioView } from './components/csv/CSVStudioView';
import { BrochureView } from './components/power/BrochureView';
import { AgenteOSView } from './components/ai/AgenteOSView';
import { Propuestas } from './components/commercial/Propuestas';
import { CrmFullGoogleMaps } from './components/commercial/CrmFullGoogleMaps';
import { PublicDomainManagerPage } from './components/power/PublicDomainManagerPage';
import { CampusLMSView } from './components/power/CampusLMSView';
import { TiendaDigitalView } from './components/public/TiendaDigitalView';
import { IndustryLandingPage } from './components/public/IndustryLandingPage';
import { QuoteWizardModal } from './components/public/QuoteWizardModal';
import { WhatsAppSimulatorModal } from './components/public/WhatsAppSimulatorModal';
import { ExpressAuditModal } from './components/public/ExpressAuditModal';
import { RecordDrawer } from './components/common/RecordDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { NewRecordModal } from './components/common/NewRecordModal';
import { AICopilotModal } from './components/ai/AICopilotModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { PublicSite } from './components/public/PublicSite';
import { WebmailInboxView } from './components/webmail/WebmailInboxView';
import { ComposeEmailModal } from './components/webmail/ComposeEmailModal';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isComposeEmailModalOpen,
    closeComposeEmailModal,
    composeEmailDefaults,
  } = useCRM();
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = React.useState(false);
  const [isAuditOpen, setIsAuditOpen] = React.useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <Navbar />

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-[#f8fafc] text-slate-900">
        {activeTab === 'dashboard' && <ExecutiveDashboardView />}
        {activeTab === 'opportunities' && (
          viewMode === 'kanban' ? <KanbanView /> : <TableView />
        )}
        {activeTab === 'companies' && <CompaniesView />}
        {activeTab === 'people' && <PeopleView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'powerSuite' && <PowerSuiteView />}
        {activeTab === 'whatsapp' && <WhatsAppView />}
        {activeTab === 'erp' && <ErpView />}
        {activeTab === 'restaurant' && <RestaurantView />}
        {activeTab === 'ecommerce' && <EcommerceView />}
        {activeTab === 'saasCluster' && <SaaSClusterView />}
        {activeTab === 'sites' && <SitesView />}
        {activeTab === 'saasTheme' && <SaaSThemeView />}
        {activeTab === 'subscriptions' && <SubscriptionsView />}
        {activeTab === 'segments' && <CustomerSegmentsView />}
        {activeTab === 'chatbot' && <ChatbotView />}
        {activeTab === 'automation' && <AutomationView />}
        {activeTab === 'knowledge' && <KnowledgeBaseView />}
        {activeTab === 'mapsProspecting' && <PowerSuiteView defaultModule="maps" />}
        {activeTab === 'meddic' && <PowerSuiteView defaultModule="meddic" />}
        {activeTab === 'campaigns' && <PowerSuiteView defaultModule="campaigns" />}
        {activeTab === 'aiAssistant' && <PowerSuiteView defaultModule="gemini" />}
        {activeTab === 'gtmStrategy' && <PowerSuiteView defaultModule="gtm" />}
        {activeTab === 'sdrOutreach' && <PowerSuiteView defaultModule="sdr" />}
        {activeTab === 'adCopy' && <PowerSuiteView defaultModule="adcopy" />}
        {activeTab === 'payments' && <PowerSuiteView defaultModule="mercadopago" />}
        {activeTab === 'clientPortal' && <PowerSuiteView defaultModule="portal" />}
        {activeTab === 'seoSuite' && <PowerSuiteView defaultModule="seo" />}
        {activeTab === 'webDev' && <PowerSuiteView defaultModule="webdev" />}
        {activeTab === 'customObjects' && <CustomObjectsView />}
        {activeTab === 'workflows' && <WorkflowsView />}
        {activeTab === 'csvStudio' && <CSVStudioView />}
        {activeTab === 'agenteOS' && <AgenteOSView />}
        {activeTab === 'propuestas' && <Propuestas />}
        {activeTab === 'googleMaps' && <CrmFullGoogleMaps />}
        {activeTab === 'domainManager' && <PublicDomainManagerPage />}
        {activeTab === 'campusLMS' && <CampusLMSView />}
        {activeTab === 'tiendaDigital' && <TiendaDigitalView />}
        {activeTab === 'industryLanding' && (
          <IndustryLandingPage
            onOpenWizard={() => setIsWizardOpen(true)}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onBackToHome={() => setActiveTab('dashboard')}
          />
        )}
        {activeTab === 'settings' && <SettingsView />}
        {activeTab === 'webmail' && <WebmailInboxView />}
      </main>

      {/* Overlays & Modals */}
      <RecordDrawer />
      <CommandPalette />
      <NewRecordModal />
      <AICopilotModal />
      <AuthModal />
      <ComposeEmailModal
        isOpen={isComposeEmailModalOpen}
        onClose={closeComposeEmailModal}
        initialDefaults={composeEmailDefaults}
      />
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <QuoteWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      <WhatsAppSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
      <ExpressAuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
      <ToastContainer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { isPublicSiteVisible, isAuthenticated, openPublicSite } = useCRM();

  // Treat the private workspace as protected even when an old session flag
  // requests app mode after the authentication state has expired or been cleared.
  React.useEffect(() => {
    if (!isPublicSiteVisible && !isAuthenticated) {
      openPublicSite();
    }
  }, [isPublicSiteVisible, isAuthenticated, openPublicSite]);

  if (isPublicSiteVisible || !isAuthenticated) {
    return (
      <div data-theme={resolvedTheme} className="min-h-screen w-screen overflow-x-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <PublicSite />
        <AuthModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div
      data-theme={resolvedTheme}
      className="flex h-screen w-screen overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <Sidebar />
      <MainContent />
    </div>
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
