document.addEventListener('DOMContentLoaded', function () {
    // Use class selectors instead of IDs
    const navbar = document.querySelector('.navbar'); // Navbar element
    const flagbutton = document.querySelector('.flag-button'); // Flag button
    const flagbuttontxt = document.querySelector('.flag-text'); // Flag text
    const lockicon = document.querySelector('.lock-icon'); // Lock icon
    const changeicon = document.querySelector('.change-icon'); // Change icon
    const coloricon = document.querySelector('.color-icon'); // Color icon button
    const navbarLinks = document.querySelectorAll('.navbar ul li a'); // All navbar links (anchor tags)

    // Track color state (default is black theme)
    let isWhite = false;

    // Set default styles (black background and blue navbar links)
    navbar.style.backgroundColor = 'black';
    navbar.style.color = 'white';
    
    // Set default color for navbar links to white text and blue background
    navbarLinks.forEach(link => {
      link.style.color = 'white'; // Default text color to white
      link.style.backgroundColor = 'blue'; // Default background color to blue
    });

    // Function to apply styles to elements
    function applyTheme(elements, backgroundColor, color) {
      elements.forEach(element => {
        element.style.backgroundColor = backgroundColor;
        element.style.color = color;
      });
    }

    // Prevent color button from triggering flag button functionality
    coloricon.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click event from bubbling up to the flag button

      // Toggle navbar color
      if (isWhite) {
        // Change styles to black theme
        navbar.style.backgroundColor = 'black';
        navbar.style.color = 'white';

        // Apply the black theme to the selected elements
        applyTheme([flagbutton, flagbuttontxt, lockicon, changeicon, coloricon, ...navbarLinks], 'black', 'white');
        
        // Set navbar links color to white text and blue background when theme is black
        navbarLinks.forEach(link => {
          link.style.color = 'white';  // Set text color to white
          link.style.backgroundColor = 'blue'; // Set background color to blue
        });
      } else {
        // Change styles to white theme
        navbar.style.backgroundColor = 'white';
        navbar.style.color = 'black';

        // Apply the white theme to the selected elements
        applyTheme([flagbutton, flagbuttontxt, lockicon, changeicon, coloricon, ...navbarLinks], 'white', 'black');

        // Set navbar links color to black text and light blue background when theme is white
        navbarLinks.forEach(link => {
          link.style.color = 'white';  // Set text color to black
          link.style.backgroundColor = 'blue'; // Set background color to light blue
        });
      }

      // Toggle state
      isWhite = !isWhite;
    });
});
