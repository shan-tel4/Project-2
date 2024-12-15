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
        } else {
            console.warn(`Deck ${deckName.toUpperCase()}: Already playing`);
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

    // Stop spinning when audio finishes
    wavesurferInstance.on('finish', () => {
        jogWheel.classList.remove('playing');
        console.log(`Deck ${deckName.toUpperCase()}: Audio finished`);
    });

    // Log any errors during file loading
    wavesurferInstance.on('error', (err) => {
        console.error(`Deck ${deckName.toUpperCase()}: Error -`, err);
    });
}

// Initialize Controls for Both Decks
setupDeckControls('left', wavesurferLeft);
setupDeckControls('right', wavesurferRight);
