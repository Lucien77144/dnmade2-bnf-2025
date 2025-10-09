
        // Données pour les textes
        const textData = {
            "description1": "Ce manuscrit a été copié à l'or liquide et enluminé sur parchemin vers 984, probablement en vue du couronnement (qui n'aura pas lieu !) du nouvel empereur du Saint-Empire romain germanique, Henri le Querelleur.",
            "description2": "Il contient les textes des quatre évangiles de saint Mathieu,  saint Marc, saint Luc, saint Jean.",
            "instructions": "Appuyez sur la plume pour copier une page."
        };

        // Init des textes
        document.getElementById('title').textContent = textData.title;
        document.getElementById('description1').textContent = textData.description1;
        document.getElementById('description2').textContent = textData.description2;
        document.getElementById('instructions').textContent = textData.instructions;

        document.addEventListener('DOMContentLoaded', function() {
            const revealBtn = document.getElementById('revealBtn');
            const cover = document.querySelector('.cover');
            const imageContainer = document.querySelector('.image-container');
            const textSection = document.querySelector('.text-section');
            const imageSection = document.querySelector('.image-section');
            const mainImage = document.getElementById('mainImage');
            const zoomFrame = document.getElementById('zoomFrame');
            const zoomContainer = document.getElementById('zoomContainer');
            const connectionLine = document.getElementById('connectionLine');
            
            let isRevealed = false;
            let isZoomActive = false;
            let pulseAnimation;

            // Animation d'entrée 
            const initAnimation = gsap.timeline();
            
            initAnimation
                .to('.container', {
                    opacity: 1,
                    duration: 0.5
                })
                .fromTo(textSection, {
                    x: -100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                })
                .fromTo('.text-section h2', {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .fromTo('.text-section p', {
                    y: 20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out"
                }, "-=0.3")
                .fromTo(imageSection, {
                    x: 100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.8")
                .fromTo(imageContainer, {
                    scale: 0.8,
                    opacity: 0,
                    rotationY: 45
                }, {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .fromTo(revealBtn, {
                    scale: 0.5,
                    opacity: 0,
                    rotation: -180
                }, {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)",
                    onComplete: startPulseAnimation
                }, "-=0.3")
                .fromTo('.instructions', {
                    y: 20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.2");

            // Animation plume pour appeler au clic
            function startPulseAnimation() {
                pulseAnimation = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });
                
                pulseAnimation
                    .to(revealBtn, {
                        scale: 1.15,
                        duration: 1.2,
                        ease: "sine.inOut"
                    })
                    .to(revealBtn, {
                        scale: 1,
                        duration: 1.2,
                        ease: "sine.inOut"
                    });
            }

            function stopPulseAnimation() {
                if (pulseAnimation) {
                    pulseAnimation.kill();
                    gsap.to(revealBtn, {
                        scale: 1,
                        duration: 0.3
                    });
                }
            }

            // Animation de reveal
            revealBtn.addEventListener('click', function() {
                if (!isRevealed) {
                    stopPulseAnimation();
                    
                    const containerHeight = imageContainer.offsetHeight;
                    const buttonHeight = revealBtn.offsetHeight;
                    const travelDistance = containerHeight - buttonHeight - 20;
                    
                    const revealTimeline = gsap.timeline();
                    
                    revealTimeline
                        .addLabel("start")
                        .to(revealBtn, {
                            duration: 1.2,
                            x: -50,
                            y: travelDistance,
                            ease: "power2.inOut",
                            onStart: function() {
                                gsap.to(revealBtn, {
                                    scale: 1.1,
                                    duration: 0.3,
                                    yoyo: true,
                                    repeat: 1
                                });
                            }
                        }, "start")
                        .to(cover, {
                            y: "100%",
                            duration: 1.2,
                            ease: "power2.inOut"
                        }, "start")
                        .to(revealBtn, {
                            opacity: 0,
                            duration: 0.2,
                            onComplete: function() {
                                isRevealed = true;
                                revealBtn.textContent = textData.buttonHide;
                                
                                // Redémarrer l'animation de la plume
                                startPulseAnimation();
                            }
                        }, "resetStart");
                }
            });
                
             

            // Animation au survol plume
            gsap.set(revealBtn, {
                cursor: "pointer"
            });

            revealBtn.addEventListener('mouseenter', function() {
                if (!isRevealed) {
                    stopPulseAnimation();
                    gsap.to(revealBtn, {
                        scale: 1.2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            revealBtn.addEventListener('mouseleave', function() {
                if (!isRevealed) {
                    gsap.to(revealBtn, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: startPulseAnimation
                    });
                }
            });
        });
    