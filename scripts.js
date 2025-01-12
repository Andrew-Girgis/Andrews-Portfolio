function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the theme on the html element
    html.setAttribute('data-theme', newTheme);
    
    // Save the theme preference in localStorage
    localStorage.setItem('theme', newTheme);
}

// Restore theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Optional: Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sending functionality to be implemented!');
            contactForm.reset();
        });
    }
});

// Add event listener for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the theme on the html element
    html.setAttribute('data-theme', newTheme);
    
    // Save the theme preference in localStorage
    localStorage.setItem('theme', newTheme);
}

// Restore theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Optional: Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sending functionality to be implemented!');
            contactForm.reset();
        });
    }
});

// Add event listener for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});