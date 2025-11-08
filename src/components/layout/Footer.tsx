import { Link } from 'react-router-dom';
import { Mountain, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    pages: [
      { path: '/', label: '홈' },
      { path: '/attractions', label: '명소' },
      { path: '/culture', label: '문화' },
      { path: '/seasons', label: '계절' },
    ],
    info: [
      { path: '/transport', label: '교통' },
      { path: '/tips', label: '여행팁' },
      { path: '/about', label: 'About' },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <Mountain className="w-8 h-8" />
              <span className="text-xl font-bold">Discover Seoul</span>
            </Link>
            <p className="text-sm mb-4">
              서울의 아름다움을 발견하세요. 전통과 현대가 조화를 이루는 역동적인 도시,
              서울의 모든 것을 안내합니다.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-full bg-gray-800 hover:bg-korean-teal transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">주요 페이지</h3>
            <ul className="space-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-korean-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">정보</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-korean-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} Discover Seoul. Made with ❤️ for Seoul travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};
