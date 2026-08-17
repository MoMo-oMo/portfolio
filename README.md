# 🌌 Myk's Space-Themed Portfolio

A stunning personal portfolio website with a cosmic theme, built with **Vue 3** and **TailwindCSS**.

## ✨ Features

- **Space-Themed Design**: Black and deep purple color palette with neon accents (purple, magenta, blue)
- **Animated Starfield Background**: Dynamic canvas-based starfield with twinkling stars
- **Vertical Navigation**: Sleek vertical navbar with glowing active indicators
- **Smooth Animations**: CSS and Vue transitions for fluid animations and hover effects
- **Fully Responsive**: Optimized for both mobile and desktop viewing
- **Modern Typography**: Uses Orbitron and Poppins fonts for a futuristic look

## 🚀 Sections

1. **Home**: Bold welcome message with glowing CTA button
2. **About**: Personal bio with animated profile image and glowing borders
3. **Projects**: Card grid showcasing projects with tech stack icons
4. **Skills**: Animated progress bars with galaxy-style gradients
5. **Contact**: Contact form with glowing social media links

## 🛠️ Technologies Used

- Vue 3 (Composition API)
- TailwindCSS
- Canvas API (for starfield animation)
- CSS Animations

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the cosmic color palette:
```javascript
colors: {
  cosmic: {
    dark: '#0a0a0f',
    purple: '#1a0b2e',
    // ... more colors
  }
}
```

### Fonts
Change fonts in `index.html` and `tailwind.config.js`.

### Content
Update the placeholder content in each view:
- `src/views/Home.vue` - Welcome message
- `src/views/About.vue` - Bio text
- `src/views/Projects.vue` - Project details
- `src/views/Skills.vue` - Skills and levels
- `src/views/Contact.vue` - Contact information and social links

## 🌟 Features Breakdown

### Starfield Background
- Canvas-based animation with 200 twinkling stars
- Slow drift animation for depth effect
- Nebula gradient overlay

### Navigation
- Vertical layout on the left side
- Smooth scroll to sections
- Glowing active state indicators
- Icon-based menu items with SVG icons

### Animations
- Page section fade-ins with CSS animations
- Hover scale effects
- Glowing borders and text shadows
- Floating particles
- Progress bar animations
- Form input focus effects

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Deployment

You can deploy this portfolio to various platforms:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm run deploy
```

## 📄 License

This project is open source and available under the MIT License.

## 🌠 Credits

Created with ❤️ by Myk

---

⭐ Don't forget to star this repo if you found it helpful!
