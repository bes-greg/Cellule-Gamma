document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".discovery-parallax-wrapper");
    const crystal = document.getElementById("js-crystal-target");

    if (!wrapper || !crystal) return;

    let isVisible = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0 });

    observer.observe(wrapper);

    function handleRightParallax() {
        if (!isVisible || window.innerWidth <= 950) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;

        const totalScrollable = wrapperHeight - window.innerHeight;
        const scrollProgress = Math.max(0, Math.min(1, -wrapperTop / totalScrollable));

        const maxTranslation = 450;
        const currentTranslateX = scrollProgress * maxTranslation;

        crystal.style.transform = `translateX(${currentTranslateX}px)`;
    }

    window.addEventListener("scroll", () => {
        window.requestAnimationFrame(handleRightParallax);
    }, { passive: true });
});

