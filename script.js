// Wait until the DOM is fully loaded
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

    // Ensure grecaptcha is available
    if (typeof grecaptcha === 'undefined') {
      alert('Google reCAPTCHA failed to load. Please try again later.');
      return;
    }

    // Disable the submit button during processing
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Execute reCAPTCHA v3 with the provided site key
    grecaptcha.ready(() => {
      grecaptcha.execute('6LeoL6kqAAAAAJoZJxEfpC2Ts9CQppye4gqH1SDV', { action: 'submit' }).then((token) => {
        // Append the reCAPTCHA token to the form data
        const formData = new FormData(form);
        formData.append('g-recaptcha-response', token);

        // Send the form data to Formspree
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
});
