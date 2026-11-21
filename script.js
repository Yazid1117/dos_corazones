// Dos Corazones · propuesta de diseño
// 1) Cambio de idioma español / inglés
// 2) Formulario que arma un mensaje de WhatsApp para reservar

const WHATSAPP = '529511506975';

/* ---------- 1. Idioma ---------- */
const langButton = document.querySelector('.lang-switch');
const translatable = document.querySelectorAll('[data-en]');

// Guardamos el texto en español de cada elemento la primera vez
translatable.forEach((el) => { el.dataset.es = el.innerHTML; });

let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  translatable.forEach((el) => {
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
  });
  langButton.textContent = lang === 'en' ? 'ES' : 'EN';
  langButton.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
}

langButton.addEventListener('click', () => {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
});

/* ---------- 2. Reserva por WhatsApp ---------- */
const form = document.querySelector('#booking-form');

// No permitir fechas pasadas
const dateInput = form.querySelector('#fecha');
dateInput.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const lines = currentLang === 'en'
    ? [
        "Hi! I'd like to book a cooking class 🌶️",
        `Name: ${data.get('nombre')}`,
        `Date: ${data.get('fecha')}`,
        `Time: ${data.get('horario')}`,
        `People: ${data.get('personas')}`,
        data.get('notas') ? `Notes: ${data.get('notas')}` : '',
      ]
    : [
        '¡Hola! Quiero reservar una clase de cocina 🌶️',
        `Nombre: ${data.get('nombre')}`,
        `Fecha: ${data.get('fecha')}`,
        `Horario: ${data.get('horario')}`,
        `Personas: ${data.get('personas')}`,
        data.get('notas') ? `Notas: ${data.get('notas')}` : '',
      ];

  const message = lines.filter(Boolean).join('\n');
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});
