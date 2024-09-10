window.onload = function() {
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');

    // Show the popup after 2 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 8000);

    // Close the popup
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });
};
