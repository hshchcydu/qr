# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Environment Variables

Copy `.env.example` to `.env` and configure your environment:

```bash
cp .env.example .env
```

### Required Variables

- `VITE_APP_NAME`: Application name
- `VITE_APP_URL`: Production URL
- `VITE_API_URL`: API endpoint URL
- `VITE_GA_TRACKING_ID`: Google Analytics tracking ID (optional)

## Build for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

Or drag and drop the `dist` folder to Netlify's web interface.

### Option 3: Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Upload the `dist` folder to your hosting provider (AWS S3, DigitalOcean, etc.)

3. Configure your server to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable gzip compression
   - Set appropriate cache headers
   - Enable HTTPS

## Post-Deployment

### 1. Verify PWA Installation

- Open Chrome DevTools → Application → Manifest
- Check service worker registration
- Test "Add to Home Screen" functionality

### 2. Test Performance

- Run Lighthouse audit (Chrome DevTools)
- Check Core Web Vitals
- Test on mobile devices

### 3. Monitor Analytics

- Verify Google Analytics tracking
- Check error reporting
- Monitor page load times

### 4. SEO Verification

- Submit sitemap to Google Search Console
- Verify Open Graph tags with Facebook Debugger
- Test Twitter Card with Twitter Card Validator

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Configure DNS or use Netlify DNS

## Performance Optimization Checklist

- [ ] Enable gzip/brotli compression
- [ ] Configure CDN for static assets
- [ ] Set cache headers for images and fonts
- [ ] Enable HTTP/2
- [ ] Configure CORS if needed
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Configure rate limiting for API
- [ ] Enable security headers

## Troubleshooting

### Build Fails

- Check Node.js version (must be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Routes Not Working (404 on Refresh)

- Ensure server is configured for SPA routing
- Check `vercel.json` or `netlify.toml` configuration
- For Apache: Add `.htaccess` with rewrite rules
- For Nginx: Configure `try_files` directive

### PWA Not Installing

- Verify manifest.json is served correctly
- Check service worker registration
- Ensure HTTPS is enabled
- Clear browser cache and service workers

## Continuous Integration

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Security Considerations

- Never commit `.env` files
- Use environment variables for sensitive data
- Enable security headers (CSP, HSTS, etc.)
- Regularly update dependencies
- Use HTTPS only
- Implement rate limiting
- Sanitize user input

## Monitoring & Analytics

### Google Analytics Setup

1. Create GA4 property
2. Add tracking ID to `.env`
3. Verify tracking in GA dashboard

### Error Monitoring (Optional)

1. Sign up for Sentry
2. Add Sentry DSN to `.env`
3. Configure error boundaries

## Performance Metrics

Target metrics:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s

## Rollback Strategy

If deployment fails:

1. Revert to previous deployment in hosting dashboard
2. Or rollback Git commit and redeploy
3. Check logs for error details

## Support

For issues or questions:
- Check project documentation
- Review GitHub issues
- Contact support team

---

Last updated: 2025-01-13
