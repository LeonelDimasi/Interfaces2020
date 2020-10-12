import { Tablero } from "./tablero.js";

export class Juego {
  ctx;
  tablero;
  jugador1;
  jugador2;
  jugadorActivo;
  jugadorInactivo;
  constructor(jugador1, jugador2) {
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.tablero = new Tablero(235, 80, 6, 7, 30);
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
  }

  iniciarJuego() {
    //this.tablero = new Tablero(235, 80, 6, 7, 30);
    this.tablero.dibujar();
    this.jugador1.setFicha();
    this.jugador2.setFicha();
    document.getElementById("jugador1").innerHTML = this.jugador1.getNombre();
    document.getElementById("jugador2").innerHTML = this.jugador2.getNombre();
    document.getElementById("fichasj1").innerHTML = this.jugador1.getCantidadFichas();
    document.getElementById("fichasj2").innerHTML = this.jugador2.getCantidadFichas();
    this.jugador1.asignarTurno();
  }

  clickFicha(e) {
    let ClientRect = canvas.getBoundingClientRect();
    let x = Math.round(e.clientX - ClientRect.left);
    let y = Math.round(e.clientY - ClientRect.top);
    if (this.jugador1.tieneTurno()) {
      this.jugadorActivo = this.jugador1;
      this.jugadorInactivo = this.jugador2;
    } else {
      this.jugadorActivo = this.jugador2;
      this.jugadorInactivo = this.jugador1;
    }
    let ficha, ficha2;
    ficha = this.jugadorActivo.getFicha();
    ficha2 = this.jugadorInactivo.getFicha();
    if (ficha.isSeleccionada()) {
      ficha.deseleccionar();
      if (this.tablero.detectarPosicion(x, y, ficha, this.tablero, this.jugadorActivo, ficha2)) {
        this.jugadorActivo.setFicha();
        document.getElementById("fichasj1").innerHTML = this.jugador1.getCantidadFichas();
        document.getElementById("fichasj2").innerHTML = this.jugador2.getCantidadFichas();
        this.jugadorInactivo.asignarTurno();
        this.jugadorActivo.sacarTurno();
      }
    } else {
      if (ficha.isClick(x, y)) {
        ficha.seleccionar();
        ficha.mover(x, y, this.tablero, ficha2);
      }
    }
  }

  movimientoFicha(e) {
    let ClientRect = canvas.getBoundingClientRect();
    let x = Math.round(e.clientX - ClientRect.left);
    let y = Math.round(e.clientY - ClientRect.top);
    if (this.jugador1.tieneTurno()) {
      this.jugadorActivo = this.jugador1;
      this.jugadorInactivo = this.jugador2;
    } else {
      this.jugadorActivo = this.jugador2;
      this.jugadorInactivo = this.jugador1;
    }
    let ficha, ficha2;
    ficha = this.jugadorActivo.getFicha();
    ficha2 = this.jugadorInactivo.getFicha();
    if (ficha.isSeleccionada()) {
      this.tablero.dibujar();
      ficha.mover(x, y, this.tablero, ficha2);
    }
  }

  finJuego() {
    let ficha = this.jugador1.getFicha();
    if (!ficha.isSeleccionada()) {
      let ganador = this.tablero.hayGanador();
      if (ganador) {
        if (this.jugador1.getColor() === ganador) {
          alertify.alert(this.jugador1.getNombre() + " GANO LA PARTIDA!!!", function () {
            alertify.success('NUEVA PARTIDA');
            location.reload();
          }).setting({ 'label': "REINICIAR" });
        } else if (this.jugador2.getColor() === ganador) {
          alertify.alert(this.jugador2.getNombre() + " GANO LA PARTIDA!!!", function () {
            alertify.success('NUEVA PARTIDA');
            location.reload();
          }).setting({ 'label': "REINICIAR" });
        }
      }
      if (this.jugador1.getCantidadFichas() === 0 && this.jugador2.getCantidadFichas() === 0) {
        alertify.alert("TERMINO EL JUEGO, NO HAY GANADOR!!", function () {
          alertify.success('NUEVA PARTIDA');
          location.reload();
        }).setting({ 'label': "REINICIAR" });
      }
    }
  }
}
