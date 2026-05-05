
/**
 * Panel Functions for Navigation Windows (About, Contact)
 */

const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;
const themeToggleLabel = themeToggle ? themeToggle.querySelector('.theme-toggle-label') : null;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.body.classList.toggle('theme-dark', initialTheme === 'dark');
document.documentElement.classList.toggle('theme-dark', initialTheme === 'dark');

function syncThemeToggleUi() {
    if (!themeToggle || !themeToggleIcon || !themeToggleLabel) return;
    const isDark = document.body.classList.contains('theme-dark');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
    themeToggleLabel.textContent = isDark ? 'Light' : 'Dark';
}

syncThemeToggleUi();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-dark');
        document.documentElement.classList.toggle('theme-dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        syncThemeToggleUi();
    });
}

const rotatingText = document.getElementById('hero-rotating-text');
if (rotatingText) {
    const words = (rotatingText.dataset.words || '')
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean);

    if (words.length > 1) {
        let idx = Math.max(0, words.indexOf(rotatingText.textContent.trim()));

        window.setInterval(() => {
            rotatingText.classList.add('is-switching');
            window.setTimeout(() => {
                idx = (idx + 1) % words.length;
                rotatingText.textContent = words[idx];
                rotatingText.classList.remove('is-switching');
            }, 240);
        }, 2400);
    }
}

const header = document.querySelector('header');
function setHeaderHeightVar() {
    if (!header) return;
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

setHeaderHeightVar();
window.addEventListener('resize', setHeaderHeightVar);


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

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.panel.open').forEach((panel) => {
        panel.classList.remove('open');
    });
});

/**
 * Dialog Popup for Project Pages
 */

const projectDialog = document.getElementById('project-dialog');
const projectDialogFrame = document.getElementById('project-dialog-frame');
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
    if (!projectDialog || !projectDialogFrame || !projectDialogCta) return;
    if (projectLinks.length === 0) return;

    const safeIndex = (index + projectLinks.length) % projectLinks.length;
    const link = projectLinks[safeIndex];
    const projectUrl = link.getAttribute('href');
    const projectTitle = link.dataset.projectTitle || 'Project';
    const projectLiveUrl = link.dataset.projectLiveUrl || '';
    const projectLiveLabel = link.dataset.projectLiveLabel || 'Visit site';
    if (!projectUrl) return;

    activeProjectIndex = safeIndex;
    projectDialogFrame.src = projectUrl;
    projectDialog.setAttribute('aria-label', `${projectTitle} details`);
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

if (projectDialog && projectDialogFrame && projectDialogCta && projectDialogClose) {
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
