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
    document.getElementById('successMessage').style.display = 'block';
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

cartIcon.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('show');
});

cartDropdown.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('show');  // Closes when mouse leaves the dropdown
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productName = button.parentElement.getAttribute('data-name');
  
      // Check for missing data-name attribute
      if (!productName) {
        console.error("Missing 'data-name' attribute on product element");
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
        cartItems.push({ name: productName, quantity: 1 });
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

// Initialize cart on page load
updateCart();
