document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const submenu = document.querySelector('.submenu');

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('active');
    });
});
