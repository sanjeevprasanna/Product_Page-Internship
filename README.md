# Shopify-Style Product Page

A fully responsive, vanilla HTML/CSS/JavaScript implementation of a Shopify-style product page with all required e-commerce features.
<img width="1440" alt="Screenshot 2025-05-10 at 11 48 38 PM" src="https://github.com/user-attachments/assets/2a3ccfc2-813b-430f-9d01-115a40322470" />

<img width="1440" alt="Screenshot 2025-05-10 at 11 48 56 PM" src="https://github.com/user-attachments/assets/0334f6cf-bef6-4c1b-8a8c-a87a32f093f1" />

<img width="1440" alt="Screenshot 2025-05-10 at 11 49 06 PM" src="https://github.com/user-attachments/assets/7d72a602-cfde-4a01-b30c-a9b5ed5ed42a" />

## 📝 Overview

This project is a comprehensive implementation of a responsive e-commerce product page that mimics the functionality and design of a typical Shopify storefront. The implementation uses only vanilla HTML, CSS, and JavaScript without any external libraries or frameworks.

## ✨ Features Implemented

### 1. Scrollable Product Images Gallery
- Vertical thumbnail gallery with main image display
- Clicking thumbnails updates the main product image
- Thumbnails become scrollable when there are more than 5 images
- Current thumbnail has active state indicator

### 2. Size Chart Modal
- "Size Chart" button opens a modal with size information
- Modal can be dismissed by:
  - Clicking the close button
  - Pressing the ESC key
  - Clicking outside the modal
- Fully accessible implementation with focus management

### 3. Product Variants
- Color options displayed as visual swatches
- Size options shown as selectable buttons
- Visual indication of selected variants
- Selection state persists in localStorage

### 4. Compare Colors Feature
- "Compare Colors" button opens interactive color comparison modal
- Users can select multiple colors to compare side-by-side
- Comparison modal includes color names and visual representation

### 5. "Pairs Well With" Section
- Horizontally scrollable carousel of complementary products
- Each product includes image, title, price, and "Add to Cart" button
- Navigation arrows for desktop users
- Touch-friendly swipe navigation on mobile

### 6. Product Bundle Suggestion
- "Complete the Look" bundle section with multiple related products
- Individual and bundle pricing with visual savings indicator
- Single-click "Add Bundle to Cart" button

### 7. Product Information Tabs
- Three interactive tabs:
  - Description
  - Product Information
  - Shipping Details
- Tab content toggles visibility without page reload
- Active tab state visually indicated

### 8. Related Products Section
- Grid display of related products (4 items)
- Responsive layout that adapts to screen size
- Product badges (NEW, BESTSELLER, SALE)
- Consistent product card design

### 9. Bonus Features
- Image zoom on hover for main product image
- LocalStorage persistence for selected variants
- Micro-interactions and animations:
  - Smooth tab transitions
  - Hover effects on buttons
  - Fade-in animations for modals
  - Smooth scrolling for carousels

## 💻 Technical Details

### Responsive Design
- Mobile-first approach with breakpoints for:
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)
- Flexible layouts using CSS Grid and Flexbox
- Fluid typography and spacing

### Performance Optimizations
- Lazy loading for images
- Efficient DOM manipulation
- Event delegation for improved interactivity
- Throttled event handlers for scroll/resize events

### Accessibility Features
- Semantic HTML5 structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Focus management for modals
- Screen reader-friendly implementation

## 🗂️ Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── main.css            # Main stylesheet
│   ├── product.css         # Product page specific styles
│   ├── modal.css           # Modal/popup styles
│   ├── carousel.css        # Carousel components styles
│   └── responsive.css      # Media queries for responsiveness
├── js/
│   ├── main.js             # Core JavaScript functionality
│   ├── product-gallery.js  # Product image gallery logic
│   ├── variants.js         # Product variants selection logic
│   ├── tabs.js             # Product information tabs logic
│   ├── modals.js           # Modal windows functionality
│   ├── carousel.js         # Carousel/slider functionality
│   └── storage.js          # Local storage management
└── assets/
    ├── images/             # Product and UI images
    ├── icons/              # UI icons and SVGs
    └── placeholders/       # Placeholder images
```

## 🚀 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/sanjeevprasanna/Product_Page-Internship.git
```

2. Navigate to the project directory:
```bash
cd Product_Page-Internship
```

3. Open `index.html` in your browser:
   - You can use a local development server like Live Server for VS Code
   - Or simply open the file directly in your browser

No build process or dependencies are required as this is a vanilla HTML/CSS/JavaScript project.

## 🧪 Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🔍 Code Quality

- Well-commented code with clear documentation
- Modular JavaScript with separation of concerns
- BEM methodology for CSS class naming
- Consistent code formatting and style
- Descriptive variable and function names

## 📱 Mobile Experience

Special attention was given to the mobile experience:
- Touch-friendly controls
- Appropriate control sizes
- Optimized layouts for small screens
- Performance considerations for mobile devices

## 🛠️ Future Improvements

- Add unit tests for JavaScript functionality
- Implement more advanced image zoom functionality
- Add internationalization support
- Improve animation performance
- Add more product variants and options

## 📄 License

MIT License - Feel free to use and modify as needed.
