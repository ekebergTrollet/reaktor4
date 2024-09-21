window.onload = function() {
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');

    // Show the popup after 2 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 2000);

    // Close the popup when the "Close" button is clicked
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });
};
