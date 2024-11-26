window.onload = function () {
    // Get the newsletter popup and close button elements
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');

    // Check if the elements exist to avoid runtime errors
    if (popup && closePopup) {
        // Show the popup after 8 seconds
        setTimeout(() => {
            popup.style.display = 'flex';
            popup.classList.add('fade-in');
        }, 8000);

        // Add a click event listener to the close button to hide the popup
        closePopup.addEventListener('click', () => {
            popup.classList.remove('fade-in');
            popup.classList.add('fade-out');

            // Wait for the animation to complete before hiding the popup
            setTimeout(() => {
                popup.style.display = 'none';
                popup.classList.remove('fade-out');
            }, 1000); // Matches fade-out duration
        });
    } else {
        console.error("Popup or close button element not found. Check your HTML structure.");
    }
};
