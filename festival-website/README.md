# 🎪 Festival Website Clone - Snowfes.com Style

A beautiful, responsive festival website inspired by the Sapporo Snow Festival (snowfes.com) design, with an easy-to-use admin panel for content management.

## ✨ Features

- 🎨 **Beautiful Design**: Professional, modern UI inspired by snowfes.com
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Optimized performance with smooth animations
- 🛠️ **Easy Content Management**: Visual admin panel - no coding required!
- 🌐 **Multi-language Ready**: Language switcher built-in
- 🎯 **SEO Friendly**: Semantic HTML structure
- 💾 **JSON-based Config**: All content in one easy-to-manage file

## 📁 Project Structure

```
festival-website/
├── index.html              # Main website
├── config.json             # All content configuration
├── 사용설명서.md            # Korean user guide
├── README.md               # This file
├── admin/                  # Admin panel for content management
│   ├── index.html
│   ├── admin-style.css
│   └── admin-app.js
└── assets/
    ├── css/
    │   └── style.css       # Main stylesheet
    ├── js/
    │   └── app.js          # Main JavaScript
    └── images/             # Place your images here
```

## 🚀 Quick Start

### 1. View the Website

Simply open `index.html` in your web browser to see the festival website.

### 2. Edit Content (No Coding Required!)

1. Open `admin/index.html` in your browser
2. Use the visual interface to edit all content:
   - Festival information
   - Schedule and venues
   - News and announcements
   - Gallery images
   - Social media links
   - And more!
3. Click "💾 Save" to download the updated `config.json`
4. Replace the old `config.json` file with the new one
5. Refresh the website to see changes

### 3. Add Images

1. Place your images in the `assets/images/` folder
2. Reference them in the admin panel as: `assets/images/your-image.jpg`

## 📝 Content Sections

The website includes these customizable sections:

- **Hero Section**: Large banner with festival name and tagline
- **News Section**: Latest announcements and updates
- **Social Media**: Links to all your social platforms
- **Schedule Section**: Festival dates and venue information
- **About Section**: Festival introduction and history
- **Weather Section**: Weather information and recommendations
- **Gallery**: Photo gallery with captions
- **Access Section**: Transportation and directions
- **Footer**: Contact information and links

## 🎨 Customization

### Change Colors

Edit `assets/css/style.css`:

```css
:root {
    --primary-color: #0066cc;     /* Main color */
    --secondary-color: #00aaff;   /* Secondary color */
    --accent-color: #ff6b35;      /* Accent color */
}
```

### Change Fonts

Edit `assets/css/style.css`:

```css
body {
    font-family: 'Noto Sans KR', 'Roboto', sans-serif;
}
```

## 🌐 Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Sign up at [Netlify.com](https://netlify.com)
2. Drag and drop the `festival-website` folder
3. Get instant URL
4. Connect custom domain (optional)

### Option 3: Vercel (Free)

1. Sign up at [Vercel.com](https://vercel.com)
2. Import your project
3. Deploy with one click

### Option 4: Traditional Web Hosting

1. Purchase web hosting
2. Upload files via FTP
3. Connect your domain

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Dynamic content loading
- **No Framework**: Pure vanilla JavaScript
- **No Build Process**: Works immediately, no compilation needed

## 📊 Performance

- ⚡ Fast loading times
- 🎯 Optimized animations
- 📦 Minimal dependencies
- 🖼️ Image optimization ready

## 🎯 Use Cases

Perfect for:
- Music festivals
- Cultural events
- Food festivals
- Art exhibitions
- Community celebrations
- Trade shows
- Seasonal events

## 💡 Tips

1. **Backup regularly**: Save your `config.json` file frequently
2. **Test on mobile**: Always check how it looks on phones
3. **Optimize images**: Keep images under 1MB for best performance
4. **Use high-quality photos**: Images make a big difference
5. **Keep content updated**: Regular updates keep visitors engaged

## 🐛 Troubleshooting

**Changes not showing?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

**Images not displaying?**
- Check file path is correct
- Ensure images are in `assets/images/`
- Check file name (case-sensitive)

**Admin panel not working?**
- Make sure JavaScript is enabled
- Try a different browser
- Check browser console for errors

## 📚 Documentation

For detailed instructions in Korean, see `사용설명서.md`.

## 🤝 Contributing

This is a template project. Feel free to:
- Customize for your needs
- Share with others
- Improve and modify

## 📄 License

Free to use for any purpose. No attribution required.

## 🎉 Credits

Design inspired by the official Sapporo Snow Festival website (snowfes.com).

## 📮 Support

If you need help:
1. Check the user guide (`사용설명서.md`)
2. Review this README
3. Test in a different browser
4. Clear cache and try again

---

**Made with ❤️ for festival organizers who want a beautiful website without coding!**

## 🌟 Features Comparison with Snowfes.com

| Feature | Snowfes.com | This Template |
|---------|-------------|---------------|
| Responsive Design | ✅ | ✅ |
| Hero Section | ✅ | ✅ |
| News Section | ✅ | ✅ |
| Multiple Venues | ✅ | ✅ |
| Social Media Links | ✅ | ✅ |
| Smooth Animations | ✅ | ✅ |
| Language Switcher | ✅ | ✅ |
| **Admin Panel** | ❌ | ✅ |
| **Visual Editor** | ❌ | ✅ |
| **No Coding Required** | ❌ | ✅ |

---

**Ready to launch your festival website? Start editing now! 🎊**
