// This snippet ensures that if the hidden reCAPTCHA field is present, it is marked as required.
window.onload = function() { 
  var recaptchaField = document.getElementById('g-recaptcha-response'); 
  if (recaptchaField) { 
    recaptchaField.setAttribute('required', 'required'); 
  }
};

// Wait until the DOM is fully loaded to run our main code.
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('newsletter-popup');
  const closePopup = document.getElementById('close-popup');
  const form = document.getElementById('newsletter-form');
  const successMessage = document.getElementById('success-message');

  // Function to show the popup using flex layout
  const showPopup = () => {
    popup.style.display = 'flex';
    popup.classList.add('fade-in');
  };

  // Function to hide the popup with fade-out effect
  const hidePopup = () => {
    popup.classList.remove('fade-in');
    popup.classList.add('fade-out');
    setTimeout(() => {
      popup.style.display = 'none';
      popup.classList.remove('fade-out');
    }, 1000);
  };

  // Show the popup after 8 seconds
  setTimeout(showPopup, 8000);

  // Close button event listener
  closePopup.addEventListener('click', hidePopup);

  // Handle reCAPTCHA and form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ensure grecaptcha.enterprise is available
    if (typeof grecaptcha === 'undefined' || typeof grecaptcha.enterprise === 'undefined') {
      alert('Google reCAPTCHA failed to load. Please try again later.');
      return;
    }

    // Disable the submit button during processing
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Execute reCAPTCHA Enterprise with the provided site key and desired action
    grecaptcha.enterprise.execute('6LeoL6kqAAAAAJoZJxEfpC2Ts9CQppye4gqH1SDV', { action: 'submit' })
      .then((token) => {
        // Append the token to the hidden field (g-recaptcha-response)
        const recaptchaField = document.getElementById('g-recaptcha-response');
        if (recaptchaField) {
          recaptchaField.value = token;
        }
        
        // Prepare form data including the token field (which is already in the form)
        const formData = new FormData(form);

        // Submit the form data to Formspree
        fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        })
          .then((response) => {
            submitButton.textContent = 'Sign Up';
            submitButton.disabled = false;

            if (response.ok) {
              // Hide the form and show the success message
              form.style.display = 'none';
              successMessage.style.display = 'block';
            } else {
              return response.json().then((data) => {
                alert(data.error || 'Oops! There was a problem submitting your form.');
              });
            }
          })
          .catch(() => {
            submitButton.textContent = 'Sign Up';
            submitButton.disabled = false;
            alert('Oops! There was a problem submitting your form.');
          });
      });
  });
});
