/*
 * Gentle Smiles 2.0 - FORM VALIDATION
 * Handles client-side validation for:
 * 1. Appointment Form
 * 2. Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const apptForm = document.getElementById('appointment-form');
    const contactForm = document.getElementById('contact-form');

    // Helper: Show Error Message
    const showError = (field, message) => {
        field.classList.add('is-invalid');
        const errorContainer = field.closest('.form-group').querySelector('.error-message');
        if (errorContainer) {
            errorContainer.textContent = message;
        }
    };

    // Helper: Clear Error Message
    const clearError = (field) => {
        field.classList.remove('is-invalid');
        const errorContainer = field.closest('.form-group').querySelector('.error-message');
        if (errorContainer) {
            errorContainer.textContent = '';
        }
    };

    // Helper: Show Form-Wide Status Message
    const showFormStatus = (form, message, isSuccess) => {
        const statusContainer = form.previousElementSibling; // Assumes #form-status is right before
        if (statusContainer) {
            statusContainer.textContent = message;
            statusContainer.className = isSuccess ? 'status-success' : 'status-error';
        }
    };

    // Validator: Email
    const validateEmail = (email) => {
        const re = /^\S+@\S+\.\S+$/;
        return re.test(String(email).toLowerCase());
    };

    // Validator: Phone (simple: at least 10 digits)
    const validatePhone = (phone) => {
        const re = /^\+?[0-9\s-]{10,}$/;
        return re.test(String(phone));
    };

    // Main Validation Function
    const validateField = (field) => {
        let isValid = true;
        const value = field.value.trim();
        
        // Clear previous error
        clearError(field);

        // Check required
        if (field.hasAttribute('required') && value === '') {
            showError(field, 'This field is required.');
            isValid = false;
        } 
        // Check email
        else if (field.type === 'email' && value !== '' && !validateEmail(value)) {
            showError(field, 'Please enter a valid email address.');
            isValid = false;
        }
        // Check phone
        else if (field.type === 'tel' && value !== '' && !validatePhone(value)) {
            showError(field, 'Please enter a valid phone number (min. 10 digits).');
            isValid = false;
        }
        
        return isValid;
    };

    // Attach listener to Appointment Form
    if (apptForm) {
        apptForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isFormValid = true;
            const fieldsToValidate = apptForm.querySelectorAll('[required]');
            
            fieldsToValidate.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Real-world: submit via fetch()
                console.log('Appointment form is valid. Submitting...');
                showFormStatus(apptForm, 'Thank you! Your request has been sent.', true);
                apptForm.reset();
            } else {
                showFormStatus(apptForm, 'Please correct the errors in the form.', false);
            }
        });
    }
    
    // Attach listener to Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isFormValid = true;
            const fieldsToValidate = contactForm.querySelectorAll('[required]');
            
            fieldsToValidate.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Real-world: submit via fetch()
                console.log('Contact form is valid. Submitting...');
                showFormStatus(contactForm, 'Thank you! Your message has been sent.', true);
                contactForm.reset();
            } else {
                showFormStatus(contactForm, 'Please correct the errors in the form.', false);
            }
        });
    }

});