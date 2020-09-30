import { Ficha2 } from "./ficha2.js";
import { Tablero } from "./tablero.js";
import { Jugador } from "./jugador.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let cw = canvas.width = 1280;
let ch = canvas.height = 720;

//ficha
let arrastrar = false;
let lanzar = false;
let dx, dy;
let animation;
var m = {
  x: 0,
  y: 0
};
//


let tablero = new Tablero(320,150,4,4,45,ctx);



let jugador1 = new Jugador("juan","#ff0000",15,100,150,ctx);
let jugador2 = new Jugador("pedro","#00ff00",15,1180,150,ctx);
jugador1.setFicha();
jugador2.setFicha();
tablero.dibujar2();




let fichaActiva;


Animacion();  

function Animacion() {
  if(fichaActiva != null){
    
    animation = window.requestAnimationFrame(Animacion);
    if (arrastrar) {
      fichaActiva.arrastrar(m);
    }
    if (lanzar) {
      fichaActiva.lanzar(m,130+100);//radio*2 (m,tablero.getLimiteComumna())
    }
   //ctx.clearRect(0, 0, 600, 900);//redibujar objetos
    fichaActiva.dibujar();

  } 
 
}


// EVENTOS

canvas.addEventListener("mousedown", function(evt) {
  window.cancelAnimationFrame(animation);
  fichaActiva = checkFichaPosicion(m);
 
 

  m = oMousePos(this, evt);
  //ctx.clearRect(0, 0, cw, ch);
  // porque no hacemos clic en el centro de la ficha
  // tenemos que calcular la distancia entre el centro y el ratón
 if( fichaActiva != null ){
  dx = fichaActiva.posX - m.x;
  dy = fichaActiva.posY - m.y;
  Animacion();
  fichaActiva.arrastrar(m)
  fichaActiva.dibujar();
  // Si hemos hecho clic en la ficha, podemos arrastrar
  if (ctx.isPointInPath(m.x, m.y)) {
    arrastrar = true;
    lanzar = false;
  }

 }

}, false);



canvas.addEventListener("mousemove", function(evt) {
  //ctx.clearRect(0, 0, cw, ch);
  if( fichaActiva != null){
    fichaActiva.dibujar();
    tablero.dibujar2();
    m = oMousePos( this,evt);
  }
  
}, false);

//al soltar el click la ficha cae
canvas.addEventListener("mouseup", function(evt) {
    arrastrar = false;
    lanzar = true;
}, false);

//si se va el mouse afuera se cea la ficha
canvas.addEventListener("mouseout", function(evt) {
  arrastrar = false;
  lanzar = true;
}, false);
  
// detecta la posición del ratón
function oMousePos(canvas, evt) { 
  var ClientRect = canvas.getBoundingClientRect();
  return { 
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function checkFichaPosicion(m) {

  //arreglo de fichas segun de quien sea el turno
  
  let fichi;
  jugador1.getFichas().forEach(ficha => {
    

    if(ficha.pointInFicha(m) != null){
      fichi = ficha.pointInFicha(m);
    }
  });
if(fichi == null ){ //este if es provisorio
  
  jugador2.getFichas().forEach(ficha => {
    console.log(ficha.pointInFicha(m));
    if(ficha.pointInFicha(m) != null){
      fichi = ficha.pointInFicha(m);
    }
  });

}
  
  return fichi;
}

