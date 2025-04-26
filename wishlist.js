// Wait until the entire DOM content is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Grabbing necessary DOM elements by their IDs
    const wishlistContainer = document.getElementById('wishlistContainer'); // Container for displaying wishlist products
    const themeToggle = document.getElementById('themeToggle'); // Dark/Light mode toggle button
    const themeIcon = document.getElementById('themeIcon'); // Icon element inside the toggle
    const clearWishlistBtn = document.getElementById('clearWishlistBtn'); // Button to clear the wishlist
    const html = document.documentElement; // Refers to the <html> element for theme switching
  
    // Load wishlist data from localStorage or initialize with an empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    // Function to render the wishlist items dynamically onto the page
    function renderWishlist() {
      // Clear previous contents in the wishlist container
      wishlistContainer.innerHTML = '';
  
      // If the wishlist is empty, display a placeholder message
      if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-gray-500 text-center">Your wishlist is empty.</p>';
        return; // Exit early since there’s nothing to render
      }
  
      // Loop through each product stored in wishlist array
      wishlist.forEach(product => {
        // Create a new <div> element for each product
        const card = document.createElement('div');
        card.className = 'product-card'; // Assign class for styling
  
        // Set the inner HTML of the card with product image, name, price, and remove button
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">₹${product.price.toFixed(2)}</p>
          <button class="button remove-from-wishlist" data-id="${product.id}">Remove</button>
        `;
  
        // Append the product card to the main wishlist container in DOM
        wishlistContainer.appendChild(card);
      });
  
      // Attach click event listeners to all remove buttons
      document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', e => {
