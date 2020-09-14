let ctx = document.getElementById("canvas").getContext("2d");

let w = 255;
let h = 255;
var imageData = ctx.createImageData(w,h);

let r = 0;
let g = 0;
let b = 0;
let a = 255;


for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
        setPixel(imageData,x,y,y,y,y,a);
    }
}

ctx.putImageData(imageData,0,0);

function setPixel(imageData,x,y,r,g,b,a){
    index = ( x + y * imageData.width) *4;
    imageData.data[index + 0 ] = r;
    imageData.data[index + 1 ] = g;
    imageData.data[index + 2 ] = b;
    imageData.data[index + 3 ] = a;
}
//ctx.fillStyle = '#454512';
//ctx.fillRect(150,100,150,100);



