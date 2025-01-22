window.onload = function () {
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');
    const mainContent = document.getElementById('main-content');

    // Show the popup after 8 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
        popup.classList.add('fade-in');
    }, 8000);

    // Close the popup and show the main content
    closePopup.addEventListener('click', () => {
        popup.classList.remove('fade-in');
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('fade-out');
            mainContent.style.display = 'block';
        }, 1000);
    });

    // Handle reCAPTCHA Form Submission
    document.getElementById('newsletter-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Check if reCAPTCHA is loaded
        if (!window.grecaptcha) {
            alert('Google reCAPTCHA failed to load. Please try again later.');
            return;
        }

        // Trigger Google reCAPTCHA v3
        grecaptcha.ready(() => {
            grecaptcha.execute('6LeoL6kqAAAAAJoZJxEfpC2Ts9CQppye4gqH1SDV', { action: 'submit' }).then((token) => {
                // Append reCAPTCHA token to the form data
                const form = e.target;
                const formData = new FormData(form);
                formData.append('g-recaptcha-response', token);

                const successMessage = document.getElementById('success-message');
                const submitButton = form.querySelector('button');
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                // Submit the form data to Formspree
                fetch('https://formspree.io/f/xannbwvb', {
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
};
