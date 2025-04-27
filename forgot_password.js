// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle Logic ---
  
  const themeToggle = document.getElementById('themeToggle'); // Button to toggle theme
  const themeIcon = document.getElementById('themeIcon');     // Icon inside the toggle button
  const html = document.documentElement;                     // Reference to <html> element

  // Function to apply a selected theme ('light' or 'dark')
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme); // Set the theme attribute on <html>
    if (themeIcon) {
      // Update the theme icon class based on the selected theme
      themeIcon.className = theme === 'dark' ? 'ri-moon-line text-xl' : 'ri-sun-line text-xl';
    }
    localStorage.setItem('theme', theme); // Save the user's theme preference locally
  };

  // Get the saved theme from localStorage or default to 'light' if none found
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme); // Apply the saved/default theme

  // If the theme toggle button exists, add a click event to switch between themes
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme'); // Get current theme
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Toggle to opposite theme
      applyTheme(newTheme); // Apply the new theme
    });
  }

  // --- Forgot Password Form Logic ---

  const forgotPasswordForm = document.getElementById('forgotPasswordForm'); // Forgot password form element
  const resetEmailInput = document.getElementById('resetEmail');             // Email input field
  const feedbackMessage = document.getElementById('feedbackMessage');        // Element to display feedback messages
  const submitBtn = document.getElementById('submitBtn');                    // Submit button
  const btnText = document.getElementById('btnText');                        // Text inside submit button
  const btnSpinner = document.getElementById('btnSpinner');                  // Loading spinner inside submit button

  // Event listener for form submission
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    const email = resetEmailInput.value.trim(); // Get and trim the email input

    // Simple regex pattern to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // If email is invalid, show an error message and exit
    if (!emailRegex.test(email)) {
      feedbackMessage.textContent = 'Please enter a valid email address.';
      feedbackMessage.style.color = 'red';
      return;
    }

    // Disable submit button and show the loading spinner
    submitBtn.disabled = true;
    btnText.style.display = 'none';           // Hide button text
    btnSpinner.style.display = 'inline-block'; // Show spinner
    feedbackMessage.textContent = 'Sending reset link...';
    feedbackMessage.style.color = 'black';    // Neutral color while sending

    // Simulate sending reset link with a 2-second delay
    setTimeout(() => {
      feedbackMessage.textContent = `A password reset link has been sent to ${email}. Please check your inbox.`;
      feedbackMessage.style.color = 'green';  // Success message in green
      forgotPasswordForm.reset();             // Reset the form fields

      // Start a cooldown timer (e.g., 30 seconds) before user can resend the link
      let cooldown = 30;
      feedbackMessage.textContent += ` You can request another link in ${cooldown} seconds.`;

      const intervalId = setInterval(() => {
        cooldown--;
        if (cooldown > 0) {
          // Update message with remaining cooldown time
          feedbackMessage.textContent = `You can request another link in ${cooldown} seconds.`;
        } else {
          // Cooldown ended: clear interval, re-enable button, restore UI
          clearInterval(intervalId);
          feedbackMessage.textContent = '';
          submitBtn.disabled = false;
          btnText.style.display = 'inline';  // Show button text again
          btnSpinner.style.display = 'none'; // Hide spinner
        }
      }, 1000); // Update every second
    }, 2000); // Simulated email sending delay
  });

});
