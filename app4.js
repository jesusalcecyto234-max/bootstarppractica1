
var numero1 =document.querySelector("#valorA");
var calcular =()=> {
    var valor1 =parseInt(numero1.value);
    document.querySelector("#valorNumeroA").textContent = "Número: " + valor1;
    var contenedorResultado=document.querySelector("#resultado");
    contenedorResultado.innerHTML="";
    let htmlTabla = "<ul class='list-group'>";
    for (let i=1; i <=10; i++) {
        let resultado = valor1*i;
        htmlTabla += `<li class='list-group-item'><strong>${valor1}</strong> x ${i} = <strong>${resultado}</strong></li>`;
    }
    htmlTabla += "</ul>";
    contenedorResultado.innerHTML = htmlTabla;


    document.getElementById("reset").onclick=()=>{
    tabla.value=1;
    verTabla();
}
};
calcular();