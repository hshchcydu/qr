import { Link } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';
import { useCalendarEvents } from '@/hooks/useCalendar';
import NewsCard from '@/components/news/NewsCard';
import EventCard from '@/components/calendar/EventCard';

const Home = () => {
  const { data: newsData, isLoading: newsLoading } = useNews(undefined, 1, 6);
  const { data: events, isLoading: eventsLoading } = useCalendarEvents();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to InvestNews
        </h1>
        <p className="text-xl mb-6 text-blue-100">
          Your trusted source for real-time investment news, market analysis, and financial insights.
        </p>
        <div className="flex gap-4">
          <Link to="/news" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Explore News
          </Link>
          <Link to="/calendar" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            View Calendar
          </Link>
        </div>
      </section>

      {/* Market Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">S&P 500</p>
              <p className="text-2xl font-bold text-gray-900">4,567.89</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 font-semibold">+0.5%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">NASDAQ</p>
              <p className="text-2xl font-bold text-gray-900">14,234.56</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 font-semibold">+0.8%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">DOW</p>
              <p className="text-2xl font-bold text-gray-900">35,678.12</p>
            </div>
            <div className="text-right">
              <span className="text-red-600 font-semibold">-0.2%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">BTC/USD</p>
              <p className="text-2xl font-bold text-gray-900">42,567</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 font-semibold">+2.1%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
          <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>

        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                <div className="bg-gray-200 h-4 w-20 rounded mb-2" />
                <div className="bg-gray-200 h-6 rounded mb-2" />
                <div className="bg-gray-200 h-4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData?.data.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <Link to="/calendar" className="text-primary-600 hover:text-primary-700 font-medium">
            View calendar →
          </Link>
        </div>

        {eventsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-6 rounded mb-4" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events?.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
