let timeLeft;
let timerId = null;
let currentMode = 'work';
let totalSeconds;

const timerText = document.getElementById('timer-text');
const startBtn = document.getElementById('start-btn');
const progressRing = document.getElementById('progress-ring');
const statusText = document.getElementById('status-text');
const timerContainer = document.getElementById('timer-container');
const messageBox = document.getElementById('message-box');

const modes = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

const radius = 120;
const circumference = 2 * Math.PI * radius;

function init() {
    setMode('work');
}

function setMode(mode) {
    currentMode = mode;
    timeLeft = modes[mode];
    totalSeconds = modes[mode];

    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${mode}-btn`).classList.add('active');

    updateDisplay();
    updateProgress(1);
    stopTimer();

    const root = document.documentElement;
    if (mode === 'work') {
        root.style.setProperty('--primary', '#00f2ff');
        statusText.innerText = 'System: Focus';
    } else {
        root.style.setProperty('--primary', '#ff007a');
        statusText.innerText = 'System: Recharging';
    }
}

function updateDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    const text = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    timerText.innerText = text;
    document.title = `${text} - FocusX`;
}

function updateProgress(percent) {
    progressRing.style.strokeDashoffset = circumference - percent * circumference;
}

function toggleTimer() {
    timerId ? stopTimer() : startTimer();
}

function startTimer() {
    if (timeLeft <= 0) return;

    timerContainer.classList.add('timer-active');
    startBtn.innerText = 'PAUSE';
    startBtn.classList.add('bg-cyan-400', 'text-black');

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgress(timeLeft / totalSeconds);

        if (timeLeft <= 0) completeCycle();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    timerContainer.classList.remove('timer-active');
    startBtn.innerText = 'START';
    startBtn.classList.remove('bg-cyan-400', 'text-black');
}

function resetTimer() {
    stopTimer();
    setMode(currentMode);
    messageBox.classList.add('hidden');
}

function completeCycle() {
    stopTimer();
    messageBox.innerText =
        currentMode === 'work'
            ? "Focus session complete. Tactical break suggested."
            : "Break ended. Return to operations.";
    messageBox.classList.remove('hidden');

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 440;
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
}

window.onload = init;
