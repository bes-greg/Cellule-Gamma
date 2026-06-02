const loadingScreen = document.querySelector('.loadingScreen');
const loaderTitle = document.querySelector('.loader-title');
let numberOfDots = 0;
let generatorTimeout = null;

function genererDot() {
    if (numberOfDots < 8 && loadingScreen && !loadingScreen.classList.contains('fade-out')) {
        let dot = document.createElement('div');
        let classes = ['dotLight', 'dotPrimary', 'dotDark'];
        let randomClass = classes[Math.floor(Math.random() * classes.length)];
        dot.classList.add('dot');
        dot.classList.add(randomClass);

        loadingScreen.appendChild(dot);
        numberOfDots++;

        let randomX = Math.random() * (window.innerWidth - 20);
        dot.style.left = randomX + 'px';
        dot.style.top = '-100px';

        const hauteurDescente = window.innerHeight + 160;

        const animation = dot.animate([
            { transform: 'translateY(0px)' },
            { transform: `translateY(${hauteurDescente}px)` }
        ], {
            duration: 4000,
            easing: 'linear'
        });

        animation.onfinish = () => {
            dot.remove();
            numberOfDots--;
        };
    }
    let prochainDelai = Math.random() * (800 - 150) + 150;
    generatorTimeout = setTimeout(genererDot, prochainDelai);
}

genererDot();

const startTime = Date.now();
window.addEventListener('load', () => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1250 - elapsedTime);

    setTimeout(() => {
        if (loaderTitle) {
            loaderTitle.classList.add('fade-out-title');
        }

        const activeDots = document.querySelectorAll('.loadingScreen .dot');
        activeDots.forEach((dot) => {
            const randomDelay = Math.random() * 400;
            dot.style.transition = `opacity 0.4s ease-out ${randomDelay}ms`;

            requestAnimationFrame(() => {
                dot.style.opacity = '0';
            });
        });

        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');

                setTimeout(() => {
                    clearTimeout(generatorTimeout);
                    document.querySelectorAll('.loadingScreen .dot').forEach(el => el.remove());

                    document.querySelectorAll('.fade-element').forEach(el => {
                        el.classList.add('fade-in-content');
                    });
                }, 600);
            }
        }, 600);

    }, remainingTime);
});