import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Show welcome alert
alert("Hello! Welcome to Shay Mixer 5000!");

// Speed options
const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// WaveSurfer Initialization for Deck A
const wavesurferLeft = WaveSurfer.create({
    container: '#waveform-left',
    waveColor: '#4a4d63',
    progressColor: '#343654',  
    height: 60,
    barWidth: 2,
    responsive: true,
});

// WaveSurfer Initialization for Deck B
const wavesurferRight = WaveSurfer.create({
    container: '#waveform-right',
    waveColor: '#4a4d63',
    progressColor: '#343654',
    height: 60,
    barWidth: 2,
    responsive: true,
});

// Function to Setup Controls for a Deck
function setupDeckControls(deckName, wavesurferInstance) {
    const prefix = deckName === 'left' ? 'left' : 'right';

    // Audio Upload
    document.getElementById(`audio-uploader-${prefix}`).addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            wavesurferInstance.load(fileURL);
            console.log(`Deck ${deckName.toUpperCase()}: File Loaded`);
        }
    });

    // Play Button
    document.querySelector(`.deck-${deckName} .pad.play`).addEventListener('click', () => {
        if (!wavesurferInstance.isPlaying()) { // Only play if not already playing
            wavesurferInstance.play();
            document.querySelector(`#jog-wheel-${deckName}`).classList.add('playing');
            console.log(`Deck ${deckName.toUpperCase()}: Playing`);
        }
    });

    // Pause Button
    document.querySelector(`.deck-${deckName} .pad.pause`).addEventListener('click', () => {
        if (wavesurferInstance.isPlaying()) { // Only pause if currently playing
            wavesurferInstance.pause();
            document.querySelector(`#jog-wheel-${deckName}`).classList.remove('playing');
            console.log(`Deck ${deckName.toUpperCase()}: Paused`);
        }
    });

    // Speed Slider
    document.getElementById(`speed-slider-${prefix}`).addEventListener('input', (e) => {
        const speedIndex = parseInt(e.target.value, 10);
        const speed = speeds[speedIndex];
        wavesurferInstance.setPlaybackRate(speed);
        document.getElementById(`rate-${prefix}`).textContent = speed.toFixed(2);
        console.log(`Deck ${deckName.toUpperCase()}: Speed set to ${speed}`);
    });

    // Preserve Pitch
    document.getElementById(`preserve-pitch-${prefix}`).addEventListener('change', (e) => {
        wavesurferInstance.setPlaybackRate(wavesurferInstance.getPlaybackRate());
        console.log(
            `Deck ${deckName.toUpperCase()}: Preserve pitch ${
                e.target.checked ? 'enabled' : 'disabled'
            }`
        );
    });

    // Event Listeners for Jog Wheel Animation
    wavesurferInstance.on('play', () => {
        document.querySelector(`#jog-wheel-${deckName}`).classList.add('playing');
    });

    wavesurferInstance.on('pause', () => {
        document.querySelector(`#jog-wheel-${deckName}`).classList.remove('playing');
    });

    wavesurferInstance.on('finish', () => {
        console.log(`Deck ${deckName.toUpperCase()}: Finished`);
        document.querySelector(`#jog-wheel-${deckName}`).classList.remove('playing');
    });
}

// Initialize Controls for Both Decks
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
