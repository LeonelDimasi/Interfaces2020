import { Ficha } from "./ficha.js";

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

  constructor(nombre, color, fichas, x, y) {
    this.nombre = nombre;
    this.color = color;
    this.turno = false;
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.cantidadFichas = fichas;
    this.ficha = false;
    this.posX = x;
    this.posY = y;
  }

  asignarTurno() {
    this.turno = true;
    document.getElementById("turno").innerHTML = "TURNO DE " + this.nombre;
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

  setFicha() {
    if (this.cantidadFichas > 0) {
      this.ficha = new Ficha(this.posX, this.posY, 30, this.color, this.ctx);
      this.cantidadFichas--;
    }
    this.ficha.dibujar();
  }

  getCantidadFichas() {
    return this.cantidadFichas + 1;
  }

  getFicha() {
    return this.ficha;
  }

  getNombre() {
    return this.nombre;
  }
}
