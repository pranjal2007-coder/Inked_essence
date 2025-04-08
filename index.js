document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready!");

    // Cart functionality
    let cartCount = 0;
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.toggle('hidden');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Login/Signup button functionality
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
        alert("Login/Signup functionality to be implemented.");
    });

    // Add more functionality as needed
});