import { Ficha2 } from "./ficha2.js";

export class Jugador {
  nombre;
  color;
  turno;
  ctx;
  cantidadFichas;
  ficha;
  posX;
  posY;
  fichas = [];

  constructor (nombre,color,fichas,x,y,ctx) {
    this.nombre = nombre;
    this.color = color;
    this.turno = false;
    this.ctx = ctx;
    this.cantidadFichas = fichas;
    this.ficha = false;
    this.posX = x;
    this.posY = y;
    

    
  }

  asignarTurno() {
    this.turno = true;
  }

  tieneTurno() {
    return this.turno;
  }

  sacarTurno() {
    this.turno = false;
  }

  getColor() {
    return this.color;
  }
/*
  setFicha() {
    if (this.cantidadFichas>0){
      this.ficha = new Ficha2(this.posX,this.posY,45,this.color,this.ctx);
      this.cantidadFichas--;
    }
    this.ficha.dibujar();
  }*/

  setFicha() {
    if (this.cantidadFichas>0){
      this.ficha = new Ficha2(this.posX,this.posY,45,this.color,this.ctx);
      this.fichas.push(this.ficha);
      this.cantidadFichas--;
    }
    this.ficha.dibujar();
  }

  getCantidadFichas() {
    return this.cantidadFichas+1;
  }

  getFicha() {
    return this.ficha;
  }

  getNombre() {
    return this.nombre;
  }

  getFichas() {
    return this.fichas;
  }
  

}



