document.addEventListener("DOMContentLoaded", () => {
    const textElements = document.querySelectorAll('.hero-text, .propos-text');

    textElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';

        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'word-wrapper';

            [...word].forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'char';
                charSpan.style.setProperty('--delay', `${wordIndex * 0.01}s`);
                wordWrapper.appendChild(charSpan);
            });

            el.appendChild(wordWrapper);
            if (wordIndex < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });
    });
});

window.addEventListener('load', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(
                    entry.target,
                    entry.isIntersecting,
                    entry.intersectionRatio
                );
                entry.target.classList.add('visible');
            }
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const textBlocks = document.querySelectorAll('.hero-text, .propos-text, .slide-in-target');
    console.log(textBlocks);
    textBlocks.forEach(el => observer.observe(el));
});