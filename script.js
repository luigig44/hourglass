const TIME = 10;
var rem = TIME;
var audio = new Audio('alarm.mp3');

var x = setInterval(function() {
  rem -=0.125;

  document.getElementById("m").innerHTML = Math.floor(rem/60) + "m ";
  document.getElementById("s").innerHTML = rem%60 + "s ";
  document.getElementById("sandInner").setAttribute("y",String(-110+110*(rem/TIME)));
  
  if (rem == 6.375) {
    audio.play();
  }
  
  if (rem < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Terminó";
  }
}, 125);

function turnHourglass() {
  rem = TIME-rem;
};