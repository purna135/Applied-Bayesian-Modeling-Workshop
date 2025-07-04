document.addEventListener('DOMContentLoaded', function () {
    // Terms checkbox and button handling
    const termsCheckbox = document.getElementById('termsCheckbox');
    const enrollBtn = document.getElementById('enroll-now');
    const termsMessage = document.getElementById('termsMessage');
    const courseCard = document.querySelector('.course-card');
    const paymentUrl = enrollBtn ? enrollBtn.href : '';

    // Function to handle button click
    function handleEnrollClick(e) {
        e.preventDefault();
        
        if (!termsCheckbox || !termsCheckbox.checked) {
            if (termsMessage) termsMessage.style.display = 'block';
            setTimeout(() => {
                if (termsMessage) termsMessage.style.display = 'none';
            }, 2000);
            return false;
        }
        
        // If checkbox is checked, allow the link to work
        if (paymentUrl) window.open(paymentUrl, '_blank');
    }

    // Add click event listener to the button
    if (enrollBtn) enrollBtn.addEventListener('click', handleEnrollClick);

    // Handle checkbox change
    if (termsCheckbox && enrollBtn) {
        termsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if (termsMessage) termsMessage.style.display = 'none';
                enrollBtn.classList.add('active');
            } else {
                enrollBtn.classList.remove('active');
            }
        });
    }

    // Handle header enrollment anchor link click
    const headerEnrollLink = document.querySelector('a[href="#enroll-now"]');
    if (headerEnrollLink && courseCard) {
        headerEnrollLink.addEventListener('click', function() {
            // Show terms message and highlight the course card after a short delay
            setTimeout(() => {
                courseCard.classList.add('highlight');
                if (termsMessage) {
                    termsMessage.style.display = 'block';
                    termsMessage.textContent = 'Please accept the terms to continue';
                }
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    courseCard.classList.remove('highlight');
                }, 3000);
            }, 500);
        });
    }

    // Expand/collapse instructor bios
    document.querySelectorAll('.bio-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var bioContainer = btn.closest('.instructor-card__bio');
            if (bioContainer) {
                bioContainer.classList.toggle('expanded');
                btn.classList.toggle('open');
                if (bioContainer.classList.contains('expanded')) {
                    btn.setAttribute('aria-label', 'Show less');
                } else {
                    btn.setAttribute('aria-label', 'Show more');
                }
            }
        });
    });

    // Simple carousel logic for testimonials
    const slides = [
        {
            text: "I think the overall organization is great -- the lectures, course materials, the chat. Thank you for always answering questions even if they take the time away from the main material -- your answers really help!",
            img: 'images/workshop-imgs/workshop-1.jpg'
        },
        {
            text: "I have a much better appreciation of hierarchical modeling and how to deal with / debug diverging models. I also got some great insight into the problem I'm working on regarding time series.",
            img: 'images/workshop-imgs/workshop-2.jpg'
        },
        {
            text: "Thanks for the great engagement over discord - I've found this really useful.",
            img: 'images/workshop-imgs/workshop-3.jpg'
        },
        {
            text: "Before the workshop I was only loosely familiar with Bayesian analysis. Now I feel much more confident about the core concepts and for me the most important learning was understanding hierarchical models",
            img: 'images/workshop-imgs/workshop-4.jpg'
        },
        {
            text: "A great and practical introduction to the Bayesian way of life!",
            img: 'images/workshop-imgs/workshop-5.jpg'
        },
        {
            text: "This course makes Bayesian analysis really accessible. I struggled with understanding books about Bayesian statistics, but being guided by the experts made a huge difference. There were many of the 'click' moments and Bayesian statistics started making sense to me.",
            img: 'images/workshop-imgs/workshop-6.jpg'
        }
    ];
    let current = 0;
    const textEl = document.querySelector('.testimonial-text p');
    const imgEl = document.querySelector('.testimonial-image img');
    const dots = document.querySelectorAll('.testimonial-dot');
    const left = document.querySelector('.testimonial-arrow--left');
    const right = document.querySelector('.testimonial-arrow--right');
    let interval;

    function showSlide(idx) {
        if (!textEl || !imgEl || dots.length === 0) return;
        textEl.textContent = slides[idx].text;
        imgEl.src = slides[idx].img;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
        current = idx;
    }
    function nextSlide() { showSlide((current + 1) % slides.length); }
    function prevSlide() { showSlide((current - 1 + slides.length) % slides.length); }
    function startAuto() { interval = setInterval(nextSlide, 3000); }
    function stopAuto() { clearInterval(interval); }

    if (left && right && dots.length > 0 && textEl && imgEl) {
        left.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });
        right.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { stopAuto(); showSlide(i); startAuto(); });
        });
        showSlide(0);
        startAuto();
    }

    // FAQ accordion logic
    document.querySelectorAll('.faq__question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.closest('.faq__item');
            if (item) item.classList.toggle('open');
        });
    });

    // Countdown timer for course start date
    const timerEl = document.getElementById('course-timer');
    function updateCourseTimer() {
        if (!timerEl) return;
        const startDate = new Date('2025-08-02T15:00:00Z');
        const now = new Date();
        let diff = Math.max(0, startDate - now);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const mins = Math.floor(diff / (1000 * 60));
        diff -= mins * (1000 * 60);
        const secs = Math.floor(diff / 1000);
        timerEl.textContent = `${days}D : ${String(hours).padStart(2, '0')}H : ${String(mins).padStart(2, '0')}M : ${String(secs).padStart(2, '0')}S`;
    }
    if (timerEl) {
        updateCourseTimer();
        setInterval(updateCourseTimer, 1000);
    }
});