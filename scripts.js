function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    // Save the selected theme to localStorage
    localStorage.setItem('data-theme', newTheme);
}

// Function to load the theme from localStorage
function loadTheme() {
    const storedTheme = localStorage.getItem('data-theme') || 'light'; // Default to light if no theme stored
    document.documentElement.setAttribute('data-theme', storedTheme);
    
    // Set checkbox state to match theme
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        checkbox.checked = storedTheme === 'light';
    }
}

    (function() {
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...arguments) => {
                if (!window.chatbase.q) {
                    window.chatbase.q = [];
                }
                window.chatbase.q.push(arguments);
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") {
                        return target.q;
                    }
                    return (...args) => target(prop, ...args);
                }
            });
        }
        const onLoad = function() {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "rGFa1z4pdznTdQEMcVvNm";
            script.domain = "www.chatbase.co";
            document.body.appendChild(script);
        };
        if (document.readyState === "complete") {
            onLoad();
        } else {
            window.addEventListener("load", onLoad);
        }
    })();

    function changeProfilePicture() {
        // Array of image paths to switch between
        const images = [
            "images/AndrewPhoto.jpg",  // Original image
            "images/Andrew_HxH.png",
            "images/Andrew_juju.png", // Alternate image 
            "images/Andrew_solo.png",
            
        ];

        // Get the image element
        const profilePic = document.getElementById('profile-pic');
        
        // Get current image source
        let currentImage = profilePic.getAttribute('src');
        
        // Find index of current image in the array
        let index = images.indexOf(currentImage);
        
        // Get the next image (loop back if at the end)
        let nextIndex = (index + 1) % images.length;
        
        // Set new image source
        profilePic.setAttribute('src', images[nextIndex]);
    }

    function changeIcon() {
        // Array of image paths to switch between
        const images = [
            "images/Cartoon_me_blue.png",  // Original image
            "images/Cartoon_me_red.png", // Alternate image 1
            "images/Cartoon_me_green.png", // Alternate image 2
            "images/Cartoon_me_polo.png", // Alternate image 2
            "images/Cartoon_me_suit.png", // Alternate image 3
        ];

        // Get the image element
        const navIcon = document.getElementById('nav-icon');
        
        // Get current image source
        let currentImage = navIcon.getAttribute('src');
        
        // Find index of current image in the array
        let index = images.indexOf(currentImage);
        
        // Get the next image (loop back if at the end)
        let nextIndex = (index + 1) % images.length;
        
        // Set new image source
        navIcon.setAttribute('src', images[nextIndex]);

        // Save the selected image to localStorage
        localStorage.setItem('navIcon', images[nextIndex]);
    }

    // Function to load the stored icon from localStorage
    function loadNavIcon() {
        const storedIcon = localStorage.getItem('navIcon');
        if (storedIcon) {
            document.getElementById('nav-icon').setAttribute('src', storedIcon);
        }
    }

     // Run function when the page loads
    window.addEventListener('load', loadTheme);
    window.addEventListener('load', loadNavIcon);

    // Video loading handler
    document.addEventListener('DOMContentLoaded', function() {
        const video = document.getElementById('myVideo');
        if (video) {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
            });

            video.addEventListener('loadeddata', function() {
                console.log("Video loaded successfully");
            });

            video.addEventListener('error', function() {
                console.log("Video error:", video.error);
            });
        } else {
            console.log("Video element not found");
        }
    });

    function toggleMute() {
        const video = document.getElementById('myVideo');
        const muteButton = document.getElementById('muteButton');
        const volumeSlider = document.getElementById('volumeSlider');
        const sliderContainer = document.querySelector('.volume-slider-container');
        
        if (video.muted) {
            video.muted = false;
            muteButton.classList.add('unmuted');
            sliderContainer.classList.add('show');
            video.volume = volumeSlider.value;
        } else {
            video.muted = true;
            muteButton.classList.remove('unmuted');
            sliderContainer.classList.remove('show');
        }
    }

    function handleVolumeChange(e) {
        const video = document.getElementById('myVideo');
        const muteButton = document.getElementById('muteButton');
        const sliderContainer = document.querySelector('.volume-slider-container');
        
        video.volume = e.target.value;
        
        if (video.volume === 0) {
            video.muted = true;
            muteButton.classList.remove('unmuted');
            sliderContainer.classList.remove('show');
        } else if (video.muted) {
            video.muted = false;
            muteButton.classList.add('unmuted');
            sliderContainer.classList.add('show');
        }
    }

    function togglePlayPause() {
        const video = document.getElementById('myVideo');
        const playPauseButton = document.getElementById('playPauseButton');
        
        if (video.paused) {
            video.play();
            playPauseButton.classList.remove('paused');
        } else {
            video.pause();
            playPauseButton.classList.add('paused');
        }
    }

    // Add event listeners for video and play/pause button
    document.addEventListener('DOMContentLoaded', function() {
        const video = document.getElementById('myVideo');
        const muteButton = document.getElementById('muteButton');
        const playPauseButton = document.getElementById('playPauseButton');
        const volumeSlider = document.getElementById('volumeSlider');
        
        if (video && muteButton && playPauseButton && volumeSlider) {
            // Existing mute functionality
            video.muted = true;
            muteButton.classList.remove('unmuted');
            
            // Add click handler to the mute button
            muteButton.addEventListener('click', toggleMute);
            
            // Add volume slider handler
            volumeSlider.addEventListener('input', handleVolumeChange);
            
            // Add click handler to the play/pause button
            playPauseButton.addEventListener('click', togglePlayPause);
            
            // Update button state when video plays/pauses
            video.addEventListener('play', function() {
                playPauseButton.classList.remove('paused');
            });
            
            video.addEventListener('pause', function() {
                playPauseButton.classList.add('paused');
            });

            video.play().catch(function(error) {
                console.log("Video play failed:", error);
                playPauseButton.classList.add('paused');
            });

            // Store initial volume
            video.volume = volumeSlider.value;

            video.addEventListener('loadeddata', function() {
                console.log("Video loaded successfully");
            });

            video.addEventListener('error', function() {
                console.log("Video error:", video.error);
            });
        } else {
            console.log("Video or control elements not found");
        }
    });

    // Modal functionality
    document.addEventListener('DOMContentLoaded', function() {
        const infoButton = document.getElementById('infoButton');
        const modal = document.getElementById('infoModal');
        const closeButton = modal.querySelector('.close-button');

        // Open modal
        infoButton.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        // Close modal
        closeButton.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // Theme Switch Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const checkbox = document.getElementById('checkbox');
        
        // Set initial state based on localStorage or default to light
        const currentTheme = localStorage.getItem('data-theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        checkbox.checked = currentTheme === 'light';
        
        // Add change event listener
        checkbox.addEventListener('change', function() {
            const html = document.documentElement;
            const newTheme = this.checked ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('data-theme', newTheme);
        });
    });

    // Navbar glow effect
    document.addEventListener('DOMContentLoaded', () => {
        const nav = document.querySelector('nav');
        let isMouseOverNav = false;

        nav.addEventListener('mouseenter', () => {
            isMouseOverNav = true;
            nav.style.setProperty('--glow-opacity', '1');
        });

        nav.addEventListener('mouseleave', () => {
            isMouseOverNav = false;
            nav.style.setProperty('--glow-opacity', '0');
        });

        nav.addEventListener('mousemove', (e) => {
            if (!isMouseOverNav) return;
            
            // Get the relative mouse position within the navbar
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            // Update the CSS custom property
            nav.style.setProperty('--x', `${x}px`);
        });
    });

    // Navbar scroll behavior
    document.addEventListener('DOMContentLoaded', () => {
        const nav = document.querySelector('nav');
        const video = document.querySelector('.video-background');
        let ticking = false;

        function updateNavPosition() {
            const navRect = nav.getBoundingClientRect();
            const videoRect = video.getBoundingClientRect();
            
            // If navbar touches top of viewport AND we haven't scrolled back to video
            if (navRect.top <= 0 && videoRect.bottom < 0) {
                nav.style.position = 'fixed';
                nav.style.top = '0';
            } else {
                // Keep it at bottom of video
                nav.style.position = 'absolute';
                nav.style.top = '100vh';
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateNavPosition();
                });
                ticking = true;
            }
        });

        // Initial position check
        updateNavPosition();
    });