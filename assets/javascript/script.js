import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Initialize WaveSurfer for Deck A
const wavesurferLeft = WaveSurfer.create({
    container: '#jog-wheel-left',
    waveColor: '#4F4A85',
    progressColor: '#383351',
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

// Audio upload and waveform rendering for Deck A
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

// Audio upload and waveform rendering for Deck B
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

// Play functionality for Deck A
document.querySelector('.deck-left .pad.play').addEventListener('click', () => {
    wavesurferLeft.play(); // Start playback
    console.log("Deck A: Playing");
});

// Pause functionality for Deck A
document.querySelector('.deck-left .pad.pause').addEventListener('click', () => {
    wavesurferLeft.pause(); // Pause playback
    console.log("Deck A: Paused");
});

// Cue (reset) functionality for Deck A
document.querySelector('.deck-left .pad.cue').addEventListener('click', () => {
    wavesurferLeft.stop(); // Stop playback and reset to the start
    console.log("Deck A: Reset");
});

// Play functionality for Deck B
document.querySelector('.deck-right .pad.play').addEventListener('click', () => {
    wavesurferRight.play(); // Start playback
    console.log("Deck B: Playing");
});

// Pause functionality for Deck B
document.querySelector('.deck-right .pad.pause').addEventListener('click', () => {
    wavesurferRight.pause(); // Pause playback
    console.log("Deck B: Paused");
});

// Cue (reset) functionality for Deck B
document.querySelector('.deck-right .pad.cue').addEventListener('click', () => {
    wavesurferRight.stop(); // Stop playback and reset to the start
    console.log("Deck B: Reset");
});

