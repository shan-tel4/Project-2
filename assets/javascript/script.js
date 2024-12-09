import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Initialize WaveSurfer for Deck A
const wavesurferLeft = WaveSurfer.create({
    container: '#jog-wheel-left',
    waveColor: '#4F4A85',
    progressColor: 'pink',
    height: 80,
    barWidth: 2,
});

// Initialize WaveSurfer for Deck B
const wavesurferRight = WaveSurfer.create({
    container: '#jog-wheel-right',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    height: 80,
    barWidth: 2,
});

let preservePitch = true;
const speeds = [0.25, 0.5, 1, 2, 4];

// Handle audio file upload for Deck A
document.getElementById('audio-uploader-left').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferLeft.load(fileURL); // Load audio into WaveSurfer
        console.log("Deck A: Loaded file", file.name);
    } else {
        console.error("Deck A: No file selected.");
    }
});

// Handle audio file upload for Deck B
document.getElementById('audio-uploader-right').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferRight.load(fileURL); // Load audio into WaveSurfer
        console.log("Deck B: Loaded file", file.name);
    } else {
        console.error("Deck B: No file selected.");
    }
});

// Play and Pause for Deck A
document.querySelector('.deck-left .pad.play').addEventListener('click', () => {
    wavesurferLeft.playPause();
    document.querySelector('#jog-wheel-left').classList.toggle('playing', wavesurferLeft.isPlaying());
    console.log("Deck A: Play/Pause toggled");
});

// Play and Pause for Deck B
document.querySelector('.deck-right .pad.play').addEventListener('click', () => {
    wavesurferRight.playPause();
    document.querySelector('#jog-wheel-right').classList.toggle('playing', wavesurferRight.isPlaying());
    console.log("Deck B: Play/Pause toggled");
});

// Adjust playback speed for Deck A
document.querySelector('#speed-slider').addEventListener('input', (e) => {
    const speed = speeds[e.target.valueAsNumber];
    document.querySelector('#rate').textContent = speed.toFixed(2);
    wavesurferLeft.setPlaybackRate(speed, preservePitch);
    console.log("Deck A: Playback rate set to", speed);
});

// Preserve pitch for Deck A
document.querySelector('#preserve-pitch').addEventListener('change', (e) => {
    preservePitch = e.target.checked;
    wavesurferLeft.setPlaybackRate(wavesurferLeft.getPlaybackRate(), preservePitch);
    console.log("Deck A: Preserve pitch set to", preservePitch);
});

// Ensure jog wheel animation plays when audio plays
wavesurferLeft.on('play', () => {
    document.querySelector('#jog-wheel-left').classList.add('playing');
});
wavesurferLeft.on('pause', () => {
    document.querySelector('#jog-wheel-left').classList.remove('playing');
});
wavesurferRight.on('play', () => {
    document.querySelector('#jog-wheel-right').classList.add('playing');
});
wavesurferRight.on('pause', () => {
    document.querySelector('#jog-wheel-right').classList.remove('playing');
});

