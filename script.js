document.addEventListener('DOMContentLoaded', () => {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const contenedorCarta = document.getElementById('contenedor-carta');
    const musica = document.getElementById('musica-fondo');
    const botonDesliza = document.getElementById('boton-desliza');
    const contenedorFoto = document.getElementById('contenedor-foto');
    const cerrarFoto = document.getElementById('cerrar-foto');
    let cartaAbierta = false;

    // Función para crear flores flotantes
function crearFlor() {
    const flor = document.createElement('div');
    
    // Lista de emojis de flores para variar
    const flores = ['🌸', '🌹', '🌻', '🌺', '🌷', '🌼'];
    // Elige una flor aleatoria de la lista
    flor.innerHTML = flores[Math.floor(Math.random() * flores.length)];
    
    flor.classList.add('corazon'); // Reutilizamos la clase CSS para que flote igual
    
    // Posición horizontal aleatoria (0 a 100vw)
    flor.style.left = Math.random() * 100 + 'vw';
    // Posición vertical inicial (cerca del fondo)
    flor.style.top = '100vh';
    
    // Tamaño aleatorio para dar profundidad
    const tamaño = Math.random() * 2 + 1;
    flor.style.transform = `scale(${tamaño})`;
    
    document.body.appendChild(flor);

    // Eliminar después de que termine la animación (4s en tu CSS actual)
    setTimeout(() => flor.remove(), 4000); 
}

// Para que aparezcan flores solas cada cierto tiempo
setInterval(crearFlor, 1000); // Crea una flor cada segundo

    // Generar múltiples corazones iniciales suavemente al abrir la carta
    function lluviaCorazonesInicial() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => crearCorazon(), i * 150);
        }
    }

    pantallaInicio.addEventListener('click', () => {
        if (!cartaAbierta) {
            pantallaInicio.style.opacity = '0';
            
            musica.play().catch(error => {
                console.log("Música bloqueada, click detectado.", error);
            });

           setTimeout(() => {
                pantallaInicio.style.display = 'none';
                contenedorCarta.classList.remove('oculto');
                contenedorCarta.classList.add('visible');
                lluviaCorazonesInicial(); 
                
                // --- NUEVO: Mostrar al gatito ---
               const gatitoDer = document.getElementById('gatito-esquina');
                const gatitoIzq = document.getElementById('gatito-esquina-izq');
                
                if(gatitoDer) gatitoDer.classList.add('gatito-visible');
                if(gatitoIzq) gatitoIzq.classList.add('gatito-visible');

                setTimeout(() => {
                    botonDesliza.classList.remove('oculto-boton');
                    botonDesliza.classList.add('visible-boton');
                }, 3000); 
            }, 1000);

            cartaAbierta = true;
        }
    });

    // REVELAR FOTO Y MÁS CORAZONES
    botonDesliza.addEventListener('click', () => {
        contenedorFoto.classList.remove('oculto');
        contenedorFoto.classList.add('visible');
        
        // Lluvia de corazones más intensa al revelar la foto
        for (let i = 0; i < 30; i++) {
            setTimeout(() => crearCorazon(), i * 100);
        }
    });

    // CERRAR FOTO
    cerrarFoto.addEventListener('click', () => {
        contenedorFoto.classList.remove('visible');
        setTimeout(() => contenedorFoto.classList.add('oculto'), 1500);
    });
// --- MAGIA TÁCTIL PARA CELULARES ---
    // Crea un pequeño rastro de corazones cuando desliza el dedo leyendo la carta
    document.addEventListener('touchmove', (e) => {
        // Solo activamos esto si la carta ya se abrió y limitamos la cantidad para no trabar su celular
        if (cartaAbierta && Math.random() > 0.7) { 
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            
            const miniCorazon = document.createElement('div');
            miniCorazon.innerHTML = '✨'; // Puedes cambiarlo a '❤️' si prefieres
            miniCorazon.style.position = 'absolute';
            miniCorazon.style.left = `${x}px`;
            miniCorazon.style.top = `${y}px`;
            miniCorazon.style.fontSize = '12px';
            miniCorazon.style.pointerEvents = 'none';
            miniCorazon.style.animation = 'flotar-corazon 2s ease-out forwards';
            miniCorazon.style.zIndex = '200';
            
            document.body.appendChild(miniCorazon);
            setTimeout(() => miniCorazon.remove(), 2000);
        }
    });
});
