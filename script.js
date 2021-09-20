var time = 3 * 60000;
var alarm = new Audio('alarm.mp3');
var ticking = new Audio('ticking.mp3');
ticking.loop = true;
var rem, updater;

const buttonSets = {
  "editing":' \
  <button class="button-1" onClick="startHourglass()" disabled><i class="icon-play"></i></button> \
  <button class="button-2" onClick="stopEdit()"><i class="icon-check"></i></button> \
  <button class="button-3" onClick="openInfo()" disabled><i class="icon-info"></i></button>',
  "running":' \
  <button class="button-1" onClick="pauseHourglass()"><i class="icon-pause"></i></button> \
  <button class="button-2" onClick="turnHourglass()"><i class="icon-refresh"></i></button> \
  <button class="button-3" onClick="openInfo()"><i class="icon-info"></i></button>',
  "waiting":' \
  <button class="button-1" onClick="startHourglass()"><i class="icon-play"></i></button> \
  <button class="button-2" onClick="startEdit()"><i class="icon-edit"></i></button> \
  <button class="button-3" onClick="openInfo()"><i class="icon-info"></i></button>',
  "ended":' \
  <button class="button-1" onClick="pauseHourglass()" disabled><i class="icon-pause"></i></button> \
  <button class="button-2" onClick="setupHourglass()"><i class="icon-undo"></i></button> \
  <button class="button-3" onClick="openInfo()" disabled><i class="icon-info"></i></button>'
}

function updateClock() {
  document.getElementById("m").innerHTML = Math.floor(rem/60000) + "m ";
  document.getElementById("s").innerHTML = ((rem%60000)/1000).toFixed(1) + "s ";
  document.getElementById("sandInner").setAttribute("y",String(-110+110*(rem/time)));
}

function updateTime() {
  document.getElementById("timeM").innerHTML = Math.floor(time/60000) + "m ";
  document.getElementById("timeS").innerHTML = ((time%60000)/1000).toFixed(1) + "s ";
}

function turnHourglass() {
  rem = time-rem;
  if (rem < (Math.floor(time/100)*10)) {
    ticking.play();
  } else {
    ticking.pause();
    ticking.currentTime = 0.4;
  }
};

function startHourglass() {
  document.getElementById("buttons").innerHTML = buttonSets["running"];
  updater = setInterval(function() {
    rem -= 100;
    updateClock();
    if (rem == (Math.floor(time/100)*10)) ticking.play();
    if (rem <= 0) {
      clearInterval(updater);
      ticking.pause();
      alarm.play();
      navigator.vibrate(200);
      document.getElementById("buttons").innerHTML = buttonSets["ended"];
    }
  }, 100);
};

function startEdit() {
  document.getElementById("timeM").setAttribute("contenteditable", "true");
  document.getElementById("timeS").setAttribute("contenteditable", "true");
  document.getElementById("timeM").classList.add("pulse");
  document.getElementById("timeS").classList.add("pulse");
  document.getElementById("buttons").innerHTML = buttonSets["editing"];
};

function stopEdit() {
  time =  parseFloat(document.getElementById("timeM").innerText) * 60000 +
          parseFloat(document.getElementById("timeS").innerText) * 1000;
  if (isNaN(time) || time<100) {
    alert("Ingrese un tiempo válido");
    return;
  }
  document.getElementById("timeM").setAttribute("contenteditable", "false");
  document.getElementById("timeS").setAttribute("contenteditable", "false");
  document.getElementById("timeM").classList.remove("pulse");
  document.getElementById("timeS").classList.remove("pulse");
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
  rem = time;
  updateTime();
  updateClock();
}

function openInfo() {
  document.location = "http://luigi.finetti.com.ar";
};

function pauseHourglass() {
  clearInterval(updater);
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
};

function setupHourglass() {
  rem = time;
  document.getElementById("buttons").innerHTML = buttonSets["waiting"];
  updateTime();
  updateClock();
  alarm.pause();
  alarm.currentTime = 0;
  ticking.currentTime = 0.4;
};

setupHourglass();
