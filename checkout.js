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

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!validateCardDetails(cardNumber, expiryDate, cvv)) {
        alert("Invalid card details. Please check your information.");
        return;
    }

    alert(`Thank you, ${name}! Your order has been placed.`);
    // Clear the form
    this.reset();
});

function validateCardDetails(cardNumber, expiryDate, cvv) {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    const cvvRegex = /^\d{3}$/;

    return cardRegex.test(cardNumber) && expiryRegex.test(expiryDate) && cvvRegex.test(cvv);
}
// Retrieve cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to render cart items on the checkout page
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItemsContainer.innerHTML = '';  // Clear existing cart items
    let totalPrice = 0;

    cartItems.forEach(item => {
        // Create a container for each item
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        itemDetails.innerHTML = `<span class="item-name">${item.name}</span> <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>`;
        cartItemElement.appendChild(itemDetails);

        // Quantity control
        const itemQuantity = document.createElement('div');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.innerHTML = `
            <button class="decrease-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
            <input type="number" class="quantity" value="${item.quantity}" min="1" readonly />
            <button class="increase-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
        `;
        cartItemElement.appendChild(itemQuantity);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => removeItem(item.name);
        cartItemElement.appendChild(deleteBtn);

        // Append item to the cart
        cartItemsContainer.appendChild(cartItemElement);

        // Add to total price
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to update the quantity of an item
function updateQuantity(itemName, change) {
    cartItems.forEach(item => {
        if (item.name === itemName) {
            item.quantity = Math.max(1, item.quantity + change);  // Ensure quantity is at least 1
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();  // Re-render the cart items after quantity change
}

// Function to remove an item from the cart
function removeItem(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();  // Re-render the cart items after deletion
}

// Initial render of cart items
renderCartItems();

// Checkout form submission (you can customize this further)
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Order placed successfully!');
    // Optionally, you can clear the cart after a successful order
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();  // Re-render the cart after clearing
});


