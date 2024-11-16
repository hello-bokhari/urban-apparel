let currentIndex = 0;
const images = document.querySelectorAll('#carousel img');
const cartItems = [];

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

//close the menu when clicking outside
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

// Function to update the cart dropdown
function updateCart() {
    const cartList = document.getElementById('cartItemsList');
    cartList.innerHTML = '';  // Clear previous items

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>No items in cart</li>';
    } else {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            cartList.appendChild(li);
        });
    }
}

// Show or hide cart dropdown on hover
const cartIcon = document.getElementById('cartIcon');
const cartDropdown = document.getElementById('cartDropdown');

cartIcon.addEventListener('mouseenter', () => {
    cartDropdown.classList.add('show');
});
cartIcon.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('show');
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = button.parentElement.getAttribute('data-name');
        cartItems.push(productName);
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
