import * as Videos from "../models/videosModel.js";

const quizzModal = document.querySelector('#quizzModal');

const logoutBtn = document.getElementById('logoutBtn');

// Get the <span> element that closes the modal
const spanQuizz = document.getElementsByClassName('close')[0];
const activitiesContainer = document.querySelector('.activities-container');

// When the user clicks on the button, open the modal
logoutBtn.onclick = function() {
    quizzModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanQuizz.onclick = function() {
    quizzModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == quizzModal) {
    quizzModal.style.display = "none";
  }
}

const renderQuizzes = (videos, difficulty) => {
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
                    <div class="col-sm-10">
                        <div class="card-body">
                            <h1 class="quizz-title">${video.name}</h1>
                            <h3 class="card-theme">Theme</h3>
                            <p class="theme-text">${video.quizzes[0].theme}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
            }
        }
        activitiesContainer.innerHTML += result
    }
}

Videos.init()
renderQuizzes(Videos.getAllVideos(), 'Easy');