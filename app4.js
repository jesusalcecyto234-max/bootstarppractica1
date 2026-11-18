var numero1 = document.querySelector("#valorA");

var calcular = () => {
    var valor1 = parseInt(numero1.value);
    document.querySelector("#valorNumeroA").textContent = "Número: " + valor1;
    var contenedorResultado = document.querySelector("#resultado");
    contenedorResultado.innerHTML = "";
    
    let htmlTabla = "<ul class='list-group'>";
    for (let i = 1; i <= 10; i++) {
        let resultado = valor1 * i;
        htmlTabla += `<li class='list-group-item'><strong>${valor1}</strong> x ${i} = <strong>${resultado}</strong></li>`;
    }
    htmlTabla += "</ul>";
    contenedorResultado.innerHTML = htmlTabla;
};

var btnReset = document.getElementById("reset");
if (btnReset) {
    btnReset.onclick = () => {
        let valorInicial = 1;
        numero1.value = valorInicial;
        document.querySelector("#valorNumeroA").textContent = "Número: " + valorInicial;
        document.querySelector("#resultado").innerHTML = "";
    };
}

numero1.oninput = () => {
    var contenedorResultado = document.querySelector("#resultado");
    contenedorResultado.innerHTML = "<div class='text-center'><img src='img/gatito.gif' width='200px' height='200px' style='border-radius: 100px;'></div>";
    setTimeout(() => {
        let n = parseInt(numero1.value);
        let tablaHTML = "<ul class='list-group'>";
        document.querySelector("#valorNumeroA").textContent = "Número: " + n;
        for (let i = 1; i <= 10; i++) {
            let resultado = n * i;
            tablaHTML += `<li class='list-group-item'><strong>${n}</strong> x ${i} = <strong>${resultado}</strong></li>`;
        }
        tablaHTML += "</ul>";
        contenedorResultado.innerHTML = tablaHTML;
    }, 1200);
};