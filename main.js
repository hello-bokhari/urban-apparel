let currentIndex = 0;
const images = document.querySelectorAll('#carousel img');

function showNextImage() {
    images[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.remove('hidden');
}

setInterval(showNextImage, 3000);

function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.classList.toggle('show');
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
});

// Add to Cart functionality
document.querySelectorAll('.product-item button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = button.parentElement.getAttribute('data-name');
        alert(`${productName} added to cart!`);
    });
});
