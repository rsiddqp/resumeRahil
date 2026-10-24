# Rahil Siddique - Portfolio Website

Modern, interactive portfolio website showcasing software engineering expertise, AI/ML specialization, and professional journey.

## Features

- **3D Interactive Background**: Ready for Spline 3D scene integration
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Fast loading with lazy loading and efficient rendering
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Dark Theme**: Professional dark color scheme with gradient accents

## Spline Integration

The website is designed with Spline 3D integration in mind. To add your Spline scenes:

1. Create your 3D scene at [spline.design](https://spline.design)
2. Export and get your scene URL
3. Replace the placeholder comments in `index.html`:

```html
<!-- Hero 3D Background -->
<div class="spline-container" id="hero-3d">
  <spline-viewer url="YOUR-SPLINE-SCENE-URL"></spline-viewer>
</div>

<!-- Work Section 3D Visual -->
<div class="spline-work-container">
  <spline-viewer url="YOUR-WORK-SCENE-URL"></spline-viewer>
</div>
```

## Structure

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with CSS variables
- `script.js` - Interactive features and animations
- `resume.md` - Original resume content

## Sections

1. **Hero** - Eye-catching introduction with 3D background
2. **Expertise** - Technical skills and core competencies
3. **Current Work** - Highlighted current position at Zuzis
4. **Journey** - Professional timeline with all positions
5. **Contact** - Multiple contact methods and engagement types

## Technologies

- HTML5 with semantic markup
- CSS3 with modern features (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (no dependencies)
- Spline Runtime for 3D scenes
- Google Fonts (Inter, Space Grotesk)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  /* ... more variables */
}
```

### Content
Update content directly in `index.html` or reference `resume.md` for the source data.

## Performance

- Intersection Observer for efficient animations
- Passive event listeners for smooth scrolling
- CSS containment for layout optimization
- Preloading critical resources

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Development

Simply open `index.html` in a browser or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## Deployment

Upload all files to your web host or deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

---

**Contact**: mdrahil@gmail.com | +61 431 864 419 | Melbourne, VIC
