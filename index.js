      const typedTextSpan = document.querySelector('.typed-text');
        const cursorSpan = document.querySelector('.cursor');
        const textArray = ['Artificial Intelligence Makes Robots Smarter', 'Machine Learning Enhances Robot Capabilities', 'Computer Vision Enables Robot Perception', 'AI Creates Autonomous Robotic Systems'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1500;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            if (textArray.length) setTimeout(type, newTextDelay + 250);
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Animate stats counting
                    if (entry.target.classList.contains('stat-card')) {
                        const statNumber = entry.target.querySelector('.stat-number');
                        const target = parseInt(statNumber.getAttribute('data-target'));
                        animateValue(statNumber, 0, target, 2000);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToObserve = document.querySelectorAll('.about-text, .about-image, .stat-card, .feature-card, .applications-list li, .applications-image, .timeline-item, .presenter-card, .tech-card');
        elementsToObserve.forEach(el => {
            observer.observe(el);
        });

        // Animate value counter
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                let value;
                if (obj.classList.contains('decimal')) {
                    value = (progress * (end - start) + start).toFixed(1);
                } else {
                    value = Math.floor(progress * (end - start) + start);
                }
                obj.innerHTML = value;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const backToTop = document.querySelector('.back-to-top');
            
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                backToTop.classList.add('active');
            } else {
                header.classList.remove('scrolled');
                backToTop.classList.remove('active');
            }
        });

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.style.display = 'none';
                    }
                }
            });
        });

        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Feature card highlighting
        const featureCards = document.querySelectorAll('.feature-card');
        const featureDetails = document.querySelectorAll('.feature-detail');

        featureCards.forEach(card => {
            card.addEventListener('click', function() {
                const featureId = this.getAttribute('data-feature');
                
                // Remove active class from all cards and details
                featureCards.forEach(c => c.classList.remove('active'));
                featureDetails.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked card and corresponding detail
                this.classList.add('active');
                document.getElementById(`feature-detail-${featureId}`).classList.add('active');
                
                // Scroll to feature details
                document.getElementById(`feature-detail-${featureId}`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        });

        // Technology tabs
        const techTabs = document.querySelectorAll('.tech-tab');
        const techContents = document.querySelectorAll('.tech-content');

        techTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                techTabs.forEach(t => t.classList.remove('active'));
                techContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(`tech-content-${tabId}`).classList.add('active');
            });
        });

        // Add animation to stats when they come into view
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateValue(statNumber, 0, target, 2000);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            statsObserver.observe(card);
        });