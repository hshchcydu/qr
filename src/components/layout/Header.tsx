import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { SearchBar } from '@/components/search/SearchBar';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { Bookmark } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { toggleSidebar, user, theme, toggleTheme } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'News', path: '/news' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <header className="bg-white dark:bg-secondary-900 border-b border-gray-200 dark:border-secondary-700 sticky top-0 z-50 shadow-soft animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-positive-500 rounded-full border-2 border-white dark:border-secondary-900"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                SAVE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all text-gray-700 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Bookmarks */}
            <button
              onClick={() => navigate('/bookmarks')}
              className="hidden sm:block p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all text-gray-700 dark:text-gray-300"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="hidden sm:block">
              <NotificationCenter />
            </div>

            {/* User Profile */}
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {user ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.username || 'User'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>

            {/* Sidebar Toggle (Desktop) */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all text-gray-700 dark:text-gray-300"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-secondary-700 py-4 animate-slide-down">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
