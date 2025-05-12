// Prevent zooming
window.addEventListener("wheel", (e) => {
  const isPinching = e.ctrlKey;
  if (isPinching) e.preventDefault();
}, { passive: false });

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons (menu/close)
            const menuIcon = mobileMenuButton.querySelector('[data-lucide="menu"]');
            if (menuIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                } else {
                    menuIcon.setAttribute('data-lucide', 'x');
                }
                lucide.createIcons();
            }
        });
    }
    
    // Close mobile menu when clicking on a navigation link
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const menuIcon = mobileMenuButton.querySelector('[data-lucide]');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = 64; // Adjust based on your header height
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            if (counter.hasAttribute('data-animated')) return;
            
            const target = parseInt(counter.innerText, 10);
            const increment = target / 20;
            let currentCount = 0;
            
            const updateCounter = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    setTimeout(updateCounter, 50);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
            counter.setAttribute('data-animated', 'true');
        });
    };

    // Intersection Observer to trigger counter animation when visible
    const counterSections = document.querySelectorAll('.counter-section');
    if (counterSections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        counterSections.forEach(section => {
            observer.observe(section);
        });
    }
});

// Create background container
const createBackground = () => {
    const container = document.createElement('div');
    container.className = 'background-container';
    
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    container.appendChild(starsContainer);
    
    // Create chain container
    const chainContainer = document.createElement('div');
    chainContainer.className = 'chain';
    container.appendChild(chainContainer);
    
    document.body.insertBefore(container, document.body.firstChild);
    return { container, starsContainer, chainContainer };
};

// Create stars
const createStars = (container) => {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration and opacity
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.setProperty('--opacity', Math.random() * 0.8 + 0.2);
        
        container.appendChild(star);
    }
};

// Create waves
const createWaves = (container) => {
    const waveCount = 8;
    for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        
        // Random position
        wave.style.left = `${Math.random() * 100}%`;
        wave.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        wave.style.setProperty('--wave-duration', `${Math.random() * 4 + 3}s`);
        wave.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(wave);
    }
};

// Create sparkles
const createSparkles = (container) => {
    const sparkleCount = 30;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        sparkle.style.setProperty('--sparkle-duration', `${Math.random() * 2 + 1}s`);
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(sparkle);
    }
};

// Create particles
const createParticles = (container) => {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random movement
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Random animation duration and delay
        particle.style.setProperty('--particle-duration', `${Math.random() * 3 + 2}s`);
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
    }
};

// Create and manage floating assets with random appearance/disappearance
const createFloatingAssets = (container) => {
    const assetTypes = ['dollar', 'gold', 'oil', 'monalisa', 'house'];
    const assets = [];
    const maxAssets = 25;
    
    const createAsset = () => {
        if (assets.length >= maxAssets) return;
        
        const asset = document.createElement('div');
        const type = assetTypes[Math.floor(Math.random() * assetTypes.length)];
        asset.className = `floating-asset asset-${type} random-movement`;
        
        // Random position across the entire background
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        asset.style.left = `${x}px`;
        asset.style.top = `${y}px`;
        
        // Random animation durations with slight variations based on asset type
        const floatDuration = 8 + Math.random() * 4; // 8-12 seconds
        const rotateDuration = type === 'monalisa' ? 
            30 + Math.random() * 15 : // Slower rotation for Mona Lisa (30-45 seconds)
            20 + Math.random() * 10;  // Normal rotation for others (20-30 seconds)
        const glowDuration = 3 + Math.random() * 2; // 3-5 seconds
        const randomDuration = 6 + Math.random() * 3; // 6-9 seconds
        const fadeDuration = 4 + Math.random() * 3; // 4-7 seconds
        
        // Adjust size based on asset type
        const baseSize = type === 'monalisa' ? 80 : // Larger size for Mona Lisa
                        type === 'house' ? 70 :     // Medium size for House
                        60;                         // Default size for others
        asset.style.width = `${baseSize}px`;
        asset.style.height = `${baseSize}px`;
        
        asset.style.setProperty('--float-duration', `${floatDuration}s`);
        asset.style.setProperty('--rotate-duration', `${rotateDuration}s`);
        asset.style.setProperty('--glow-duration', `${glowDuration}s`);
        asset.style.setProperty('--random-duration', `${randomDuration}s`);
        asset.style.setProperty('--fade-duration', `${fadeDuration}s`);
        
        // Initial state
        asset.style.opacity = '0';
        asset.style.transform = 'scale(0.8)';
        
        // Add glow effect with color variation based on asset type
        const glow = document.createElement('div');
        glow.className = 'glow';
        if (type === 'monalisa') {
            glow.style.setProperty('--glow-color', 'rgba(139, 69, 19, 0.3)'); // Brownish glow for Mona Lisa
        } else if (type === 'house') {
            glow.style.setProperty('--glow-color', 'rgba(34, 139, 34, 0.3)'); // Greenish glow for House
        }
        asset.appendChild(glow);
        
        // Add to container
        container.appendChild(asset);
        assets.push(asset);
        
        // Fade in
        requestAnimationFrame(() => {
            asset.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
            asset.style.opacity = '0.6';
            asset.style.transform = 'scale(1)';
        });
        
        // Schedule disappearance with type-specific lifetime
        const lifetime = type === 'monalisa' ? 
            8000 + Math.random() * 12000 : // Longer lifetime for Mona Lisa (8-20 seconds)
            5000 + Math.random() * 10000;  // Normal lifetime for others (5-15 seconds)
            
        setTimeout(() => {
            // Fade out
            asset.style.transition = 'opacity 1.5s ease-in, transform 1.5s ease-in';
            asset.style.opacity = '0';
            asset.style.transform = 'scale(0.8)';
            
            // Remove after fade out
            setTimeout(() => {
                const index = assets.indexOf(asset);
                if (index > -1) {
                    assets.splice(index, 1);
                }
                asset.remove();
                
                // Create new asset after a delay
                setTimeout(createAsset, 1000 + Math.random() * 2000); // 1-3 seconds delay
            }, 1500);
        }, lifetime);
    };
    
    // Start creating assets
    const startAssetGeneration = () => {
        // Create initial batch of assets
        for (let i = 0; i < 5; i++) {
            setTimeout(createAsset, i * 500); // Stagger initial creation
        }
        
        // Continue creating assets randomly
        const generateAsset = () => {
            createAsset();
            const delay = 2000 + Math.random() * 3000; // 2-5 seconds
            setTimeout(generateAsset, delay);
        };
        
        setTimeout(generateAsset, 3000); // Start continuous generation after 3 seconds
    };
    
    startAssetGeneration();
    return assets;
};

// Enhanced chain links
const createChainLinks = (container) => {
    const chainCount = 20;
    
    for (let i = 0; i < chainCount; i++) {
        const link = document.createElement('div');
        link.className = 'chain-link';
        
        // Random starting position
        link.style.left = `${Math.random() * 100}%`;
        link.style.top = `${Math.random() * 100}%`;
        
        // Random animation durations
        link.style.setProperty('--chain-duration', `${Math.random() * 20 + 10}s`);
        link.style.setProperty('--pulse-duration', `${Math.random() * 2 + 1}s`);
        link.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(link);
    }
};

// Create center point (BondX Logo)
const createCenterPoint = (container) => {
    const centerPoint = document.createElement('div');
    centerPoint.className = 'center-point';
    
    const img = document.createElement('img');
    img.src = 'logo.svg';
    img.alt = 'BondX Logo';
    centerPoint.appendChild(img);
    
    // Add gravitational field
    const field = document.createElement('div');
    field.className = 'gravitational-field';
    centerPoint.appendChild(field);
    
    container.appendChild(centerPoint);
    return centerPoint;
};

// Apply gravitational effect with smoother movement
const applyGravitationalEffect = (elements, centerPoint) => {
    if (!centerPoint) return;
    
    const centerRect = centerPoint.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const dx = centerX - x;
        const dy = centerY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Smoother gravitational force calculation
        const force = Math.min(0.15, 1000 / (distance * distance));
        const angle = Math.atan2(dy, dx);
        
        // Smoother movement with reduced force
        const moveX = Math.cos(angle) * force * 0.8;
        const moveY = Math.sin(angle) * force * 0.8;
        
        // Apply movement with smoother transition
        const currentTransform = element.style.transform || '';
        const randomMove = currentTransform.includes('randomMove') ? 
            currentTransform.match(/randomMove[^)]+/)[0] : '';
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) ${randomMove}`;
        
        // Smoother opacity transition based on distance
        const opacity = Math.max(0.3, Math.min(1, 1 - distance / 800));
        element.style.opacity = opacity;
    });
};

// Create connecting chain between two points
const createConnectingChain = (startElement, endElement, container) => {
    const chain = document.createElement('div');
    chain.className = 'connecting-chain';
    
    // Create multiple chain segments for a more dynamic effect
    const segmentCount = 3;
    for (let i = 0; i < segmentCount; i++) {
        const segment = document.createElement('div');
        segment.className = 'chain-segment';
        segment.style.setProperty('--flow-duration', `${Math.random() * 2 + 1}s`);
        segment.style.animationDelay = `${i * 0.3}s`;
        chain.appendChild(segment);
    }
    
    container.appendChild(chain);
    return chain;
};

// Update chain positions
const updateChainPositions = (chains, elements, centerPoint) => {
    chains.forEach((chain, index) => {
        const element = elements[index];
        if (!element || !centerPoint) return;
        
        const elementRect = element.getBoundingClientRect();
        const centerRect = centerPoint.getBoundingClientRect();
        
        const startX = elementRect.left + elementRect.width / 2;
        const startY = elementRect.top + elementRect.height / 2;
        const endX = centerRect.left + centerRect.width / 2;
        const endY = centerRect.top + centerRect.height / 2;
        
        // Calculate angle and distance
        const dx = endX - startX;
        const dy = endY - startY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update chain position and rotation
        chain.style.left = `${startX}px`;
        chain.style.top = `${startY}px`;
        chain.style.width = `${distance}px`;
        chain.style.transform = `rotate(${angle}deg)`;
        
        // Show/hide chain based on distance
        if (distance < 300) {
            chain.classList.add('visible');
            chain.style.opacity = Math.max(0, 0.3 * (1 - distance / 300));
        } else {
            chain.classList.remove('visible');
        }
    });
};

// Create random wave effect
const createRandomWave = (container) => {
    const wave = document.createElement('div');
    wave.className = 'random-wave';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    
    // Random size
    const size = 150 + Math.random() * 100; // 150-250px
    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;
    
    // Random animation durations
    const appearDuration = 3 + Math.random() * 2; // 3-5 seconds
    const disappearDuration = 2 + Math.random() * 2; // 2-4 seconds
    wave.style.setProperty('--wave-appear-duration', `${appearDuration}s`);
    wave.style.setProperty('--wave-disappear-duration', `${disappearDuration}s`);
    
    // Add to container
    container.appendChild(wave);
    
    // Remove after animation completes
    setTimeout(() => {
        wave.remove();
    }, (appearDuration + disappearDuration) * 1000);
};

// Create ripple effect
const createRipple = (container, x, y) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    // Position at click/touch point
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Random size
    const size = 100 + Math.random() * 150; // 100-250px
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    
    // Random animation duration
    const duration = 4 + Math.random() * 3; // 4-7 seconds
    ripple.style.setProperty('--ripple-duration', `${duration}s`);
    
    // Add to container
    container.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
        ripple.remove();
    }, duration * 1000);
};

// Create underwriter information display
const createUnderwriterInfo = (container) => {
    const info = document.createElement('div');
    info.className = 'underwriter-info';
    
    // Add glow effect
    const glow = document.createElement('div');
    glow.className = 'glow-effect';
    info.appendChild(glow);
    
    // Create content
    info.innerHTML = `
        <h3>美债承销商</h3>
        <p>作为<span class="highlight">主要交易商</span>，我们提供全面的美债承销服务，包括：</p>
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value">$500B+</div>
                <div class="stat-label">年度承销规模</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">24/7</div>
                <div class="stat-label">市场覆盖</div>
            </div>
        </div>
        <p style="margin-top: 12px; font-size: 12px; color: #9CA3AF;">
            提供一级市场发行、二级市场做市、风险管理等全方位服务
        </p>
    `;
    
    container.appendChild(info);
    return info;
};

// Update underwriter info position
const updateUnderwriterInfo = (info, mouseX, mouseY) => {
    if (!info) return;
    
    const rect = info.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate position to keep info box within viewport
    let x = mouseX + 20;
    let y = mouseY + 20;
    
    // Adjust position if info box would go off screen
    if (x + rect.width > windowWidth) {
        x = mouseX - rect.width - 20;
    }
    if (y + rect.height > windowHeight) {
        y = mouseY - rect.height - 20;
    }
    
    // Apply position with smooth transition
    info.style.left = `${x}px`;
    info.style.top = `${y}px`;
};

// Initialize background effects
const initBackground = () => {
    const { container, starsContainer, chainContainer } = createBackground();
    const centerPoint = createCenterPoint(container);
    
    // Create underwriter info
    const underwriterInfo = createUnderwriterInfo(container);
    
    // Create ripple container
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'background-ripple';
    container.appendChild(rippleContainer);
    
    // Initialize effects
    createStars(starsContainer);
    createWaves(container);
    createSparkles(container);
    createParticles(container);
    const floatingAssets = createFloatingAssets(container);
    createChainLinks(chainContainer);
    
    // Start random wave generation
    const generateRandomWaves = () => {
        createRandomWave(container);
        const delay = 2000 + Math.random() * 3000;
        setTimeout(generateRandomWaves, delay);
    };
    
    generateRandomWaves();
    
    // Get all floating elements
    const floatingElements = [
        ...container.querySelectorAll('.wave'),
        ...container.querySelectorAll('.sparkle'),
        ...container.querySelectorAll('.chain-link'),
        ...container.querySelectorAll('.particle')
    ];
    
    // Create connecting chains
    const chains = floatingElements.map(element => 
        createConnectingChain(element, centerPoint, container)
    );
    
    // Update positions
    const updatePositions = () => {
        applyGravitationalEffect(floatingElements, centerPoint);
        updateChainPositions(chains, floatingElements, centerPoint);
        
        // Update temporary assets
        const currentAssets = container.querySelectorAll('.floating-asset');
        currentAssets.forEach(asset => {
            const force = calculateGravitationalForce(asset, centerPoint);
            const currentTransform = asset.style.transform || '';
            const randomMove = currentTransform.includes('randomMove') ? 
                currentTransform.match(/randomMove[^)]+/)[0] : '';
            
            asset.style.transform = `translate(${force.x * 0.5}px, ${force.y * 0.5}px) ${randomMove}`;
        });
        
        requestAnimationFrame(updatePositions);
    };
    
    updatePositions();
    
    // Enhanced parallax effect with underwriter info
    let infoTimeout;
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.01;
        const moveY = (clientY - window.innerHeight / 2) * 0.01;
        
        // Move center point
        centerPoint.style.transform = `translate(calc(-50% + ${moveX * 2}px), calc(-50% + ${moveY * 2}px))`;
        updateChainPositions(chains, floatingElements, centerPoint);
        
        // Update underwriter info position
        updateUnderwriterInfo(underwriterInfo, clientX, clientY);
        
        // Show underwriter info with delay
        clearTimeout(infoTimeout);
        underwriterInfo.classList.remove('visible');
        infoTimeout = setTimeout(() => {
            underwriterInfo.classList.add('visible');
        }, 100);
        
        // Create ripple effect
        if (Math.random() < 0.1) {
            createRipple(rippleContainer, clientX, clientY);
        }
    });
    
    // Hide underwriter info when mouse leaves window
    document.addEventListener('mouseleave', () => {
        underwriterInfo.classList.remove('visible');
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBackground);

// Create whitepaper modal
const createWhitepaperModal = () => {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'whitepaper-overlay';
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'whitepaper-modal';
    
    // 创建模态框头部
    const header = document.createElement('div');
    header.className = 'whitepaper-header';
    
    // 创建标题
    const title = document.createElement('h2');
    title.className = 'whitepaper-title';
    title.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        BondX 白皮书
    `;
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'whitepaper-close';
    closeButton.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;
    
    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'whitepaper-content';
    
    // 创建 iframe 来显示 PDF
    const iframe = document.createElement('iframe');
    iframe.src = 'BondX.pdf';
    iframe.title = 'BondX Whitepaper';
    
    // 组装模态框
    header.appendChild(title);
    header.appendChild(closeButton);
    content.appendChild(iframe);
    modal.appendChild(header);
    modal.appendChild(content);
    
    // 添加到页面
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // 关闭模态框的函数
    const closeModal = () => {
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    };
    
    // 打开模态框的函数
    const openModal = () => {
        modal.classList.add('visible');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };
    
    // 绑定事件
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
    
    return { openModal, closeModal };
};

// Create whitepaper button
const createWhitepaperButton = () => {
    const mainTitle = document.querySelector('h1');
    if (!mainTitle) return;
    
    const { openModal } = createWhitepaperModal();
    
    const button = document.createElement('button');
    button.className = 'whitepaper-button';
    button.type = 'button';
    
    // 添加图标
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    `;
    
    // 添加文本
    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = '查看白皮书';
    
    // 添加发光效果
    const glow = document.createElement('span');
    glow.className = 'glow';
    
    // 组装按钮
    button.appendChild(icon);
    button.appendChild(text);
    button.appendChild(glow);
    
    // 添加到主标题后面
    mainTitle.insertAdjacentElement('afterend', button);
    
    // 添加点击事件
    button.addEventListener('click', (e) => {
        // 添加点击波纹效果
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
        
        // 打开模态框
        openModal();
    });
};

// 在 DOM 加载完成后初始化白皮书按钮
document.addEventListener('DOMContentLoaded', () => {
    createWhitepaperButton();
    // ... 其他现有的初始化代码 ...
});
