const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    } else {
        img.src = src;
    }
}

let options = {
    root: null,
    rootMargin: "100px 0px",
    threshold: 0.01,
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}, options);

images.forEach((image) => {
    imgObserver.observe(image);
});