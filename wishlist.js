document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlistContainer');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
  
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    function renderWishlist() {
      wishlistContainer.innerHTML = '';
  
      if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-gray-500 text-center">Your wishlist is empty.</p>';
        return;
      }
  
      wishlist.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">₹${product.price.toFixed(2)}</p>
          <button class="button remove-from-wishlist" data-id="${product.id}">Remove</button>
        `;
        wishlistContainer.appendChild(card);
      });
  
      document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = parseInt(e.target.dataset.id);
          const index = wishlist.findIndex(item => item.id === id);
          if (index !== -1) {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            renderWishlist();
          }
        });
      });
    }
  
    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
      localStorage.setItem('theme', theme);
    };
  
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  
    renderWishlist();
  });
  