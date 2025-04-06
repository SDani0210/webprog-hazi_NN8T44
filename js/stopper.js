let worker;
let elapsedTime = 0;
let running = false;
const display = document.getElementById("stopper");
const startBtn = document.getElementById("startBtn");

function startWorker() {
  if (!running) {
    worker = new Worker("../js/stopper_worker.js");
    worker.postMessage(elapsedTime); // korábbi idő folytatása
    worker.onmessage = (e) => {
      display.textContent = e.data;
    };
    running = true;
    startBtn.textContent = "Stop";
    startBtn.classList.remove("btn-success");
    startBtn.classList.add("btn-warning");
  } else {
    stopWorker();
  }
}

function stopWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  // aktuális kijelzett időt ezredmásodpercben mentjük
  elapsedTime = convertDisplayToMs(display.textContent);
  running = false;
  startBtn.textContent = "Start";
  startBtn.classList.remove("btn-warning");
  startBtn.classList.add("btn-success");
}

function resetWorker() {
  stopWorker();
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
}

function convertDisplayToMs(timeString) {
  const [h, m, s] = timeString.split(/[:.]/).map(Number);
  return h * 3600000 + m * 60000 + s * 1000 + Number(timeString.split(".")[1] || 0);
}
