// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const billingForm = document.getElementById('billing-form');
    const successModal = document.getElementById('success-modal');
    const successModalContent = successModal?.querySelector('.modal-content');
    const closeModalButton = document.getElementById('close-modal');
    const modalOkButton = document.getElementById('modal-ok-button');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    const submitButton = document.getElementById('submit-button');
    const spinner = document.getElementById('spinner');
    const buttonText = submitButton?.querySelector('.button-text');
    const phoneInput = document.getElementById('phone');
    const applyDiscountButton = document.getElementById('apply-discount');
    const discountCodeInput = document.getElementById('discount-code');
    const discountMessage = document.getElementById('discount-message');
    const shippingRadios = document.querySelectorAll('input[name="shipping-method"]');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');
    const summarySubtotal = document.getElementById('summary-subtotal'); // Assuming this exists

    // --- Initial Setup ---
    const BASE_TOTAL = 2897; // Example base total from HTML (replace with dynamic calculation if possible)
    const SHIPPING_COSTS = {
        standard: 0,
        express: 150,
    };

    // --- Theme Toggle ---
    const applyTheme = (theme) => {
        htmlElement.classList.toggle('dark', theme === 'dark');
        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon', theme === 'light');
            themeIcon.classList.toggle('fa-sun', theme === 'dark');
        }
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggleButton?.addEventListener('click', () => {
        applyTheme(htmlElement.classList.contains('dark') ? 'light' : 'dark');
    });

    // --- Input Masking (Simple Phone Example) ---
    phoneInput?.addEventListener('input', (e) => {
        // Basic Indian format hint - allows spaces/hyphens
        let value = e.target.value.replace(/[^\d\s\-+]/g, ''); // Allow digits, space, hyphen, plus
        // You could add more sophisticated masking libraries for stricter formats
        e.target.value = value;
    });

    // --- Real-time Validation (On Blur) ---
    const validateField = (field) => {
        const errorElement = field.closest('div')?.querySelector('.error-message');
        let fieldValid = true;
        let errorMessage = '';

        // Check required
        if (field.required && !field.value.trim()) {
            fieldValid = false;
            errorMessage = `${field.labels[0]?.textContent?.replace(' *', '') || 'This field'} is required.`;
        } else if (field.value.trim()) {
            // Check type="email"
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    fieldValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
            }
            // Check pattern (e.g., for ZIP)
            else if (field.pattern && !new RegExp(`^${field.pattern}$`).test(field.value.trim())) {
                 fieldValid = false;
                 // Use specific messages based on ID or a generic pattern message
                 if (field.id === 'address-zip') errorMessage = 'Please enter a valid PIN code.';
                 else errorMessage = 'Invalid format.';
            }
             // Check phone (basic length example)
             else if (field.type === 'tel') {
                 const phoneDigits = field.value.replace(/\D/g, ''); // Remove non-digits
                 if (phoneDigits.length < 10 || phoneDigits.length > 13) { // Example length check
                     fieldValid = false;
                     errorMessage = 'Please enter a valid phone number.';
                 }
             }
        }

        // Update UI
        field.classList.toggle('border-red-500', !fieldValid);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = fieldValid ? 'none' : 'block';
        }
        return fieldValid;
    };

    // Attach blur listeners to required inputs/selects
    billingForm?.querySelectorAll('input[required], select[required]').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        // Also validate on input for immediate feedback after correction
        field.addEventListener('input', () => {
            // Only clear error if currently invalid, don't validate fully on every keystroke
            if (field.classList.contains('border-red-500')) {
                 validateField(field);
            }
        });
    });


    // --- Form Submission ---
    billingForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        let isFormValid = true;

        // Validate all required fields on submit
        billingForm.querySelectorAll('input[required], select[required]').forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        // Validate payment method selection
        const paymentMethods = billingForm.querySelectorAll('input[name="payment-method"]');
        const paymentError = document.getElementById('payment-error');
        let paymentSelected = Array.from(paymentMethods).some(radio => radio.checked);

        if (!paymentSelected) {
            isFormValid = false;
            if (paymentError) paymentError.style.display = 'block';
        } else {
            if (paymentError) paymentError.style.display = 'none';
        }

        // Handle submission
        if (isFormValid) {
            console.log('Form is valid. Simulating submission...');
            // Show spinner, disable button
            if (spinner) spinner.classList.remove('hidden');
            if (buttonText) buttonText.classList.add('hidden');
            if (submitButton) submitButton.disabled = true;

            // Simulate network request
            setTimeout(() => {
                showModal();
                 // Hide spinner, enable button
                if (spinner) spinner.classList.add('hidden');
                if (buttonText) buttonText.classList.remove('hidden');
                if (submitButton) submitButton.disabled = false;
                // billingForm.reset(); // Optional: Reset form after success
                // updateShippingCost(); // Reset shipping display if form resets
            }, 1500); // Simulate 1.5 second delay

        } else {
            console.log('Form validation failed.');
            // Optionally scroll to the first error
            const firstErrorField = billingForm.querySelector('.border-red-500, #payment-error:not([style*="display: none"])');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // --- Discount Code Logic ---
    applyDiscountButton?.addEventListener('click', () => {
        const code = discountCodeInput?.value.trim().toUpperCase();
        // --- SIMULATED: Replace with actual discount logic/API call ---
        if (code === 'INKED10') { // Example valid code
            if (discountMessage) {
                discountMessage.textContent = '10% discount applied!';
                discountMessage.classList.remove('hidden', 'text-red-500');
                discountMessage.classList.add('text-green-600', 'dark:text-green-400');
            }
             // Update summary (example)
             // calculateAndUpdateTotal(); // Call a function to recalculate
        } else if (code) {
             if (discountMessage) {
                discountMessage.textContent = 'Invalid discount code.';
                discountMessage.classList.remove('hidden', 'text-green-600');
                discountMessage.classList.add('text-red-500', 'dark:text-red-400');
             }
             // Update summary (remove discount)
             // calculateAndUpdateTotal();
        } else {
             if (discountMessage) discountMessage.classList.add('hidden');
        }
         // --- End Simulation ---
    });

    // --- Shipping Cost Update ---
    const updateShippingCost = () => {
        const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
        const cost = selectedShipping ? SHIPPING_COSTS[selectedShipping.value] : 0;

        if (summaryShipping) {
            summaryShipping.textContent = cost === 0 ? 'Free' : `₹${cost}`;
        }
        // Update total (basic example, assumes BASE_TOTAL is subtotal)
        if (summaryTotal) {
             summaryTotal.textContent = `₹${BASE_TOTAL + cost}`;
        }
    };

    shippingRadios.forEach(radio => radio.addEventListener('change', updateShippingCost));
    // Initial call in case 'express' is checked by default later
    updateShippingCost();


    // --- Modal Handling ---
    function showModal() {
        if (!successModal || !successModalContent) return;
        requestAnimationFrame(() => {
            successModal.classList.remove('hidden');
            successModal.classList.add('flex');
            requestAnimationFrame(() => {
                successModal.style.opacity = '1';
                successModalContent.style.opacity = '1';
                successModalContent.style.transform = 'scale(1)';
            });
        });
    }

    function hideModal() {
         if (!successModal || !successModalContent) return;
        successModal.style.opacity = '0';
        successModalContent.style.opacity = '0';
        successModalContent.style.transform = 'scale(0.95)';
        setTimeout(() => {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
        }, 300); // Match transition duration
    }

    closeModalButton?.addEventListener('click', hideModal);
    modalOkButton?.addEventListener('click', hideModal);
    successModal?.addEventListener('click', (event) => {
        if (event.target === successModal) hideModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && successModal && !successModal.classList.contains('hidden')) {
            hideModal();
        }
    });

    // --- Mobile Menu Toggle ---
     if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isExpanded = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
     }
});
