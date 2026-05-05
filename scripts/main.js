
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
const projectDialogCta = document.getElementById('project-dialog-cta');
const projectDialogClose = document.getElementById('project-dialog-close');
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
    if (!projectDialog || !projectDialogFrame || !projectDialogTitle || !projectDialogCta) return;
    if (projectLinks.length === 0) return;

    const safeIndex = (index + projectLinks.length) % projectLinks.length;
    const link = projectLinks[safeIndex];
    const projectUrl = link.getAttribute('href');
    const projectTitle = link.dataset.projectTitle || 'Project';
    const projectLiveUrl = link.dataset.projectLiveUrl || '';
    const projectLiveLabel = link.dataset.projectLiveLabel || 'Visit site';
    if (!projectUrl) return;

    activeProjectIndex = safeIndex;
    projectDialogTitle.textContent = projectTitle;
    projectDialogFrame.src = projectUrl;
    projectDialogCta.textContent = projectLiveLabel;
    if (projectLiveUrl) {
        projectDialogCta.href = projectLiveUrl;
        projectDialogCta.classList.remove('is-hidden');
    } else {
        projectDialogCta.removeAttribute('href');
        projectDialogCta.classList.add('is-hidden');
    }
    projectDialog.dataset.activeProject = projectTitle;
    projectDialog.showModal();
    projectDialog.classList.remove('is-closing');
    document.body.classList.add('dialog-open');
}

if (projectDialog && projectDialogFrame && projectDialogTitle && projectDialogCta && projectDialogClose) {
    projectLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectAt(index);
        });
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

    projectDialog.addEventListener('close', () => {
        window.clearTimeout(closeTimerId);
        projectDialog.classList.remove('is-closing');
        projectDialogFrame.removeAttribute('src');
        document.body.classList.remove('dialog-open');
    });
}

/**
 * Contact form async submit (stay on panel, show status)
 */
const contactForm = document.getElementById('contact-form');
const contactFormStatus = document.getElementById('contact-form-status');

if (contactForm && contactFormStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('.contact-submit');
        const originalButtonText = submitButton ? submitButton.textContent : '';
        const endpoint = contactForm.getAttribute('action');
        if (!endpoint) return;

        contactFormStatus.textContent = '';
        contactFormStatus.className = 'contact-form-status';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Submit failed');
            }

            contactFormStatus.textContent = 'Message sent!';
            contactFormStatus.className = 'contact-form-status is-success';
            contactForm.reset();
        } catch (error) {
            contactFormStatus.textContent = 'Something went wrong. Please try again.';
            contactFormStatus.className = 'contact-form-status is-error';
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}
