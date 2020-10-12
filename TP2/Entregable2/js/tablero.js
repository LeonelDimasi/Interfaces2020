
import { Ficha } from "./ficha.js";

export class Tablero {
  ctx;
  x;
  y;
  columnas;
  filas;
  radioFicha;
  casilleros;
  dibujado;

  constructor(x, y, filas, columnas, radioFicha) {
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.x = x;
    this.y = y;
    this.columnas = columnas;
    this.filas = filas;
    this.radioFicha = radioFicha;
    this.casilleros = [];
    this.dibujado = false;
  }

  dibujar(){
    let altura, ancho;
    ancho = this.columnas * (this.radioFicha * 2) + this.columnas * 2 + 2;
    altura = this.filas * (this.radioFicha * 2) + this.filas * 2 + 2;
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, ancho, altura);
    let x, y, ficha;
    y = this.y + this.radioFicha + 2;
    for (let i = 0; i < this.filas; i++) {
      x = this.x + this.radioFicha + 2;
      for (let j = 0; j < this.columnas; j++) {
        if (!this.dibujado) {
          this.casilleros.push({ "x": x, "y": y, "c": j, "f": i, "color": false });
        }
        let ficha = new Ficha(x, y, this.radioFicha, 'white', this.ctx);
        ficha.dibujar();
        x = x + this.radioFicha * 2 + 2;
      }
      y = y + this.radioFicha * 2 + 2;
    }
    let ctx = this.ctx;
    let radio = this.radioFicha;
    this.casilleros.forEach(function (elem) {
      
      if (elem.color != false) {
        let ficha = new Ficha(elem.x, elem.y, radio, elem.color, ctx);
        ficha.dibujar();
        ficha.deshabilitar();
      }
    });
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x - 80, this.y + this.filas * this.radioFicha * 2 + 2 * this.filas + 2, ancho + 160, 50);
    this.dibujado = true;
  }

  ganadorHorizontal() {
    let conteo = 0;
    let color = false;
    let filas = this.filas;
    let fila = 0;
    for (let i = 0; i < this.casilleros.length; i++) {
      if (fila >= filas)
        conteo = 0;
      fila = 0;
      if (this.casilleros[i].color === false) {
        conteo = 0;
      } else if (this.casilleros[i].color === false) {
        conteo = 0;
        color = false;
      } else if (this.casilleros[i].color === color) {
        conteo++;
      } else {
        conteo = 1;
        color = this.casilleros[i].color;
      }
      if (conteo === 4) {
        return color;
      }
    }
    return false;
  }

  ganadorVertical() {
    let conteo = 0;
    let color = false;
    for (var i = 0; i < this.columnas; i++) {
      conteo = 0;
      color = false;
      for (var j = 0; j < this.filas; j++) {
        let indice = i + (this.columnas * j);
        if (this.casilleros[indice].color === false) {
          conteo = 0;
          color = false;
        } else if (this.casilleros[indice].color === color) {
          conteo++;
        } else {
          conteo = 1;
          color = this.casilleros[indice].color;
        }
        if (conteo === 4)
          return color;
      }
    }
    return false;
  }

  hayGanador() {
    let ganador = false;
    ganador = this.ganadorHorizontal();
    if (!ganador) {
      ganador = this.ganadorVertical();
    }
    return ganador;
  }

  detectarPosicion(x, y, ficha, tablero, jugador, ficha2) {
    let radio = this.radioFicha;
    let inserto = false;
    let ranura = false;
    if (this.y > y) {
      for (var i = 0; i < this.casilleros.length; i++) {
        if (this.casilleros[i].x + radio + 2 > x && this.casilleros[i].x - radio - 2 < x) {
          if (this.casilleros[i].color == false) {
            ranura = i;
            inserto = true;
          }
        }
      }
    }
    if (inserto) {
      ficha.mover(this.casilleros[ranura].x, this.casilleros[ranura].y, tablero, ficha2);
      ficha.deshabilitar();
      this.casilleros[ranura].color = jugador.getColor();
      return true;
    } else {
      return false;
    }
  }
}
