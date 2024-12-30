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

    // Handle AJAX Form Submission
    document.getElementById('newsletter-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const successMessage = document.getElementById('success-message');

        fetch('https://formspree.io/f/xannbwvb', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            })
            .catch(() => {
                alert('Oops! There was a problem submitting your form.');
            });
    });
};
