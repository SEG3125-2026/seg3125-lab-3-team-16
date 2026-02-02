// Alternative Design - Lab 3 Application Logic
// Different UI patterns: Sidebar, Modals, Tabs, Accordion

let currentTab = 'all';
let cart = [];
let currentUser = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  updateCartBadge();
  loadUserPreferences();
});

// Sidebar Navigation Functions
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionName + '-section').classList.add('active');
  
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  event.target.closest('.nav-item').classList.add('active');
  
  // Update cart if showing cart section
  if (sectionName === 'cart') {
    renderCart();
  }
  
  // Close sidebar on mobile after selection
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

// Modal Functions
function openLoginModal() {
  document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('show');
}

function openPreferencesModal() {
  document.getElementById('preferencesModal').classList.add('show');
}

function closePreferencesModal() {
  document.getElementById('preferencesModal').classList.remove('show');
}

// Close modals when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const prefModal = document.getElementById('preferencesModal');
  
  if (event.target === loginModal) {
    closeLoginModal();
  }
  if (event.target === prefModal) {
    closePreferencesModal();
  }
}

// Login Handler
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  
  if (!username) {
    alert('Please enter a username');
    return;
  }
  
  currentUser = username.toLowerCase();
  let greeting = 'Hello ' + username + '!';
  
  // Auto-fill preferences for demo users
  if (currentUser === 'lucie') {
    document.querySelector('input[value="vegetarian"]').checked = true;
    document.querySelector('input[value="expense"]').checked = true;
    document.querySelector('input[value="na"]').checked = true;
    document.querySelector('#visionToggle').checked = true;
    toggleLargeText();
    greeting = 'Hi Lucie! Your preferences have been set.';
  } else if (currentUser === 'eric') {
    document.querySelector('input[value="gluten"]').checked = true;
    document.querySelector('input[value="organic"]').checked = true;
    greeting = 'Hi Eric! Your preferences have been set.';
  }
  
  alert(greeting);
  closeLoginModal();
  applyFilters();
}

// Preferences Handler
function handlePreferences(event) {
  event.preventDefault();
  applyFilters();
  closePreferencesModal();
  alert('Preferences saved!');
}

// Accordion Component
function toggleAccordion(accordionId) {
  const content = document.getElementById(accordionId);
  const icon = document.getElementById(accordionId + 'Icon');
  
  content.classList.toggle('open');
  icon.textContent = content.classList.contains('open') ? '▲' : '▼';
}

// Tab Navigation
function switchTab(tabName) {
  currentTab = tabName;
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Render products for selected tab
  renderProducts();
}

// Get products by category
function getProductsByCategory(category) {
  const allProducts = getProductsSortedByPrice();
  
  if (category === 'all') {
    return allProducts;
  }
  
  const categoryMap = {
    'vegetables': ['Carrots', 'Broccoli', 'Apples'],
    'proteins': ['Chicken Breast', 'Salmon Fillet', 'Organic Eggs'],
    'grains': ['Whole Wheat Bread', 'White Rice', 'Gluten-Free Bread'],
    'dairy': ['Milk']
  };
  
  return allProducts.filter(product => 
    categoryMap[category]?.includes(product.name)
  );
}

// Filter Products
function applyFilters() {
  const checkedDiets = Array.from(
    document.querySelectorAll('input[name="diet"]:checked')
  ).map(input => input.value);
  
  const organicChoice = document.querySelector('input[name="organic"]:checked')?.value || 'na';
  
  let filtered = filterProducts(checkedDiets, organicChoice);
  
  // Apply category filter
  if (currentTab !== 'all') {
    const categoryProducts = getProductsByCategory(currentTab);
    filtered = filtered.filter(p => categoryProducts.includes(p));
  }
  
  renderProducts(filtered);
}

// Render Products
function renderProducts(products = null) {
  const container = document.getElementById('productsContainer');
  
  if (!products) {
    products = getProductsByCategory(currentTab);
  }
  
  // Always sort by price
  products = products.sort((a, b) => a.price - b.price);
  
  if (products.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">No products found matching your filters.</p>';
    return;
  }
  
  container.innerHTML = products.map(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    
    let buttonHTML;
    if (quantity === 0) {
      buttonHTML = `<button class="action-btn" onclick="addToCart(${product.id})">Add to Cart</button>`;
    } else {
      buttonHTML = `
        <button class="action-btn secondary" onclick="removeFromCart(${product.id})">-</button>
        <span style="padding: 0 0.5rem; font-weight: 600;">${quantity}</span>
        <button class="action-btn secondary" onclick="addToCart(${product.id})">+</button>
      `;
    }
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <div class="buttons">${buttonHTML}</div>
      </div>
    `;
  }).join('');
}

// Cart Functions
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  updateCartBadge();
  renderProducts();
  
  // Show cart section if not already visible
  if (!document.getElementById('cart-section').classList.contains('active')) {
    showSection('cart');
  } else {
    renderCart();
  }
}

function removeFromCart(productId) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }
  
  updateCartBadge();
  renderProducts();
  renderCart();
}

function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    updateCartBadge();
    renderProducts();
    renderCart();
  }
}

function renderCart() {
  const container = document.getElementById('cartContainer');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
        <button class="action-btn" onclick="showSection('products')">Start Shopping</button>
      </div>
    `;
    return;
  }
  
  // Sort cart by price
  const sortedCart = [...cart].sort((a, b) => a.price - b.price);
  
  let total = 0;
  const cartHTML = sortedCart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)} each</p>
        </div>
        <div class="cart-item-controls">
          <button class="action-btn secondary" onclick="removeFromCart(${item.id})">-</button>
          <span style="padding: 0 1rem; font-weight: 600;">${item.quantity}</span>
          <button class="action-btn secondary" onclick="addToCart(${item.id})">+</button>
          <span style="margin-left: 1rem; font-weight: 600; min-width: 80px; text-align: right;">
            $${itemTotal.toFixed(2)}
          </span>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = cartHTML + `
    <div class="cart-total">
      <span>Total:</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

// Accessibility - Large Text Toggle
function toggleLargeText() {
  const checkbox = document.getElementById('visionToggle') || document.getElementById('modalVisionToggle');
  if (checkbox) {
    document.body.classList.toggle('large-text', checkbox.checked);
  }
}

// Load user preferences from localStorage
function loadUserPreferences() {
  const saved = localStorage.getItem('userPreferences');
  if (saved) {
    const prefs = JSON.parse(saved);
    // Apply saved preferences
    Object.keys(prefs).forEach(key => {
      const input = document.querySelector(`input[value="${prefs[key]}"]`);
      if (input) input.checked = true;
    });
    applyFilters();
  }
}

// Save user preferences
function saveUserPreferences() {
  const checked = Array.from(document.querySelectorAll('input:checked')).map(input => ({
    name: input.name,
    value: input.value
  }));
  localStorage.setItem('userPreferences', JSON.stringify(checked));
}
