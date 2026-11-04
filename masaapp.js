function calcular(){
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    
    if(isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0){
        let msg = "Por favor ponga sus datos correctamente";
        document.getElementById("imc").textContent = msg;
        document.getElementById("categoria").textContent = "";
        return;
    }

    let imc = calcularIMC(peso, altura);
    let categoria = interpretarImc(imc);

    document.getElementById("imc").textContent = "Su IMC es: " + imc;
    document.getElementById("categoria").textContent = "Su categoria es: " + categoria;
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
        
     
        document.getElementById("imc").textContent = "Su IMC es: -";
        document.getElementById("categoria").textContent = "Su categoria es: -";
    });
}