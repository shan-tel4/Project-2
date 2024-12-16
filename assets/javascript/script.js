import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

alert('Hello, welcome to the Shay Mixer 5000!');

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
    let isLooping = false; // Loop toggle state
    let loopStart = 0; // Default loop start time
    let loopEnd = 5; // Default loop duration in seconds

    // Audio Upload
    document.getElementById(`audio-uploader-${prefix}`).addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            wavesurferInstance.load(fileURL);
            console.log(`Deck ${deckName.toUpperCase()}: File Loaded`);
        } else {
            console.error(`Deck ${deckName.toUpperCase()}: No file selected`);
        }
    });

    // Play Button
    document.querySelector(`.deck-${deckName} .pad.play`).addEventListener('click', () => {
        if (!wavesurferInstance.isPlaying()) {
            wavesurferInstance.play();
            jogWheel.classList.add('playing');
            console.log(`Deck ${deckName.toUpperCase()}: Playing`);
        }
    });

    // Pause Button
    document.querySelector(`.deck-${deckName} .pad.pause`).addEventListener('click', () => {
        if (wavesurferInstance.isPlaying()) {
            wavesurferInstance.pause();
            jogWheel.classList.remove('playing');
            console.log(`Deck ${deckName.toUpperCase()}: Paused`);
        }
    });

    // Rewind Button (Cue)
    document.querySelector(`.deck-${deckName} .pad.cue`).addEventListener('click', () => {
        const rewindSeconds = 5; // Time to rewind
        const currentTime = wavesurferInstance.getCurrentTime(); // Current playback time
        const duration = wavesurferInstance.getDuration(); // Total duration of the audio

        if (currentTime - rewindSeconds > 0) {
            const newTime = (currentTime - rewindSeconds) / duration; // Calculate new position
            wavesurferInstance.seekTo(newTime);
            console.log(`Deck ${deckName.toUpperCase()}: Rewinded by ${rewindSeconds} seconds`);
        } else {
            wavesurferInstance.seekTo(0); // Reset to the start if out of range
            console.log(`Deck ${deckName.toUpperCase()}: Rewinded to the start`);
        }
    });

    // Loop Button
    document.querySelector(`.deck-${deckName} .pad.loop`).addEventListener('click', () => {
        isLooping = !isLooping; // Toggle looping
        if (isLooping) {
            loopStart = wavesurferInstance.getCurrentTime(); // Set loop start to current time
            loopEnd = Math.min(loopStart + 5, wavesurferInstance.getDuration()); // Set loop end (5 seconds or end of track)
            console.log(`Deck ${deckName.toUpperCase()}: Loop ON (Start: ${loopStart}s, End: ${loopEnd}s)`);
        } else {
            console.log(`Deck ${deckName.toUpperCase()}: Loop OFF`);
        }
    });

    // Monitor Playback and Handle Looping
    wavesurferInstance.on('audioprocess', () => {
        if (isLooping) {
            const currentTime = wavesurferInstance.getCurrentTime();
            if (currentTime >= loopEnd) {
                wavesurferInstance.seekTo(loopStart / wavesurferInstance.getDuration());
                console.log(`Deck ${deckName.toUpperCase()}: Looping back to ${loopStart}s`);
            }
        }
    });

    // Stop spinning when audio finishes
    wavesurferInstance.on('finish', () => {
        jogWheel.classList.remove('playing');
        console.log(`Deck ${deckName.toUpperCase()}: Audio finished`);
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

setupSpeedControl('left', wavesurferLeft);
setupSpeedControl('right', wavesurferRight);
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
