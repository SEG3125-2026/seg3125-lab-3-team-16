# Lab 3 - Alternative Design

## Overview
This is an alternative design for the online grocery website created in Lab 2. It implements different UI patterns, components, and navigation structures while maintaining the same core functionality.

## Design Differences from Lab 2

### Lab 2 Design:
- Horizontal slider navigation (3 zones side by side)
- Top navigation bar with buttons
- Inline forms for login and preferences
- Single-page layout with sliding sections
- Grid layout for products

### Lab 3 Alternative Design:
- **Sidebar Navigation** - Fixed left sidebar instead of top navigation
- **Modal Dialogs** - Login and preferences in popup modals instead of inline forms
- **Tab Navigation** - Product categories in tabs instead of single view
- **Accordion Component** - Collapsible filter section
- **Dashboard Layout** - Different structural pattern with sidebar + main content area

## UI Components Implemented

1. **Sidebar Navigation Pattern**
   - Fixed left sidebar with navigation items
   - Active state indicators
   - Responsive (collapsible on mobile)
   - Cart badge showing item count

2. **Modal Dialogs**
   - Login modal with overlay
   - Preferences modal
   - Click outside to close
   - Smooth animations

3. **Tab Component**
   - Product category tabs (All, Vegetables, Proteins, Grains, Dairy)
   - Active tab highlighting
   - Smooth transitions

4. **Accordion Component**
   - Collapsible filter section
   - Expand/collapse animation
   - Icon indicators (▼/▲)

5. **Product Cards**
   - Card-based layout
   - Hover effects
   - Image, name, price display
   - Quantity controls

6. **Cart Display**
   - List-based cart items
   - Item totals calculation
   - Price sorting
   - Clear cart functionality

## Features Maintained

- All 10 products with images
- Dietary restriction filtering (vegetarian, vegan, gluten-free, lactose-free, diabetic, budget-friendly)
- Organic/non-organic preference
- Price sorting (always sorted by price ascending)
- Cart functionality with quantity management
- User profiles (Lucie, Eric) with auto-filled preferences
- Large text mode for accessibility
- Dynamic product rendering

## File Structure

```
lab3-alternative/
├── index.html          # Main HTML with alternative layout
├── css/
│   └── style.css       # Styles for alternative design
├── js/
│   ├── products.js     # Product data (shared from Lab 2)
│   └── app.js          # Application logic for alternative design
├── img/                # Product images
└── README.md           # This file
```

## How to Use

1. Open `index.html` in a web browser
2. Use the sidebar to navigate between Products and Cart
3. Click "Login" to open the login modal (try "lucie" or "eric")
4. Click "Preferences" to open preferences modal
5. Use the accordion to expand/collapse filters
6. Switch between product category tabs
7. Add items to cart and view in Cart section

## Technical Notes

- All products are dynamically rendered from JavaScript
- Products are always sorted by price (ascending)
- Cart items are sorted by price
- Filters work in combination (multiple dietary restrictions)
- Responsive design for mobile devices
- Sidebar collapses on mobile screens

## Code Attribution

This alternative design was created as part of Lab 3 requirements. The product data structure and filtering logic are based on the Lab 2 implementation, but all UI patterns, components, and layout structures are completely different.
