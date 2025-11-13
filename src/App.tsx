import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from '@/store';

// Layout
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Common Components
import Toast from '@/components/common/Toast';

// New Components
import { Toaster } from '@/components/notifications/Toaster';
import { KeyboardShortcutsModal } from '@/components/keyboard/KeyboardShortcutsModal';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

// Pages
import Home from '@/pages/Home';
import News from '@/pages/News';
import Calendar from '@/pages/Calendar';
import Alerts from '@/pages/Alerts';
import Community from '@/pages/Community';
import PostDetail from '@/pages/PostDetail';
import Settings from '@/pages/Settings';
import Search from '@/pages/Search';
import Bookmarks from '@/pages/Bookmarks';

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
              </Routes>
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
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
