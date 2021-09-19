var time = 3 * 60000;
var audio = new Audio('alarm.mp3');
var rem = time;
var updater;

const buttonSets = {
  "editing":' \
  <button class="button-1" onClick="startHourglass()" disabled>Iniciar</button> \
  <button class="button-2" onClick="stopEdit()">Aplicar edición</button> \
  <button class="button-3" onClick="openInfo()" disabled>+ Info</button>',
  "running":' \
  <button class="button-1" onClick="pauseHourglass()">Pausar</button> \
  <button class="button-2" onClick="turnHourglass()">Dar vuelta</button> \
  <button class="button-3" onClick="openInfo()">+ Info</button>',
  "waiting":' \
  <button class="button-1" onClick="startHourglass()">Iniciar</button> \
  <button class="button-2" onClick="startEdit()">Editar</button> \
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
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
  rem = time;
  updateClock();
}

function openInfo() {
  document.location = "google.com";
};

function pauseHourglass() {
  clearInterval(updater);
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
};

document.getElementById("buttons").innerHTML = buttonSets["waiting"];
updateClock();
