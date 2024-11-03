document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const slideNav = document.querySelector('.slide-nav');
    const menuClose = document.querySelector('.menu-close');
    const overlay = document.querySelector('.menu-overlay');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const eventContainer = document.querySelector('.event-container');
    const events = document.querySelectorAll('.event-card');
    let currentIndex = 0;
    const totalEvents = events.length;

    // Open menu
    menuBtn.addEventListener('click', function() {
        slideNav.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu
    function closeMenu() {
        slideNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Toggle menu when the menu button is clicked
    menuBtn.addEventListener('click', function(event) {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close the menu if clicking outside (on the overlay)
    overlay.addEventListener('click', function() {
        closeMenu();
    });

    // Prevent submenu clicks from closing the menu
    const submenu = document.querySelector('.submenu');
    submenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    
    // Fixed dropdown functionality
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the parent dropdown element
            const dropdownParent = this.closest('li');
            
            // Find the submenu within this dropdown
            const submenu = dropdownParent.querySelector('.submenu');
            
            // Toggle the active class on the parent dropdown
            dropdownParent.classList.toggle('active');
            
            // Toggle the submenu display
            if (submenu) {
                if (dropdownParent.classList.contains('active')) {
                    submenu.style.display = 'block';
                } else {
                    submenu.style.display = 'none';
                }
            }
            
            // Rotate arrow
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = dropdownParent.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });
    });
    
        

    function showEvent(index) {
        if (index < 0) {
            currentIndex = totalEvents - 1;
        } else if (index >= totalEvents) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const offset = -(currentIndex * (100 / totalEvents));
        eventContainer.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        showEvent(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showEvent(currentIndex + 1);
    });

    // Initialize the carousel
    showEvent(0);


    // testimonial
    // Add window resize listener to ensure carousel adjusts when resized
    window.addEventListener('resize', () => {
        showEvent(currentIndex); // Recalculate the position on window resize
    });

    window.showTestimonial = function(testimonialNumber) {
        const testimonials = document.querySelectorAll('.testimonial-content');
        const dots = document.querySelectorAll('.dot');
        const currentTestimonial = document.querySelector('.testimonial-content.active-testimonial');
        const newTestimonial = document.getElementById(`testimonial-${testimonialNumber}`);

        if (currentTestimonial === newTestimonial) return; // Don't animate if it's already active

        // Slide out the current testimonial
        if (currentTestimonial) {
            currentTestimonial.style.transform = 'translateX(-50px)';
            currentTestimonial.style.opacity = '0';
            
            setTimeout(() => {
                currentTestimonial.classList.remove('active-testimonial');
                currentTestimonial.style.display = 'none';
                currentTestimonial.style.transform = 'translateX(50px)'; // Reset for next time
            }, 500); // Match this to the CSS transition duration
        }

        // Slide in the new testimonial
        setTimeout(() => {
            newTestimonial.style.display = 'block';
            newTestimonial.classList.add('active-testimonial');
            
            // Trigger reflow to ensure the transition happens
            newTestimonial.offsetHeight;
            
            newTestimonial.style.opacity = '1';
            newTestimonial.style.transform = 'translateX(0)';
        }, currentTestimonial ? 500 : 0); // Delay if there's a current testimonial sliding out

        // Update active states
        testimonials.forEach(t => t.classList.remove('active-testimonial'));
        dots.forEach(d => d.classList.remove('active'));
        dots[testimonialNumber - 1].classList.add('active');
    }


    // Get all cards
    const cards = document.querySelectorAll('.card');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate cards sequentially
    function animateCards() {
        cards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('slide-in')) {
                // Add slide-in class with a delay based on card index
                setTimeout(() => {
                    card.classList.add('slide-in');
                }, index * 200); // 200ms delay between each card
            }
        });
    }

    // Run animation on page load
    animateCards();

    // Run animation on scroll
    window.addEventListener('scroll', animateCards);


    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const submenu = dropdown.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            }
        });
    });
});


  