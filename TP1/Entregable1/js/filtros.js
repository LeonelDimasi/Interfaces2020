//filtros

let negativo = document.getElementById("negativo");
negativo.addEventListener('click', filterNegativo);

let grises = document.getElementById("grises");
grises.addEventListener('click', filterGrises);

let baw = document.getElementById("baw");
baw.addEventListener('click', blackAndWhite);

let filtroSepia = document.getElementById("sepia");
filtroSepia.addEventListener('click', sepia);

let filteBrillo = document.getElementById("brilloPicker");
filteBrillo.addEventListener('change', filterBrillo);

let blurr = document.getElementById("blur");
blurr.addEventListener('click', blur);

let saturacion = document.getElementById("saturacion");
saturacion.addEventListener('click', filterSaturacion);


//filtros 
function filterImage() {
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < d.data.length; i += 4) {
        d.data[i + 0] = Math.min(Math.floor(d.data[i + 0] * 2.0), 0xFF); // R
        d.data[i + 1] = Math.min(Math.floor(d.data[i + 1] * 1.0), 0xFF); // G
        d.data[i + 2] = Math.min(Math.floor(d.data[i + 2] * 3.0), 0xFF); // B
        d.data[i + 3] = 0xFF;                                            // A
    }
    ctx.putImageData(d, 0, 0);
}

function filterBrillo() {
    redrawImage(img);
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); //cambiar a ubicion de imagen y tamanio
    for (let i = 0; i < d.data.length; i += 4) {
        d.data[i + 0] += 255 * (brillo / 100); // R
        d.data[i + 1] += 255 * (brillo / 100); // G
        d.data[i + 2] += 255 * (brillo / 100);
        d.data[i + 3] = 0xFF;
    }
    ctx.putImageData(d, 0, 0);///revisar
}

function filterNegativo() {
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); //cambiar a ubicion de imagen y tamanio
    for (let i = 0; i < d.data.length; i += 4) {
        d.data[i + 0] = 255 - d.data[i + 0];   // red
        d.data[i + 1] = 255 - d.data[i + 1]; // green
        d.data[i + 2] = 255 - d.data[i + 2]; // blue
        d.data[i + 3] = 0xFF;                // A
    }
    ctx.putImageData(d, 0, 0);
}

function filterGrises() {
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); //cambiar a ubicion de imagen y tamanio
    let avg;
    for (let i = 0; i < d.data.length; i += 4) {
        avg = (d.data[i + 0] + d.data[i + 1] + d.data[i + 2]) / 3;
        d.data[i + 0] = avg;   // red
        d.data[i + 1] = avg; // green
        d.data[i + 2] = avg; // blue
        d.data[i + 3] = 0xFF; // A
    }
    ctx.putImageData(d, 0, 0);
}

function blackAndWhite() {
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); //cambiar a ubicion de imagen y tamanio
    let avg;
    for (let i = 0; i < d.data.length; i += 4) {
        avg = (d.data[i + 0] + d.data[i + 1] + d.data[i + 2]) / 3;
        if (avg > 255 / 2) {
            avg = 255;
        } else { avg = 0 }
        d.data[i + 0] = avg;   // red
        d.data[i + 1] = avg; // green
        d.data[i + 2] = avg; // blue
        d.data[i + 3] = 0xFF;                // A
    }
    ctx.putImageData(d, 0, 0);
}


function sepia() {
    let d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); //cambiar a ubicion de imagen y tamanio
    let r, g, b

    for (let i = 0; i < d.data.length; i += 4) {

        r = d.data[i + 0];
        g = d.data[i + 1];
        b = d.data[i + 2];

        d.data[i + 0] = 255 - d.data[i + 0];   // red
        d.data[i + 1] = 255 - d.data[i + 1]; // green
        d.data[i + 2] = 255 - d.data[i + 2]; // blue


        d.data[i + 0] = (r * .393) + (g * .769) + (b * .189);
        d.data[i + 1] = (r * .349) + (g * .686) + (b * .168);
        d.data[i + 2] = (r * .272) + (g * .534) + (b * .131);
        d.data[i + 3] = 0xFF;                // A
    }
    ctx.putImageData(d, 0, 0);
}

function blur (){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let radio = 1;
  
    let matriz = [];
    let alcance = radio*2 + 1;
    let vol = alcance*alcance;
  
    for (let i = 0; i < alcance; i++) {
      matriz[i] = [];
      for (let j = 0; j < alcance; j++) {
        matriz[i][j] = 1/vol;
      }
    }
  
    let imgData = convolucion(matriz,imageData);
    ctx.putImageData(imgData, 0, 0);
}
function getRGB(y, matrizY, x, matrizX, radio, imagen, width, height, matriz) {
    let color = {'r' : 0, 'g' : 0, 'b' : 0}
    let difY = y + matrizY - radio;
    let difX = x + matrizX - radio;
    if (difY >= 0 && difY < height && difX >= 0 && difX < width) {
        let index = (difY * width + difX)*4;
        let valor = matriz[matrizY][matrizX];
        color.r = imagen.data[index] * valor;
        color.g = imagen.data[index+1] * valor;
        color.b = imagen.data[index+2] * valor;
    }
    return color;
  }
  
function setRGB(img, width, height, matriz, imgRetorno, x, y) {
    let r = 0, g = 0, b = 0;
    let dimension = matriz.length;
    let radio = Math.floor(dimension/2);
    for (let matrizY = 0; matrizY < dimension; matrizY++) {
        for (let matrizX = 0; matrizX < dimension; matrizX++) {
            let color = getRGB(y, matrizY, x, matrizX, radio, img, width, height, matriz);
            r += color.r;
            g += color.g;
            b += color.b;
        }
    }
    setPixel(imgRetorno, x, y, r, g, b, 255, width);
  }

function convolucion( matriz,img) {
  let imgRetorno = ctx.createImageData(img.width, img.height);
  for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
          setRGB(img, img.width, img.height, matriz, imgRetorno, x, y)
      }
  }
  return imgRetorno;
};



 
function filterSaturacion (){
    let image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); 
    let dA = image.data; 

    let sv = 2; // EN 0 ES EN ESCALA DE GRISES 1 ES COLOR ORIGINALES

    let luR = 0.3086; //
    let luG = 0.6094;
    let luB = 0.0820;

    let az = (1 - sv)*luR + sv;
    let bz = (1 - sv)*luG;
    let cz = (1 - sv)*luB;
    let dz = (1 - sv)*luR;
    let ez = (1 - sv)*luG + sv;
    let fz = (1 - sv)*luB;
    let gz = (1 - sv)*luR;
    let hz = (1 - sv)*luG;
    let iz = (1 - sv)*luB + sv;

    let red ; 
    let green ;
    let blue ;
    for(var i = 0; i < dA.length; i += 4) {
     red = dA[i]; 
     green = dA[i + 1];
     blue = dA[i + 2];
     dA[i] = (az*red + bz*green + cz*blue);
     dA[i + 1] = (dz*red + ez*green + fz*blue);
     dA[i + 2] = (gz*red + hz*green + iz*blue);
    }
        
    ctx.putImageData(image, 0, 0);
}  