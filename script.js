let canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d')

ctx.moveTo(100 , 100);
ctx.lineTo(200 , 200);
ctx.stroke();
let x;
let y;
window.onmousemove =(e)=>{
   x = e.clientX;
   y = e.clientY;
}