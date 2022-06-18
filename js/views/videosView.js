// Get the modals
const videoModal = document.getElementById('videoModal');

// Get the button that opens the modal
const logoutBtn = document.getElementById('logoutBtn');

// Get the <span> element that closes the modal
const spanVideo = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
logoutBtn.onclick = function() {
    videoModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanVideo.onclick = function() {
    videoModal.style.display = "none";
    playBtn.className = 'play';
        video.pause();
    video.pause()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == videoModal) {
    videoModal.style.display = "none";
    playBtn.className = 'play';
        video.pause();
    video.pause()
  }
}

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