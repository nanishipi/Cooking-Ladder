import * as Videos from "../models/videosModel.js";

// Get the modals
const videoModal = document.getElementById('videoModal');

// Get the button that opens the modal
const logoutBtn = document.getElementById('logoutBtn');

const easyImage = document.querySelector('#easyImage');
const mediumImage = document.querySelector('#mediumImage');
const hardImage = document.querySelector('#hardImage');

const mediumMessage = document.querySelector('#mediumMessage');
const hardMessage = document.querySelector('#hardMessage');

// Get the <span> element that closes the modal
const spanVideo = document.getElementsByClassName('close')[0];

const videoPlayer = document.querySelector('.video-player');
const video = videoPlayer.querySelector('.video');
const playButton = videoPlayer.querySelector('#play-button');
const progress = videoPlayer.querySelector('.video-progress');
const progressBar = videoPlayer.querySelector('.video-progress-filled');
const mute = videoPlayer.querySelector('.mute');
const volume = videoPlayer.querySelector('.volume');
const fullscreen = videoPlayer.querySelector('.fullscreen');
const currentTimeElement = document.querySelector('.current');
const durationTimeElement = document.querySelector('.duration');

const likeBtn = document.querySelector('.button-like');

const videosContainer = document.querySelector('.videos-container');

// When the user clicks on the button, open the modal
logoutBtn.onclick = function () {
    videoModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanVideo.onclick = function () {
    videoModal.style.display = "none";
    playButton.className = 'play';
    video.pause();
    video.pause()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == videoModal) {
        videoModal.style.display = "none";
        playButton.className = 'play';
        video.pause();
        video.pause()
    }
}

const togglePlayPause = () => {
    if (video.paused) {
        playButton.className = 'pause';
        video.play();
    } else {
        playButton.className = 'play';
        video.pause();
    }
}

const currentTime = () => {
    const currentMinutes = Math.floor(video.currentTime / 60)
    const currentSeconds = Math.floor(video.currentTime - currentMinutes * 60)
    const durationMinutes = Math.floor(video.duration / 60)
    const durationSeconds = Math.floor(video.duration - durationMinutes * 60)

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`
}

playButton.onclick = () => {
    togglePlayPause();
}

video.onclick = () => {
    togglePlayPause();
}

video.addEventListener('timeupdate', currentTime);

volume.addEventListener('mousemove', (e) => {
    video.volume = e.target.value
})

video.addEventListener('timeupdate', () => {
    const percentage = video.currentTime / video.duration;
    progressBar.style.width = percentage * 100 + '%';
})

progress.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = progressTime
})

mute.addEventListener('click', () => {
    video.muted = !video.muted;
    mute.classList.toggle('muted')
})

fullscreen.addEventListener('click', () => {
    video.requestFullscreen();
})

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
})

easyImage.addEventListener('click', () => {
    videosContainer.innerHTML = ''
    easyImage.style.backgroundColor = "whitesmoke";
    mediumImage.style.backgroundColor = "#D5D5F6"
    hardImage.style.backgroundColor = "#D5D5F6"
    renderVideos(Videos.getAllVideos(), 'Easy')
})

mediumImage.addEventListener('click', () => {
    videosContainer.innerHTML = ''
    easyImage.style.backgroundColor = "#D5D5F6";
    mediumImage.style.backgroundColor = "whitesmoke"
    hardImage.style.backgroundColor = "#D5D5F6"
    renderVideos(Videos.getAllVideos(), 'Medium')
})

hardImage.addEventListener('click', () => {
    videosContainer.innerHTML = ''
    easyImage.style.backgroundColor = "#D5D5F6";
    mediumImage.style.backgroundColor = "#D5D5F6"
    hardImage.style.backgroundColor = "whitesmoke"
    renderVideos(Videos.getAllVideos(), 'Hard')
})

const renderVideos = (videos, difficulty) => {
    let result = ''
    let hasEnoughLevel = true;
    let background = ''
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    
    if (difficulty == 'Easy') {
        background="#1B998B"
    } else if (difficulty == 'Medium') {
        background="#FF9B71"
    } else if (difficulty == 'Hard') {
        background="#e84855"
    }

    if (difficulty == 'Medium' && !(loggedUser.level >= 10)) {
        hasEnoughLevel = false;
    } else if (difficulty == 'Hard' && !(loggedUser.level >= 25)) {
        hasEnoughLevel = false;
    }
 
    if (videos.length != 0) {
        for (let video of videos) {
            if (video.level == difficulty && hasEnoughLevel) {
                result += `
            <div id="${video.id}" class="card" style="width: 100% ;background-color: ${background}">
            <div class="row no-gutters">
                <div class="col-sm-2">
                    <img class="card-images" src="../images/turtle chef.jpg" alt="Card Image">
                </div>
                <div class="col-sm-4">
                    <div class="card-body">
                        <h1 class="video-title">${video.name}</h1>
                        <h3 class="card-theme">Theme</h3>
                        <p class="theme-text">${video.theme}</p>
                    </div>
                </div>
                <div class="col-sm-2">
                    <h3 class="duration-title">Duration:</h3>
                    <h3 class="recipe-type-title">Recipe Type:</h3>
                </div>
                <div class="col-sm-2">
                    <p class="duration-text">${video.duration}</p>
                    <p class="recipe-type-text">${video.tag}</p>
                </div>
            </div>
        </div>
        `
            } else if (hasEnoughLevel == false) {
                result += `<p id='levelRequirement'>Your level is not high enough to see this content!</p>`
            }
        }
        videosContainer.innerHTML += result
    }
}

const unlockDifficulties = () => {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    if (loggedUser.level >= 10) {
        mediumImage.src="../images/video orange.png"
        mediumMessage.style.display="none"
    } 

    if (loggedUser.level >= 25) {
        hardImage.src="../images/video red.png"
        hardMessage.style.display="none"
    }
}

const addCardListners = () => {
    const cards = document.getElementsByClassName("card");
    for (const card of cards) {
        card.addEventListener('click', () => {
            Videos.setCurrentVideo(card.id)
        })
    }
}

Videos.init()
unlockDifficulties()
renderVideos(Videos.getAllVideos(), 'Easy');
addCardListners()