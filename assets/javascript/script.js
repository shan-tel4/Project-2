
// Help me detect when something happens in my upload element – and do something about it
document.getElementById("audio-uploader-left").addEventListener("change", processMyUploadLeft);
document.getElementById("audio-uploader-right").addEventListener("change", processMyUploadRight);

function processMyUploadLeft(event) {
    // pick the first file in my upload event
    let myAudioFile = event.target.files[0];
    document.getElementById("audio-player-left").src = URL.createObjectURL(myAudioFile);
}

function processMyUploadRight(event) {
    // pick the first file in my upload event
    let myAudioFile = event.target.files[0];
    document.getElementById("audio-player-right").src = URL.createObjectURL(myAudioFile);
}


// Help me detect when something happens in my upload element – and do something about it



