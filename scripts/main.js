
/**
 * Panel Functions for Navigation Windows (About, Contact)
 */

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
    if(!e.target.closest('.panel') && !e.target.closest('a[data-panel]')) {
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('open')
        })
    }
})

/**
 * Dialog Popup for Project Pages
 */

const projectDialog = document.getElementById('project-dialog');
const projectDialogFrame = document.getElementById('project-dialog-frame');
const projectDialogTitle = document.getElementById('project-dialog-title');
const projectDialogClose = document.getElementById('project-dialog-close');
const projectDialogPrev = document.getElementById('project-dialog-prev');
const projectDialogNext = document.getElementById('project-dialog-next');
const projectLinks = [...document.querySelectorAll('.project-link')];
let activeProjectIndex = -1;
let closeTimerId = null;

function closeProjectDialog() {
    if (!projectDialog || !projectDialog.open) return;
    if (projectDialog.classList.contains('is-closing')) return;
    projectDialog.classList.add('is-closing');
    window.clearTimeout(closeTimerId);
    closeTimerId = window.setTimeout(() => {
        projectDialog.close();
    }, 220);
}

function openProjectAt(index) {
    if (!projectDialog || !projectDialogFrame || !projectDialogTitle) return;
    if (projectLinks.length === 0) return;

    const safeIndex = (index + projectLinks.length) % projectLinks.length;
    const link = projectLinks[safeIndex];
    const projectUrl = link.getAttribute('href');
    const projectTitle = link.dataset.projectTitle || 'Project';
    if (!projectUrl) return;

    activeProjectIndex = safeIndex;
    projectDialogTitle.textContent = projectTitle;
    projectDialogFrame.src = projectUrl;
    projectDialog.dataset.activeProject = projectTitle;
    projectDialog.showModal();
    projectDialog.classList.remove('is-closing');
    document.body.classList.add('dialog-open');
}

if (projectDialog && projectDialogFrame && projectDialogTitle && projectDialogClose && projectDialogPrev && projectDialogNext) {
    projectLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectAt(index);
        });
    });

    projectDialogPrev.addEventListener('click', () => {
        openProjectAt(activeProjectIndex - 1);
    });

    projectDialogNext.addEventListener('click', () => {
        openProjectAt(activeProjectIndex + 1);
    });

    projectDialogClose.addEventListener('click', closeProjectDialog);

    projectDialog.addEventListener('click', (e) => {
        const shell = projectDialog.querySelector('.project-dialog-shell');
        if (shell && !shell.contains(e.target)) {
            closeProjectDialog();
        }
    });

    projectDialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeProjectDialog();
    });

    projectDialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            openProjectAt(activeProjectIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            openProjectAt(activeProjectIndex + 1);
        }
    });

    projectDialog.addEventListener('close', () => {
        window.clearTimeout(closeTimerId);
        projectDialog.classList.remove('is-closing');
        projectDialogFrame.removeAttribute('src');
        document.body.classList.remove('dialog-open');
    });
}
