document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('gamma-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalCloseBtn = document.querySelector('.modal-close');

    const modalImg = document.getElementById('modal-image');
    const modalLoc = document.getElementById('modal-loc');
    const modalDate = document.getElementById('modal-date');
    const modalAstro = document.getElementById('modal-astro');

    fetch('data/gallery.json')
        .then(response => response.json())
        .then(data => {
            buildGallery(data);
        })
        .catch(error => console.error('Erreur lors du chargement des archives Gamma:', error));

    function buildGallery(imagesData) {
        let htmlContent = '';

        imagesData.forEach(item => {
            htmlContent += `
                <div class="item ${item.sizeClass} ${item.directionClass}" data-speed="${item.speed}">
                    <img class="image gallery-trigger" 
                         src="${item.src}" 
                         alt="Archive Kepler" 
                         data-loc="${item.location}"
                         data-date="${item.date}"
                         data-astro="${item.astronaut}">
                </div>
            `;
        });

        galleryContainer.innerHTML = htmlContent;
        initModalEvents();
    }

    function initModalEvents() {
        const triggers = document.querySelectorAll('.gallery-trigger');

        triggers.forEach(img => {
            img.addEventListener('click', (e) => {
                lenis.stop();

                modalImg.src = e.target.src;
                modalLoc.textContent = e.target.getAttribute('data-loc');
                modalDate.textContent = e.target.getAttribute('data-date');
                modalAstro.textContent = e.target.getAttribute('data-astro');

                modal.classList.remove('hidden');
            });
        });

        // Fermer la modale
        const closeModal = () => {
            modal.classList.add('hidden');
            lenis.start();

            setTimeout(() => { modalImg.src = ''; }, 400);
        };

        modalBackdrop.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);

        // Fermeture avec la touche Echap
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    const galleryWrapper = document.querySelector('.gallery-wrapper');

    lenis.on('scroll', () => {
        if (!galleryWrapper || !galleryContainer) return;

        if (window.innerWidth > 950) {
            const rect = galleryWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0) {
                let progress = -rect.top / (rect.height - windowHeight);
                progress = Math.max(0, Math.min(1, progress));

                const maxScroll = galleryContainer.scrollWidth - window.innerWidth;
                const translateX = progress * maxScroll;

                galleryContainer.style.transform = `translate3d(-${translateX}px, 0, 0)`;
            }
        } else {
            if (galleryContainer.style.transform) {
                galleryContainer.style.transform = '';
            }
        }
    });
});