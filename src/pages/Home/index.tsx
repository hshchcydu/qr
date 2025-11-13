import MarketHero from '@/components/dashboard/MarketHero';
import QuickStats from '@/components/dashboard/QuickStats';
import BreakingNews from '@/components/dashboard/BreakingNews';
import TodayCalendar from '@/components/dashboard/TodayCalendar';
import TrendingTickers from '@/components/dashboard/TrendingTickers';
import PersonalFeed from '@/components/dashboard/PersonalFeed';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening in the markets today
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-5 h-5 animate-pulse text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" />
          </svg>
          <span>Live updates</span>
        </div>
      </div>

      {/* Market Hero Section */}
      <MarketHero />

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Breaking News */}
        <div className="lg:col-span-2 space-y-6">
          <BreakingNews />

          {/* Trending Tickers */}
          <TrendingTickers />
        </div>

        {/* Right Column - Calendar & Personal Feed */}
        <div className="lg:col-span-1 space-y-6">
          <TodayCalendar />
          <PersonalFeed />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-2 border-primary-200 dark:border-primary-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Get More from InvestNews
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set up custom alerts, join community discussions, and never miss important market events
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/alerts"
              className="btn-primary whitespace-nowrap"
            >
              Create Alert
            </a>
            <a
              href="/community"
              className="btn-secondary whitespace-nowrap"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
