// Inicializa los formularios al cargar el documento para manejar su envío
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página intente recargarse
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Limitación de fecha ---
  // Obtener el elemento input
  const inputFecha = document.getElementById('fechaLlegada');

  // Comprobar que el elemento existe en la página actual antes de intentar modificarlo
  if (inputFecha) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const hoy = new Date();
    const hoyISO = hoy.toISOString().split('T')[0];

    // Establecer el atributo min para que no se puedan elegir fechas pasadas
    inputFecha.setAttribute('min', hoyISO);

    // Por defecto aparece la fecha de hoy seleccionada
    inputFecha.value = hoyISO;
  }

  // --- 2. Cálculo de precios automático ---
  const btnCalcular = document.getElementById('btnCalcular');
  
  if (btnCalcular) {
    btnCalcular.addEventListener('click', function() {
      const origen = document.getElementById('puntoRecogida').value;
      const destinoText = document.getElementById('destino').value.toLowerCase().trim();
      const numPasajeros = parseInt(document.getElementById('pasajeros').value);
      
      // Base de datos de precios
      const tarifas = {
        'TFS': {
          'costa adeje': { p1: 35, p2: 50 },
          'arona': { p1: 35, p2: 50 },
          'puerto de la cruz': { p1: 90, p2: 125 },
          'santa cruz': { p1: 50, p2: 100}
        },
        'TFN': {
          'puerto de la cruz': { p1: 40, p2: 55 },
          'santa cruz': { p1: 25, p2: 35 },
          'costa adeje': { p1: 45, p2: 75 },
          'arona': { p1: 45, p2: 75 }
        }
      };

      let precioFinal = 0;
      const destinoData = tarifas[origen][destinoText];

      // Asignar precio según el número de pasajeros
      precioFinal = numPasajeros <= 4 ? destinoData.p1 : destinoData.p2;
      encontrado = true;

      const resDiv = document.getElementById('resultadoPrecio');
      const precioSpan = document.getElementById('precioValor');
      const btnConfirmar = document.getElementById('btnConfirmar');

      // Mostrar el precio y habilitar el botón de confirmar
      precioSpan.innerText = precioFinal + "€";
      resDiv.classList.remove('d-none', 'alert-danger');
      resDiv.classList.add('alert-info');
      btnConfirmar.disabled = false;
    });
  }
});