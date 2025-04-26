document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const productContainer = document.getElementById('productContainer');
    const loginBtn = document.getElementById('loginBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartTotalDisplay = document.getElementById('cartTotal');
    const html = document.documentElement;
  
    const cart = {};
    // Just change these to change your actual products info
    //The price
    // images 
    // name of the products
  // also linked the pics of products
    const products = [
      { id: 1, name: 'Oversized T-Shirts', price: 1299.99, image: 'pic1.jpg' },
      { id: 2, name: 'Oversized T-Shirts', price: 1499.99, image: 'pic2.jpg' },
      { id: 3, name: 'Oversized Hoodies', price: 1499.99, image: 'pic21.jpg' },
      { id: 4, name: 'Oversized Hoodies', price: 1799.99, image: 'pic22.jpg' }
    ]; 
  
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      const keys = Object.keys(cart);
  
      if (keys.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Your cart is empty</p>';
        cartTotalDisplay.textContent = '₹0.00';
        return;
      } else {
        keys.forEach(id => {
          const item = cart[id];
          const div = document.createElement('div');
          div.className = 'flex justify-between items-start border-b pb-4 animate-fadeIn';
  
          div.innerHTML = `
            <div class="flex items-center space-x-4">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded" />
              <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">₹${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <div class="flex items-center space-x-2">
                <button class="decrease px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" data-id="${item.id}">−</button>
                <input type="number" min="1" value="${item.quantity}" class="quantity-input w-12 text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white" data-id="${item.id}" />
                <button class="increase px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" data-id="${item.id}">+</button>
              </div>
              <button data-id="${item.id}" class="remove-item text-red-500 text-sm">Remove</button>
            </div>
          `;
  
          cartItemsContainer.appendChild(div);
        });
  
        attachCartItemListeners();
        updateCartTotal();
      }
    }
  
    function attachCartItemListeners() {
      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.dataset.id;
          delete cart[id];
          updateCartCount();
          updateCartDisplay();
        });
      });
  
      document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.dataset.id;
          if (cart[id]) {
            cart[id].quantity += 1;
            updateCartCount();
            updateCartDisplay();
          }
        });
      });
  
      document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.dataset.id;
          if (cart[id]) {
            if (cart[id].quantity > 1) {
              cart[id].quantity -= 1;
            } else {
              delete cart[id];
            }
            updateCartCount();
            updateCartDisplay();
          }
        });
      });
  
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', e => {
          const id = e.target.dataset.id;
          let value = parseInt(e.target.value);
