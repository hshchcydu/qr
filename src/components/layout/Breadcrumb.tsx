import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const pathNames: Record<string, string> = {
  attractions: '명소',
  culture: '문화',
  seasons: '계절',
  transport: '교통',
  tips: '여행팁',
  about: 'About',
};

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((x) => x);

  if (pathSegments.length === 0) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav className="bg-gray-50 py-3 border-b border-gray-200">
      <div className="container-custom">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-korean-teal transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const label = pathNames[segment] || decodeURIComponent(segment);

            return (
              <li key={path} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="text-korean-teal font-medium">{label}</span>
                ) : (
                  <Link
                    to={path}
                    className="text-gray-600 hover:text-korean-teal transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
