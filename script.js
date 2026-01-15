document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Cuenta Regresiva ---
    // Establecemos la fecha objetivo: 14 de Marzo, 2026 a las 19:00:00
    // Nota: El mes en JavaScript es base 0 (0 = Enero, 1 = Febrero, 2 = Marzo)
    const eventDate = new Date(2026, 2, 14, 19, 0, 0).getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "<div class='time-box' style='width:100%; font-family:var(--font-title); font-size:2rem; color:var(--gold);'><span>¡La celebración ha comenzado!</span></div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);

    // --- 2. Animaciones al hacer Scroll ---
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // --- 3. Reproductor de Música ---
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icono tachado o silencio
            musicBtn.style.animation = 'none'; // Detener animación
        } else {
            bgMusic.play().catch(error => {
                console.log("Reproducción bloqueada por el navegador, se requiere interacción del usuario.");
            });
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicBtn.style.animation = 'pulse 2s infinite';
        }
        isPlaying = !isPlaying;
    });

    // --- 4. Formulario RSVP con WhatsApp ---
    const rsvpForm = document.getElementById('rsvpForm');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const asistentes = document.getElementById('asistentes').value;
        const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
        const mensaje = document.getElementById('mensaje').value;

        // Número de teléfono de destino (Reemplazar con el real)
        const phoneNumber = "525611767769";

        const asistenciaTexto = asistencia === 'si' ? "¡Sí, asistiré!" : "Lo siento, no podré asistir.";

        const whatsappMessage = `
*Confirmación de Asistencia - XV Años Dana* ✨

👤 *Nombre:* ${nombre}
👥 *Asistentes:* ${asistentes}
📩 *Respuesta:* ${asistenciaTexto}
📝 *Mensaje:* ${mensaje}

¡Gracias!
        `.trim();

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(url, '_blank');
    });

    // --- 5. Header Scroll Effect (Opcional, para mejorar la lectura del menú si se agrega) ---
    // window.addEventListener('scroll', () => {
    //     const header = document.querySelector('header');
    //     header.classList.toggle('sticky', window.scrollY > 0);
    // });

});