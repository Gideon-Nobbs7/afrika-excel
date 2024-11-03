document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // The higher the number, the slower the animation
  
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / speed;
  
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 30); // Adjust for smoother or faster animation
        } else {
          counter.innerText = target; // Ensure it reaches the exact target
        }
      };
  
      updateCount();
    });
  });