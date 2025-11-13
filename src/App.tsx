import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from '@/store';

// Layout
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Pages
import Home from '@/pages/Home';
import News from '@/pages/News';
import Calendar from '@/pages/Calendar';
import Alerts from '@/pages/Alerts';
import Community from '@/pages/Community';
import Settings from '@/pages/Settings';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { isSidebarOpen } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <div className="flex flex-1">
            <Sidebar />

            <main
              className={`flex-1 transition-all duration-300 ${
                isSidebarOpen ? 'lg:ml-64' : 'ml-0'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </main>
          </div>

          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
