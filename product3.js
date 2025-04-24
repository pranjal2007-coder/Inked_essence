// Size button selection
const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = null;

sizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    sizeButtons.forEach((b) => {
      b.classList.remove("selected");
    });
    btn.classList.add("selected");
    selectedSize = btn.getAttribute("data-size");
  });
});

// Add to cart button click - redirect to cart.html with query params
const addToCartBtn = document.getElementById("add-to-cart-btn");
addToCartBtn.addEventListener("click", () => {
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }
  // Prepare product data
  const product = {
    name: "Women Graphic Printed Round Neck Pure Cotton Oversized T-Shirt",
    price: 539,
    size: selectedSize,
  };
  // Store product in localStorage cart array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  // Redirect to cart.html
  window.location.href = "cart.html";
});

// Wishlist button toggle and redirect to wishlist.html
const wishlistBtnProduct = document.getElementById("wishlist-btn-product");
const wishlistBtnNav = document.getElementById("wishlist-btn-nav");

function toggleWishlist(button) {
  const isPressed = button.getAttribute("aria-pressed") === "true";
  if (isPressed) {
    button.setAttribute("aria-pressed", "false");
    button.querySelector("i").classList.remove("fas", "text-red-600");
    button.querySelector("i").classList.add("far");
  } else {
    button.setAttribute("aria-pressed", "true");
    button.querySelector("i").classList.add("fas", "text-red-600");
    button.querySelector("i").classList.remove("far");
  }
}

wishlistBtnProduct.addEventListener("click", () => {
  if (!selectedSize) {
    alert("Please select a size before adding to wishlist.");
    return;
  }
  // Prepare product data
  const product = {
    name: "Women Graphic Printed Round Neck Pure Cotton Oversized T-Shirt",
    size: selectedSize,
  };
  // Store product in localStorage wishlist array
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // Sync nav wishlist button
  toggleWishlist(wishlistBtnProduct);
  toggleWishlist(wishlistBtnNav);
  // Redirect to wishlist.html
  window.location.href = "wishlist.html";
});

wishlistBtnNav.addEventListener("click", () => {
  toggleWishlist(wishlistBtnNav);
  toggleWishlist(wishlistBtnProduct);
  // Optionally alert or redirect user to wishlist page
  window.location.href = "wishlist.html";
});

// Fullscreen image modal logic
const imageModal = document.getElementById("image-modal");
const modalImage = imageModal.querySelector("img");
const closeModalBtn = imageModal.querySelector(".close-btn");

// Carousel images array
const images = [
  {
    src: "pic4.jpg",
    alt: "Woman wearing graphic printed round neck pure cotton oversized t-shirt with sunglasses standing on street",
  },
  {
    src: "picture.jpg",
    alt: "Woman wearing graphic printed round neck pure cotton oversized t-shirt standing front facing camera on white background",
  },
];

let currentIndex = 0;

const mainImage = document.querySelector(
  "section.flex-1.relative.max-w-md.mx-auto img.main-image"
);
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function updateImage(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex].src;
  mainImage.alt = images[currentIndex].alt;
}

prevBtn.addEventListener("click", () => {
  let newIndex = currentIndex - 1;
  if (newIndex < 0) newIndex = images.length - 1;
  updateImage(newIndex);
});

nextBtn.addEventListener("click", () => {
  let newIndex = currentIndex + 1;
  if (newIndex >= images.length) newIndex = 0;
  updateImage(newIndex);
});

// Click main image to open fullscreen modal
mainImage.addEventListener("click", () => {
  modalImage.src = images[currentIndex].src;
  modalImage.alt = images[currentIndex].alt;
  imageModal.style.display = "flex";
  document.body.style.overflow = "hidden"; // prevent background scroll
});

closeModalBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
  modalImage.src = "";
  modalImage.alt = "";
  document.body.style.overflow = ""; // restore scroll
});

// Close modal on outside click
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeModalBtn.click();
  }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imageModal.style.display === "flex") {
    closeModalBtn.click();
  }
});

// Initialize first image
updateImage(0);