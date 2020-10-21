//https://www.youtube.com/watch?v=KeVW_ezeGz8&ab_channel=RedStapler
/*
var navbar = document.querySelector(".navbar")
var ham = document.querySelector(".ham")

// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
}

ham.addEventListener("click", toggleHamburger)

var menuLinks = document.querySelectorAll(".menuLink")
menuLinks.forEach( 
  function(menuLink) { 
    menuLink.addEventListener("click", toggleHamburger) 
  }
)*/



/*
let cajon = document.getElementById("cajon");

let cajonHijo = document.createElement('div');

let titulo2 = document.createElement('h1');
titulo2.innerHTML="hola 2";

cajon.appendChild(titulo2);

let titulo = document.createElement('h1');

titulo.innerHTML="hola";

cajon.appendChild(titulo);*/

let cajon = document.getElementById("cajon");
cajon.style.width = '800px';
cajon.style.height = '600px';
cajon.style.position = 'relative';
cajon.style.botton = '40';
cajon.style.zIndex = 10000;
//cajon.style.backgroundAttachment = 'fixed';
cajon.style.backgroundRepeat= 'no-repeat','repeat-y';
cajon.style.backgroundImage = '#000000';

let imagenes = [
    "url(./images/tanos1.gif)",
    "url(./images/tanos2.gif)",
    "url(./images/tanos3.gif)",
];
let i = 0;
setInterval(() => {
    if (i == imagenes.length){
        i=0;
    }
    cajon.style.backgroundImage = imagenes[i];
    i++;
    
}, 4000);

//


window.addEventListener("load",function(){

  setTimeout(function(){
     document.getElementsByClassName("loader-page")[0].style.display='none';
     }, 3000);
  
  
  });


document.addEventListener("mousemove",parallax)

function parallax(e){

    let capas=document.querySelectorAll('.layer');
    let intViewportWidth = window.innerWidth;
    let intViewportWidth2 = window.innerHeight;
    capas.forEach(layer => {
        const speed = layer.getAttribute('data-speed')
        const x = (intViewportWidth - e.pageX*speed)/100
        const y = (intViewportWidth2 - e.pageY*speed)/100
        layer.style.transform =`translate(${x}px) translate(${y}px)` 
    });
}


let links = document.getElementsByClassName('menu')[0].getElementsByTagName('a');
for(  link of links){
  link.addEventListener('click',()=>{
    cerrar()
  })
}

function cerrar(){
  document.getElementsByClassName('menu-icon')[0].click()
}


/*let subpanel = document.getElementById("panel-container");

myPanel.onmousemove = transformPanel;
myPanel.onmouseenter = handleMouseEnter;
myPanel.onmouseleave = handleMouseLeave;*/

let myPanels = document.getElementsByClassName('col-3 panel');
//let subpanels = document.getElementsByClassName("panel-container");
console.log(myPanels)

for( panel of myPanels){
  let subpanel = panel.getElementsByClassName("panel-container")[0];
  
  panel.onmousemove = handleEventPanel(panel);
  panel.onmouseenter = handleMouseEnter(subpanel);
  panel.onmouseleave = handleMouseLeave(subpanel);
}


function handleEventPanel(passedInElement) {
  return function(e) {
    transformPanel(e, passedInElement); 
  };
}





let mouseX, mouseY;

let transformAmount = 5;

function transformPanel(mouseEvent,myPanel) {
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;

    const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
    const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

    const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
    const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));
    let subpanel = myPanel.getElementsByClassName("panel-container")[0];
    subpanel.style.transform = "perspective(200px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
}

function handleMouseEnter(subpanel) {
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);
    subpanel.style.transition = "transform 0.1s";
}

function handleMouseLeave(subpanel) {
    subpanel.style.transition = "transform 0.1s";
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);

    subpanel.style.transform = "perspective(200px) rotateY(0deg) rotateX(0deg)";
}


// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var countdownfunction = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
  
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + " dias " + hours + " horas "
  + minutes + " minutos " + seconds + " segundos ";
  
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(countdownfunction);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


//acordion
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
}