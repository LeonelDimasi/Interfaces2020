export class Ficha2 {
    gravedad = .5;
    posX;
    posY;
    radio;
    color;
    ctx;
    habilitada;
    seleccionada;
    vx;
    vy;
    constructor(posX, posY, radio, color, ctx) {
        this.radio = radio;
        this.posX = posX;
        this.posY = posY;
        this.inicial_x = this.posX;
        this.inicial_y = this.posY;
        this.vx = 0;
        this.vy = 0;
        this.ctx = ctx;
        this.color = color;
        this.habilitada = false;
    }

    dibujar() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
        //cambia el estilo del cursor si el ratón esta encima de la pelota
        /*if (ctx.isPointInPath(m.x, m.y)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }*/
        
    }


    arrastrar(m) {
        // calcula las nuevas coordenadas de la ficha
        if(this.cumpleLimitesTablero() === true ){
            this.posX = m.x //+ this.posX //- m.x;//+ dx;
            this.posY = m.y //+ this.posY //- m.x;//+ dy;
        }
        
        

        this.colisionParedes();
        // calcula la velocidad (vx y vy) de la ficha mientras la arrastramos
        this.vx = this.posX - this.inicial_x;
        this.vy = this.posY - this.inicial_y;
        // actualiza el valor inicial
        this.inicial_x = this.posX;
        this.inicial_y = this.posY;

    }

    lanzar(m, limiteY) {
        this.vy += this.gravedad;
        //this.posX += this.vx;// para q no se mueva
        this.posY += this.vy;//centrar en una columna?
        this.colisionParedes2(limiteY);
        this.habilitada = false;//revisar
    }

    /*colisionParedes() {
        //laterales

        let ch = document.getElementById("canvas").height;
        /* if (this.posX > cw - this.radio) {
             this.posX = cw - this.radio;
             // this.vx *= rebote;
 
         } else if (this.posX < this.radio) {
             this.posX = this.radio;
             // this.vx *= rebote;
         }
        //arriba y abajo
        if (this.posY > ch - this.radio) {
            this.posY = ch - this.radio;
            //this.vy *= rebote;

        } else if (this.posY < this.radio) {
            this.posY = this.radio
            //this.vy *= rebote;
        }


    }*/

    colisionParedes() {
        //laterales
        //let cw = document.getElementById("canvas").height;
        let ch = document.getElementById("canvas").height;
       /*  if (this.posX > cw - this.radio) {
             this.posX = cw - this.radio;
             // this.vx *= rebote;
 
         } else if (this.posX < this.radio) {
             this.posX = this.radio;
             // this.vx *= rebote;
         }*/
        //arriba y abajo
        if (this.posY > ch - this.radio ) {
            this.posY = ch - this.radio;
            //this.vy *= rebote;

        } else if (this.posY < this.radio ) {
            this.posY = this.radio
            //this.vy *= rebote;
        }


       

    

    }

    cumpleLimitesTablero(){
        let limY = 150;
        let limX = 320;
        let vv = true;
        if (limX > this.posX  ){

           if (this.posX + this.radio  > limX && this.posY + this.radio > limY  ) {
                vv=false;
     
            }

        }
        /*else if(limX <= this.posX +this.radio && limX <= this.posX -this.radio ){

            vv=false;
        }*/
            


        
            
            
           
        return vv;
      
    }

  


    colisionParedes2(limiteY) {
        //laterales
        let cw = document.getElementById("canvas").width;
        let ch = document.getElementById("canvas").height;
         if (this.posX > cw - this.radio) {
             this.posX = cw - this.radio;
             // this.vx *= rebote;
 
         } else if (this.posX < this.radio) {
             this.posX = this.radio;
             // this.vx *= rebote;
         }
        //arriba y abajo
        if (this.posY > ch - this.radio - limiteY) {
            this.posY = ch - this.radio - limiteY;
            //this.vy *= rebote;

        } else if (this.posY < this.radio) {
            this.posY = this.radio
            //this.vy *= rebote;
        }
    }

  


    pointInFicha(m) {
        var distancesquared = (m.x - this.posX) * (m.x - this.posX) + (m.y - this.posY) * (m.y - this.posY);
        if (distancesquared <= this.radio * this.radio) {
            return this;
        }
        else {
            return null;
        }
    }

}