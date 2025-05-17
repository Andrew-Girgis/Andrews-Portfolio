document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    const milestones = document.querySelectorAll('.milestone');
    const progressBar = document.querySelector('.timeline-progress');
    const statusElement = document.getElementById('timeline-status');

    // Set up Intersection Observer
    const options = {
        root: timeline,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all milestones
                milestones.forEach(m => m.classList.remove('active'));
                // Add active class to current milestone
                entry.target.classList.add('active');
                // Update status for screen readers
                const title = entry.target.querySelector('.title').textContent;
                const time = entry.target.querySelector('time').textContent;
                statusElement.textContent = `Viewing ${title} from ${time}`;
            }
        });
    }, options);

    // Observe all milestones
    milestones.forEach(milestone => {
        observer.observe(milestone);
    });

    // Update progress bar
    function updateProgress() {
        if (timeline.scrollWidth === timeline.clientWidth) {
            // Hide progress bar if no scrolling is needed
            progressBar.style.display = 'none';
            return;
        }

        const progress = (timeline.scrollLeft / (timeline.scrollWidth - timeline.clientWidth)) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressBar.style.display = 'block';

        // For mobile view
        if (window.innerWidth <= 600) {
            const verticalProgress = (timeline.scrollTop / (timeline.scrollHeight - timeline.clientHeight)) * 100;
            progressBar.style.setProperty('--progress', `${verticalProgress}%`);
        }
    }

    // Add scroll event listener
    timeline.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    // Keyboard navigation
    timeline.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const direction = e.key === 'ArrowRight' ? 1 : -1;
            const scrollAmount = direction * 300; // Width of milestone
            timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    // Touch events for mobile swipe
    let touchStart = null;
    let touchX = null;
    let touchY = null;

    timeline.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
        touchX = touchStart;
        touchY = e.touches[0].clientY;
    });

    timeline.addEventListener('touchmove', (e) => {
        if (!touchStart) return;

        const touch = e.touches[0];
        const deltaX = touchX - touch.clientX;
        const deltaY = touchY - touch.clientY;

        // Determine scroll direction based on device orientation
        if (window.innerWidth <= 600) {
            timeline.scrollTop += deltaY;
        } else {
            timeline.scrollLeft += deltaX;
        }

        touchX = touch.clientX;
        touchY = touch.clientY;
        e.preventDefault();
    });

    timeline.addEventListener('touchend', () => {
        touchStart = null;
        touchX = null;
        touchY = null;
    });

    // Initial progress update
    updateProgress();
}); 