# Project-2 Shay Mixer 5000 HTML CSS JavaScript

## Project Description

The Shay Mixer 5000 is a simple web-based DJ mixing interface designed to emulate traditional DJ equipment within a browser environment. It allows users to upload audio tracks, control playback, and simulate real-time mixing using interactive components.

![Shay Mixer 5000](https://github.com/shan-tel4/Project-2/blob/main/assets/images/shay%20mixer%205000.png?raw=true)

[Visit deployed website here]()

---

## Table of Contents

1. [Project Description](#project-description)
2. [Design](#design)
3. [Features](#key-features)
4. [Technologies Used](#technologies-used)
5. [How to Use](#how-to-use)
6. [Testing](#testing)
7. [Contributions](#contributions)
8. [Acknowledgments](#acknowledgments)


---


## User Interaction:

Users can upload audio files directly into each deck, control playback using the interactive jog wheels and buttons, adjust playback speed and pitch, and blend tracks using the crossfader. The design focuses on providing an authentic DJ experience within a web browser, making it accessible for both amateur and professional DJs

## The Shay Mixer 5000 is designed for:

- **Aspiring DJs**: Individuals new to DJing who seek an accessible platform to practice and develop their mixing skills without the need for expensive hardware.

- **Hobbyist DJs**: Enthusiasts who enjoy mixing music recreationally and desire a user-friendly interface to create and share mixes.

- **Professional DJs**: Experienced DJs looking for a convenient tool to prepare sets, experiment with track combinations, and refine their mixes.

- **Music Educators and Students**: Educators teaching DJing techniques and students learning about music mixing and audio manipulation.

- **Event Organisers**: Individuals responsible for curating music for events who require a straightforward solution for creating seamless playlists and mixes.

By catering to this diverse audience, the Shay Mixer 5000 aims to provide a versatile and intuitive platform for various users interested in DJing and music mixing.

---

## Design

## Colour Palette:

The Shay Mixer 5000's design emulates the aesthetic of professional DJ equipment, featuring a dark-themed interface with a deep blue background (#4a4d63) that minimises eye strain and enhances focus. The mixer panels are set against a slightly darker shade (#2a2d43), creating a subtle contrast that defines different sections without overwhelming the user. Accents in a soft pink hue (#f5b0c4) highlight key elements such as the logo and deck labels, drawing attention to important features. This color scheme not only reflects the vibrant atmosphere of DJ environments but also ensures clarity and usability, aligning with the visual language commonly found in DJ interfaces. 

![Color palette](https://github.com/shan-tel4/Project-2/blob/main/assets/images/project%202%20colour%20palette.png?raw=true)

Typography The "Poppins" font was chosen for its clean and modern design, ensuring easy readability.

## Wireframes

The wireframe was designed on [Visily](https://www.visily.ai/) depicts a modern and minimalist DJ controller interface designed for an interactive web project, as seen on the linked project webpage. It features two decks labeled "Deck A" and "Deck B," each equipped with rotary controls and sliders for precise audio manipulation. At the center, a crossfader allows seamless transitions between decks, while additional buttons provide access to further functionalities, such as effects. The design balances simplicity and usability, creating a clean aesthetic that is visually engaging while emphasising intuitive operation for users.

![wireframe](https://github.com/shan-tel4/Project-2/blob/main/assets/images/project%202%20wireframe.png?raw=true)

---

## Key Features

- **Dual Decks**: Two separate decks labeled "Deck A" and "Deck B" enable users to upload and manage individual audio tracks, facilitating seamless transitions and mixing.


- **Interactive Jog Wheels**: Each deck features a responsive jog wheel with a spinning marker, mimicking the tactile experience of physical DJ equipment. The jog wheels are designed with vinyl-like grooves and a central label to enhance realism.


- **Playback Controls**: Users have access to essential playback functions, including play, pause, loop, and sync, allowing for dynamic control over each track.



- **Speed and Pitch Adjustment**: Each deck includes a speed control slider with a range of playback rates, accompanied by a "Preserve Pitch" option to maintain audio fidelity during tempo changes.


- **Crossfader**: A central crossfader enables smooth blending between Deck A and Deck B, providing intuitive control over the audio output.


## Technical Implementation:

- **Frontend**: Developed using HTML, CSS and JS, the interface employs a grid layout to organise components, ensuring a responsive and user-friendly design.


- **Audio Handling**: The application utilises the Web Audio API, with integration of the WaveSurfer.js library for audio visualisation and manipulation, offering precise control over audio playback and effects.

---

## Technologies Used

- **HTML5**: Used for the structure and content of the application.  
- **CSS3**: Used for the visual styling and layout.  
- **JavaScript**: Used for interactivity.

---

## How to Use

To use the DJ Mixer application, start by selecting a track for "Deck A" and "Deck B." Use the play and pause buttons on each deck to control playback. Adjust the sliders for volume and effects to customise the audio experience. The crossfader in the center allows you to seamlessly transition between the two decks by sliding it left or right. You can also use the speed slider and pad buttons which are clearly labelled to fine-tune the tempo or add effects. Experiment with the various buttons and controls to create dynamic mixes and enjoy a hands-on DJ experience right in your browser.

---

## Testing

### Functional Testing:

Functional testing was used in the project to ensure that all features of the DJ controller application operate as intended. This involved verifying the functionality of buttons such as play, pause, and loop, as well as the responsiveness of sliders like the crossfader and speed control. Each interactive element was tested for proper audio feedback and smooth transitions between tracks. Testing also confirmed that only audio files can be uploaded to the application, preventing errors caused by unsupported file types. Additionally, testing ensured that the application performed consistently across different devices and browsers, providing users with a seamless and reliable experience.


### Validator Testing:

- **HTML**: Passed the W3C Nu HTML Checker with no issues.  
- **CSS**: Passed the W3C CSS Validator without errors.
- **JavaScript**: Passed the JS validation with no issue. 
- **Lighthouse**: Scored 97 on Lighthouse for performance and accessibility.
- **Responsive Design**: Am I Responsive? was use to test project responsivness on devices with various screen sizes.

![Lighthouse Report](https://github.com/shan-tel4/Project-2/blob/main/assets/images/Lighthouse%20score.png?raw=true) 

![html validator](https://github.com/shan-tel4/Project-2/blob/main/assets/images/html%20validator.png?raw=true)

![css validator](https://github.com/shan-tel4/Project-2/blob/main/assets/images/css%20validator.png?raw=true)

![JavaScript Validator](https://github.com/shan-tel4/Project-2/blob/main/assets/images/js%20validator.png?raw=true)

![Responsive Design](https://github.com/shan-tel4/Project-2/blob/main/assets/images/responsive%20image.png?raw=true)


### Known Issues:

- None identified at this time.

---

## Features to add in the future 

- **Customisable Sound Effects:** Allow users to upload and apply their own sound effects or loops for a more personalized experience.  
- **Visualizer Integration:** Add a real-time audio visualizer that reacts dynamically to the music being played.  
- **Playlist Support:** Enable users to create, save, and load playlists for seamless DJ sets.  
- **Keyboard Shortcuts:** Incorporate keyboard shortcuts for commonly used actions, like play, pause, and crossfading.  
- **Multi-Device Syncing:** Add functionality to sync the DJ controller across multiple devices for collaborative mixing sessions.  


### Acknowledgments  

[CDNJS CSS Library](https://cdnjs.com/libraries/font-awesome0) Used for code to create pad buttons such as cue, play, pause, loop, drum, scratch, clap, crossfader, and the speed slider.  
[Wavesurfer JS Library](https://wavesurfer.xyz/) Used for audio event listener functionality and the speed slider.  
[Stack Overflow](https://stackoverflow.com/) Assisted in creating the loop logic.  
[Pixabay](https://pixabay.com/) Provided drum, scratch, clap, and horn audio files.  
[Prettier](https://prettier.io/) Utilized for code alignment and formatting.  
[Coloors](https://coolors.co/) Used for generating the color theme palette for the website.  
[W3 Schools](https://www.w3schools.com/) Used for script code link in HTML.  

[Back to the top](#project-2-shay-mixer-5000-html-css-javascript)
