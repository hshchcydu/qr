import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from '@/store';

// Layout (not lazy loaded as they're needed immediately)
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Common Components
import Toast from '@/components/common/Toast';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SEO, SEOProvider } from '@/components/common/SEO';

// New Components
import { Toaster } from '@/components/notifications/Toaster';
import { KeyboardShortcutsModal } from '@/components/keyboard/KeyboardShortcutsModal';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const News = lazy(() => import('@/pages/News'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const Alerts = lazy(() => import('@/pages/Alerts'));
const Community = lazy(() => import('@/pages/Community'));
const PostDetail = lazy(() => import('@/pages/PostDetail'));
const Settings = lazy(() => import('@/pages/Settings'));
const Search = lazy(() => import('@/pages/Search'));
const Bookmarks = lazy(() => import('@/pages/Bookmarks'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Inner component to use navigation hooks
function AppContent() {
  const navigate = useNavigate();
  const { isSidebarOpen, theme, setTheme } = useAppStore();
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Setup keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      action: () => navigate('/search'),
      description: 'Focus search',
      category: 'Navigation',
    },
    {
      key: '?',
      shiftKey: true,
      action: () => setShowShortcutsModal(true),
      description: 'Show help',
      category: 'General',
    },
    {
      key: 'Escape',
      action: () => setShowShortcutsModal(false),
      description: 'Close modal',
      category: 'General',
    },
    {
      key: 't',
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      description: 'Toggle theme',
      category: 'Settings',
    },
    {
      key: 'r',
      action: () => window.location.reload(),
      description: 'Refresh page',
      category: 'Actions',
    },
  ]);

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-secondary-900 transition-colors duration-300">
        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <main
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'lg:ml-72' : 'ml-0'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/community/:postId" element={<PostDetail />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>
          </main>
        </div>

        <Footer />
      </div>

      {/* Toast Notifications */}
      <Toast />
      <Toaster />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </>
  );
}

function App() {
  const { theme } = useAppStore();

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS variables for toast theming
    root.style.setProperty('--toast-bg', theme === 'dark' ? '#1f2937' : '#ffffff');
    root.style.setProperty('--toast-color', theme === 'dark' ? '#f9fafb' : '#111827');
    root.style.setProperty('--toast-border', theme === 'dark' ? '#374151' : '#e5e7eb');
  }, [theme]);

  return (
    <SEOProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppContent />
          </Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </SEOProvider>
  );
}

export default App;
