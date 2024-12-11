import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Initialize WaveSurfer for Deck A
const wavesurferLeft = WaveSurfer.create({
    container: '#jog-wheel-left',
    waveColor: '#4F4A85',
    progressColor: 'pink',
    height: 60,
    barWidth: 2,
});

// Initialize WaveSurfer for Deck B
const wavesurferRight = WaveSurfer.create({
    container: '#jog-wheel-right',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    height: 60,
    barWidth: 2,
});

// Preserve Pitch Flags
let preservePitchLeft = true;
let preservePitchRight = true;

// Available Speeds
const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// Handle Audio Upload for Deck A
document.getElementById('audio-uploader-left').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferLeft.load(fileURL);
        console.log('Deck A: Audio loaded');
    } else {
        console.error('Deck A: No audio file selected');
    }
});

// Handle Audio Upload for Deck B
document.getElementById('audio-uploader-right').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferRight.load(fileURL);
        console.log('Deck B: Audio loaded');
    } else {
        console.error('Deck B: No audio file selected');
    }
});

// Set up controls for each deck
function setupDeckControls(deck, wavesurfer) {
    const prefix = deck === 'left' ? 'left' : 'right';

    // Play Button
    document.querySelector(`.deck-${deck} .pad.play`).addEventListener('click', () => {
        wavesurfer.play();
        document.querySelector(`#jog-wheel-${deck}`).classList.add('playing');
        console.log(`Deck ${deck.toUpperCase()}: Playing`);
    });

    // Pause Button
    document.querySelector(`.deck-${deck} .pad.pause`).addEventListener('click', () => {
        wavesurfer.pause();
        document.querySelector(`#jog-wheel-${deck}`).classList.remove('playing');
        console.log(`Deck ${deck.toUpperCase()}: Paused`);
    });

    // Loop Button
    document.querySelector(`.deck-${deck} .pad.loop`).addEventListener('click', () => {
        const isLooping = wavesurfer.getLoop();
        wavesurfer.setLoop(!isLooping);
        document.querySelector(`.deck-${deck} .pad.loop`).classList.toggle('active', !isLooping);
        console.log(`Deck ${deck.toUpperCase()}: Looping ${!isLooping ? 'enabled' : 'disabled'}`);
    });

    // Speed Slider
    document.querySelector(`#speed-slider-${prefix}`).addEventListener('input', (e) => {
        const speed = speeds[e.target.valueAsNumber];
        document.querySelector(`#rate-${prefix}`).textContent = speed.toFixed(2);
        wavesurfer.setPlaybackRate(speed, deck === 'left' ? preservePitchLeft : preservePitchRight);
        console.log(`Deck ${deck.toUpperCase()}: Playback rate set to ${speed}`);
    });

    // Preserve Pitch
    document.querySelector(`#preserve-pitch-${prefix}`).addEventListener('change', (e) => {
        if (deck === 'left') {
            preservePitchLeft = e.target.checked;
        } else {
            preservePitchRight = e.target.checked;
        }
        wavesurfer.setPlaybackRate(wavesurfer.getPlaybackRate(), e.target.checked);
        console.log(`Deck ${deck.toUpperCase()}: Preserve pitch ${e.target.checked ? 'enabled' : 'disabled'}`);
    });

    // Ensure jog wheel animates during playback
    wavesurfer.on('play', () => {
        document.querySelector(`#jog-wheel-${deck}`).classList.add('playing');
    });
    wavesurfer.on('pause', () => {
        document.querySelector(`#jog-wheel-${deck}`).classList.remove('playing');
    });
}

// Initialize controls for both decks
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);


// Select the volume slider
const volumeSlider = document.getElementById('volume-slider');

// Function to adjust volume for both decks
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value / 100; // Convert slider value (0-100) to 0.0-1.0
    wavesurferLeft.setVolume(volume); // Set volume for Deck A
    wavesurferRight.setVolume(volume); // Set volume for Deck B

    console.log(`Volume adjusted to: ${volume * 100}%`);
});