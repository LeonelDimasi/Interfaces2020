/*
Pintar un rectángulo en pantalla, utilizando tres colores en un gradiente: De negro a amarillo en
la primera mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado,
en Y el degrade se mantiene constante.
*/ 
let ctx = document.getElementById("canvas").getContext("2d");

let w = 510;
let h = 250;
var imageData = ctx.createImageData(w,h);

let colores = [ 
    {
        nombre:'ROJO',
        cR: 255,
        cG: 0,
        cB: 0,
        cA: 255 
    },
    {
        nombre:'AZUL',
        cR: 0,
        cG: 0,
        cB: 255,
        cA: 255
    },
    {
        nombre:'AMARILLO',
        cR: 255,
        cG: 255,
        cB: 0,
        cA: 255 
    },
    
    {
        nombre:'VERDE',
        cR: 0,
        cG: 255,
        cB: 0,
        cA: 255 
    }
   /* {
        nombre:'MARRON',
        cR: 150,
        cG: 150,
        cB: 150,
        cA: 255 
    }*/
   

];

let cantColores = colores.length;

//let cofi = 255/ (w/cantColores);

function getCoficiente(vColor){
    if(vColor!=0){
       // console.log( vColor/ (w/cantColores)+"kk");
        return vColor/ (w/colores.length);
    }else{
        //console.log(vColor+"cc");
        return 0;
    }
    
}

this.pintarDegrades();

function pintarDegrades() {
    for (let index = 0; index < colores.length-1; index++) {
            let indexEnd = this.getIndexColorEnd(index);
            let indexStart = indexEnd - Math.round((w/cantColores));
            this.pintarTramoDegrade(indexStart,indexEnd,colores[index],colores[index+1]);
    }
}

function getIndexColorEnd (colorIndex) {
    return Math.round(w/colores.length)*(colorIndex+1);
}

function pintarTramoDegrade(indexStart,indexEnd,c1,c2) {
    console.log(c1.nombre + "a " + c2.nombre + "=" + indexStart +"---"+ indexEnd );
    r = 0;
    g = 0; 
    b = 0;
        for (let y = 0; y < h; y++) {
            r = c1.cR;
            g = c1.cG; 
            b = c1.cB;
            cofiR = getCoficiente(c1.cR - c2.cR);
            cofiG = getCoficiente(c1.cG - c2.cG);
            cofiB = getCoficiente(c1.cB - c2.cB);
            console.log(cofiR)
           // console.log(cofiG)
            //console.log(cofiB)
            for (let x = indexStart; x <= indexEnd; x++) {
                if(c1.cR < c2.cR){
                    r += 2;
                    //r += cofiR*x;
                   //r +=x*getCoficiente(c2.cR);
                   //console.log(r)
                }else if(c1.cR > c2.cR){
                    //r -=1;
                   // r -=(cofiR*r)/(c1.cR - c2.cR);
                    //r -= Math.round((x*cofiR)/r);
                   r -= 2;
                   //console.log(Math.round((c1.cR - c2.cR)*2/(x*cofiR)))
                }

                if(c1.cG < c2.cG){
                    g  += 2;
                   // g  += cofiG;
                  // g += x*getCoficiente(c2.cG);
                }else if(c1.cG > c2.cG){
                    g-=2;
                   // g-=cofiG;
                    //g -= Math.round((x*getCoficiente(c1.cG))/c1.cG);
                    //console.log(Math.round((x*getCoficiente(c1.cG))/c1.cG))
                    //g -= (x*getCoficiente(c1.cG))/g ;
                }
                if(c1.cB < c2.cB){
                    b  += 2;
                   //b  += cofiB;
                   
                }else if(c1.cB  > c2.cB){
                   // b -=2;
                   b -=2;
                }
             
                
                     a = 255;
                setPixel(imageData,x,y,r,g,b,a);
           }
        }
    
}




ctx.putImageData(imageData,0,0);

function setPixel(imageData,x,y,r,g,b,a) {
    index = ( x + y * imageData.width) *4;
    imageData.data[index + 0 ] = r;
    imageData.data[index + 1 ] = g;
    imageData.data[index + 2 ] = b;
    imageData.data[index + 3 ] = a;
}




