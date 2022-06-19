import * as Videos from "../models/videosModel.js";

// Get the modals
const videoModal = document.getElementById('videoModal');

// Get the button that opens the modal
const logoutBtn = document.getElementById('logoutBtn');

const easyImage = document.querySelector('#easyImage');
const mediumImage = document.querySelector('#mediumImage');
const hardImage = document.querySelector('#hardImage');

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

    if (videos.length != 0) {
        for (let video of videos) {
            if (video.level == difficulty) {
                result += `
            <div class="card" style="width: 100%;">
            <div class="row no-gutters">
                <div class="col-sm-2">
                    <img class="card-images" src="../images/turtle chef.jpg" alt="Card Image">
                </div>
                <div class="col-sm-4">
                    <div class="card-body">
                        <h1 class="video-title">${video.name}</h1>
                        <h3 class="card-theme">Theme</h3>
                        <p class="theme-text">${video.quizzes.theme}</p>
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
            }
        }
        videosContainer.innerHTML += result
    }
}

Videos.init()
renderVideos(Videos.getAllVideos(), 'Easy');