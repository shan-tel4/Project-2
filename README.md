# Shay Mixer 5000 HTML CSS JavaScript

## Project Description

The Shay Mixer 5000 is a simple web-based DJ mixing interface designed to emulate traditional DJ equipment within a browser environment. It allows users to upload audio tracks, control playback, and simulate real-time mixing using interactive components.


[Visit deployed website here](https://shay-mixer-5000-94ce7070b792.herokuapp.com/)

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

Users can upload audio files directly into each deck, control playback using the interactive jog wheels and buttons, adjust playback speed and pitch, and blend tracks using the crossfader. The design focuses on providing an authentic DJ experience within a web browser, making it accessible for both amateur and professional DJs.

## The Shay Mixer 5000 is designed for:

- **Aspiring DJs**: Individuals new to DJing who seek an accessible platform to practice and develop their mixing skills without the need for expensive hardware.
- **Hobbyist DJs**: Enthusiasts who enjoy mixing music recreationally and desire a user-friendly interface to create and share mixes.
- **Professional DJs**: Experienced DJs looking for a convenient tool to prepare sets, experiment with track combinations, and refine their mixes.
- **Music Educators and Students**: Educators teaching DJing techniques and students learning about music mixing and audio manipulation.
- **Event Organisers**: Individuals responsible for curating music for events who require a straightforward solution for creating seamless playlists and mixes.

By catering to this diverse audience, the Shay Mixer 5000 aims to provide a versatile and intuitive platform for various users interested in DJing and music mixing.

---

## Design

### Colour Palette:
The Shay Mixer 5000's design emulates the aesthetic of professional DJ equipment, featuring a dark-themed interface with a deep blue background (#4a4d63) that minimises eye strain and enhances focus. The mixer panels are set against a slightly darker shade (#2a2d43), creating a subtle contrast that defines different sections without overwhelming the user. Accents in a soft pink hue (#f5b0c4) highlight key elements such as the logo and deck labels, drawing attention to important features. This color scheme not only reflects the vibrant atmosphere of DJ environments but also ensures clarity and usability, aligning with the visual language commonly found in DJ interfaces. 

![Color palette](https://github.com/shan-tel4/Project-2/blob/main/assets/images/project%202%20colour%20palette.png?raw=true)

### Typography
The "Poppins" font was chosen for its clean and modern design, ensuring easy readability.

### Wireframes
The wireframe was designed on [Visily](https://www.visily.ai/) and depicts a modern and minimalist DJ controller interface designed for an interactive web project. It features two decks labeled "Deck A" and "Deck B," each equipped with rotary controls and sliders for precise audio manipulation. At the center, a crossfader allows seamless transitions between decks, while additional buttons provide access to further functionalities, such as effects. The design balances simplicity and usability, creating a clean aesthetic that is visually engaging while emphasising intuitive operation for users.

![wireframe](https://github.com/shan-tel4/Project-2/blob/main/assets/images/project%202%20wireframe.png?raw=true)

---

## Key Features

- **Dual Decks**: Two separate decks labeled "Deck A" and "Deck B" enable users to upload and manage individual audio tracks, facilitating seamless transitions and mixing.
  
- **Interactive Jog Wheels**: Each deck features a responsive jog wheel with a spinning marker, mimicking the tactile experience of physical DJ equipment. The jog wheels are designed with vinyl-like grooves and a central label to enhance realism.

- **Playback Controls**: Users have access to essential playback functions, including play, pause, loop, and sync, allowing for dynamic control over each track.

- **Speed and Pitch Adjustment**: Each deck includes a speed control slider with a range of playback rates, accompanied by a "Preserve Pitch" option to maintain audio fidelity during tempo changes.

- **Crossfader**: A central crossfader enables smooth blending between Deck A and Deck B, providing intuitive control over the audio output.

---

## Technical Implementation:

### Frontend:
Developed using **HTML**, **CSS**, and **JavaScript**, the frontend is responsible for the structure, style, and user interaction within the DJ mixer. The interface employs a grid layout to organize components, ensuring a responsive and user-friendly design. Key interactive elements such as buttons, sliders, and jog wheels are all coded using JavaScript to make the user experience seamless.

- **HTML**: Provides the structure for the page, including elements such as buttons, sliders, and audio controls.
- **CSS**: Styles the layout, colors, and positioning of the elements. A dark theme design is used to reduce eye strain, with contrasting highlights on important features.
- **JavaScript**: Handles the interactivity of the web app, including the functionality of audio players, track control, and visual feedback using WaveSurfer.js.

### Backend:
The backend is powered by **Django**, a Python web framework. Django manages all server-side logic, including user authentication, session management, file uploads, and database interactions. Static files (CSS, images, and JavaScript) are served efficiently using **Whitenoise**, and the app’s configuration ensures smooth deployment to **Heroku**.

- **Django**: Handles routing, user authentication, file uploads, and server-side logic. It ensures smooth communication between the frontend and backend while managing requests and responses.
- **SQLLite**: Used as the production database on Heroku. It stores user data, track information, and other dynamic content.
- **Whitenoise**: Helps serve static files such as CSS, images, and JavaScript in production, providing efficient performance and faster load times.
- **Heroku**: A cloud-based platform used for deploying and scaling the app in production, ensuring it runs smoothly in a serverless environment.

---

## Technologies Used

- **HTML5**: Used for the structure and content of the application.
- **CSS3**: Used for the visual styling and layout.
- **JavaScript**: Used for interactivity and dynamic functionality.
- **Django**: Web framework for building the backend.
- **Heroku**: Cloud platform for deploying the app.
- **WhiteNoise**: For serving static files in production.
- **PostgreSQL**: Used as the production database.
- **WaveSurfer.js**: For audio visualization and manipulation.

---

## How to Use

1. Upload audio tracks for "Deck A" and "Deck B."
2. Use the play and pause buttons to control playback on each deck.
3. Adjust the speed slider for each deck to modify the tempo.
4. Use the crossfader to seamlessly transition between the two decks.
5. Experiment with additional controls such as loop, sync, and effects to create unique mixes.
6. Play around with the jog wheels to simulate a more tactile DJ experience.

---

## Testing

### Functional Testing:
Functional testing was performed to ensure that all interactive elements like buttons, sliders, and controls work as expected. Special attention was given to:

- **Audio handling**: Verifying that tracks load and play without errors.
- **Playback controls**: Ensuring smooth transitions when changing tracks and using the crossfader.
- **User interface**: Confirming the responsiveness of the layout and controls.

### Validator Testing:

- **HTML**: Passed the W3C Nu HTML Checker with no issues.
- **CSS**: Passed the W3C CSS Validator without errors.
- **JavaScript**: Passed JS validation.
- **Lighthouse**: Scored 97 for performance and accessibility.
- **Responsive Design**: Tested using "Am I Responsive?" to ensure it works across all devices.

---

## Features to Add in the Future

- **Customizable Sound Effects**: Allow users to upload and apply their own sound effects or loops.
- **Visualizer Integration**: Add a real-time audio visualizer that reacts dynamically to the music being played.
- **Playlist Support**: Enable users to create, save, and load playlists for seamless DJ sets.
- **Keyboard Shortcuts**: Implement keyboard shortcuts for commonly used actions like play, pause, and crossfading.
- **Multi-Device Syncing**: Allow users to sync the DJ controller across multiple devices for collaborative mixing sessions.

---

## Contributions

Feel free to fork this repository and submit pull requests. Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## Acknowledgments

- **[CDNJS CSS Library](https://cdnjs.com/libraries/font-awesome)**: Used for code to create pad buttons such as cue, play, pause, loop, drum, scratch, clap, crossfader, and the speed slider.
- **[WaveSurfer JS Library](https://wavesurfer.xyz/)**: Used for audio event listener functionality and the speed slider.
- **[Stack Overflow](https://stackoverflow.com/)**: Assisted in creating the loop logic.
- **[Pixabay](https://pixabay.com/)**: Provided drum, scratch, clap, and horn audio files.
- **[Prettier](https://prettier.io/)**: Used for code alignment and formatting.
- **[Coloors](https://coolors.co/)**: Used for generating the color theme palette for the website.
- **[W3 Schools](https://www.w3schools.com/)**: Used for script code link in HTML.

[Back to the top](#project-2-shay-mixer-5000-html-css-javascript)

---

