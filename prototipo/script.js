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
  // Obtener el elemento input
  const inputFecha = document.getElementById('fechaLlegada');

  // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
  const hoy = new Date();
  const hoyISO = hoy.toISOString().split('T')[0];

  // Establecer el atributo min para que no se puedan elegir fechas pasadas
  inputFecha.setAttribute('min', hoyISO);

  // Por defecto aparece la fecha de hoy seleccionada
  inputFecha.value = hoyISO;
});