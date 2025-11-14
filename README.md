# Investment News Platform

A modern, full-featured investment news platform built with React, TypeScript, and TailwindCSS. Stay informed with real-time financial news, market analysis, economic calendar, price alerts, and a vibrant community forum for investors.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

## ⚠️ Important: Branch Information

**This project is actively developed on a feature branch. To use the complete application, you must check out the correct branch:**

```bash
# After cloning, checkout the development branch
git clone <repository-url>
cd qr
git checkout claude/investment-news-platform-011CV5M47ivHT4hqEfafZd5z
npm install
npm run dev
```

**Or set it as the default branch in your GitHub repository:**
1. Go to Settings → Branches
2. Change default branch to `claude/investment-news-platform-011CV5M47ivHT4hqEfafZd5z`

## ✨ Features

### Core Features
- **📰 Real-Time News**: Investment news with filtering by category, sentiment, tags, and sources
- **📅 Economic Calendar**: Track earnings, economic events, and market-moving announcements
- **🔔 Smart Alerts**: Custom alerts for prices, keywords, stocks, and economic indicators
- **💬 Community Forum**: Connect with investors, share insights, discuss markets
- **🔖 Bookmarks**: Save and organize articles, events, and posts with folders and tags
- **🔍 Fuzzy Search**: Powerful search across all content with recent history
- **📊 Data Visualization**: Interactive charts for market indices, sentiment, and news volume
- **🌙 Dark Mode**: Beautiful dark theme with system preference detection

### Advanced Features
- **⌨️ Keyboard Shortcuts**: Navigate efficiently with hotkeys (press `?` to see all)
- **🔔 Notifications**: Toast and browser push notifications with Do Not Disturb mode
- **📱 PWA**: Installable as mobile/desktop app with offline support
- **📤 Export**: Download calendar as ICS, news as PDF, share to social media
- **⚡ Performance**: Lazy loading, code splitting, optimized bundles (~600KB gzipped)
- **♿ Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **🔒 Security**: Security headers, XSS protection, content security policy

## 🚀 Tech Stack

### Core
- **React 19** - Latest UI framework with concurrent features
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS v3** - Utility-first CSS framework

### State & Data
- **Zustand** - Lightweight state management with persistence
- **React Query** - Server state management and caching
- **React Router v7** - Client-side routing

### UI & UX
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library
- **React Hot Toast** - Toast notifications
- **React Helmet Async** - SEO meta tags

### Features
- **Fuse.js** - Fuzzy search
- **jsPDF** - PDF generation
- **ICS** - Calendar export

### Performance & PWA
- **Vite PWA** - Progressive Web App support with Workbox
- **Code Splitting** - Lazy loading for optimal performance
- **React Virtual** - Virtualized lists for long feeds

## 📁 Project Structure

```
/src
  /components
    /layout           - Header, Sidebar, Footer
    /common           - ErrorBoundary, SEO, LazyImage
    /news             - NewsFeed, NewsCard, NewsFilter
    /calendar         - Calendar, EventCard
    /alerts           - AlertSettings, AlertCard, AlertHistory
    /community        - PostList, PostCard, CommentSection
    /dashboard        - MarketHero, TrendingTickers, QuickStats
    /search           - SearchBar, SearchResults
    /bookmarks        - BookmarkButton, BookmarksList
    /notifications    - NotificationCenter, Toaster
    /charts           - MarketIndicesChart, NewsVolumeChart, SentimentChart
    /keyboard         - KeyboardShortcutsModal
  /pages
    /Home             - Dashboard with live market data
    /News             - News feed with advanced filters
    /Calendar         - Economic calendar with events
    /Alerts           - Alert management (keyword, stock, economic, schedule)
    /Community        - Community forum with posts and comments
    /PostDetail       - Individual post with nested comments
    /Search           - Global search with filters
    /Bookmarks        - Saved items with folders and tags
    /Settings         - User preferences
    /NotFound         - 404 error page
  /hooks              - Custom React hooks (useRealTimePrice, useKeyboardShortcuts, etc.)
  /services           - API services (newsService, calendarService, alertService)
  /stores             - Zustand stores (searchStore, bookmarksStore, notificationsStore)
  /types              - TypeScript type definitions
  /utils              - Utilities (formatters, performance, analytics, export)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- Git for version control

### Installation

1. **Clone the repository and checkout the development branch:**
```bash
git clone <repository-url>
cd qr
git checkout claude/investment-news-platform-011CV5M47ivHT4hqEfafZd5z
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Configure your `.env` file:**
```env
VITE_APP_NAME=Investment News Platform
VITE_APP_URL=http://localhost:3000
VITE_API_URL=https://api.yourapp.com
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at **`http://localhost:3000`**

### Build for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `?` | Show keyboard shortcuts help |
| `t` | Toggle dark/light theme |
| `r` | Refresh page |
| `Esc` | Close modal/dialog |
| `j` | Next item (Vim-style) |
| `k` | Previous item (Vim-style) |

Press `?` in the app to see all available shortcuts!

## 🎨 Customization

### Theming

The application uses TailwindCSS for styling. Customize the theme in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... your custom colors
      },
    },
  },
}
```

### Components

All components are modular and can be easily customized. They are located in the `/src/components` directory, organized by feature.

## 📊 Performance

### Bundle Analysis
- **Total size**: ~2 MB (pre-gzip) → **~600 KB (gzipped)**
- **Code splitting**: Separate chunks for React, Charts, UI, and Store
- **Lazy loading**: Routes loaded on demand
- **Image optimization**: Lazy loading with Intersection Observer
- **PWA caching**: 28 precached entries (~2 MB)

### Performance Metrics (Target)
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s

## 🚀 Deployment

The application is production-ready and can be deployed to:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Manual Deployment
```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📱 PWA Features

- ✅ **Offline support** with service workers
- ✅ **Add to home screen** on mobile and desktop
- ✅ **Cache-first** strategy for images (30 days)
- ✅ **Network-first** strategy for API calls (5 min cache)
- ✅ **Background sync** for offline actions
- ✅ **App manifest** with icons and theme colors

## 🔒 Security

- **Security headers**: X-Frame-Options, CSP, XSS Protection
- **HTTPS enforcement** in production
- **Environment variables** for sensitive data
- **Content Security Policy**
- **Permissions policy** for privacy
- **Input sanitization**

## 🏗️ Architecture & Best Practices

- **Clean Architecture**: Components organized by feature and responsibility
- **Type Safety**: Full TypeScript support with strict mode
- **Reusable Components**: Modular, composable components
- **State Management**:
  - Zustand for global UI state
  - React Query for server state
  - Context API for theme and preferences
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Performance**:
  - Code splitting and lazy loading
  - Image optimization
  - Debouncing and throttling
  - Memoization of expensive computations
- **Error Handling**: Error boundaries with recovery UI
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **SEO**: Dynamic meta tags, Open Graph, Twitter Cards
- **Testing**: Ready for unit and integration tests

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Comprehensive deployment guide
- [.env.example](./.env.example) - Environment variables template

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern React ecosystem
- Inspired by financial news platforms
- Icons by Lucide React
- Charts by Recharts

---

**Made with ❤️ for investors by investors**
