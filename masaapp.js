function calcular(){
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    
    if(isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0){
        let msg = "Por favor ponga sus datos correctamente";
        document.getElementById("imc").textContent = msg;
        document.getElementById("categoria").textContent = "";
        return;
    }

    let contenedorResultado = document.querySelector(".resultado");
    if (contenedorResultado) {
        contenedorResultado.innerHTML = "<div class='text-center'><img src='img/cargar2.gif' width='100px' height='100px' style='border-radius: 50px;'></div>";
    }

    setTimeout(() => {
        let imc = calcularIMC(peso, altura);
        let categoria = interpretarImc(imc);

        if (contenedorResultado) {
            contenedorResultado.innerHTML = `
                <p id="imc">Su IMC es: ${imc}</p>
                <p id="categoria">Su categoria es: ${categoria}</p>
            `;
        }

        for (let i = 1; i <= 6; i++) {
            let fila = document.getElementById('imc' + i);
            if (fila) {
                fila.style.transition = "2s ease all";
                fila.style.transform = "scale(1)";
                let celdas = fila.querySelectorAll("td");
                celdas.forEach(celda => {
                    celda.style.transition = "2s ease all";
                    celda.style.backgroundColor = ""; 
                });
            }
        }

        let valorImcNum = parseFloat(imc);
        let filaResaltar;
        let colorFila = "";

        if (valorImcNum < 18.5) {
            filaResaltar = document.getElementById('imc1');
            colorFila = "#0dcaf0"; 
        } else if (valorImcNum >= 18.5 && valorImcNum < 25) {
            filaResaltar = document.getElementById('imc2');
            colorFila = "#2cff3a"; 
        } else if (valorImcNum >= 25 && valorImcNum < 30) {
            filaResaltar = document.getElementById('imc3');
            colorFila = "#ffc107"; 
        } else if (valorImcNum >= 30 && valorImcNum < 35) {
            filaResaltar = document.getElementById('imc4');
            colorFila = "#fd7e14"; 
        } else if (valorImcNum >= 35 && valorImcNum < 40) {
            filaResaltar = document.getElementById('imc5');
            colorFila = "#dc3545"; 
        } else {
            filaResaltar = document.getElementById('imc6');
            colorFila = "#f21010"; 
        }

        if (filaResaltar) {
            filaResaltar.style.transition = "2s ease all";
            filaResaltar.style.transform = "scale(1.05)";
            
            let celdasResaltar = filaResaltar.querySelectorAll("td");
            celdasResaltar.forEach(celda => {
                celda.style.transition = "2s ease all";
                celda.style.backgroundColor = colorFila; 
            });
        }
    }, 1500);
}

function calcularIMC(peso, altura){
    let resultado = peso / ((altura / 100) ** 2);
    return Number(resultado).toFixed(2);
}

function interpretarImc(imcValor){
    let imc = parseFloat(imcValor);

    if(imc < 18.5) return "Bajo peso";
    else if(imc < 25) return "Normal";
    else if(imc < 30) return "Sobrepeso";
    else if(imc < 35) return "Obesidad grado 1";
    else if(imc < 40) return "Obesidad grado 2";
    else return "Obesidad grado 3";
}

const btnReset = document.getElementById("btnSigno");

if (btnReset) {
    btnReset.addEventListener("click", () => {
        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
        
        let contenedorResultado = document.querySelector(".resultado");
        if (contenedorResultado) {
            contenedorResultado.innerHTML = `
                <p id="imc">Su IMC es: </p>
                <p id="categoria">Su categoria es: </p>
            `;
        }
        
        for (let i = 1; i <= 6; i++) {
            let fila = document.getElementById('imc' + i);
            if (fila) {
                fila.style.transition = "2s ease all";
                fila.style.transform = "scale(1)";
                let celdas = fila.querySelectorAll("td");
                celdas.forEach(celda => {
                    celda.style.transition = "2s ease all";
                    celda.style.backgroundColor = ""; 
                });
            }
        }
    });
}