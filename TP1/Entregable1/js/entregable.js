//Saturación, Suavizado, Detección de Bordes, Blur.

// lienzo 
let canvas = document.getElementById("canvas");
canvas.width = 530;
canvas.height = 500;

let rec = canvas.getBoundingClientRect();//para obtener cordenadas de canvas
let ctx = canvas.getContext("2d");
limpiarCanvas();
let x = 0;
let y = 0;
let dibujando = false;
let img;

let tool;


//tools
let goma = document.getElementById("goma");
goma.addEventListener('click',modoGoma);

let lapiz = document.getElementById("lapiz");
lapiz.addEventListener('click',modoLapiz);

let gotero = document.getElementById("gotero");
gotero.addEventListener('click',modoGotero);


let  colorPicker = document.getElementById("colorPicker");

let fileInput = document.getElementById("cargar");
fileInput.addEventListener('change',cargarImagen);


let btnDownload = document.getElementById("descargar");
btnDownload.addEventListener('click',descargarImagen);


let btnborrar = document.getElementById("descartar");
btnborrar.addEventListener('click',limpiarCanvas);

let brillo = 1;

//atributos herramientas
let color = "#000000";
let grosor = 5;

//variables estado 
let drawing = false;

var bMouseIsDown= false;


//eventos mouse

canvas.addEventListener('mousedown',mDown);
canvas.addEventListener('mousemove',mMove);
canvas.addEventListener('mouseup',mUp);
//canvas.addEventListener('touchstart', mDown);
//canvas.addEventListener('touchmove', mMove);

//valores por defecto
//canvas.className = "lapiz";


//funciones que modifican atributos de herramientas
function setBrillo(b){
  brillo = b;
}

function setColor(c){
    color = c;
   /* if(lapiz.classList.contains("tool-active")){
      lapiz.style.color = color;
    }*/
}

function setGrosor(g){
    grosor = g;
}


//funciones mouse
function mDown(e){
  if(tool==="lapiz" || tool==="goma"){
    x = e.clientX - rec.left;
    y = e.clientY - rec.top;
    dibujando = true;
  }
  if (tool==="gotero"){
    x = e.clientX - rec.left;
    y = e.clientY - rec.top;
    //colorPicker.click(setColor(getPixelColor( e.clientX - rec.left , e.clientY - rec.top) ))
    colorPicker.value=getPixelColor( e.clientX - rec.left , e.clientY - rec.top);
    console.log("setcolor");
    console.log(getPixelColor( e.clientX - rec.left , e.clientY - rec.top) );
    color = getPixelColor( e.clientX - rec.left , e.clientY - rec.top) 
    console.log(color)
    //tool="";
   // borrarActivos();

  }
  
}
function mMove(e){
  if(dibujando === true && (tool==="lapiz" || tool==="goma") ){
    draw(x,y,e.clientX - rec.left,e.clientY - rec.top);
      x = e.clientX - rec.left;
      y = e.clientY - rec.top;
  }
  if (tool==="gotero"){
   
    console.log(getPixelColor( e.clientX - rec.left , e.clientY - rec.top) );
     
  }
}

function mUp(e){
  if(dibujando === true && (tool==="lapiz" || tool==="goma")){
    draw( x , y , e.clientX - rec.left , e.clientY - rec.top);
      x = 0;
      y = 0;
      dibujando = false;
  }
  if (tool==="gotero"){
    
     //getPixelColor( e.clientX - rec.left , e.clientY - rec.top) 
  }
}

function draw(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = grosor;
  ctx.lineJoin ="round";
  ctx.lineCap ="round";
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
  ctx.closePath();
}


function redrawImage() {

  let width = img.width;
          let height = img.height;
          while (width>canvas.width || height > canvas.height){
            width = width/2;
            height = height/2;
          }
          let posicionX = (canvas.width - width)/2;
          let posicionY = (canvas.height - height)/2;
  ctx.drawImage(img, posicionX, posicionY ,width,height);
} 



/// modos segun herramienta
function modoGoma(){
  borrarActivos();
  tool = "goma";
  canvas.className = "goma";
  setColor("#ffff");
  goma.classList.add("tool-active");
}

function modoLapiz(){
  borrarActivos();
  tool = "lapiz";
  canvas.className = "lapiz";
  setColor(colorPicker.value);
  lapiz.classList.add("tool-active");
  //lapiz.style.color = color;
}

function modoGotero(){
  borrarActivos();
  tool = "gotero";
  canvas.className = "gotero";
  gotero.classList.add("tool-active");
}

function getPixelColor(x, y) {
  let pxData = ctx.getImageData(x,y,1,1);
 // return("'"+pxData.data[0]+","+pxData.data[1]+","+pxData.data[2]+"'");

return  rgbToHex(pxData.data[0], pxData.data[1], pxData.data[2])
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function cargarImagen(e) {
  //limpiar canvas
  let reader = new FileReader();
  
  reader.onload = function(e){
      img = new Image();
      img.onload = function(){
          let width = img.width;
          let height = img.height;

          while (width>canvas.width || height > canvas.height){///escalar
            width = width/2;
            height = height/2;
          }
          let posicionX = (canvas.width - width)/2;//centrar
          let posicionY = (canvas.height - height)/2;

          ctx.drawImage(img,posicionX,posicionY,width,height);
      }
      img.src = e.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

function descargarImagen(){
  let nombreImagen="imagen.png";
  let link = window.document.createElement( 'a' );
  let url = canvas.toDataURL();
  link.setAttribute( 'href', url );
  link.setAttribute( 'download', nombreImagen );
  link.style.visibility = 'hidden';
  window.document.body.appendChild( link );
  link.click();
  window.document.body.removeChild( link );
}


function reload(){
  window.location.reload();
}

function borrarActivos(){
  let tools = document.querySelectorAll('*.tool-active');
  tools.forEach(element => {
     element.classList.remove('tool-active');
  });
}

 function limpiarCanvas(){
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let x=0; x<canvas.width; x++){
    for (let y=0; y<canvas.height; y++){
        setPixel(imageData,x,y,255,255,255,255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData,x,y,r,g,b,a) {
  index = ( x + y * imageData.width) *4;
  imageData.data[index + 0 ] = r;
  imageData.data[index + 1 ] = g;
  imageData.data[index + 2 ] = b;
  imageData.data[index + 3 ] = a;
}



/*

var misCabeceras = new Headers({
  'Content-Type': 'text/xml',
  'Access-Control-Allow-Origin':'*'

}


);

var miInit = { method: 'GET',
               headers: misCabeceras,
               mode: 'cors',
               cache: 'default' };

fetch('data:image/jpeg;base64,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',miInit)
.then(function(response) {
  return response.blob();
})
.then(function(miBlob) {
  var objectURL = URL.createObjectURL(miBlob);
  //miImagen.src = objectURL;
  let img = new Image();
  //img.crossOrigin = "Anonymous";
  img.src = objectURL;
  img.onload = function() {
  ctx.drawImage(img, 0, 0);
  setTimeout(() => filterImage(ctx), 1000);
};


});

*/
