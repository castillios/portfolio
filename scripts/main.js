console.log("script loaded");

const header = document.querySelector('header');
document.documentElement.style.setProperty('--header-height',  header.offsetHeight + 'px');


function togglePanel(panelId) {
    document.querySelectorAll('.panel').forEach(p => {
        if (p.id !== panelId) p.classList.remove('open');
    });
    
    const panel = document.getElementById(panelId);
    panel.classList.toggle('open');
}

document.querySelectorAll('a[data-panel]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        togglePanel(link.dataset.panel)
    })
})

document.addEventListener('click', (e) => {
    if(!e.target.closest('panel') && !e.target.closest('a[data-panel]')) {
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('open')
        })
    }
})

// aboutLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     aboutPanel.classList.toggle('open')
// });

// document.addEventListener('click', (e) => {
//     if (!aboutPanel.contains(e.target) && !aboutLink.contains(e.target)) {
//         aboutPanel.classList.remove('open');
//     }
// });