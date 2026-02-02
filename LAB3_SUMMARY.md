# Lab 3 Alternative Design - Summary

## What Was Created

A completely alternative design for the grocery website with different UI patterns, components, and navigation structures.

## Key Differences from Lab 2

| Feature | Lab 2 | Lab 3 Alternative |
|---------|-------|-------------------|
| **Navigation** | Top horizontal nav bar | Left sidebar navigation |
| **Layout** | Horizontal slider (3 zones) | Dashboard layout (sidebar + main) |
| **Login** | Inline form in page | Modal dialog popup |
| **Preferences** | Inline form in page | Modal dialog popup |
| **Product View** | Single grid view | Tabbed categories (All, Vegetables, Proteins, Grains, Dairy) |
| **Filters** | Always visible form | Collapsible accordion component |
| **Cart Display** | Simple list | Enhanced list with better formatting |
| **Mobile** | Horizontal scroll | Collapsible sidebar |

## UI Patterns & Components Implemented

### 1. Sidebar Navigation Pattern
- Fixed left sidebar with navigation items
- Active state highlighting
- Cart badge with item count
- Responsive (hides on mobile, toggle button)

### 2. Modal Dialog Component
- Login modal with overlay background
- Preferences modal
- Click outside to close
- Smooth fade and slide animations
- Close button (X)

### 3. Tab Navigation Component
- Product category tabs
- Active tab styling
- Smooth transitions between tabs
- Filter products by category

### 4. Accordion Component
- Collapsible filter section
- Expand/collapse animation
- Icon indicators (▼ when closed, ▲ when open)
- Smooth height transitions

### 5. Card Component
- Product cards with hover effects
- Image, name, price display
- Quantity controls integrated
- Shadow and elevation effects

### 6. Dashboard Layout Pattern
- Sidebar + main content area
- Fixed footer
- Responsive margins
- Clean separation of navigation and content

## Features Maintained

✅ All 10 products with images  
✅ Dietary restriction filtering  
✅ Organic/non-organic preference  
✅ Price sorting (ascending)  
✅ Cart functionality  
✅ User profiles (Lucie, Eric)  
✅ Large text accessibility mode  
✅ Dynamic product rendering  

## Files Created

- `index.html` - Alternative HTML structure
- `css/style.css` - Complete styling for alternative design
- `js/app.js` - Application logic for alternative UI patterns
- `js/products.js` - Product data (copied from Lab 2)
- `README.md` - Documentation
- `LAB3_SUMMARY.md` - This summary

## How to Test

1. Open `lab3-alternative/index.html` in a browser
2. Test sidebar navigation
3. Open login modal (try "lucie" or "eric")
4. Open preferences modal
5. Test accordion (expand/collapse filters)
6. Switch between product category tabs
7. Add items to cart
8. View cart with sorted items
9. Test responsive design (resize browser)

## Next Steps

1. Create a new GitHub repository for Lab 3
2. Copy the `lab3-alternative` folder contents to the new repo
3. Deploy to GitHub Pages
4. Take screenshots for submission
5. Write contribution descriptions
