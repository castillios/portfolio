// function openPanel() {

// };

const aboutLink = document.querySelector('nav a[href="#about"]');
const aboutPanel = document.querySelector('about-panel')

aboutButton.addEventListener('click', (e) => {
    e.preventDefault();
    aboutPanel.classList.toggle('open')
});

document.addEventListener('click', (e) => {
    if (!aboutPanel.contains(e.target) && !aboutButton.contains(e.target)) {
        aboutPanel.classList.remove('open');
    }
});