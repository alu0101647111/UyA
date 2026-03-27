document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página intente recargarse
      const mensaje = form.getAttribute('data-mensaje') || 'Simulación: Acción completada con éxito.';
      alert(mensaje);
    });
  });
});