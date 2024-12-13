import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

alert("Hello! Welcome to Shay Mixer 5000!");

// Initialize WaveSurfer for Deck A 
const wavesurferLeft = WaveSurfer.create({
    container: '#waveform-left', // hidden will place wavesurfer in a difference place
    waveColor: '#343654', // hidden will place wavesurfer in a difference place
    progressColor: '#343654',  // hidden will place wavesurfer in a difference place
    height: 60,
    barWidth: 2,
});

// Initialize WaveSurfer for Deck B
const wavesurferRight = WaveSurfer.create({
    container: '#waveform-right', // hidden will place wavesurfer in a difference place
    waveColor: '#343654', // hidden will place wavesurfer in a difference place
    progressColor: '#343654', // Fixed color for progress
    height: 60,
    barWidth: 2,
});

// Available Speeds
const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// Audio Upload Handlers
document.getElementById('audio-uploader-left').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferLeft.load(fileURL); // Load the audio file into WaveSurfer
        console.log('Deck A: Audio file loaded successfully');
    } else {
        console.error('Deck A: No file selected');
    }
});

document.getElementById('audio-uploader-right').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        wavesurferRight.load(fileURL); // Load the audio file into WaveSurfer
        console.log('Deck B: Audio file loaded successfully');
    } else {
        console.error('Deck B: No file selected');
    }
});

// Controls Setup
function setupDeckControls(deck, wavesurfer) {
    const prefix = deck === 'left' ? 'left' : 'right';

    // Play Button
    document.querySelector(`.deck-${deck} .pad.play`).addEventListener('click', () => {
        wavesurfer.playPause(); // Toggle play/pause
        const isPlaying = wavesurfer.isPlaying();
        document.querySelector(`#jog-wheel-${deck}`).classList.toggle('playing', isPlaying);
        console.log(`Deck ${deck.toUpperCase()}: ${isPlaying ? 'Playing' : 'Paused'}`);
    });

    // Pause Button
    document.querySelector(`.deck-${deck} .pad.pause`).addEventListener('click', () => {
        wavesurfer.pause(); // Pause audio
        document.querySelector(`#jog-wheel-${deck}`).classList.remove('playing');
        console.log(`Deck ${deck.toUpperCase()}: Paused`);
    });

    // Speed Control
    document.querySelector(`#speed-slider-${prefix}`).addEventListener('input', (e) => {
        const speed = speeds[e.target.value];
        wavesurfer.setPlaybackRate(speed); // Set playback speed
        document.querySelector(`#rate-${prefix}`).textContent = speed.toFixed(2);
        console.log(`Deck ${deck.toUpperCase()}: Playback rate set to ${speed}`);
    });

    // Preserve Pitch Checkbox
    document.querySelector(`#preserve-pitch-${prefix}`).addEventListener('change', (e) => {
        wavesurfer.setPlaybackRate(wavesurfer.getPlaybackRate()); // Update playback rate
        console.log(
            `Deck ${deck.toUpperCase()}: Preserve pitch ${
                e.target.checked ? 'enabled' : 'disabled'
            }`
        );
    });

    // Ensure jog wheel animates during playback
    wavesurfer.on('play', () => {
        document.querySelector(`#jog-wheel-${deck}`).classList.add('playing');
    });

    wavesurfer.on('pause', () => {
        document.querySelector(`#jog-wheel-${deck}`).classList.remove('playing');
    });

    // Log when audio finishes
    wavesurfer.on('finish', () => {
        console.log(`Deck ${deck.toUpperCase()}: Audio finished`);
        document.querySelector(`#jog-wheel-${deck}`).classList.remove('playing');
    });
}

// Initialize Controls for Both Decks
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
