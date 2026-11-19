// CampusFix AI - Main Application Controller
(function () {
  'use strict';

  const { useState, useEffect, useCallback } = React;
  const {
    ToastContainer,
    Navbar,
    OverviewView,
    ReportFormView,
    DashboardView,
    HackathonTourModal,
    SettingsModal
  } = window.CampusFixComponents;

  function App() {
    // Determine active tab from URL hash or default to 'overview'
    const getInitialTab = () => {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'report', 'dashboard'].includes(hash)) {
        return hash;
      }
      return 'overview';
    };

    const [activeTab, setActiveTabState] = useState(getInitialTab);
    const [metrics, setMetrics] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0, urgent: 0 });
    const [toasts, setToasts] = useState([]);
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [presetToLoad, setPresetToLoad] = useState(null);

    // Sync active tab with browser hash
    const setActiveTab = useCallback((tab) => {
      setActiveTabState(tab);
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Listen for hash changes
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (['overview', 'report', 'dashboard'].includes(hash)) {
          setActiveTabState(hash);
        }
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Toast Manager
    const addToast = useCallback((toast) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 6);
      const newToast = { ...toast, id };
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toast.duration || 4500);
    }, []);

    const removeToast = useCallback((id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Refresh metrics on mount and when storage updates
    const refreshMetrics = useCallback(() => {
      if (window.CampusFixStorage) {
        setMetrics(window.CampusFixStorage.getMetrics());
      }
    }, []);

    useEffect(() => {
      refreshMetrics();
      const unsubscribe = window.CampusFixStorage.subscribe(() => {
        refreshMetrics();
      });
      return unsubscribe;
    }, [refreshMetrics]);

    // Handle 1-click Preset Trigger from Overview or Tour
    const handleTriggerDemoPreset = useCallback((preset) => {
      setPresetToLoad(preset);
      setActiveTab('report');
      addToast({
        type: 'info',
        title: 'Scenario Loaded',
        message: `Loaded: ${preset.label}. AI Triage preview running...`
      });
    }, [setActiveTab, addToast]);

    const handleReportCreated = useCallback((newReport) => {
      refreshMetrics();
    }, [refreshMetrics]);

    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          metrics={metrics}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'overview' && (
            <OverviewView
              setActiveTab={setActiveTab}
              metrics={metrics}
              onOpenTour={() => setIsTourOpen(true)}
              onTriggerDemoPreset={handleTriggerDemoPreset}
            />
          )}

          {activeTab === 'report' && (
            <ReportFormView
              setActiveTab={setActiveTab}
              onReportCreated={handleReportCreated}
              addToast={addToast}
              presetToLoad={presetToLoad}
              clearPresetToLoad={() => setPresetToLoad(null)}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              addToast={addToast}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-800">CampusFix AI</span>
              <span>— College Campus Facility Maintenance & Smart Triage System</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Demo Heuristic Engine Active
              </span>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="hover:text-indigo-600 transition"
              >
                Settings / Gemini API
              </button>
            </div>
          </div>
        </footer>

        {/* Interactive Hackathon Tour Modal */}
        <HackathonTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          setActiveTab={setActiveTab}
          onTriggerPreset={handleTriggerDemoPreset}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          addToast={addToast}
        />

        {/* Global Toast Notifications */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  // Render Root
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
})();
