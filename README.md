# Editorial Split Portfolio

A sophisticated, editorial-style portfolio template featuring a fixed sidebar navigation and magazine-inspired layout. Perfect for creative directors, designers, and visual artists who appreciate minimal, timeless design.

## Features

- **Split-Screen Layout**: Fixed sidebar navigation with scrolling main content
- **Editorial Design**: Magazine-inspired typography and asymmetric layouts
- **Monochrome Palette**: Black, white, and grays with sophisticated gold accent
- **Serif + Sans Combination**: Libre Baskerville for headlines, Inter for body text
- **Timeline Layout**: Elegant work experience timeline with visual markers
- **Image-First Projects**: Large, impactful project showcase
- **Scroll Spy Navigation**: Active navigation states based on scroll position
- **JSON-Driven Content**: Easy content management through simple JSON files
- **Fully Responsive**: Mobile-first design that adapts beautifully
- **No Framework**: Built with vanilla HTML, CSS, and JavaScript

## Design Characteristics

- Editorial/magazine aesthetic
- Minimal and sophisticated
- Monochromatic color scheme
- Typography-focused design
- Large serif headlines
- Clean sans-serif body text
- Ample white space
- Asymmetric grid layouts
- Section numbering
- Fixed sidebar navigation
- Smooth scroll behavior
- Professional and timeless

## Color Palette

- **Black**: #0A0A0A (backgrounds, text)
- **White**: #FFFFFF (backgrounds, text)
- **Grays**: Various shades for hierarchy
- **Accent Gold**: #D4AF37 (sophisticated accent)
- **Monochrome**: Focus on typography and layout

## Typography

- **Display**: Libre Baskerville (serif) - Headlines and section titles
- **Body**: Inter (sans-serif) - Body text and UI elements
- **Contrast**: Serif/sans combination for editorial feel

## Layout Structure

### Sidebar (Fixed Left)
- Logo and tagline
- Navigation menu
- Social links
- Copyright

### Main Content (Scrollable Right)
1. **Hero**: Split-screen introduction with image
2. **About**: Grid layout with text and details
3. **Expertise**: Service cards with numbering
4. **Work**: Timeline-style experience section
5. **Projects**: Image-first project grid
6. **Contact**: Dark section with contact methods

## Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser
3. Customize the JSON files in the `data/` folder with your information
4. Modify colors in `assets/css/styles.css` if desired

## File Structure

```
editorial-split-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
└── data/
    ├── site-config.json
    ├── sidebar.json
    ├── hero.json
    ├── about.json
    ├── expertise.json
    ├── work.json
    ├── projects.json
    └── contact.json
```

## Customization

### Colors
Edit the CSS variables in `assets/css/styles.css`:
```css
:root {
    --black: #0A0A0A;
    --white: #FFFFFF;
    --accent: #D4AF37;
    /* Modify colors as needed */
}
```

### Typography
Change fonts by updating Google Fonts link in `index.html` and CSS variables:
```css
:root {
    --font-serif: 'Libre Baskerville', Georgia, serif;
    --font-sans: 'Inter', sans-serif;
}
```

### Sidebar Width
Adjust sidebar width:
```css
:root {
    --sidebar-width: 320px; /* Change as needed */
}
```

### Content
All content is managed through JSON files in the `data/` folder. Simply edit these files to update your portfolio content.

## Responsive Behavior

- **Desktop (>1024px)**: Split-screen layout with fixed sidebar
- **Tablet (768px-1024px)**: Adjusted layouts, maintained sidebar
- **Mobile (<768px)**: Sidebar becomes header, single column layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Perfect For

- Creative Directors
- Art Directors
- Designers
- Visual Artists
- Photographers
- Architects
- Anyone who appreciates editorial design

## License

Free to use for personal and commercial projects.

## Credits

Sample data features Aria Nakamura (fictional creative director)
Images from Unsplash
Fonts: Libre Baskerville and Inter from Google Fonts
