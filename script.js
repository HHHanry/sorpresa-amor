document.addEventListener('DOMContentLoaded', () => {
    const ui = {
        inicio: document.getElementById('pantalla-inicio'),
        carta: document.getElementById('contenedor-carta'),
        cardContent: document.querySelector('.glass-card'),
        musica: document.getElementById('musica-fondo'),
        btnDesliza: document.getElementById('boton-desliza'),
        modalFoto: document.getElementById('contenedor-foto'),
        btnCerrar: document.getElementById('cerrar-foto'),
        gatitos: [document.getElementById('gatito-der'), document.getElementById('gatito-izq')],
        egoBadge: document.getElementById('ego-badge'),
        btn90s: document.getElementById('btn-90s'),
        noSentidoTrigger: document.getElementById('no-sentido-trigger'),
        lmToggle: document.getElementById('luis-miguel-toggle'),
        lmError: document.getElementById('lm-error'),
        murakamiTrigger: document.getElementById('murakami-trigger'),
        terminalText: document.getElementById('terminal-text')
    };

    let estadoApp = { abierta: false, murakamiMode: false, terminalTyped: false };

    // --- MOTOR DE PARTÍCULAS ---
    const crearParticula = (tipo, x = null, y = null) => {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        const emojis = { flor: ['🌸', '🌹', '🌻', '🌷'], corazon: ['❤️', '✨', '💕'], magia: ['✨'] };
        const lista = emojis[tipo] || emojis.corazon;
        
        let contenido = lista[Math.floor(Math.random() * lista.length)];
        
        // Murakami Override
        if (estadoApp.murakamiMode && tipo === 'flor') {
            contenido = '<span class="murakami-spin">🌸</span>';
        }

        particula.innerHTML = contenido;
        particula.style.left = x ? `${x}px` : `${Math.random() * 100}vw`;
        
        const gravityDir = getComputedStyle(document.documentElement).getPropertyValue('--particle-direction').trim();
        const startY = gravityDir.includes('-') ? '105vh' : '-5vh'; 
        particula.style.top = y ? `${y}px` : startY;
        
        const size = tipo === 'magia' ? (Math.random() * 10 + 10) : (Math.random() * 15 + 15);
        particula.style.fontSize = `${size}px`;
        document.body.appendChild(particula);
        setTimeout(() => particula.remove(), 4500);
    };

    // --- INICIO APP ---
    ui.inicio.addEventListener('click', () => {
        if (estadoApp.abierta) return;
        estadoApp.abierta = true;
        if(ui.musica) ui.musica.play().catch(e => console.warn("Interacción requerida", e));

        ui.inicio.style.opacity = '0';
        setTimeout(() => {
            ui.inicio.style.display = 'none';
            ui.carta.classList.remove('oculto');
            ui.carta.classList.add('visible');
            ui.btn90s.classList.remove('oculto');

            for (let i = 0; i < 20; i++) setTimeout(() => crearParticula('flor'), i * 150);
            ui.gatitos.forEach((gato, idx) => { if (gato) setTimeout(() => gato.classList.add('gatito-visible'), 500 * (idx + 1)); });

            setTimeout(() => {
                ui.btnDesliza.classList.remove('oculto-boton');
                ui.btnDesliza.style.opacity = '1';
                ui.btnDesliza.style.pointerEvents = 'auto';
            }, 3000);

            setInterval(() => crearParticula('flor'), 2000);
        }, 600);
    });

    // --- FEATURE 1: MODO JEFA ---
    let egoClicks = 0;
    ui.egoBadge.addEventListener('click', () => {
        egoClicks++;
        if(egoClicks === 3) {
            ui.egoBadge.classList.add('jefa-mode');
            ui.egoBadge.innerHTML = ">_ MODO JEFA: ACTIVADO 👑";
            if ("vibrate" in navigator) navigator.vibrate(100);
            for (let i = 0; i < 15; i++) setTimeout(() => crearParticula('magia'), i * 50);
        }
    });

    // --- FEATURE: LUIS MIGUEL TOGGLE ---
    ui.lmToggle.addEventListener('change', (e) => {
        if(e.target.checked) {
            setTimeout(() => {
                ui.lmToggle.checked = false; // Lo apaga a la fuerza
                if ("vibrate" in navigator) navigator.vibrate([50, 50, 50]); // Vibra de error
                ui.lmError.classList.remove('oculto-tooltip');
                setTimeout(() => ui.lmError.classList.add('oculto-tooltip'), 3000);
            }, 200);
        }
    });

    // --- FEATURE: MURAKAMI EASTER EGG ---
    ui.murakamiTrigger.addEventListener('click', () => {
        if (estadoApp.murakamiMode) return;
        estadoApp.murakamiMode = true;
        document.body.classList.add('murakami-mode');
        ui.murakamiTrigger.style.color = '#e74c3c';
        if ("vibrate" in navigator) navigator.vibrate(50);
        // Lanza una ola de flores giratorias
        for (let i = 0; i < 30; i++) setTimeout(() => crearParticula('flor'), i * 50);
    });

    // --- FEATURE: TERMINAL TYPEWRITER (Intersection Observer) ---
    const terminalString = ">_ Ejecución finalizada: Toca ser frío de nuevo xd";
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !estadoApp.terminalTyped) {
            estadoApp.terminalTyped = true;
            let i = 0;
            const typeWriter = setInterval(() => {
                ui.terminalText.innerHTML += terminalString.charAt(i);
                i++;
                if(i >= terminalString.length) clearInterval(typeWriter);
            }, 50);
        }
    }, { threshold: 0.5 }); // Se activa cuando el elemento es 50% visible
    observer.observe(ui.terminalText);

    // --- FEATURE 3: FILTRO 90s ---
    ui.btn90s.addEventListener('click', () => {
        document.documentElement.style.setProperty('--vhs-filter', 'sepia(0.6) hue-rotate(-15deg) saturate(1.5) contrast(1.2)');
        setTimeout(() => document.documentElement.style.setProperty('--vhs-filter', 'none'), 5000); 
    });

    // --- FEATURE 4: PROTOCOLO ROCKSTAR (Haptic & Shake) ---
    ui.btnDesliza.addEventListener('click', () => {
        ui.btnDesliza.classList.add('shake-anim');
        // Magia Haptic: Vibra al ritmo de un latido si el celular lo soporta
        if ("vibrate" in navigator) navigator.vibrate([100, 50, 100, 50, 200]);
        
        setTimeout(() => {
            ui.btnDesliza.classList.remove('shake-anim');
            ui.modalFoto.classList.remove('oculto');
            ui.modalFoto.classList.add('visible');
            for (let i = 0; i < 20; i++) setTimeout(() => crearParticula('corazon'), i * 80);
        }, 400); 
    });

    ui.btnCerrar.addEventListener('click', () => {
        ui.modalFoto.classList.remove('visible');
        ui.modalFoto.classList.add('oculto');
    });

    // --- FEATURE 5: NO HACE SENTIDO ---
    let sentidoLogico = true;
    ui.noSentidoTrigger.addEventListener('click', () => {
        sentidoLogico = !sentidoLogico;
        if ("vibrate" in navigator) navigator.vibrate(100);
        if(!sentidoLogico) {
            document.documentElement.style.setProperty('--particle-direction', '110vh'); 
            ui.cardContent.classList.add('logic-error');
            ui.noSentidoTrigger.innerText = "[ERROR DE LÓGICA]";
        } else {
            document.documentElement.style.setProperty('--particle-direction', '-110vh'); 
            ui.cardContent.classList.remove('logic-error');
            ui.noSentidoTrigger.innerText = "No hace sentiiiiiiiiiiiiiiiidooooooooo";
        }
    });

    // --- EFECTO TÁCTIL ---
    let lastTime = 0;
    document.addEventListener('touchmove', (e) => {
        if (!estadoApp.abierta) return;
        const now = Date.now();
        if (now - lastTime > 60) { 
            crearParticula('magia', e.touches[0].clientX, e.touches[0].clientY);
            lastTime = now;
        }
    }, { passive: true });
});
