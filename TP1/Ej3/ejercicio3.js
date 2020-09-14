let ctx = document.getElementById("canvas").getContext("2d");

let w = 100;
let h = 200;
var imageData = ctx.createImageData(w,h);

let r = 15;
let g = 15;
let b = 15;
let a = 255;


for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
        setPixel(imageData,x,y,r,g,b,a);
    }
}

ctx.putImageData(imageData,10,10);


function setPixel(imageData,x,y,r,g,b,a){
    index = ( x + y * imageData.width) *4;
    imageData.data[index + 0 ] = r;
    imageData.data[index + 1 ] = g;
    imageData.data[index + 2 ] = b;
    imageData.data[index + 3 ] = a;
}
//ctx.fillStyle = '#454512';
//ctx.fillRect(150,100,150,100);



