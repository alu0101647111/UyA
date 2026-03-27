/**
 * Inicializa los formularios al cargar el documento para manejar su envío
 */
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página intente recargarse
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtener los elementos input
  const inputFecha = document.getElementById('fechaLlegada');
  const inputHora = document.getElementById('horaLlegada');

  // 2. Función para obtener la fecha local correcta en formato YYYY-MM-DD
  function obtenerFechaLocal() {
    const ahora = new Date();
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 3. Establecer la fecha mínima y por defecto 
  const hoyLocal = obtenerFechaLocal();
  inputFecha.setAttribute('min', hoyLocal);
  inputFecha.value = hoyLocal;

  // 4. Función para controlar la hora permitida
  function actualizarHoraMinima() {
    const fechaSeleccionada = inputFecha.value;
    const ahora = new Date();

    // Comprobamos si la fecha seleccionada es hoy
    if (fechaSeleccionada === hoyLocal) {
      // Sacamos la hora y minutos actuales en formato HH:MM
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const horaActualStr = `${horas}:${minutos}`;

      // Establecemos el límite
      inputHora.setAttribute('min', horaActualStr);

      // Si el campo de hora estaba vacío o tenía una hora pasada, le ponemos la hora actual
      if (!inputHora.value || inputHora.value < horaActualStr) {
        inputHora.value = horaActualStr;
      }
    } else {
      // Si es un día futuro, quitamos la restricción de hora
      inputHora.removeAttribute('min');
    }
  }

  // Ejecutamos la función de la hora al cargar la página por primera vez
  actualizarHoraMinima();

  // 5. "Escuchamos" si el usuario cambia la fecha para recalcular la hora permitida
  inputFecha.addEventListener('change', actualizarHoraMinima);
});