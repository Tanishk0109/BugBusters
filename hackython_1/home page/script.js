const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const logout = document.getElementById('logout');
const cards = document.querySelectorAll('.card');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

logout.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out.');
        // Here you would typically redirect to a login page or perform actual logout logic
    }
});

// Close mobile menu when a link is clicked
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('show');
    }
});

// Page redirection for nav items and cards
function redirectToPage(pageName) {
    // In a real application, you would redirect to actual pages
    alert(`Redirecting to ${pageName} page`);
    window.location.href = `module/${pageName}.html`;  // Corrected line for redirection
}

navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.id !== 'logout') {
        e.preventDefault();
        const pageName = e.target.getAttribute('href').substring(1);
        redirectToPage(pageName);
    }
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        const pageName = card.getAttribute('data-page');
        redirectToPage(pageName);
    });
});