// Listen for clicks on the document
document.addEventListener('click', function(e) {
    // Check if the clicked element is one of our icons
    if (e.target.classList.contains('bx-md')) {
        // Add the 'clicked-icon' class to change the color
        e.target.classList.add('clicked-icon');

        // Set a timeout to remove the class after 1 second (1000 milliseconds)
        setTimeout(function() {
            e.target.classList.remove('clicked-icon');
        }, 1000); // Adjust the duration as needed
    }
});