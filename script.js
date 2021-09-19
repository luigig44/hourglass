var time = 10000;
var rem = time;
var audio = new Audio('alarm.mp3');
var updater;

function turnHourglass() {
  rem = time-rem;
};

function startHourglass() {
  document.getElementById("buttons").innerHTML = ' \
  <button class="button-1" onClick="turnHourglass()">Dar vuelta</button> \
  <button class="button-2" onClick="pauseHourglass()">Pausar</button> \
  <button class="button-3" onClick="resetHourglass()">Reiniciar</button>';

  updater = setInterval(function() {
    rem -=100;
  
    document.getElementById("m").innerHTML = Math.floor(rem/60000) + "m ";
    document.getElementById("s").innerHTML = ((rem%60000)/1000).toFixed(1) + "s ";
    document.getElementById("sandInner").setAttribute("y",String(-110+110*(rem/time)));
    
    if (rem == 6300) {
      audio.play();
    }
    
    if (rem < 0) {
      clearInterval(updater);
      
    }
  }, 100);
};

function editTime() {alert("TODO");};
function openInfo() {alert("TODO");};
function pauseHourglass() {alert("TODO");};
function resetHourglass() {alert("TODO");};