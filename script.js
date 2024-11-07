// Array to store the titles of the sections
const sectionTitles = [
    "Clément Moal",  // Title for the Introduction section
    "Photogrammétries", 
    "Stage 2023", 
    "Digital Painting", 
    "Rendus Volumétriques", 
    "Design Fiction", 
    "Drone Minier"
];

// Get all the sections and the title container for the arrows
const sections = document.querySelectorAll('section');
const sectionTitleElement = document.getElementById('section-title');

// Function to update the section title based on the current section
function updateSectionTitle() {
    let currentSectionIndex = -1;
    
    // Find which section is currently in view
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Update the title between the arrows
    if (currentSectionIndex !== -1) {
        sectionTitleElement.textContent = sectionTitles[currentSectionIndex];
    }
}

function scrollToSection(direction) {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const currentSection = window.scrollY + window.innerHeight / 2;

    let currentSectionIndex = -1;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (currentSection >= sectionTop && currentSection < sectionTop + sectionHeight) {
            currentSectionIndex = index;
        }
    });

    let targetSectionIndex;
    if (direction === 'down') {
        targetSectionIndex = currentSectionIndex + 1;
        if (targetSectionIndex >= sections.length) targetSectionIndex = sections.length - 1;
    } else {
        targetSectionIndex = currentSectionIndex - 1;
        if (targetSectionIndex < 0) targetSectionIndex = 0;
    }

    if (targetSectionIndex >= 0 && targetSectionIndex < sections.length) {
        const targetSection = sections[targetSectionIndex];
        // Adjusting scroll position by subtracting a bit (e.g., 60px) for higher scrolling
        window.scrollTo({
            top: targetSection.offsetTop - (window.innerHeight / 10), // Lower the section a bit
            behavior: 'smooth'
        });
    }
}


// Add scroll event listener to update the title dynamically when scrolling
window.addEventListener('scroll', updateSectionTitle);

// Add click event listeners to the arrow buttons for scrolling
document.querySelector('.arrow-up').addEventListener('click', function() {
    scrollToSection('up');
});

document.querySelector('.arrow-down').addEventListener('click', function() {
    scrollToSection('down');
});

// Initialize the section title on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSectionTitle();  // Set the initial title when the page is loaded
});
