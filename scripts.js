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


// Chat Bubble functionality
        // Simple Chat Widget Functionality
        document.addEventListener('DOMContentLoaded', function() {
            loadTheme();
            
            const chatToggle = document.getElementById('chat-toggle');
            const chatWindow = document.getElementById('chat-window');
            const chatClose = document.getElementById('chat-close');
            const chatInput = document.getElementById('chat-input');
            const chatSend = document.getElementById('chat-send');
            const chatMessages = document.getElementById('chat-messages');
            const starterPrompts = document.getElementById('starter-prompts');
            const statusDiv = document.getElementById('status');

            let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            let sessionInitialized = false;

            function showStatus(message, type = 'info') {
                statusDiv.textContent = message;
                statusDiv.className = `status ${type}`;
                statusDiv.style.display = 'block';
                
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 3000);
            }

            function addMessage(content, isUser = false, streaming = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = isUser ? 'user-message' : 'bot-message';
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                
                if (isUser) {
                    avatar.textContent = '👤';
                } else {
                    const img = document.createElement('img');
                    img.src = 'images/Sierra_AI_agent.png';
                    img.alt = 'Sierra';
                    avatar.appendChild(img);
                }
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                
                const messageText = document.createElement('p');
                
                // Function to convert markdown links and plain URLs to HTML
                function convertLinksToHTML(text) {
                    // First convert markdown links [text](url) to HTML
                    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$1</a>');
                    
                    // Then convert plain URLs to clickable links
                    text = text.replace(/https?:\/\/[^\s]+/g, function(url) {
                        // Remove trailing punctuation if any
                        const cleanUrl = url.replace(/[.,;!?]+$/, '');
                        const trailing = url.substring(cleanUrl.length);
                        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">${cleanUrl}</a>${trailing}`;
                    });
                    
                    // Convert email addresses to mailto links
                    text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, function(email) {
                        return `<a href="mailto:${email}" style="color: #007bff; text-decoration: underline;">${email}</a>`;
                    });
                    
                    return text;
                }
                
                if (streaming && !isUser) {
                    // Add empty text initially for streaming effect
                    messageText.innerHTML = '';
                    messageContent.appendChild(messageText);
                    messageDiv.appendChild(avatar);
                    messageDiv.appendChild(messageContent);
                    chatMessages.appendChild(messageDiv);
                    
                    // Stream the text character by character
                    let index = 0;
                    const streamInterval = setInterval(() => {
                        if (index < content.length) {
                            const currentText = content.substring(0, index + 1);
                            // Convert links to HTML for the current text
                            messageText.innerHTML = convertLinksToHTML(currentText);
                            index++;
                            // Auto-scroll during streaming
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        } else {
                            clearInterval(streamInterval);
                            // Final conversion to ensure all links are properly formatted
                            messageText.innerHTML = convertLinksToHTML(content);
                        }
                    }, 30); // Adjust speed here (30ms per character)
                } else {
                    // Regular non-streaming message
                    if (isUser) {
                        messageText.textContent = content;
                    } else {
                        // Convert links to HTML for bot messages
                        messageText.innerHTML = convertLinksToHTML(content);
                    }
                    messageContent.appendChild(messageText);
                    messageDiv.appendChild(avatar);
                    messageDiv.appendChild(messageContent);
                    chatMessages.appendChild(messageDiv);
                }
                
                // Ensure smooth scroll to bottom
                setTimeout(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 10);
            }

            function addTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'typing-indicator';
                typingDiv.id = 'typing-indicator';
                
                const typingText = document.createElement('span');
                typingText.textContent = 'Sierra is thinking';
                
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'typing-dots';
                
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'typing-dot';
                    dotsContainer.appendChild(dot);
                }
                
                typingDiv.appendChild(typingText);
                typingDiv.appendChild(dotsContainer);
                chatMessages.appendChild(typingDiv);
                setTimeout(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 10);
            }

            function removeTypingIndicator() {
                const typing = document.getElementById('typing-indicator');
                if (typing) {
                    typing.remove();
                }
            }

            function hideStarterPrompts() {
                if (starterPrompts) {
                    starterPrompts.style.display = 'none';
                }
            }

            async function sendMessage(message) {
                if (!message.trim()) return;
                
                // Hide starter prompts after first message
                hideStarterPrompts();
                
                // Add user message
                addMessage(message, true);
                
                // Clear input and disable send button
                chatInput.value = '';
                chatSend.disabled = true;
                
                // Show typing indicator
                addTypingIndicator();
                
                console.log('Sending message:', message);
                console.log('Session ID:', sessionId);
                
                try {
                    let messageToSend = message;
                    
                    // If this is the first message and session wasn't initialized, add context
                    if (!sessionInitialized) {
                        messageToSend = `Hi! I'm interested in learning about Andrew Girgis. ${message}`;
                        sessionInitialized = true;
                    }
                    
                    const requestBody = {
                        action: 'sendMessage',
                        sessionId: sessionId,
                        chatInput: messageToSend
                    };
                    
                    console.log('Request body:', requestBody);
                    
                    const response = await fetch('https://n8n.andrew-girgis.com/webhook/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                        mode: 'cors',
                        credentials: 'omit'
                    });
                    
                    console.log('Response status:', response.status);
                    console.log('Response headers:', response.headers);
                    
                    if (response.ok) {
                        const text = await response.text();
                        console.log('Response text:', text);
                        
                        // Parse the streaming response to extract the final output
                        const lines = text.trim().split('\n');
                        let botResponse = "I'm sorry, I couldn't process that request. Please try again.";
                        
                        // Look for the final JSON response with the output
                        for (const line of lines.reverse()) {
                            if (line.trim() === '') continue; // Skip empty lines
                            
                            try {
                                const parsed = JSON.parse(line);
                                console.log('Parsed line:', parsed);
                                
                                // Check if this line has the output directly
                                if (parsed.output) {
                                    botResponse = parsed.output;
                                    console.log('Found output:', botResponse);
                                    break;
                                }
                                
                                // Check if this is a streaming item with JSON content
                                if (parsed.type === 'item' && parsed.content) {
                                    try {
                                        const contentJson = JSON.parse(parsed.content);
                                        if (contentJson.output) {
                                            botResponse = contentJson.output;
                                            console.log('Found output in content:', botResponse);
                                            break;
                                        }
                                    } catch (contentError) {
                                        // Content is not JSON, skip
                                        continue;
                                    }
                                }
                            } catch (e) {
                                // Skip non-JSON lines
                                console.log('Skipping non-JSON line:', line);
                                continue;
                            }
                        }
                        
                        // Remove typing indicator right before starting the streaming
                        removeTypingIndicator();
                        addMessage(botResponse, false, true); // Enable streaming for bot messages
                        showStatus('Message sent successfully!', 'success');
                    } else {
                        // Remove typing indicator on error too
                        removeTypingIndicator();
                        // Try to get error details from response
                        let errorText = '';
                        try {
                            const errorData = await response.text();
                            console.log('Error response body:', errorData);
                            errorText = errorData;
                        } catch (e) {
                            console.log('Could not read error response body');
                        }
                        
                        throw new Error(`HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Chat error details:', error);
                    removeTypingIndicator();
                    
                    let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
                    let statusMessage = 'Connection error. Please try again.';
                    
                    // Enhanced error handling for CORS and N8N issues
                    if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                        errorMessage = "🌐 **CORS Configuration Issue Detected**\n\nThe N8N webhook needs CORS headers. Please check:\n\n1. Your N8N workflow is active\n2. Add CORS headers to your N8N HTTP Response node\n3. Handle OPTIONS requests in N8N\n\nFor testing: Run `testWithCurl()` in console";
                        statusMessage = 'CORS error. Fix N8N webhook CORS configuration.';
                    } else if (error.message.includes('500')) {
                        errorMessage = "🔧 The N8N workflow returned a server error (500). This indicates an issue within your N8N workflow logic. Check your N8N execution logs and ensure all nodes are properly configured.";
                        statusMessage = 'N8N workflow error (500). Check N8N execution logs.';
                    } else if (error.message.includes('404')) {
                        errorMessage = "🚨 The N8N webhook is not active! Please go to your N8N instance, find the workflow, and activate it using the toggle switch in the top-right corner.";
                        statusMessage = 'Webhook inactive (404). Activate N8N workflow.';
                    } else if (error.message.includes('403')) {
                        errorMessage = "🚫 Access forbidden (403). The webhook might be disabled or have authentication issues.";
                        statusMessage = 'Access forbidden (403).';
                    }
                    
                    addMessage(errorMessage);
                    showStatus(statusMessage, 'error');
                } finally {
                    chatSend.disabled = false;
                }
            }

            // Event listeners
            if (chatToggle && chatWindow && chatClose && chatInput && chatSend) {
                chatToggle.addEventListener('click', async function() {
                    const isHidden = !chatWindow.classList.contains('active');
                    if (isHidden) {
                        chatWindow.classList.add('active');
                        chatInput.focus();
                        
                        // Scroll to bottom when opening
                        setTimeout(() => {
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 50);
                        console.log('Sierra chat opened!');
                    } else {
                        chatWindow.classList.remove('active');
                    }
                });

                chatClose.addEventListener('click', function() {
                    chatWindow.classList.remove('active');
                });

                chatSend.addEventListener('click', function() {
                    const message = chatInput.value.trim();
                    if (message && !chatSend.disabled) {
                        sendMessage(message);
                    }
                });

                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const message = chatInput.value.trim();
                        if (message && !chatSend.disabled) {
                            sendMessage(message);
                        }
                    }
                });

                // Close chat when clicking outside
                document.addEventListener('click', function(event) {
                    // Don't close if clicking on the chat widget, welcome popup, or dismiss button
                    if (!event.target.closest('.chat-widget') && 
                        !event.target.closest('#welcome-popup') &&
                        !event.target.closest('#dismiss-welcome')) {
                        chatWindow.classList.remove('active');
                    }
                });

                // Add scroll event handling for chat messages
                chatMessages.addEventListener('wheel', function(e) {
                    // Allow scrolling within chat messages
                    const isAtTop = chatMessages.scrollTop === 0;
                    const isAtBottom = chatMessages.scrollTop >= chatMessages.scrollHeight - chatMessages.clientHeight;
                    
                    // Prevent page scroll only if we're scrolling within bounds
                    if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
                        e.stopPropagation();
                    }
                });

                console.log('Sierra chat ready!');
            } else {
                console.error('Chat elements not found');
            }
            
            // Add a global test function for debugging
            window.testN8nConnection = async function() {
                console.log('Testing n8n connection...');
                try {
                    const response = await fetch('https://n8n.andrew-girgis.com/webhook/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            action: 'sendMessage',
                            sessionId: 'test_session',
                            chatInput: 'test message'
                        }),
                        mode: 'cors',
                        credentials: 'omit'
                    });
                    
                    console.log('Test response status:', response.status);
                    console.log('Test response headers:', [...response.headers.entries()]);
                    
                    if (response.ok) {
                        const text = await response.text();
                        console.log('Test response text:', text);
                        return { success: true, data: text };
                    } else {
                        const errorText = await response.text();
                        console.log('Test error response:', errorText);
                        return { success: false, status: response.status, error: errorText };
                    }
                } catch (error) {
                    console.log('Test connection error:', error);
                    return { success: false, error: error.message };
                }
            };
            
            console.log('Debug: Call testN8nConnection() in console to test the webhook');
            
            // Add a CORS-free test using a different approach
            window.testWithCurl = function() {
                console.log('To test the webhook without CORS issues, run this command in your terminal:');
                console.log('curl -X POST https://n8n.andrew-girgis.com/webhook/chat \\');
                console.log('  -H "Content-Type: application/json" \\');
                console.log('  -d \'{"action": "sendMessage", "sessionId": "test_session", "chatInput": "hello"}\'');
                console.log('');
                console.log('This will show you the actual server response without CORS restrictions.');
                return 'Check terminal for curl command';
            };
            
            // Add a simple ping test
            window.testN8nPing = async function() {
                console.log('Testing basic connectivity to n8n server...');
                try {
                    // Test with a simple GET request first
                    const response = await fetch('https://n8n.andrew-girgis.com/webhook/chat', {
                        method: 'GET',
                        mode: 'no-cors' // This bypasses CORS but limits what we can read
                    });
                    console.log('Basic connectivity test completed - server is reachable');
                    return { success: true, message: 'Server is reachable' };
                } catch (error) {
                    console.log('Server connectivity failed:', error);
                    return { success: false, error: error.message };
                }
            };
            
            // Welcome popup functionality
            function showWelcomePopup() {
                // Check if user has seen the welcome message before
                const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
                
                if (!hasSeenWelcome) {
                    // Create welcome popup
                    const welcomePopup = document.createElement('div');
                    welcomePopup.id = 'welcome-popup';
                    welcomePopup.style.cssText = `
                        position: fixed;
                        bottom: 120px;
                        right: 20px;
                        background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
                        border: 1px solid #007bff;
                        width: 500px;
                        height: 80px;
                        z-index: 1002;
                        animation: welcomeSlideIn 0.5s ease-out;
                        font-family: Arial, sans-serif;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    `;
                    
                    welcomePopup.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                            <img src="images/Sierra_AI_agent.png" alt="Sierra" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;">
                            <div style="flex: 1;">
                                <div style="font-weight: bold; margin-bottom: 2px; font-size: 13px;">Sierra</div>
                                <div style="font-size: 14px; line-height: 1.3; color: #e0e0e0;">
                                    👋 Welcome to Andrew's portfolio! Click here to chat with me.
                                </div>
                            </div>
                        </div>
                        <button id="dismiss-welcome" style="
                            background: transparent;
                            border: none;
                            color: #999;
                            font-size: 16px;
                            cursor: pointer;
                            padding: 2px;
                            width: 20px;
                            height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 3px;
                            transition: all 0.2s ease;
                            flex-shrink: 0;
                        " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';" 
                           onmouseout="this.style.background='transparent'; this.style.color='#999';">×</button>
                    `;
                    
                    // Add CSS animation and hover effects
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes welcomeSlideIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px) scale(0.9);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                        
                        @keyframes welcomeSlideOut {
                            from {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                            to {
                                opacity: 0;
                                transform: translateY(-20px) scale(0.9);
                            }
                        }
                        
                        #welcome-popup:hover {
                            box-shadow: 0 12px 35px rgba(0, 123, 255, 0.4);
                            transform: translateY(-2px);
                        }
                    `;
                    document.head.appendChild(style);
                    
                    document.body.appendChild(welcomePopup);
                    
                    // Event listeners for popup
                    document.getElementById('dismiss-welcome').addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent triggering the popup click
                        welcomePopup.style.animation = 'welcomeSlideOut 0.3s ease-in forwards';
                        setTimeout(() => {
                            welcomePopup.remove();
                        }, 300);
                        sessionStorage.setItem('hasSeenWelcome', 'true');
                    });
                    
                    // Make the entire popup clickable to open chat
                    welcomePopup.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('Welcome popup clicked');
                        
                        // First, hide the welcome popup immediately
                        welcomePopup.style.animation = 'welcomeSlideOut 0.175s ease-in forwards';
                        
                        // Then open the chat after the popup disappears
                        setTimeout(() => {
                            // Get fresh references to chat elements
                            const chatWindow = document.getElementById('chat-window');
                            const chatInput = document.getElementById('chat-input');
                            const chatMessages = document.getElementById('chat-messages');
                            
                            console.log('Chat elements found:', {
                                chatWindow: !!chatWindow,
                                chatInput: !!chatInput, 
                                chatMessages: !!chatMessages
                            });
                            
                            if (chatWindow && chatInput && chatMessages) {
                                console.log('Before adding active class:', chatWindow.classList.contains('active'));
                                
                                // Open chat window
                                chatWindow.classList.add('active');
                                
                                console.log('After adding active class:', chatWindow.classList.contains('active'));
                                console.log('Chat window display style:', window.getComputedStyle(chatWindow).display);
                                
                                // Focus input after a small delay
                                setTimeout(() => {
                                    chatInput.focus();
                                    chatMessages.scrollTop = chatMessages.scrollHeight;
                                    console.log('Chat input focused and scrolled');
                                }, 100);
                                
                                console.log('Chat opened from welcome popup');
                            } else {
                                console.error('Chat elements not found when opening from popup');
                            }
                        }, 175); // Wait for popup animation to complete
                        
                        // Remove popup after animation completes
                        setTimeout(() => {
                            welcomePopup.remove();
                            sessionStorage.setItem('hasSeenWelcome', 'true');
                        }, 175);
                    });
                    
                    // Auto-dismiss after 10 seconds
                    setTimeout(() => {
                        if (document.getElementById('welcome-popup')) {
                            welcomePopup.style.animation = 'welcomeSlideOut 0.3s ease-in forwards';
                            setTimeout(() => {
                                if (welcomePopup.parentNode) {
                                    welcomePopup.remove();
                                }
                            }, 300);
                            sessionStorage.setItem('hasSeenWelcome', 'true');
                        }
                    }, 10000);
                }
            }
            
            // Show welcome popup after a short delay
            setTimeout(showWelcomePopup, 2000);
        });