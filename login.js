// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get all tab buttons and tab content sections
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Get the root HTML element for theme toggling
  const html = document.documentElement;
  
  // Get theme toggle button and icon
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Add click event listeners to each tab button
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab'); // Get target tab name

      // Remove 'active' class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add 'active' class to the clicked button and its corresponding tab content
      button.classList.add('active');
      document.getElementById(`${target}Tab`).classList.add('active'); // Corrected missing backticks
    });
  });

  // Function to apply a theme (light or dark)
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme); // Set attribute on root element
    themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'; // Switch icon
    localStorage.setItem('theme', theme); // Save theme to local storage
  };

  // Check if a theme is saved in localStorage and apply it; default to light theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Toggle theme on theme button click
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // --- Login form elements ---
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginSubmit = document.getElementById('loginSubmit');
  const loginBtnText = document.getElementById('loginBtnText');
  const loginBtnSpinner = document.getElementById('loginBtnSpinner');
  const rememberMe = document.getElementById('rememberMe');
  const toggleLoginPassword = document.getElementById('toggleLoginPassword');

  // --- Signup form elements ---
  const signupName = document.getElementById('signupName');
  const signupEmail = document.getElementById('signupEmail');
  const signupPassword = document.getElementById('signupPassword');
  const signupSubmit = document.getElementById('signupSubmit');
  const signupBtnText = document.getElementById('signupBtnText');
  const signupBtnSpinner = document.getElementById('signupBtnSpinner');
  const toggleSignupPassword = document.getElementById('toggleSignupPassword');

  // Function to toggle visibility of password fields
  function togglePasswordVisibility(input, toggleIcon) {
    if (input.type === 'password') {
      input.type = 'text'; // Show password
      toggleIcon.style.color = '#4f46e5'; // Highlight icon when showing password
    } else {
      input.type = 'password'; // Hide password
      toggleIcon.style.color = ''; // Reset icon color
    }
  }

  // Event listeners for toggling password visibility in login and signup forms
  toggleLoginPassword.addEventListener('click', () => {
    togglePasswordVisibility(loginPassword, toggleLoginPassword);
  });

  toggleSignupPassword.addEventListener('click', () => {
    togglePasswordVisibility(signupPassword, toggleSignupPassword);
  });

  // Check if user previously chose to remember their email and pre-fill it
  if (localStorage.getItem('rememberedEmail')) {
    loginEmail.value = localStorage.getItem('rememberedEmail');
    rememberMe.checked = true;
  }

  // Simple email format validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Simple alert function to show success or error messages
  function showAlert(message, isError = false) {
    alert(message); // You could customize styling later
  }

  // --- Login form submit handler ---
  loginSubmit.addEventListener('click', () => {
    const email = loginEmail.value.trim();
    const pass = loginPassword.value.trim();

    // Basic validations
    if (!email || !pass) {
      showAlert('Please enter both email and password.', true);
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('Please enter a valid email address.', true);
      return;
    }

    // Disable login button and show loading spinner
    loginSubmit.disabled = true;
    loginBtnText.style.display = 'none';
    loginBtnSpinner.style.display = 'inline-block';

    // Simulate login process with a delay
    setTimeout(() => {
      // If "Remember Me" is checked, save email
      if (rememberMe.checked) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Show welcome message
      showAlert(`Welcome back, ${email}!`);

      // Reset button state and spinner
      loginSubmit.disabled = false;
      loginBtnText.style.display = 'inline';
      loginBtnSpinner.style.display = 'none';
    }, 2000);
  });

  // --- Signup form submit handler ---
  signupSubmit.addEventListener('click', () => {
    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const pass = signupPassword.value.trim();

    // Basic validations
    if (!name || !email || !pass) {
      showAlert('Please fill in all signup fields.', true);
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('Please enter a valid email address.', true);
      return;
    }

    // Disable signup button and show loading spinner
    signupSubmit.disabled = true;
    signupBtnText.style.display = 'none';
    signupBtnSpinner.style.display = 'inline-block';

    // Simulate signup process with a delay
    setTimeout(() => {
      // Show welcome message
      showAlert(`Hello ${name}, you are signed up!`);

      // Reset button state and spinner
      signupSubmit.disabled = false;
      signupBtnText.style.display = 'inline';
      signupBtnSpinner.style.display = 'none';

      // Clear signup form fields after successful signup
      signupName.value = '';
      signupEmail.value = '';
      signupPassword.value = '';
    }, 2000);
  });
});
