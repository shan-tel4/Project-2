import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Speed options
const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// WaveSurfer Initialization for Deck A
const wavesurferLeft = WaveSurfer.create({
    container: '#waveform-left',
    waveColor: '#4a4d63',
    progressColor: '#f5b0c4',
    height: 60,
    barWidth: 2,
    responsive: true,
});

// WaveSurfer Initialization for Deck B
const wavesurferRight = WaveSurfer.create({
    container: '#waveform-right',
    waveColor: '#4a4d63',
    progressColor: '#f5b0c4',
    height: 60,
    barWidth: 2,
    responsive: true,
});

// Function to Setup Controls for a Deck
function setupDeckControls(deckName, wavesurferInstance) {
    const prefix = deckName === 'left' ? 'left' : 'right';
    const jogWheel = document.querySelector(`#jog-wheel-${deckName}`);

    // Audio Upload
    document.getElementById(`audio-uploader-${prefix}`).addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            wavesurferInstance.load(fileURL);
        }
    });

    // Play Button
    document.querySelector(`.deck-${deckName} .pad.play`).addEventListener('click', () => {
        if (!wavesurferInstance.isPlaying()) {
            wavesurferInstance.play();
            jogWheel.classList.add('playing'); // Start spinning
        }
    });

    // Pause Button
    document.querySelector(`.deck-${deckName} .pad.pause`).addEventListener('click', () => {
        if (wavesurferInstance.isPlaying()) {
            wavesurferInstance.pause();
            jogWheel.classList.remove('playing'); // Stop spinning
        }
    });

    // Stop spinning when audio finishes
    wavesurferInstance.on('finish', () => {
        jogWheel.classList.remove('playing');
    });
}

// Initialize pad sounds with persistent color change
function initializePadSounds() {
    const pads = document.querySelectorAll('.pad');

    pads.forEach(pad => {
        pad.addEventListener('click', () => {
            const soundSrc = pad.getAttribute('data-sound');
            if (soundSrc) {
                const audio = new Audio(soundSrc);
                audio.play();
                pad.classList.add('active'); // Keep pad pink
            }
        });
    });
}

// Crossfader Logic
const crossfader = document.getElementById('crossfader-slider');
function updateDeckVolumes() {
    const crossfaderValue = parseInt(crossfader.value, 10);
    const volumeLeft = (100 - crossfaderValue) / 100;
    const volumeRight = crossfaderValue / 100;

    wavesurferLeft.setVolume(volumeLeft);
    wavesurferRight.setVolume(volumeRight);
}
crossfader.addEventListener('input', updateDeckVolumes);
updateDeckVolumes();

// Speed Slider Logic
function setupSpeedControl(deckName, wavesurferInstance) {
    const prefix = deckName === 'left' ? 'left' : 'right';
    const speedSlider = document.getElementById(`speed-slider-${prefix}`);
    const speedLabel = document.getElementById(`rate-${prefix}`);

    speedSlider.addEventListener('input', () => {
        const speedValue = speeds[speedSlider.value];
        wavesurferInstance.setPlaybackRate(speedValue);
        speedLabel.textContent = speedValue.toFixed(2);
    });

    const initialSpeed = speeds[speedSlider.value];
    wavesurferInstance.setPlaybackRate(initialSpeed);
    speedLabel.textContent = initialSpeed.toFixed(2);
}

// Setup decks and sounds
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
initializePadSounds();
setupSpeedControl('left', wavesurferLeft);
setupSpeedControl('right', wavesurferRight);
