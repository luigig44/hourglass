var time = 10;
var rem = time;
var audio = new Audio('alarm.mp3');
var updater;

function turnHourglass() {
  rem = time-rem;
};

function startHourglass() {
  updater = setInterval(function() {
    rem -=0.125;
  
    document.getElementById("m").innerHTML = Math.floor(rem/60) + "m ";
    document.getElementById("s").innerHTML = rem%60 + "s ";
    document.getElementById("sandInner").setAttribute("y",String(-110+110*(rem/time)));
    
    if (rem == 6.375) {
      audio.play();
    }
    
    if (rem < 0) {
      clearInterval(updater);
      
    }
  }, 125);
};