
import { Ficha2 } from "./ficha2.js";

export class Tablero {
  ctx;
  x;
  y;
  columnas;
  filas;
  radioFicha;
  casilleros;
  dibujado;

  constructor(x,y,filas,columnas,radioFicha,ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.columnas = columnas;
    this.filas = filas;
    this.radioFicha = radioFicha;
    this.casilleros = [];
    this.dibujado = false;
  }

  dibujar() {
    let altura, ancho;
    ancho = this.columnas*(this.radioFicha*2) + this.columnas * 2 + 2;
    altura = this.filas*(this.radioFicha*2) + this.filas * 2 + 2;
    this.ctx.fillStyle = "#0000aa";
    
   
    this.ctx.fillRect(this.x,this.y, ancho, altura);

    
    let x,y,ficha;
    y = this.y + this.radioFicha + 2;
    for (let i = 0; i < this.filas; i++) {
      x = this.x + this.radioFicha + 2;
      for (let j = 0; j < this.columnas; j++) {
        /*if (!this.dibujado){
          this.casilleros.push({"x":x, "y":y, "c":j , "f":i, "color":false});
        }*/
      /*  let ficha = new Ficha(x,y,this.radioFicha-5,'#fff',this.ctx);
        ficha.dibujar();*/
        ///intento
        this.ctx.fillStyle='rgba(255,255,255,100)'
        this.ctx.beginPath();//va
        this.ctx.arc(x,y,this.radioFicha-5,0,Math.PI*2);
      
        this.ctx.fill();
        ///
        x = x + this.radioFicha*2 + 2;
      }
      y = y + this.radioFicha*2 + 2;
    }
    


    
  
    //let ctx = this.ctx;
    //let radio = this.radioFicha;
    /*this.casilleros.forEach(function(elem) {
      if (elem.color != false){
          let ficha = new Ficha(elem.x,elem.y,radio,elem.color,ctx);
          ficha.dibujar();
          ficha.deshabilitar();
        }
    });*/
    
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x-80,this.y+this.filas*this.radioFicha*2+2*this.filas+2,ancho+160,50);
    this.dibujado = true;

    /*
    ctx.fillStyle='rgb(0,174,239)';
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle='rgba(255,255,255,255)'
    ctx.beginPath();
    ctx.arc(cw/2-r/2,ch/2,r,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    */ 
  }


  dibujar2() {
    let altura, ancho;
    ancho = this.columnas*(this.radioFicha*2) + this.columnas * 2 + 2;
    altura = this.filas*(this.radioFicha*2) + this.filas * 2 + 2;
    //this.ctx.fillStyle = "#0000aa";
    

    this.ctx.beginPath();

    //polygon1--- usually the outside polygon, must be clockwise
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x+ancho, this.y);
    this.ctx.lineTo(this.x+ancho,this.y+ altura);
    this.ctx.lineTo(this.x,this.y+ altura);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.closePath();
    let fi = 10;
    let fe = 90;
    let ci = 10;
    let ce = 90;

    for (let index = 0; index <  this.filas; index++) {
      for (let index2 = 0; index2 <  this.columnas; index2++) {
        this.ctx.moveTo(this.x+fi, this.y+ci); //inicio
        this.ctx.lineTo(this.x+fi, this.y+ce);//abajo
        this.ctx.lineTo(this.x+fe,this.y+ ce);//derecha
        this.ctx.lineTo(this.x+fe,this.y+ ci);//arriba
        this.ctx.lineTo(this.x+fi, this.y+ci);//cierre
        this.ctx.closePath();
        fi += 90;
        fe += 90;

        this.casilleros.push({"x":(fi+fe)/2, "y":(ci+ce)/2, "c":index2 , "f":index, "color":false});
      }
      fi = 10;
      fe = 90;
      ci += 90;
      ce += 90;
    }
    
                    //x,y 
           /* ctx.moveTo(110, 10); // inicio
            ctx.lineTo(110, 90);//x+90 , 
            ctx.lineTo(190, 90);
            ctx.lineTo(190, 10);
            ctx.lineTo(110, 10);//cierre
            ctx.closePath();

            ctx.moveTo(210, 10); // inicio
            ctx.lineTo(210, 90);//x+90 , 
            ctx.lineTo(290, 90);
            ctx.lineTo(290, 10);
            ctx.lineTo(210, 10);//cierre
            ctx.closePath();*/

           /* ctx.moveTo(10, 110); //inicio
            ctx.lineTo(10, 190);//abajo
            ctx.lineTo(90, 190);//derecha
            ctx.lineTo(90, 110);//arriba
            ctx.lineTo(10, 110);//cierre
            ctx.closePath();
                    //x,y 
            ctx.moveTo(110, 110); // inicio
            ctx.lineTo(110, 190);//x+90 , 
            ctx.lineTo(190, 190);
            ctx.lineTo(190, 110);
            ctx.lineTo(110, 110);//cierre
            ctx.closePath();

            ctx.moveTo(210, 110); // inicio
            ctx.lineTo(210, 190);//x+90 , 
            ctx.lineTo(290, 190);
            ctx.lineTo(290, 110);
            ctx.lineTo(210, 110);//cierre
            ctx.closePath();*/

   

    //  add as many holes as you want
    this.ctx.fillStyle = "#0000aa";
    this.ctx.strokeStyle = "rgba(0.5,0.5,0.5,0.5)";
    this.ctx.lineWidth = 1;
    this.ctx.fill();
    this.ctx.stroke();

  ///  }
  // console.log(this.casilleros);
    //this.ctx.fillRect(this.x,this.y, ancho, altura);

    
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
      if (this.casilleros[i].color === false){
        conteo = 0;
      } else if (this.casilleros[i].color === false){
        conteo = 0;
        color = false;
      } else if (this.casilleros[i].color === color){
        conteo++;
      } else {
        conteo = 1;
        color = this.casilleros[i].color;
      }
      if (conteo === 4){
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
        let indice = i+(this.columnas * j);
        if (this.casilleros[indice].color === false){
          conteo = 0;
          color = false;
        } else if (this.casilleros[indice].color === color){
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
    if (!ganador){
      ganador = this.ganadorVertical();
    }
    return ganador;
  }
  detectarPosicion(x,y,ficha,tablero,jugador,ficha2) {
    let radio = this.radioFicha;
    let inserto = false;
    let ranura = false;
    if (this.y > y){
      for (var i = 0; i < this.casilleros.length; i++) {
        if (this.casilleros[i].x+radio+2 > x && this.casilleros[i].x-radio-2 < x){
          if(this.casilleros[i].color == false){
            ranura = i;
            inserto = true;
          }
        }
      }
    }
    if (inserto){
      ficha.mover(this.casilleros[ranura].x,this.casilleros[ranura].y,tablero,ficha2);
      ficha.deshabilitar();
      this.casilleros[ranura].color = jugador.getColor();
      return true;
    }else {
      return false;
    }
  }
}
