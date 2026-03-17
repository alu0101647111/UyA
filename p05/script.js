document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formReserva");
    const erroresDiv = document.getElementById("errores");
    const resumenDiv = document.getElementById("resumen");
    const precioEstimadoSpan = document.getElementById("precioEstimado");
    const limpiarBtn = document.getElementById("limpiar");

    // EVENTO RESERVAR
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        erroresDiv.innerHTML = "";
        resumenDiv.innerHTML = "";

        let errores = [];

        // Leer datos
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const entrada = document.getElementById("entrada").value;
        const salida = document.getElementById("salida").value;
        const huespedes = parseInt(document.getElementById("huespedes").value);
        const habitacion = document.getElementById("habitacion").value;
        const desayuno = document.getElementById("desayuno").checked;
        const parking = document.getElementById("parking").checked;
        const codigo = document.getElementById("codigo").value.trim();

        // VALIDACIONES
        if (nombre === "") errores.push("El nombre es obligatorio");
        if (email === "" || email.indexOf("@") === -1) errores.push("Email inválido");
        if (entrada === "") errores.push("Fecha de entrada obligatoria");
        if (salida === "") errores.push("Fecha de salida obligatoria");

        let fechaEntrada = new Date(entrada);
        let fechaSalida = new Date(salida);

        if (entrada && salida && fechaSalida <= fechaEntrada) {
            errores.push("La fecha de salida debe ser posterior a la de entrada");
        }

        // Mostrar errores
        if (errores.length > 0) {
            erroresDiv.className = "alert alert-danger";

            errores.forEach(err => {
                let p = document.createElement("p");
                p.textContent = err;
                erroresDiv.appendChild(p);
            });
            return;
        }

        // CALCULAR NOCHES
        let noches = (fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24);

        // PRECIOS
        let precioNoche = 0;
        if (habitacion === "individual") precioNoche = 50;
        if (habitacion === "doble") precioNoche = 80;
        if (habitacion === "suite") precioNoche = 120;

        let total = precioNoche * noches;

        if (desayuno) total += 10 * huespedes * noches;
        if (parking) total += 15 * noches;

        // DESCUENTO
        if (codigo === "PROMO10") {
            total *= 0.9;
        }

        // CREAR RESUMEN
        let lista = document.createElement("ul");
        lista.className = "list-group";

        function addItem(texto) {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = texto;
            lista.appendChild(li);
        }

        addItem("Nombre: " + nombre);
        addItem("Email: " + email);
        addItem("Noches: " + noches);
        addItem("Huéspedes: " + huespedes);
        addItem("Habitación: " + habitacion);
        addItem("Extras: " +
            (desayuno ? "Desayuno " : "") +
            (parking ? "Parking" : "Ninguno")
        );
        addItem("TOTAL: " + total.toFixed(2) + "€");

        resumenDiv.appendChild(lista);
    });

    // BOTÓN LIMPIAR
    limpiarBtn.addEventListener("click", function () {
        form.reset();
        resumenDiv.innerHTML = "";
        erroresDiv.innerHTML = "";
        erroresDiv.className = "";
        precioEstimadoSpan.textContent = "0€";
    });

    // PRECIO ESTIMADO AUTOMÁTICO
    form.addEventListener("change", calcularEstimado);

    function calcularEstimado() {
        const entrada = document.getElementById("entrada").value;
        const salida = document.getElementById("salida").value;
        const huespedes = parseInt(document.getElementById("huespedes").value);
        const habitacion = document.getElementById("habitacion").value;
        const desayuno = document.getElementById("desayuno").checked;
        const parking = document.getElementById("parking").checked;

        if (!entrada || !salida) return;

        let noches = (new Date(salida) - new Date(entrada)) / (1000 * 60 * 60 * 24);
        if (noches <= 0) return;

        let precioNoche = habitacion === "individual" ? 50 :
                          habitacion === "doble" ? 80 : 120;

        let total = precioNoche * noches;

        if (desayuno) total += 10 * huespedes * noches;
        if (parking) total += 15 * noches;

        precioEstimadoSpan.textContent = total.toFixed(2) + "€";
    }

});
