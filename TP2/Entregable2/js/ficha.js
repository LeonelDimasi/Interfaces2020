export class Ficha {
    x;
    y;
    radio;
    color;
    ctx;
    habilitada ;
    seleccionada ;
    image;
    pathImg;
    constructor(x, y, radio, color, ctx) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.ctx = ctx;
        this.habilitada = true;
        this.seleccionada = false;
        this.image = new Image();
        if(color == "red"){
            this.pathImg='./images/ficharoja.png';
            this.image.src = this.pathImg ;
        }else if(color == "blue"){
            this.pathImg='./images/fichaazul.png';
            this.image.src = this.pathImg ;
        }
        
        
        
    }
    
    dibujar() {
        
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x,this.y,this.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        if(this.color != "white"){
            this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio);
        }
       
        this.ctx.closePath();
        this.image.onload = () => {
        };
    }

    dibujar2() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x,this.y,this.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
       
        this.ctx.closePath();
        
    }

    

    mover(x,y,tablero,ficha2) {
        if (this.isHabilitada()){
        this.ctx.clearRect(0, 0, canvas.width,canvas.height);
        tablero.dibujar();
        this.x = x;
        this.y = y;
        ficha2.dibujar();
        this.dibujar();
        }
    }
    isSeleccionada(){
        return this.seleccionada;
    }

    seleccionar(){
        this.seleccionada = true;
    }

    deseleccionar() {
        this.seleccionada = false;
    }

    isClick(xM,yM) {
        let x = xM - this.x;
        let y = yM - this.y;
        return (Math.sqrt(x*x + y*y) < (this.radio*2));
    }

    isHabilitada() {
        return this.habilitada;
    }

    habilitar() {
        this.habilitada = true;
    }

    deshabilitar() {
        this.habilitada = false;
    }
}
      