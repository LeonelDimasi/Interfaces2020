/*
1. Repaso Javascript: Definir una matriz de 100 elementos x 100 elementos y completarla con valores 
enteros random, y resuelva los siguientes incisos: 
*/
let FILAS;
let COLUMNAS;
let matrix = [FILAS,COLUMNAS];
var promedios=[];

function crear(){
    resetTabla();
     COLUMNAS = document.getElementById("cols").value;
     FILAS = document.getElementById("rows").value;

    var tabla="<table border=\"0\">";
    for(i=0;i<FILAS;i++){
        matrix[i] = [];
        tabla+="<tr>";
        for(j=0;j<COLUMNAS;j++){ 
            matrix[i][j] =  Math.floor((Math.random() * 100) + 1);
            tabla+="<td>"+"<input type=\"text\" value="+matrix[i][j]+" size=\"1\">"+ "</td>";
        }
        tabla+="</tr>";
    }
    tabla+="</table>";
    document.getElementById("resultadomatriz").innerHTML=tabla;
}
crear();
function resetTabla(){
    document.getElementById("resultadomatriz").innerHTML="";
}

let btnmaxmatriz = document.getElementById('maxmatriz').addEventListener('click', valorMaximo);
let btnmaxpares = document.getElementById('maxparesminimpares').addEventListener('click', maximoParesminimoImpares);
let btnmaximos = document.getElementById('promedios').addEventListener('click', cargarPromedioxfilas);

//a. Escribir una función que retorne el valor máximo de toda la matriz 
function valorMaximo(){
 maximo=0;
 for (let index = 0; index < FILAS; index++) {
     if (maximo<Math.max.apply(null, matrix[index,index])) {
        maximo=Math.max.apply(null, matrix[index,index]);
     }
    }
    let textmaxmatriz = document.getElementById('resultadomaxmatriz');
        textmaxmatriz.value=maximo;
    console.log("El valor máximo de toda la matriz es :"+maximo+".");

}
//b. Escribir una función que retorne el valor máximo contenido en las filas pares y el valor mínimo en 
//las filas impares 
function maximoParesminimoImpares(){
    minimo=2000;
    maximo=-1;
    for (let index = 0; index < FILAS; index++) {
        if (index % 2 == 0){
             if (maximo<Math.max.apply(null, matrix[index,index])) {
                maximo=Math.max.apply(null, matrix[index,index]);
             }
        }else{
            if (minimo>Math.min.apply(null, matrix[index,index])) {
                minimo=Math.min.apply(null, matrix[index,index]);
            }
        }
       }
       let textmaxmin = document.getElementById('resultadomaxmin');
       textmaxmin.value=maximo+"/"+minimo;
      console.log("el maximo valor entre las filas pares es: "+maximo+".");
      console.log("el minimo  entre las filas impares es: "+minimo+".");
}

//c. Calcular el valor promedio de cada fila y guardarlos en un arreglo. 

function promedioFila(fila){
    var suma = 0;
    for (let index = 0; index < COLUMNAS; index++) {
     suma += matrix[fila][index];
    }
    return suma/COLUMNAS;
}
function cargarPromedioxfilas(){
    promedios=[];
    for (let index = 0; index < FILAS; index++) {
       let promediofila=promedioFila(index);
        promedios.push(promediofila);
    }
    let textpromedios = document.getElementById('resultadopromedios');
    textpromedios.value=promedios;
     console.log(promedios);
}
