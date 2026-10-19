/**
 * WHITE-LABEL KINETIC 3D SHOWCASE & EDITORIAL JOURNEY - CORE ENGINE
 * Combines real-time 3D physics, cursor-tilt, 720° variant transitions,
 * GSAP ScrollTrigger scene orchestration, and luxury editorial storytelling.
 */

(() => {
    'use strict';

    // =========================================================================
    // 1. STATE & DOM REFERENCES
    // =========================================================================
    const modelViewer = document.querySelector('#product-model');
    const heroCenter = document.querySelector('#hero-center-node');
    const berriesFG = document.querySelector('.berries-container');
    const berriesBG = document.querySelector('.berries-container-bg');
    const leavesBG = document.querySelector('.leaves-container');
    const allBerries = document.querySelectorAll('.berry');
    const bubblesContainer = document.querySelector('#bubbles-container');
    const scrollBar = document.querySelector('#scroll-bar');
    const langBtn = document.querySelector('#lang-btn');

    let currentFlavor = 'emerald';
    let isSwitching = false;
    let switchSpin = 0;
    let emeraldTexture = null;
    let cobaltTexture = null;
    let currentLang = 'th'; // Default Thai as requested by Commander

    // Mouse Tracking Physics
    const mouse = { x: 0, y: 0, px: 0, py: 0 };
    const currentMouse = { x: 0, y: 0 };

    // =========================================================================
    // 2. ULTRA-SMOOTH LENIS SCROLL SETUP
    // =========================================================================
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.8
        });

        lenis.on('scroll', (e) => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.update();
            }
            // Update scroll progress bar
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? (e.scroll / total) * 100 : 0;
            if (scrollBar) scrollBar.style.width = `${progress}%`;
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    // =========================================================================
    // 3. DYNAMIC WHITE-LABEL TEXTURE SYNTHESIZER
    // Generates 2 bespoke ultra-res (2048x2048) metallic white-label textures.
    // Completely unbranded, zero soda logos, hyper-luxury aesthetic.
    // =========================================================================
    function generateWhiteLabelTexture(theme) {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');

        const isEmerald = theme === 'emerald';
        const primaryColor = isEmerald ? '#0b8a78' : '#0b4f8a';
        const secondaryColor = isEmerald ? '#044e3b' : '#04294e';
        const darkBase = isEmerald ? '#011d17' : '#010c14';
        const accentTone = isEmerald ? '#fbcfe8' : '#38bdf8';
        const goldHighlight = isEmerald ? '#fef08a' : '#bae6fd';

        // 1. Brushed Metal Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 2048, 2048);
        grad.addColorStop(0, primaryColor);
        grad.addColorStop(0.35, secondaryColor);
        grad.addColorStop(0.7, darkBase);
        grad.addColorStop(1, primaryColor);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2048, 2048);

        // 2. Micro Hairline Metallic Texture & Sheen Lines
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        for (let i = 0; i < 2048; i += 8) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 2048);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Central Vertical Highlight Ribbon
        const sheen = ctx.createLinearGradient(600, 0, 1400, 0);
        sheen.addColorStop(0, 'rgba(255,255,255,0)');
        sheen.addColorStop(0.5, 'rgba(255,255,255,0.22)');
        sheen.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, 2048, 2048);

        // 4. White-Label Luxury Label Geometry
        ctx.save();
        ctx.translate(1024, 1024);

        // Outer Fine-Line Frame
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 3;
        ctx.strokeRect(-420, -520, 840, 1040);

        // Inner Accent Border
        ctx.strokeStyle = accentTone;
        ctx.lineWidth = 2;
        ctx.strokeRect(-390, -490, 780, 980);

        // Corner Flourishes
        const cornerSize = 40;
        ctx.fillStyle = goldHighlight;
        [[-420, -520], [420 - cornerSize, -520], [-420, 520 - cornerSize], [420 - cornerSize, 520 - cornerSize]].forEach(([cx, cy]) => {
            ctx.fillRect(cx, cy, cornerSize, cornerSize);
        });

        // 5. Minimalist Typography
        ctx.textAlign = 'center';

        // Sub-header
        ctx.fillStyle = goldHighlight;
        ctx.font = '700 32px Manrope, sans-serif';
        ctx.letterSpacing = '14px';
        ctx.fillText('COLD-DISTILLED • 100% PURITY', 0, -360);

        // Main Brand Name Placeholder
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 96px Outfit, sans-serif';
        ctx.letterSpacing = '18px';
        ctx.fillText('YOUR BRAND', 0, -180);

        // Decorative Separator Line
        ctx.strokeStyle = accentTone;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-160, -90);
        ctx.lineTo(160, -90);
        ctx.stroke();

        // Center Emblem / Circle
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 40, 90, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = accentTone;
        ctx.font = '800 48px Outfit, sans-serif';
        ctx.letterSpacing = '4px';
        ctx.fillText(isEmerald ? '01' : '02', 0, 55);

        // Flavor / Variant Title
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 44px Outfit, sans-serif';
        ctx.letterSpacing = '10px';
        ctx.fillText(isEmerald ? 'EMERALD ESSENCE' : 'COBALT MIST', 0, 210);

        // Bottom Spec
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = '500 28px Inter, sans-serif';
        ctx.letterSpacing = '6px';
        ctx.fillText(isEmerald ? 'BOTANICAL IRIS & SALT' : 'DEEP MARINE & CEDAR', 0, 290);

        ctx.fillStyle = goldHighlight;
        ctx.font = '800 24px Manrope, sans-serif';
        ctx.letterSpacing = '8px';
        ctx.fillText('WHITE-LABEL SHOWCASE SPEC', 0, 420);

        ctx.restore();

        return canvas.toDataURL('image/jpeg', 0.92);
    }

    // =========================================================================
    // 4. MODEL-VIEWER ASSET PRELOAD & WARM-UP
    // =========================================================================
    if (modelViewer) {
        modelViewer.addEventListener('load', async () => {
            try {
                // Generate and compile high-res textures
                const emeraldData = generateWhiteLabelTexture('emerald');
                const cobaltData = generateWhiteLabelTexture('cobalt');

                emeraldTexture = await modelViewer.createTexture(emeraldData);
                cobaltTexture = await modelViewer.createTexture(cobaltData);

                // Shader Warm-up: Apply cobalt then back to emerald to avoid glitch on first click
                if (modelViewer.model && modelViewer.model.materials.length > 0) {
                    const mat = modelViewer.model.materials[0];
                    if (mat && mat.pbrMetallicRoughness && mat.pbrMetallicRoughness.baseColorTexture) {
                        mat.pbrMetallicRoughness.baseColorTexture.setTexture(cobaltTexture);
                        await new Promise(r => requestAnimationFrame(r));
                        mat.pbrMetallicRoughness.baseColorTexture.setTexture(emeraldTexture);
                    }
                }
            } catch (err) {
                console.error('Texture synthesis warm-up failed:', err);
            }
        });
    }

    // =========================================================================
    // 5. DUAL-VARIANT INTERACTIVE SWITCHER
    // 720° spin + motion blur + texture swap + background morph + particle burst
    // =========================================================================
    async function switchVariant(flavor) {
        if (isSwitching || flavor === currentFlavor) return;
        isSwitching = true;
        currentFlavor = flavor;

        const body = document.body;
        const targetColors = flavor === 'cobalt'
            ? { inner: '#0b4f8a', mid: '#04294e', outer: '#010c14' }
            : { inner: '#0b8a78', mid: '#044e3b', outer: '#011411' };

        // 1. Synchronize Active UI Cards & Badges
        document.querySelectorAll('.card').forEach(c => {
            c.classList.toggle('active', c.dataset.flavor === flavor);
        });
        document.querySelectorAll('.mini-swatch').forEach(s => {
            s.classList.toggle('active', s.dataset.flavor === flavor);
        });
        const curCardIdx = document.querySelector('#cur-card-idx');
        if (curCardIdx) curCardIdx.textContent = flavor === 'cobalt' ? '02' : '01';

        // 2. Synchronize Shop Details
        const shopEditionLabel = document.querySelector('#shop-edition-label');
        const shopProductTitle = document.querySelector('#shop-product-title');
        const shopVariantBadge = document.querySelector('#shop-variant-badge');
        const shopProductDesc = document.querySelector('#shop-product-desc');

        if (flavor === 'cobalt') {
            if (shopEditionLabel) shopEditionLabel.textContent = 'EDITION 02 • AZURE FROST';
            if (shopProductTitle) shopProductTitle.textContent = 'YOUR BRAND · NO. 02';
            if (shopVariantBadge) {
                shopVariantBadge.textContent = 'COBALT';
                shopVariantBadge.style.background = '#38bdf8';
            }
            if (shopProductDesc) {
                shopProductDesc.setAttribute('data-en', 'Marine coastal iris, wild blueberry dew, and deep cedar resin. Luminous and serene.');
                shopProductDesc.setAttribute('data-th', 'ไอริสมหาสมุทร หยาดน้ำค้างบลูเบอร์รี่ และยางไม้ซีดาร์ลึก กลิ่นหอมที่สงบนิ่งและตราตรึง');
                shopProductDesc.textContent = currentLang === 'th'
                    ? shopProductDesc.getAttribute('data-th')
                    : shopProductDesc.getAttribute('data-en');
            }
        } else {
            if (shopEditionLabel) shopEditionLabel.textContent = 'EDITION 01 • BOTANICAL BLEND';
            if (shopProductTitle) shopProductTitle.textContent = 'YOUR BRAND · NO. 01';
            if (shopVariantBadge) {
                shopVariantBadge.textContent = 'EMERALD';
                shopVariantBadge.style.background = '#fbcfe8';
            }
            if (shopProductDesc) {
                shopProductDesc.setAttribute('data-en', 'Crisp botanical mint, sea salt crystals, and deep coastal pine. A tactile celebration of living nature.');
                shopProductDesc.setAttribute('data-th', 'สัมผัสสดชื่นของมิ้นต์บริสุทธิ์ เกลือทะเล และไม้สนชายฝั่ง กลิ่นหอมที่เป็นเอกลักษณ์เฉพาะตัว');
                shopProductDesc.textContent = currentLang === 'th'
                    ? shopProductDesc.getAttribute('data-th')
                    : shopProductDesc.getAttribute('data-en');
            }
        }

        // 3. Smooth Background Color Morphing
        gsap.to(body, {
            '--bg-inner': targetColors.inner,
            '--bg-mid': targetColors.mid,
            '--bg-outer': targetColors.outer,
            duration: 1.4,
            ease: 'power2.inOut'
        });

        // 4. Choreographed 720° Can Spin + Motion Blur
        const spinObj = { val: 0, blur: 0 };
        gsap.to(spinObj, {
            val: 360,
            blur: 16,
            duration: 0.55,
            ease: 'power2.in',
            onUpdate: () => {
                switchSpin = spinObj.val;
                if (modelViewer) modelViewer.style.filter = `blur(${spinObj.blur}px)`;
            },
            onComplete: async () => {
                // Peak Spin: Swap Texture & Body Theme Class
                if (flavor === 'cobalt') {
                    body.classList.remove('theme-emerald');
                    body.classList.add('theme-cobalt');
                    if (modelViewer?.model && cobaltTexture) {
                        modelViewer.model.materials.forEach(mat => {
                            if (mat.pbrMetallicRoughness?.baseColorTexture) {
                                mat.pbrMetallicRoughness.baseColorTexture.setTexture(cobaltTexture);
                            }
                        });
                    }
                } else {
                    body.classList.remove('theme-cobalt');
                    body.classList.add('theme-emerald');
                    if (modelViewer?.model && emeraldTexture) {
                        modelViewer.model.materials.forEach(mat => {
                            if (mat.pbrMetallicRoughness?.baseColorTexture) {
                                mat.pbrMetallicRoughness.baseColorTexture.setTexture(emeraldTexture);
                            }
                        });
                    }
                }

                // Phase 2: Decelerate with subtle back settle
                gsap.to(spinObj, {
                    val: 720,
                    blur: 0,
                    duration: 1.35,
                    ease: 'back.out(0.75)',
                    onUpdate: () => {
                        switchSpin = spinObj.val;
                        if (modelViewer) modelViewer.style.filter = `blur(${spinObj.blur}px)`;
                    },
                    onComplete: () => {
                        switchSpin = 0;
                        if (modelViewer) modelViewer.style.filter = 'none';
                    }
                });
            }
        });

        // 5. Berries Implosion & Dynamic Explosion
        let completed = 0;
        allBerries.forEach((berry) => {
            const bW = berry.offsetWidth / 2;
            const bH = berry.offsetHeight / 2;
            const centerX = (window.innerWidth / 2 - berry.offsetLeft - bW);
            const centerY = (window.innerHeight / 2 - berry.offsetTop - bH);

            const startAngle = parseFloat(berry.dataset.angle) || 0;
            const currentBaseX = parseFloat(berry.dataset.baseX) || 0;
            const currentBaseY = parseFloat(berry.dataset.baseY) || 0;

            const nextBaseX = (Math.random() - 0.5) * 220;
            const nextBaseY = (Math.random() - 0.5) * 220;

            const tl = gsap.timeline();
            tl.to(berry, {
                x: centerX,
                y: centerY,
                rotation: startAngle + 45,
                scale: 0.1,
                opacity: 0,
                duration: 0.48,
                ease: 'power2.in',
                onComplete: () => {
                    // Swap 3D Model: Cherry <-> Blueberry
                    berry.src = flavor === 'cobalt'
                        ? 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/blueberry.glb'
                        : 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb';
                }
            })
            .to(berry, { duration: 0.25 })
            .to(berry, {
                x: nextBaseX,
                y: nextBaseY,
                rotation: startAngle + 90,
                scale: 1,
                opacity: 1,
                duration: 0.85,
                ease: 'back.out(1.5)',
                onComplete: () => {
                    berry.dataset.angle = startAngle + 90;
                    berry.dataset.baseX = nextBaseX;
                    berry.dataset.baseY = nextBaseY;
                    berry.dataset.rx = 0;
                    berry.dataset.ry = 0;

                    completed++;
                    if (completed === allBerries.length) {
                        isSwitching = false;
                    }
                }
            });
        });
    }

    // Attach Variant Click Listeners
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => switchVariant(card.dataset.flavor));
    });
    document.querySelectorAll('.mini-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => switchVariant(swatch.dataset.flavor));
    });

    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => switchVariant('emerald'));
    if (nextBtn) nextBtn.addEventListener('click', () => switchVariant('cobalt'));

    // =========================================================================
    // 6. MOUSE TRACKING & POINTER FORCE-FIELD REPULSION
    // =========================================================================
    allBerries.forEach(b => {
        b.dataset.rx = 0;
        b.dataset.ry = 0;
        b.dataset.angle = Math.random() * 360;
        b.dataset.baseX = 0;
        b.dataset.baseY = 0;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) - 0.5;
        mouse.y = (e.clientY / window.innerHeight) - 0.5;
        mouse.px = e.clientX;
        mouse.py = e.clientY;
    });

    function animateLoop() {
        const time = Date.now() * 0.001;

        // Smooth Mouse Interpolation (Lerp 0.05)
        currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
        currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

        // 3D Model Cursor Tilt + Active Spin
        if (modelViewer) {
            const orbitX = (currentMouse.x * 38) + switchSpin;
            const orbitY = 90 + (currentMouse.y * 18);
            modelViewer.cameraOrbit = `${orbitX}deg ${orbitY}deg 380%`;
        }

        // Parallax Container Multipliers
        if (berriesFG) berriesFG.style.transform = `translate(${currentMouse.x * 55}px, ${currentMouse.y * 55}px)`;
        if (berriesBG) berriesBG.style.transform = `translate(${currentMouse.x * -28}px, ${currentMouse.y * -28}px)`;
        if (leavesBG) leavesBG.style.transform = `translate(${currentMouse.x * -14}px, ${currentMouse.y * -14}px)`;

        // Force-Field Pointer Repulsion (Radius 400px)
        if (!isSwitching) {
            allBerries.forEach((berry, i) => {
                const rect = berry.getBoundingClientRect();
                const berryX = rect.left + rect.width / 2;
                const berryY = rect.top + rect.height / 2;

                const diffX = mouse.px - berryX;
                const diffY = mouse.py - berryY;
                const distance = Math.sqrt(diffX * diffX + diffY * diffY);

                let targetRx = 0, targetRy = 0, speedMult = 1;
                if (distance < 400 && distance > 0) {
                    const force = (400 - distance) / 400;
                    targetRx = (diffX / distance) * force * -75;
                    targetRy = (diffY / distance) * force * -75;
                    speedMult = 1 + force * 4.5;
                }

                let rx = parseFloat(berry.dataset.rx) || 0;
                let ry = parseFloat(berry.dataset.ry) || 0;
                let angle = parseFloat(berry.dataset.angle) || 0;
                const baseX = parseFloat(berry.dataset.baseX) || 0;
                const baseY = parseFloat(berry.dataset.baseY) || 0;

                rx += (targetRx - rx) * 0.1;
                ry += (targetRy - ry) * 0.1;
                angle += 0.2 * speedMult;

                berry.dataset.rx = rx;
                berry.dataset.ry = ry;
                berry.dataset.angle = angle;

                // Ambient Harmonic Float
                const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9];
                const phase = (time + i * 0.7) * (Math.PI * 2 / dur);
                const floatY = Math.sin(phase) * 14;
                const floatAngle = Math.cos(phase) * 5;

                berry.style.transform = `translate(calc(${rx + baseX}px), calc(${ry + baseY}px + ${floatY}px)) rotate(calc(${angle}deg + ${floatAngle}deg))`;
            });
        }

        // Ambient Floating Leaves
        document.querySelectorAll('.leaf').forEach((leaf, i) => {
            const dur = 10 + i * 2;
            const phase = (time + i * 1.2) * (Math.PI * 2 / dur);
            const floatY = Math.sin(phase) * 18;
            const floatX = Math.cos(phase * 0.5) * 12;
            const floatAngle = Math.sin(phase * 0.3) * 12;
            leaf.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatAngle}deg)`;
        });

        requestAnimationFrame(animateLoop);
    }
    requestAnimationFrame(animateLoop);

    // =========================================================================
    // 7. ENDLESS BUBBLE GENERATOR
    // =========================================================================
    function createBubble() {
        if (!bubblesContainer) return;
        const bubble = document.createElement('img');
        bubble.src = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/bubble.png';
        bubble.className = 'bubble-img';

        const size = Math.random() * 22 + 8;
        bubble.style.width = `${size}px`;
        bubble.style.height = 'auto';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = '-40px';
        bubble.style.opacity = Math.random() * 0.4 + 0.2;

        const duration = Math.random() * 5 + 4.5;
        bubble.style.animation = `floatUpImg ${duration}s linear forwards`;

        bubblesContainer.appendChild(bubble);
        setTimeout(() => bubble.remove(), duration * 1000);
    }
    setInterval(createBubble, 450);

    // =========================================================================
    // 8. GSAP SCROLLTRIGGER SCENE PROGRESSION (HYBRID A + B)
    // Orchestrates 3D stage docking across the 4 editorial chapters.
    // =========================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline: Move & Scale 3D Can smoothly across chapters
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.page-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2
            }
        });

        // Chapter 01 (The Vessel): Dock to Right
        tl.to(heroCenter, {
            x: '25vw',
            y: '0vh',
            scale: 0.88,
            ease: 'power2.inOut',
            duration: 1
        })
        // Chapter 02 (Composition): Dock to Left
        .to(heroCenter, {
            x: '-23vw',
            y: '2vh',
            scale: 0.85,
            ease: 'power2.inOut',
            duration: 1
        })
        // Chapter 03 (Craft & Ethos): Center Lowered
        .to(heroCenter, {
            x: '0vw',
            y: '10vh',
            scale: 0.72,
            opacity: 0.45,
            ease: 'power2.inOut',
            duration: 1
        })
        // Chapter 04 (Boutique): Dock Left of Purchase Card
        .to(heroCenter, {
            x: '-18vw',
            y: '4vh',
            scale: 0.92,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1
        });

        // Fade in editorial blocks as they enter viewport
        gsap.utils.toArray('.scene:not(.scene-hero)').forEach(scene => {
            gsap.from(scene.querySelector('.editorial-container, .boutique-layout'), {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: scene,
                    start: 'top 75%',
                    end: 'top 35%',
                    scrub: 0.8
                }
            });
        });

        // Active navigation link update on scroll
        const scenes = document.querySelectorAll('.scene');
        const navLinks = document.querySelectorAll('.nav-item');
        scenes.forEach(scene => {
            ScrollTrigger.create({
                trigger: scene,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => setActiveNav(scene.id),
                onEnterBack: () => setActiveNav(scene.id)
            });
        });

        function setActiveNav(id) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${id}`);
            });
        }
    }

    // =========================================================================
    // 9. BILINGUAL TH/EN LOCALIZATION ENGINE
    // =========================================================================
    function setLanguage(lang) {
        currentLang = lang;
        document.body.setAttribute('data-lang', lang);

        if (langBtn) {
            langBtn.innerHTML = lang === 'th'
                ? '<span class="active-lang">TH</span> / EN'
                : 'TH / <span class="active-lang">EN</span>';
        }

        // Update all elements with data-en and data-th
        document.querySelectorAll('[data-en][data-th]').forEach(el => {
            const val = el.getAttribute(`data-${lang}`);
            if (val) el.textContent = val;
        });

        // Update active checkout price label
        updatePriceDisplay();
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'th' ? 'en' : 'th');
        });
    }

    // =========================================================================
    // 10. BOUTIQUE SIZE & QUANTITY SHOP CALCULATOR
    // =========================================================================
    let currentSize = 50;
    let basePriceTHB = 3800;
    let basePriceUSD = 110;
    let quantity = 1;

    const sizeBtns = document.querySelectorAll('.size-btn');
    const priceDisplay = document.querySelector('#product-price');
    const qtyVal = document.querySelector('#qty-val');
    const qtyDec = document.querySelector('#qty-dec');
    const qtyInc = document.querySelector('#qty-inc');
    const addToBagBtn = document.querySelector('#add-to-bag-btn');

    function updatePriceDisplay() {
        const totalTHB = (basePriceTHB * quantity).toLocaleString('th-TH');
        const totalUSD = (basePriceUSD * quantity).toLocaleString('en-US');

        if (priceDisplay) {
            priceDisplay.textContent = currentLang === 'th' ? `฿${totalTHB}` : `$${totalUSD}`;
        }

        if (addToBagBtn) {
            const btnText = addToBagBtn.querySelector('.checkout-text');
            if (btnText) {
                if (currentLang === 'th') {
                    btnText.textContent = `สั่งซื้อสินค้า • ฿${totalTHB}`;
                } else {
                    btnText.textContent = `Add to Bag • $${totalUSD}`;
                }
            }
        }
    }

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSize = parseInt(btn.dataset.size, 10);
            basePriceTHB = parseInt(btn.dataset.price, 10);
            basePriceUSD = currentSize === 50 ? 110 : 165;
            updatePriceDisplay();
        });
    });

    if (qtyDec) {
        qtyDec.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                if (qtyVal) qtyVal.textContent = quantity;
                updatePriceDisplay();
            }
        });
    }

    if (qtyInc) {
        qtyInc.addEventListener('click', () => {
            if (quantity < 10) {
                quantity++;
                if (qtyVal) qtyVal.textContent = quantity;
                updatePriceDisplay();
            }
        });
    }

    if (addToBagBtn) {
        addToBagBtn.addEventListener('click', () => {
            const flavorName = currentFlavor === 'emerald' ? 'Edition 01 (Emerald)' : 'Edition 02 (Cobalt)';
            const msg = currentLang === 'th'
                ? `เพิ่ม ${flavorName} ขนาด ${currentSize}ml จำนวน ${quantity} ชิ้น ลงในตะกร้าเรียบร้อยแล้ว`
                : `Added ${quantity}x ${flavorName} (${currentSize}ml) to your bag.`;
            alert(msg);
        });
    }

    // Editorial Modern Font (Syne + Prompt) locked as default
    document.body.classList.add('font-editorial-sans');

    // Set Initial Language (Default Thai)
    setLanguage('th');

})();
