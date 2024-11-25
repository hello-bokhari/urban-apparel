let currentIndex = 0;
const images = document.querySelectorAll('#carousel img');

// Load cart items from localStorage if available
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to show the next image in carousel
function showNextImage() {
    images[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.remove('hidden');
}
setInterval(showNextImage, 3000);

// Toggle the menu dropdown
function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.classList.toggle('show');
}

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const menuContent = document.getElementById('menuContent');
    if (!menuContent.contains(event.target) && !event.target.matches('.fas.fa-bars')) {
        menuContent.classList.remove('show');
    }
});

// Handle the contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show confirmation for 2 seconds
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = `Thankyou for contacting us!`;
    document.body.appendChild(confirmation);

    setTimeout(() => {
      confirmation.remove();
    }, 2000);

    // Clear the form after submission
    document.getElementById('contactForm').reset();  // This resets all form fields
});

// Update the cart dropdown
function updateCart() {
    const cartList = document.getElementById('cartItemsList');
    cartList.innerHTML = '';  // Clear previous items

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>No items in cart</li>';
    } else {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (x${item.quantity})`; // Display quantity
            cartList.appendChild(li);
        });
    }
    updateCartIcon();
}

// Update the cart icon with total items count
function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartIcon.querySelector('span').textContent = `Cart (${totalItems})`;
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Show or hide cart dropdown on hover
const cartIcon = document.getElementById('cartIcon');
const cartDropdown = document.getElementById('cartDropdown');

cartIcon.addEventListener('mouseenter', () => {
    cartDropdown.classList.add('show');
});

cartDropdown.addEventListener('mouseenter', () => {
    cartDropdown.classList.add('show');  // Prevents closing when hovering over the dropdown
});
/*
//cause problem when hovering. Dose not let the user to interact with the cart drop down
cartIcon.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('show');
});
*/
cartDropdown.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('show');  // Closes when mouse leaves the dropdown
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productName = button.parentElement.getAttribute('data-name');
      const productPrice = parseFloat(button.parentElement.getAttribute('data-price')); // Ensure price is a number
      // Check for missing data-name attribute
      if (!productName) {
        console.error("Missing 'data-name' attribute on product element");
        return;
      }
      // Check for missing data-price attribute
      if (isNaN(productPrice)) {
        console.error("Missing 'data-price' attribute on product element");
        return;
      }
  
      // Check if the product is already in the cart
      let productFound = false;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === productName) {
          cartItems[i].quantity += 1;
          productFound = true;
          break;
        }
      }
  
      // If not found, add new product to cart
      if (!productFound) {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
      }
  
      updateCart();

      // Show confirmation for 2 seconds
      const confirmation = document.createElement('div');
      confirmation.className = 'cart-confirmation';
      confirmation.textContent = `${productName} added to cart!`;
      document.body.appendChild(confirmation);
  
      setTimeout(() => {
        confirmation.remove();
      }, 2000);
    });
  });

// Add clear cart functionality
function clearCart() {
    cartItems = []; // Empty the cart array
    localStorage.removeItem('cartItems'); // Remove from localStorage
    updateCart(); // Update UI to reflect the cleared cart

    // Show confirmation for 2 seconds
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = `Cart has been cleared!`;
    document.body.appendChild(confirmation);
    setTimeout(() => {
        confirmation.remove();
      }, 2000);
}

// Attach the clear cart functionality to the button
document.getElementById('clearCartButton').addEventListener('click', function() {
    clearCart();

});

//solving cart hover stuck problem
const cartContainer = document.querySelector('.cart-container');
// Variables to manage hover state
let hoverTimeout;

// Add event listeners for mouse enter and leave
cartContainer.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout); // Cancel any pending timeout
    cartDropdown.style.display = 'block'; // Show the dropdown
});

cartContainer.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
        cartDropdown.style.display = 'none'; // Hide the dropdown after a delay
    }, 200); // Adjust delay to avoid flickering
});

/*
// Toggle the dropdown when the cart icon is clicked
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});


// Close the dropdown when clicking outside of it
document.addEventListener('click', () => {
    cartDropdown.style.display = 'none';
});

// Prevent clicks inside the dropdown from closing it
cartDropdown.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
});
*/

//add inline product scroll function
// Select all product carousel containers
const carousels = document.querySelectorAll('.product-carousel-container');

carousels.forEach((container) => {
    const carousel = container.querySelector('.product-carousel');
    const leftButton = container.querySelector('.left-btn');
    const rightButton = container.querySelector('.right-btn');

    // Scroll amount per click
    const scrollAmount = 300;

    // Add event listeners to buttons
    leftButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Optional: Disable buttons at the ends of the carousel
    function updateButtonState() {
        leftButton.disabled = carousel.scrollLeft === 0;
        rightButton.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth;
    }

    // Update button state on scroll and resize
    carousel.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);

    // Initialize button states
    updateButtonState();
});


// Function to show products based on category
function showCategory(category) {
    // Hide all category headings first
    const allCategoryHeadings = document.querySelectorAll('.products h3');
    allCategoryHeadings.forEach(heading => {
        heading.style.display = 'none';
    });

    // Hide all product lists
    const allProductLists = document.querySelectorAll('.product-list');
    allProductLists.forEach(list => {
        list.style.display = 'none';
    });

    // Show the selected category's product list
    const selectedCategory = document.getElementById('productList' + capitalizeFirstLetter(category));
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }

    // Show the category heading for the selected category
    const selectedCategoryHeading = getCategoryHeadingText(capitalizeFirstLetter(category));
    if (selectedCategoryHeading) {
        selectedCategoryHeading.style.display = 'block';
    }
}

// Function to show all product categories (products and headings)
function showAllCategories() {
    const allProductLists = document.querySelectorAll('.product-list');
    allProductLists.forEach(list => {
        list.style.display = 'block';
    });

    // Also show all category headings when "Show All" is selected
    const allCategoryHeadings = document.querySelectorAll('.products h3');
    allCategoryHeadings.forEach(heading => {
        heading.style.display = 'block';
    });
}

// Function to get the category heading element by category name
function getCategoryHeadingText(category) {
    const allHeadings = document.querySelectorAll('.products h3');
    for (let heading of allHeadings) {
        if (heading.textContent.trim().toLowerCase() === category.toLowerCase()) {
            return heading;  // Return the heading element
        }
    }
    return null; // Return null if no heading matches
}

// Capitalizes the first letter of a string (e.g., 'shirts' to 'Shirts')
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event listeners for category filter buttons
document.querySelectorAll('.category-filters button').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.textContent.toLowerCase();
        if (category === 'show all') {
            showAllCategories();
        } else {
            showCategory(category);
        }
    });
});







// Initialize cart on page load
updateCart();

