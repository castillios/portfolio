document.querySelectorAll('[data-project-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.project-carousel-track');
    const slides = carousel.querySelectorAll('.project-carousel-slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const status = carousel.querySelector('[data-carousel-status]');

    if (!track || slides.length === 0) return;

    let index = 0;

    function update() {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';

        if (status) {
            status.textContent = (index + 1) + ' / ' + slides.length;
        }

        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index -= 1;
                update();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (index < slides.length - 1) {
                index += 1;
                update();
            }
        });
    }

    update();
});
