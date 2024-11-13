function toggleAnswer(questionElement) {
    const answerElement = questionElement.nextElementSibling;
    if (answerElement.style.display === "block") {
        answerElement.style.display = "none";
    } else {
        answerElement.style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const scrollElements = document.querySelectorAll('.scroll, .scrollc');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 150)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

