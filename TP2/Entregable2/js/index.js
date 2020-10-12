
import { Juego } from "./juego.js";
import { Jugador } from "./jugador.js";


var juego ;

canvas.addEventListener('click', function(e){
  juego.clickFicha(e);
  juego.finJuego();
});

canvas.addEventListener('mousemove',function(e){
  juego.movimientoFicha(e);
});

document.addEventListener('keypress',function (e) {
  if (e.keyCode == 13) {
    comenzarJuego();
  }
});

document.getElementById('play').addEventListener('click',function (e) {
    e.preventDefault();
    comenzarJuego();
});

function comenzarJuego() {
  let nombrej1 = document.getElementById('j1nombre').value.toUpperCase();
  let nombrej2 = document.getElementById('j2nombre').value.toUpperCase();
  let error = document.getElementById('error');
  if (nombrej1.length == 0){
    error.innerHTML = "Debe ingresar un nombre para el jugador 1";
    error.style.display = 'block';
  } else if (nombrej2.length == 0){
    error.innerHTML = "Debe ingresar un nombre para el jugador 2";
    error.style.display = 'block';
  }else if (nombrej1 === nombrej2) {
    error.innerHTML = "Los nombres no pueden ser iguales";
    error.style.display = 'block';
  }else{
    document.getElementById('menu').style.display = 'none';
    document.getElementById('juego').style.display = 'inline';
    let j1 = new Jugador(nombrej1,"red",21,80,70);
    let j2 = new Jugador(nombrej2,"yellow",21,800,70);
    juego = new Juego(j1,j2);
    juego.iniciarJuego();
  }
}
