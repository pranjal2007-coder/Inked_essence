document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const billingForm = document.getElementById('billing-form');
    const successModal = document.getElementById('success-modal');
    const successModalContent = successModal ? successModal.querySelector('div') : null; // Get inner div for transition
    const closeModalButton = document.getElementById('close-modal');
    const modalOkButton = document.getElementById('modal-ok-button');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement; // Get the <html> element

    // --- Theme Toggle ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
             if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
             }
            localStorage.setItem('theme', 'light');
        }
    };

    // Check initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or default to system/light
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));


    // Theme toggle button event listener
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // --- Form Validation and Submission ---
    if (billingForm) {
        billingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            if (validateForm()) {
                showModal();
                console.log('Form is valid. Submitting (simulated)...');
                // In a real application, you would send data to the server here:
                // const formData = new FormData(billingForm);
                // fetch('/api/submit-order', { method: 'POST', body: formData })
                //   .then(response => response.json())
                //   .then(data => { console.log('Success:', data); showModal(); })
                //   .catch((error) => { console.error('Error:', error); alert('Order failed!'); });

                // billingForm.reset(); // Optionally reset form after successful submission
            } else {
                console.log('Form validation failed.');
                // Optionally scroll to the first error
                const firstError = billingForm.querySelector('.border-red-500, #payment-error:not(.hidden)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // --- Input Validation Logic ---
    function validateForm() {
        let isValid = true;
        const requiredFields = billingForm.querySelectorAll('[required]');
        const paymentMethods = billingForm.querySelectorAll('input[name="payment-method"]');
        const paymentError = document.getElementById('payment-error');
        const zipInput = document.getElementById('address-zip');

        // Clear previous errors visually
        billingForm.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
        billingForm.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
        if(paymentError) paymentError.classList.add('hidden');


        // Validate required text/select fields
        requiredFields.forEach(field => {
            const errorElement = field.parentNode.querySelector('.error-message') || field.closest('div').querySelector('.error-message'); // Find error message nearby
            let fieldValid = true;

            if (!field.value.trim()) {
                fieldValid = false;
                if (errorElement) errorElement.textContent = `${field.labels[0]?.textContent?.replace(' *','') || 'This field'} is required.`;
            } else {
                 // Specific validation for email
                 if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        fieldValid = false;
                         if (errorElement) errorElement.textContent = 'Please enter a valid email address.';
                    }
                 }
                 // Specific validation for PIN code (example: 6 digits for India)
                 if (field.id === 'address-zip') {
                     const zipRegex = /^[0-9]{6}$/; // Adjust regex based on country if needed
                     if (!zipRegex.test(field.value.trim())) {
                         fieldValid = false;
                         if (errorElement) errorElement.textContent = 'Please enter a valid 6-digit PIN code.';
                     }
                 }
                 // Add more specific validations here (e.g., phone number format) if needed
            }

            // Update visual state based on field validity
            if (!fieldValid) {
                isValid = false;
                field.classList.add('border-red-500');
                if (errorElement) errorElement.classList.remove('hidden');
            } else {
                field.classList.remove('border-red-500');
                 if (errorElement) errorElement.classList.add('hidden');
            }
        });

         // Validate payment method selection
        let paymentSelected = false;
        paymentMethods.forEach(radio => {
            if (radio.checked) {
                paymentSelected = true;
            }
        });

        if (!paymentSelected) {
            isValid = false;
            if (paymentError) paymentError.classList.remove('hidden');
        } else {
             if (paymentError) paymentError.classList.add('hidden');
        }

        return isValid;
    }

    // --- Modal Handling ---
    function showModal() {
        if (successModal && successModalContent) {
            // Use requestAnimationFrame to ensure the initial state is applied before transitioning
            requestAnimationFrame(() => {
                successModal.classList.remove('hidden');
                successModal.classList.add('flex'); // Make container visible
                requestAnimationFrame(() => { // Next frame, trigger transitions
                    successModal.style.opacity = '1';
                    successModalContent.style.opacity = '1';
                    successModalContent.style.transform = 'scale(1)';
                });
            });
        }
    }

    function hideModal() {
        if (successModal && successModalContent) {
            successModal.style.opacity = '0';
            successModalContent.style.opacity = '0';
            successModalContent.style.transform = 'scale(0.95)';
            // Wait for transition to finish before hiding
            setTimeout(() => {
                successModal.classList.add('hidden');
                successModal.classList.remove('flex');
            }, 300); // Match transition duration (300ms)
        }
    }

    // Event listeners for closing the modal
    if (closeModalButton) closeModalButton.addEventListener('click', hideModal);
    if (modalOkButton) modalOkButton.addEventListener('click', hideModal);
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            // Close only if clicking on the background overlay, not the content
            if (event.target === successModal) {
                hideModal();
            }
        });
    }
     // Close modal with Escape key
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && successModal && !successModal.classList.contains('hidden')) {
            hideModal();
        }
    });


    // --- Mobile Menu Toggle ---
     if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from closing menu immediately
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded.toString());
        });

        // Close mobile menu if clicking outside of it
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && event.target !== mobileMenuButton && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
     }

});
