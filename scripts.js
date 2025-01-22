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
    const storedTheme = localStorage.getItem('data-theme');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
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
            "images/DALLE_me.jpg", // Alternate image 1
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