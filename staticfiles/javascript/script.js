import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// Speed options array
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

// Function to set up controls for a given deck
function setupDeckControls(deckName, wavesurferInstance) {
    const prefix = deckName === 'left' ? 'left' : 'right';
    const jogWheel = document.querySelector(`#jog-wheel-${deckName}`);

    // Audio Upload Handler
    document.getElementById(`audio-uploader-${prefix}`).addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            wavesurferInstance.load(fileURL);
        }
    });

    // Play Button: Start playback and start spinning the jog wheel
    document.querySelector(`.deck-${deckName} .pad.play`).addEventListener('click', () => {
        if (!wavesurferInstance.isPlaying()) {
            wavesurferInstance.play();
            jogWheel.classList.add('playing');
        }
    });

    // Pause Button: Pause playback and stop the jog wheel
    document.querySelector(`.deck-${deckName} .pad.pause`).addEventListener('click', () => {
        if (wavesurferInstance.isPlaying()) {
            wavesurferInstance.pause();
            jogWheel.classList.remove('playing');
        }
    });

    // Cue Button (Backwards): Go back 5 seconds (or to 0 if fewer than 5 seconds remain)
    document.querySelector(`.deck-${deckName} .pad.cue`).addEventListener('click', () => {
        const currentTime = wavesurferInstance.getCurrentTime();
        const newTime = Math.max(0, currentTime - 5);
        const duration = wavesurferInstance.getDuration();
        if (duration > 0) {
            wavesurferInstance.seekTo(newTime / duration);
        }
    });

    // Loop Button: Toggle loop mode
    let loopEnabled = false;
    const loopButton = document.querySelector(`.deck-${deckName} .pad.loop`);
    loopButton.addEventListener('click', () => {
        loopEnabled = !loopEnabled;
        if (loopEnabled) {
            loopButton.classList.add('active');
        } else {
            loopButton.classList.remove('active');
        }
    });

    // When the track finishes, restart if loop is enabled; otherwise, stop spinning the jog wheel
    wavesurferInstance.on('finish', () => {
        jogWheel.classList.remove('playing');
        if (loopEnabled) {
            wavesurferInstance.play();
            jogWheel.classList.add('playing');
        }
    });
}

// Initialize pads that play individual sound effects (for drum, scratch, horn, clap)
function initializePadSounds() {
    const pads = document.querySelectorAll('.pad');
    pads.forEach(pad => {
        const soundSrc = pad.getAttribute('data-sound');
        if (soundSrc) {
            pad.addEventListener('click', () => {
                const audio = new Audio(soundSrc);
                audio.play();
                pad.classList.add('active');
            });
        }
    });
}

// Crossfader: Adjust deck volumes based on slider value
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

// Speed Control: Adjust playback rate based on slider value
function setupSpeedControl(deckName, wavesurferInstance) {
    const prefix = deckName === 'left' ? 'left' : 'right';
    const speedSlider = document.getElementById(`speed-slider-${prefix}`);
    const speedLabel = document.getElementById(`rate-${prefix}`);

    speedSlider.addEventListener('input', () => {
        const speedValue = speeds[speedSlider.value];
        wavesurferInstance.setPlaybackRate(speedValue);
        speedLabel.textContent = speedValue.toFixed(2);
    });

    // Set initial speed display
    const initialSpeed = speeds[speedSlider.value];
    wavesurferInstance.setPlaybackRate(initialSpeed);
    speedLabel.textContent = initialSpeed.toFixed(2);
}

// Set up deck controls and speed controls for both decks
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
setupSpeedControl('left', wavesurferLeft);
setupSpeedControl('right', wavesurferRight);

// Initialize additional pad sounds (for pads with data-sound attribute)
initializePadSounds();
