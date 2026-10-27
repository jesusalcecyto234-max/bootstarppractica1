const cargarProductos = () => {
    var area = document.querySelector("#area").value;
    var productoSelect = document.querySelector("#producto");

    if (area === "Jardineria") {
        productoSelect.innerHTML = `
            <option value="pala">Pala</option>
            <option value="planta">Planta</option>
            <option value="mangue">Manguera</option>
            <option value="maceta">Maceta</option>
            <option value="tijeras">Tijeras</option>
        `;
    } else if (area === "Herramientas") {
        productoSelect.innerHTML = `
            <option value="roto">Taladro Rotomartillo</option>
            <option value="desarmador">Desarmador</option>
            <option value="martillo">Martillo</option>
            <option value="sierra">Sierra</option>
            <option value="metro">Metro</option>
            
        `;
    }else if (area === "Decoracion") {
        productoSelect.innerHTML = `
            <option value="lampara">Lampara</option>
            <option value="cogin">Cojin</option>
            <option value="espejo">Espejo</option>
            <option value="reloj">Reloj</option>
            <option value="jarron">Jarron</option>
            
        `;
    }else if (area === "Iluminacion") {
        productoSelect.innerHTML = `
            <option value="lamparat">Lampara-techo</option>
            <option value="aplique">Aplique-pared</option>
            <option value="reflec">Reflector</option>
            <option value="ventilador">Ventilador-techo</option>
            <option value="lamparae">Lampara-escritorio</option>
            
        `;
    }

    calcular();
};

const calcular = () => {
    var producto = document.querySelector("#producto").value;
    var img = document.querySelector("#img");
    var precio = document.querySelector("#precio");

    var costo = 0;
    var plazo = 0;
    var aumento = 0;

    if (producto !== "") {
        img.innerHTML = `<img src="img/${producto}.png" alt="${producto}">`;
    } else {
        img.innerHTML = "";
    }

    switch (producto) {
        case "pala": costo = 250; break;
        case "planta": costo = 120; break;
        case "mangue": costo = 350; break;
        case "maceta": costo = 80; break;
        case "roto": costo = 1200; break;
        case "desarmador": costo = 250; break;
        case "martillo": costo = 80; break;
        case "sierra": costo = 100; break;
        case "metro": costo = 60; break;
        case "lampara": costo = 500; break;
        case "cogin": costo = 80; break;
        case "espejo": costo = 200; break;
        case "reloj": costo = 300; break;
        case "jarron": costo = 120; break;
        case "lamparat": costo = 800; break;
        case "aplique": costo = 400; break;
        case "reflec": costo = 500; break;
        case "ventilador": costo = 12000; break;
        case "lamparae": costo = 300; break;
    }

    precio.innerHTML = `<h3>Precio: $ ${costo.toFixed(2)} MXN</h3>`;

    var uno = document.querySelector("#uno");
    var dos = document.querySelector("#dos");
    var tres = document.querySelector("#tres");
    var cantidad = document.querySelector("#cantidad").value || 1;

    if (uno.checked) {
        plazo = 6;
        aumento = 0.1;
    } else if (dos.checked) {
        plazo = 12;
        aumento = 0.15;
    } else if (tres.checked) {
        plazo = 18;
        aumento = 0.2;
    }

    var contado = costo * cantidad;
    var credito = contado + (contado * aumento);
    var abono = plazo > 0 ? credito / plazo : 0;

    document.querySelector("#contado").innerHTML = `<h3>Precio de Contado: $ ${contado.toFixed(2)} MXN</h3>`;
    document.querySelector("#credito").innerHTML = `<h3>Precio a Credito: $ ${credito.toFixed(2)} MXN</h3>`;
    document.querySelector("#abono").innerHTML = `<h3>Abono Mensual: $ ${abono.toFixed(2)} MXN</h3>`;
};



Swal.fire({
  title: "Bienvenido!",
  text: "Haces más, logras más",
  imageUrl: "img/logo1.png",
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: "Custom image"


});


