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

// Checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create and show confirmation message for 2 seconds
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = `Thank you for your order! Your order has been placed.`;
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.remove();
        // Redirect to index.html after 2 seconds
        window.location.href = 'index.html';
    }, 2000);

    //clear the cart after a successful order
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();  // Re-render the cart after clearing

    // Clear the form after submission
    document.getElementById('checkoutForm').reset();  // This resets all form fields
});

