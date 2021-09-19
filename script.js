var time = 10000;
var audio = new Audio('alarm.mp3');
var rem, updater;

const buttonSets = {
  "editing":' \
<button class="button-1" onClick="turnHourglass()" disabled>disabled</button> \
<button class="button-2" onClick="stopEdit()">Aplicar</button> \
<button class="button-3" onClick="resetHourglass()" disabled>disabled</button>',
  "running":' \
  <button class="button-1" onClick="turnHourglass()">Dar vuelta</button> \
  <button class="button-2" onClick="pauseHourglass()">Pausar</button> \
  <button class="button-3" onClick="resetHourglass()">Reiniciar</button>',
  "waiting":' \
  <button class="button-1" onClick="startEdit()">Editar</button> \
  <button class="button-2" onClick="startHourglass()">Iniciar</button> \
  <button class="button-3" onClick="openInfo()">+ Info</button>'
}

function updateClock() {
  document.getElementById("m").innerHTML = Math.floor(rem/60000) + "m ";
  document.getElementById("s").innerHTML = ((rem%60000)/1000).toFixed(1) + "s ";
  document.getElementById("sandInner").setAttribute("y",String(-110+110*(rem/time)));
}

function turnHourglass() {
  rem = time-rem;
};

function startHourglass() {
  document.getElementById("buttons").innerHTML = buttonSets["running"];

  updater = setInterval(function() {
    rem -= 100;
    updateClock();
    if (rem == 6300) audio.play();
    if (rem < 0) clearInterval(updater);
  }, 100);
};

function startEdit() {
  document.getElementById("m").setAttribute("contenteditable", "true");
  document.getElementById("s").setAttribute("contenteditable", "true");
  document.getElementById("buttons").innerHTML = buttonSets["editing"];
};

function stopEdit() {
  time =  parseFloat(document.getElementById("m").innerText) * 60000 +
          parseFloat(document.getElementById("s").innerText) * 1000;
  if (time == NaN) {
    alert("Ingrese un tiempo válido");
    return;
  }
  document.getElementById("m").setAttribute("contenteditable", "false");
  document.getElementById("s").setAttribute("contenteditable", "false");
  setup();
}

function openInfo() {
  document.location = "google.com";
};
function pauseHourglass() {alert("TODO");};
function resetHourglass() {alert("TODO");};

function setup() {
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
  rem = time;
  updateClock();
};

setup();
