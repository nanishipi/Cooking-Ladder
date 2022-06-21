import * as Videos from "../models/videosModel.js";
import * as Users from "../models/usersModel.js";

// Get the modals
const videoModal = document.getElementById('videoModal');

const easyImage = document.querySelector('#easyImage');
const mediumImage = document.querySelector('#mediumImage');
const hardImage = document.querySelector('#hardImage');

const mediumMessage = document.querySelector('#mediumMessage');
const hardMessage = document.querySelector('#hardMessage');
const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

const videosContainer = document.querySelector('.videos-container');

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

    if (difficulty == 'Easy') {
        background = "#1B998B"
    } else if (difficulty == 'Medium') {
        background = "#FF9B71"
    } else if (difficulty == 'Hard') {
        background = "#e84855"
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
            <div id="${video.id}" class="card video" style="width: 100% ;background-color: ${background}">
            <div class="row no-gutters">
                <div class="col-sm-2">
                    <img class="card-images" src="${video.photo}" alt="Card Image">
                </div>
                <div class="col-sm-6">
                    <div class="card-body">
                        <h2 class="video-title">${video.name}</h2>
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
                result = `<p id='levelRequirement'>Your level is not high enough to see this content!</p>`
            }
        }
        videosContainer.innerHTML += result
    }
    addCardListners()
}

const unlockDifficulties = () => {
    if (loggedUser.level >= 10) {
        mediumImage.src = "../images/video orange.png"
        mediumMessage.style.display = "none"
    }

    if (loggedUser.level >= 25) {
        hardImage.src = "../images/video red.png"
        hardMessage.style.display = "none"
    }
}

const getvideoFunctions = (currentVideo) => {
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
    const likeCount = document.querySelector('#likeCount');

    const shareBtn = document.querySelector('.share-button');
    const exercisesCollection = document.getElementsByClassName('exercises-paragraphs')
    const exercises = [...exercisesCollection];

    exercises.forEach(exercise => {
        exercise.addEventListener('click', () => {
            const exerciseValues = exercise.getAttribute('id').split('-');
            const videoId = exerciseValues[0];
            const quizzTheme = exerciseValues[1];

            const currentQuizz = {
                videoID: videoId,
                theme: quizzTheme,
            }
            const user = JSON.parse(sessionStorage.getItem('loggedUser'))
            const completed = user.quizzesCompleted.find(quizz  => quizz.videoID == videoId && quizz.quizz == quizzTheme )
            console.log(completed);
            if(completed){
                Swal.fire(
                    'Oops!',
                    `Exercise already completed! `,
                    'warning'
                )
            }
            else{
                localStorage.setItem('quizzToOpen', JSON.stringify(currentQuizz));
                window.location.href = "../html/evaluation.html"
            }
           
        })
    });


    likeBtn.addEventListener('click', () => {
        const userlike = currentVideo.likes.find(like => 
            like.userId == loggedUser.id && like.videoId == currentVideo.id
        )

        if (userlike) {
              currentVideo.likes = currentVideo.likes.filter(like => 
                like.userId != loggedUser.id && like.videoId != currentVideo.id
            )
            likeBtn.classList.toggle('liked');
        } else {
            currentVideo.likes.push({
                userId: loggedUser.id,
                videoId: currentVideo.id
            })
            likeBtn.classList.toggle('liked');
        }
        likeCount.innerHTML = currentVideo.likes.length
        Videos.editVideo(currentVideo.name,currentVideo.theme,currentVideo.duration,currentVideo.photo,currentVideo.url,currentVideo.path,currentVideo.level,currentVideo.tag,currentVideo.timestamp,currentVideo.quizzes, currentVideo.likes);
    })

    shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentVideo.url);
        Swal.fire(
            `Video URL copied to clipboard!`,
        )
    })

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
}

const renderVideo = (currentVideo) => {
    const modalContent = document.querySelector('.modal-content');
    let liked = ''
    const userlike = currentVideo.likes.find(like => 
        like.userId == loggedUser.id && like.videoId == currentVideo.id
    )

    if (userlike) {
        liked = 'liked'
    } else {
        liked = ''
    }

    let result = ''

    result += `<span class="close">&times;</span>
    <div class="video-container">
        <div class="video-player">
            <video class="video"
                src="${currentVideo.path}"></video>
            <div class="player-controls">
                <div class="video-progress">
                    <div class="video-progress-filled"></div>
                </div>
                <div class="inner-player-controls">
                    <button id="play-button"></button>
                    <button class="mute control-button">
                        <div class="slash"></div>
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <input type="range" class="volume" min="0" max="1" step="0.01" value="1">
                    <button class="fullscreen control-button">
                        <i class="fas fa-expand"></i>
                    </button>
                    <div class="time">
                        <span class="current">0:00</span> / <span class="duration">0:00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="video-options-container">
        <button class="button button-like ${liked}">
            <i class="fas fa-thumbs-up"></i>
            <span>Like</span>
        </button>
        <p id="likeCount">${currentVideo.likes.length}</p>
        <button class="share-button">Share</button>
    </div>
    <div class="video-info-container">
        <p class="tag">${currentVideo.tag}</p>
    `   
    const timestamps = currentVideo.timestamp;

    if (timestamps.length != 0) {
        result += `<h3 class="timestamps-title">Timestamps</h3>`
    }

    timestamps.forEach(timestamp => {
        result += `<div class="timestapms">
        <p class="timestapms-paragraphs"><span>${timestamp.timeStart} - ${timestamp.timeEnd}</span> --- <span class="timestamp-title">${timestamp.title}</span> </p>    
    </div>
    `
    });

    const quizzes = currentVideo.quizzes;

    if (quizzes.length != 0) {
        result += `<h3 class="exercises-title">Exercises</h3>`
    }

    quizzes.forEach(quizz => {
        if(quizz.questions.length != 0)
        result += `<div class="exercises">
        <p id="${quizz.videoID}-${quizz.theme}" class="exercises-paragraphs">Exercise about ${quizz.theme}</p>    
    </div>
    `
    })


    result += `</div>
    <div class="comment-button-wrapper">
    <button class="comments-button">Comments</button>
    </div>`

    modalContent.innerHTML = result;

    getvideoFunctions(currentVideo);
}

const addCardListners = () => {
    const cards = document.getElementsByClassName("card");
    for (const card of cards) {
        card.addEventListener('click', () => {
            Videos.setCurrentVideo(card.id)
            const currentVideo = Videos.getCurrentVideo()

            renderVideo(currentVideo);
            videoModal.style.display = "block";
        })
    }
}

Videos.init()
unlockDifficulties()
renderVideos(Videos.getAllVideos(), 'Easy');