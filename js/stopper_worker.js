let startTime;
let offset = 0;

onmessage = function(e) {
  offset = e.data || 0;
  startTime = Date.now();
  tick();
};

function formatTime(ms) {
  const totalMs = ms;
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const millis = (totalMs % 1000).toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${millis}`;
}

function tick() {
  const now = Date.now();
  const elapsed = now - startTime + offset;
  postMessage(formatTime(elapsed));
  setTimeout(tick, 10); // ezredmásodperces pontosság
}
