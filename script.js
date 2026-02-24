
/*  Al terminar de cargar la página, recuperamos el último cálculo
    guardado en localStorage para mostrarlo al usuario.
*/
window.onload = function () {
    mostrarUltimoCalculo();
};


/*
 Función mostrarSeccion:
 Muestra únicamente la sección elegida en el menú y oculta
 las demás.
*/
function mostrarSeccion(nombre) {
    var secciones = ["triangulo", "esfera", "divisas"];

    for (var i = 0; i < secciones.length; i++) {
        var div = document.getElementById("seccion-" + secciones[i]);

        if (secciones[i] === nombre) {
            div.style.display = "block";   // Mostramos la sección elegida
        } else {
            div.style.display = "none";    // Ocultamos el resto
        }
    }
}


/*
 Función validarPositivo:
 Verifica que un valor sea un número mayor que cero.
 Retorna true si el valor es válido, false si no lo es.
*/ 
function validarPositivo(valor) {
    // isNaN devuelve true si el valor no puede interpretarse como número
    if (isNaN(valor) || valor === "") {
        return false;
    }
    // Una medida física (base, radio, pesos) no puede ser cero ni negativa
    if (valor <= 0) {
        return false;
    }
    return true;
}


/*
 Función mostrarMensaje:
 Escribe un mensaje en el elemento indicado por su id.
 Si esError es true, agrega la clase "error" para mostrar
 el texto en rojo (según styles.css). Si es false, la quita.
*/
function mostrarMensaje(idElemento, mensaje, esError) {
    var parrafo = document.getElementById(idElemento);
    parrafo.innerHTML = mensaje;

    if (esError) {
        parrafo.classList.add("error");
    } else {
        parrafo.classList.remove("error");
    }
}


/* 
 Función calcularTriangulo:
 Lee base y altura, valida que sean positivos y calcula
 el área.
*/
function calcularTriangulo() {
    var base   = parseFloat(document.getElementById("base").value);
    var altura = parseFloat(document.getElementById("altura").value);

    // Se vlida cada campo antes de operar
    if (!validarPositivo(base)) {
        mostrarMensaje("resultado-triangulo",
            "Error: la base debe ser un número mayor que cero.", true);
        return; //Sale de la función si hay un error
    }
    if (!validarPositivo(altura)) {
        mostrarMensaje("resultado-triangulo",
            "Error: la altura debe ser un número mayor que cero.", true);
        return;
    }

    // Cálculo del área del triángulo
    var area = (base * altura) / 2;

    var resultado = "El área del triángulo es: " + area.toFixed(2) + " unidades cuadradas";
    mostrarMensaje("resultado-triangulo", resultado, false);

    // Se guarda este cálculo como el último realizado
    guardarUltimoCalculo("Área del triángulo", resultado);
}


/* 
 Función calcularEsfera:
 Lee el radio, lo valida y calcula el volumen.
*/
function calcularEsfera() {
    var radio = parseFloat(document.getElementById("radio").value);

    if (!validarPositivo(radio)) {
        mostrarMensaje("resultado-esfera",
            "Error: el radio debe ser un número mayor que cero.", true);
        return;
    }

    // Math.PI tiene el valor de pi y Math.pow(radio, 3) eleva el radio al cubo
    var volumen = (4 / 3) * Math.PI * Math.pow(radio, 3);

    var resultado = "El volumen de la esfera es: " + volumen.toFixed(2) + " unidades cúbicas";
    mostrarMensaje("resultado-esfera", resultado, false);

    guardarUltimoCalculo("Volumen de la esfera", resultado);
}


/* 
 Función calcularDivisas:
 Lee pesos y tipo de cambio, valida y convierte a dólares.
*/ 
function calcularDivisas() {
    var pesos      = parseFloat(document.getElementById("pesos").value);
    var tipoCambio = parseFloat(document.getElementById("tipoCambio").value);

    if (!validarPositivo(pesos)) {
        mostrarMensaje("resultado-divisas",
            "Error: la cantidad en pesos debe ser mayor que cero.", true);
        return;
    }
    if (!validarPositivo(tipoCambio)) {
        mostrarMensaje("resultado-divisas",
            "Error: el tipo de cambio debe ser mayor que cero.", true);
        return;
    }

    var dolares = pesos / tipoCambio;

    var resultado = pesos.toFixed(2) + " MXN equivalen a $" + dolares.toFixed(2) + " USD";
    mostrarMensaje("resultado-divisas", resultado, false);

    guardarUltimoCalculo("Conversión de divisas", resultado);
}


/*  Función limpiar:
 Borra los campos de entrada y el mensaje de resultado de
 la sección indicada. Se conecta al botón "Limpiar" de
 cada sección.
*/
function limpiar(seccion) {
    if (seccion === "triangulo") {
        document.getElementById("base").value            = "";
        document.getElementById("altura").value          = "";
        document.getElementById("resultado-triangulo").innerHTML = "";
        document.getElementById("resultado-triangulo").classList.remove("error");
    }
    else if (seccion === "esfera") {
        document.getElementById("radio").value           = "";
        document.getElementById("resultado-esfera").innerHTML   = "";
        document.getElementById("resultado-esfera").classList.remove("error");
    }
    else if (seccion === "divisas") {
        document.getElementById("pesos").value           = "";
        document.getElementById("tipoCambio").value      = "";
        document.getElementById("resultado-divisas").innerHTML  = "";
        document.getElementById("resultado-divisas").classList.remove("error");
    }
}


/*
 Función guardarUltimoCalculo:
 Guarda el tipo y resultado del último cálculo en el
 almacenamiento local del navegador.
*/ 
function guardarUltimoCalculo(tipo, resultado) {
    localStorage.setItem("ultimoTipo",      tipo);
    localStorage.setItem("ultimoResultado", resultado);
    localStorage.setItem("ultimaFecha",     new Date().toLocaleString());

    // Se actuliza el texto en pantalla inmediatamente
    mostrarUltimoCalculo();
}


/* 
 Función mostrarUltimoCalculo:
 Recupera los datos guardados en localStorage y los muestra
 en el párrafo al pie de la página.
*/ 
function mostrarUltimoCalculo() {
    var tipo      = localStorage.getItem("ultimoTipo");
    var resultado = localStorage.getItem("ultimoResultado");
    var fecha     = localStorage.getItem("ultimaFecha");

    var parrafo = document.getElementById("ultimo-calculo");

    // Solo se muestra algo si ya existe un cálculo guardado
    if (tipo && resultado) {
        parrafo.innerHTML = "Último cálculo guardado (" + fecha + "): "
                          + tipo + " — " + resultado;
    }
}