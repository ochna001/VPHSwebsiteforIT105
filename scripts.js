document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active link
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (entry.isIntersecting) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, {
        threshold: 0.7 // Adjust this value to determine when a section is considered to be in view
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // Sliding functionality for the card container
    const cardContainer = document.getElementById('cardContainer');
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');

    let scrollAmount = 0;
    const cardWidth = 310; // Width of one card including margin

    function moveSlide(direction) {
        const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;

        if (direction === 1) { // Next
            scrollAmount += cardWidth;
            if (scrollAmount > maxScrollLeft) {
                scrollAmount = maxScrollLeft;
            }
        } else { // Previous
            scrollAmount -= cardWidth;
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
        }
        cardContainer.scrollLeft = scrollAmount;
    }

    btnNext.addEventListener('click', () => moveSlide(1));
    btnPrev.addEventListener('click', () => moveSlide(-1));
});
