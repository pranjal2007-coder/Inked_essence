document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
  
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
  
        button.classList.add('active');
        document.getElementById(`${target}Tab`).classList.add('active');
      });
    });
  
    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
      localStorage.setItem('theme', theme);
    };
  
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  
    themeToggle.addEventListener('click', () => {
      const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  
    // Basic login/signup action handlers
    document.getElementById('loginSubmit').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;
      if (email && pass) alert(`Welcome back, ${email}!`);
    });
  
    document.getElementById('signupSubmit').addEventListener('click', () => {
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const pass = document.getElementById('signupPassword').value;
      if (name && email && pass) alert(`Hello ${name}, you are signed up!`);
    });
  });
  