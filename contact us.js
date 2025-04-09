// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const statusMsg = document.getElementById("statusMsg");
  statusMsg.textContent = "Message sent successfully!";
  statusMsg.style.color = "green";
  statusMsg.style.display = "block";

  // Clear form fields
  document.getElementById("firstName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  // Hide success message after 5 seconds
  setTimeout(() => {
    statusMsg.style.display = "none";
  }, 5000);
});

// Handle dark/light mode toggle
document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark");
  btn.textContent = isDark ? "Light Mode" : "Dark Mode";

  // Update button style
  btn.classList.toggle("btn-outline-dark", !isDark);
  btn.classList.toggle("btn-light", isDark);
});
