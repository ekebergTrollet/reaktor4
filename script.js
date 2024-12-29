window.onload = function () {
    // Get the newsletter popup and close button elements
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');

    // Check if the elements exist to avoid runtime errors
    if (popup && closePopup) {
        // Function to show the popup
        const showPopup = () => {
            popup.style.display = 'flex'; // Make the popup visible
            popup.classList.add('fade-in'); // Add fade-in animation class
        };

        // Function to hide the popup
        const hidePopup = () => {
            if (popup.classList.contains('fade-in')) {
                popup.classList.remove('fade-in'); // Remove fade-in
                popup.classList.add('fade-out'); // Add fade-out animation class

                // Wait for the fade-out animation to complete before hiding
                setTimeout(() => {
                    popup.style.display = 'none'; // Hide the popup
                    popup.classList.remove('fade-out'); // Clean up the fade-out class
                }, 1000); // Matches fade-out duration
            }
        };

        // Show the popup after 8 seconds
        setTimeout(showPopup, 8000);

        // Add a click event listener to the close button to hide the popup
        closePopup.addEventListener('click', hidePopup);

        // Optional: Add a listener to close the popup if the user clicks outside of it
        document.addEventListener('click', (event) => {
            if (!popup.contains(event.target) && event.target !== popup) {
                hidePopup();
            }
        });
    } else {
        console.error("Popup or close button element not found. Check your HTML structure.");
    }
};
