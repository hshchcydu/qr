# Investment News Platform

A modern, full-featured investment news platform built with React, TypeScript, and TailwindCSS. Similar to SaveTicker, this platform provides real-time financial news, market analysis, economic calendar, price alerts, and a community forum for investors.

## Features

- **Latest News**: Real-time investment news with filtering by category, sentiment, and tags
- **Economic Calendar**: Track important economic events, earnings, and market-moving announcements
- **Price Alerts**: Set custom alerts for price movements and market events
- **Community Forum**: Connect with fellow investors, share insights, and discuss markets
- **Modern UI**: Clean, responsive design with TailwindCSS
- **Type-Safe**: Built with TypeScript for better developer experience

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **date-fns** - Date utilities

## Project Structure

```
/src
  /components
    /layout       - Header, Sidebar, Footer
    /news         - NewsFeed, NewsCard, NewsFilter
    /calendar     - Calendar, EventCard
    /alerts       - AlertSettings, AlertCard
    /community    - PostList, PostCard, CommentSection
  /pages
    /Home         - Dashboard with overview
    /News         - News feed with filters
    /Calendar     - Economic calendar
    /Alerts       - Price alerts management
    /Community    - Community forum
    /Settings     - User settings
  /hooks          - Custom React hooks
  /services       - API services
  /store          - Zustand store
  /types          - TypeScript types
  /utils          - Utility functions
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API configuration.

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

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
npm run lint
```

## API Integration

The application is designed to work with a backend API. Update the `VITE_API_BASE_URL` in your `.env` file to point to your API server.

### API Endpoints Expected

- `GET /news` - Fetch news articles with filters
- `GET /news/:id` - Get single news article
- `GET /calendar` - Fetch calendar events
- `GET /alerts` - Get user alerts
- `POST /alerts` - Create new alert
- `PUT /alerts/:id` - Update alert
- `DELETE /alerts/:id` - Delete alert
- `GET /community/posts` - Fetch community posts
- `POST /community/posts` - Create new post
- `GET /community/posts/:id/comments` - Get post comments

## Customization

### Theming

The application uses TailwindCSS for styling. You can customize the theme in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      },
    },
  },
}
```

### Components

All components are modular and can be easily customized. They are located in the `/src/components` directory.

## Best Practices

- **Clean Architecture**: Components are organized by feature
- **Type Safety**: Full TypeScript support with proper typing
- **Reusable Components**: Components are designed to be reusable
- **State Management**: Zustand for global state, React Query for server state
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Performance**: Optimized with code splitting and lazy loading

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
