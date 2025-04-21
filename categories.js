document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.classList.remove('ri-sun-line');
      themeIcon.classList.add('ri-moon-line');
    } else {
      themeIcon.classList.remove('ri-moon-line');
      themeIcon.classList.add('ri-sun-line');
    }
    localStorage.setItem('theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });

  // Initialize theme on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Filter expand/collapse
  const filterToggles = document.querySelectorAll('.filter-toggle');
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      if (content.classList.contains('show')) {
        content.classList.remove('show');
        toggle.querySelector('i').classList.replace('ri-arrow-up-s-line', 'ri-arrow-down-s-line');
      } else {
        content.classList.add('show');
        toggle.querySelector('i').classList.replace('ri-arrow-down-s-line', 'ri-arrow-up-s-line');
      }
    });
  });

  // Sorting dropdown toggle
  const sortDropdownBtn = document.getElementById('sortDropdownBtn');
  const sortDropdownMenu = document.getElementById('sortDropdownMenu');

  sortDropdownBtn.addEventListener('click', () => {
    sortDropdownMenu.classList.toggle('hidden');
  });

  // Close sorting dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!sortDropdownBtn.contains(e.target) && !sortDropdownMenu.contains(e.target)) {
      sortDropdownMenu.classList.add('hidden');
    }
  });

  // Wishlist functionality
  const wishlistKey = 'wishlist';

  // Helper to get wishlist from localStorage
  function getWishlist() {
    return JSON.parse(localStorage.getItem(wishlistKey)) || [];
  }

  // Helper to save wishlist to localStorage
  function saveWishlist(wishlist) {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }

  // Helper to check if product is in wishlist by id
  function isInWishlist(id) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === id);
  }

  // Helper to add product to wishlist
  function addToWishlist(product) {
    const wishlist = getWishlist();
    wishlist.push(product);
    saveWishlist(wishlist);
  }

  // Helper to remove product from wishlist by id
  function removeFromWishlist(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist(wishlist);
  }

  // Assign unique ids to products if not present
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    if (!card.dataset.id) {
      card.dataset.id = index + 1; // simple unique id
    }
  });

  // Create popup container
  let popupContainer = document.createElement('div');
  popupContainer.id = 'popupContainer';
  popupContainer.className = 'fixed top-4 right-4 z-50 flex flex-col space-y-2';
  document.body.appendChild(popupContainer);

  // Show popup message
  function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'bg-gray-800 text-white px-4 py-2 rounded shadow-lg opacity-0 transition-opacity duration-300';
    popup.textContent = message;
    popupContainer.appendChild(popup);
    // Trigger fade in
    requestAnimationFrame(() => {
      popup.style.opacity = '1';
    });
    // Remove after 3 seconds
    setTimeout(() => {
      popup.style.opacity = '0';
      popup.addEventListener('transitionend', () => {
        popup.remove();
      });
    }, 3000);
  }

  // Initialize wishlist buttons state
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(btn => {
    const card = btn.closest('.product-card');
    const productId = parseInt(card.dataset.id);
    const productName = card.querySelector('h3')?.textContent || '';
    const productPriceText = card.querySelector('.text-primary')?.textContent || '';
    const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, '')) || 0;
    const productImage = card.querySelector('img')?.src || '';

    if (isInWishlist(productId)) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      icon.classList.replace('ri-heart-line', 'ri-heart-fill');
    }

    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        icon.classList.replace('ri-heart-fill', 'ri-heart-line');
        removeFromWishlist(productId);
        showPopup(`Removed "${productName}" from wishlist`);
      } else {
        btn.classList.add('active');
        icon.classList.replace('ri-heart-line', 'ri-heart-fill');
        addToWishlist({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage
        });
        showPopup(`Added "${productName}" to wishlist`);
      }
    });
  });

  // Color filter functionality
  const colorButtons = document.querySelectorAll('.color-btn');

  let selectedColors = new Set();

  function filterProductsByColor() {
    if (selectedColors.size === 0) {
      productCards.forEach(card => {
        card.style.display = '';
      });
      return;
    }
    productCards.forEach(card => {
      const cardColors = card.getAttribute('data-color').toLowerCase().split(' ');
      const hasColor = cardColors.some(color => selectedColors.has(color));
      if (hasColor) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('title').toLowerCase();
      if (selectedColors.has(color)) {
        selectedColors.delete(color);
        btn.classList.remove('selected');
      } else {
        selectedColors.add(color);
        btn.classList.add('selected');
      }
      filterProductsByColor();
    });
  });

  // Cart button popup
  const cartBtn = document.getElementById('cartBtn');
  cartBtn.addEventListener('click', () => {
    showPopup('Added item to cart');
  });
});
