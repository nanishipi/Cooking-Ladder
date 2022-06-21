import * as Videos from "../models/videosModel.js";
import * as Quizz from "../models/quizzesModel.js";
import * as Users from "../models/usersModel.js";

const quizzModal = document.querySelector('#quizzModal');
let questionsForm = document.querySelector('#questionsForm')

const easyImage = document.querySelector('#easyImage');
const mediumImage = document.querySelector('#mediumImage');
const hardImage = document.querySelector('#hardImage');

const mediumMessage = document.querySelector('#mediumMessage');
const hardMessage = document.querySelector('#hardMessage');

// Get the <span> element that closes the modal
const spanQuizz = document.getElementsByClassName('close')[0];
const activitiesContainer = document.querySelector('.activities-container');

// When the user clicks on <span> (x), close the modal
spanQuizz.onclick = function () {
    quizzModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == quizzModal) {
        quizzModal.style.display = "none";
    }
}

easyImage.addEventListener('click', () => {
    activitiesContainer.innerHTML = ''
    easyImage.style.backgroundColor = "whitesmoke";
    mediumImage.style.backgroundColor = "#D5D5F6"
    hardImage.style.backgroundColor = "#D5D5F6"
    renderQuizzes(Videos.getAllVideos(), 'Easy')
})

mediumImage.addEventListener('click', () => {
    activitiesContainer.innerHTML = ''
    easyImage.style.backgroundColor = "#D5D5F6";
    mediumImage.style.backgroundColor = "whitesmoke"
    hardImage.style.backgroundColor = "#D5D5F6"
    renderQuizzes(Videos.getAllVideos(), 'Medium')
})

hardImage.addEventListener('click', () => {
    activitiesContainer.innerHTML = ''
    easyImage.style.backgroundColor = "#D5D5F6";
    mediumImage.style.backgroundColor = "#D5D5F6"
    hardImage.style.backgroundColor = "whitesmoke"
    renderQuizzes(Videos.getAllVideos(), 'Hard')
})

const renderQuizzes = (videos, difficulty) => {
    let result = ''
    let hasEnoughLevel = true;
    let background = ''
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

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

    const user = JSON.parse(sessionStorage.getItem('loggedUser'))
    let button = ""
    if (videos.length != 0) {
        for (let video of videos) {
            if (video.level == difficulty && hasEnoughLevel) {

                video.quizzes.map(quizz => {

                   const completed = user.quizzesCompleted.find(q => q.videoID == quizz.videoID && q.quizz == quizz.theme)
                    if(completed){
                        button = `<button id="${video.id}" class="quizzCompleted" disabled name="${quizz.theme}">Completed</button>`
                    }
                    else{
                        button = `<button id="${video.id}" class="quizz" name="${quizz.theme}">Play</button> `
                    }

                    result += `
                    <div id="${video.id}" data="${quizz.theme} "class="card" style="width: 100% ;background-color: ${background}">
                    <div class="row no-gutters">
                        <div class="col-sm-2"">
                        <img class="card-images" src="../images/turtle chef.jpg" alt="Card Image">
                    </div>
                    <div class="col-sm-4">
                        <div class="card-body">
                            <h1 class="quizz-title">${video.name}</h1>
                            <h3 class="card-theme">Theme</h3>
                            <p class="theme-text">${quizz.theme}</p>
                        </div>
                    </div>
                    <div class="col-sm-2">
                    <h3 class="questions-title">Questions:</h3>
                    <h3 class="experience-title">Experience:</h3>
                </div>
                <div class="col-sm-2">
                    <p class="questions-text">${quizz.questions.length}</p>
                    <p class="experience-text">${quizz.xp}</p>
                </div>
                <div class="col-sm-2 play">
                    ${button}
                </div>
               
                        </div>
                    </div>
                `


                })


            } else if (hasEnoughLevel == false) {
                result = `
                <form id="quizzModalForm">
                <p id='levelRequirement'>Your level is not high enough to see this content!</p>`
            }
        }
        activitiesContainer.innerHTML = result
        openQuizz();
        closeQuizz();

    }



}

const unlockDifficulties = () => {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    if (loggedUser.level >= 10) {
        mediumImage.src = "../images/quizz orange.png"
        mediumMessage.style.display = "none"
    }

    if (loggedUser.level >= 25) {
        hardImage.src = "../images/quizz red.png"
        hardMessage.style.display = "none"
    }
}


function openQuizz() {

    const btns = document.getElementsByClassName('quizz')

    for (const btn of btns) {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            Videos.setCurrentVideo(btn.id)
            const currentVideo = Videos.getCurrentVideo()

            let result = `<h2 id="quizzTitle" class="quizzTitle">${currentVideo.name}</h2>`

            quizzModal.style.display = "block";

            let color
            if (currentVideo.level == 'Easy') {
                color = "#1B998B"
            } else if (currentVideo.level == 'Medium') {
                color = "#FF9B71"
            } else if (currentVideo.level == 'Hard') {
                color = "#e84855"
            }
            document.getElementById('modal').style.backgroundColor = color


            Quizz.setCurrentQuizz(btn.name, btn.id)
            const quizz = Quizz.getCurrentQuizz()
            quizz[0].questions.map(question => {

                result += `                
                
                <p id="quizzQuestion">${question.question}</p>
                <div class="questions">
                
                <div class="answers">
                <input type="radio" name="${question.question}" id="${question.question}-${question.answer1}" value="${question.answer1}" required>
                <label for="${question.question}-${question.answer1}" required>${question.answer1}</label>
                <input type="radio" name="${question.question}" id="${question.question}-${question.answer2}" value="${question.answer2}">
                <label for="${question.question}-${question.answer2}">${question.answer2}</label>
                </div>
                <div class="answers">
                <input type="radio" name="${question.question}" id="${question.question}-${question.answer3}" value="${question.answer3}">
                <label for="${question.question}-${question.answer3}">${question.answer3}</label>
                <input type="radio" name="${question.question}" id="${question.question}-${question.answer4}" value="${question.answer4}">
                <label for="${question.question}-${question.answer4}">${question.answer4}</label>
                </div>  
                </div>  
               
    `
            });

            questionsForm.innerHTML = result
            questionsForm.innerHTML += `
            <input id="done" type="submit">
            </form> `

            document.getElementById('done').addEventListener('click', () => {
                let correct_answers = 0

                const quizz = Quizz.getCurrentQuizz()
                quizz[0].questions.map(question => {
                    const answer = document.querySelector(`input[name="${question.question}"]:checked`)
                    const answerLabel = document.querySelector(`label[for="${question.question}-${answer.value}"]`)

                    console.log(answer.value);
                    if (answer) {

                        if (question.correctAnswer === answer.value) {

                            answerLabel.style.backgroundColor = "green"
                            
                             correct_answers ++
                        }
                        else {
                            answerLabel.style.backgroundColor = "red"
                        }
                    }

                    if(correct_answers ==  quizz[0].questions.length){
                        Swal.fire(
                            'Congratulations!',
                            `You complete the quizz and gained ${quizz[0].xp} xp `,
                            'success'
                          ).then((result) => {
                            if (result) {
                              const user = JSON.parse(sessionStorage.getItem('loggedUser'))
                              user.experience += Number(quizz[0].xp)
                              if(user.experience >= 500){
                                user.level ++
                                user.experience = user.experience - 500
                              }
                              user.quizzesCompleted.push({
                                videoID:currentVideo.id,
                                quizz: quizz[0].theme
                              })
                              Users.editUser(user.id,user.name,user.password,user.email,user.location,user.avatarName,user.avatarPhoto,user.gender,user.birthdate,user.level,user.experience,user.blocked,user.quizzesCompleted)
                                location.reload()
                            }
                          })
                    }

                    else{

                            Swal.fire(
                                'Oops!',
                                `You failed, try again! `,
                                'error'
                              ).then((result) => {
                                if (result) {
                                location.reload()
                                }
                              })
                         
                     
                    }


                }
                )

            })



        })



    }


}

function closeQuizz() {

    // When the user clicks on <span> (x), close the modal
    spanQuizz.addEventListener('click', () => {
        quizzModal.style.display = "none";


    })

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (event) => {
        if (event.target == quizzModal) {
            quizzModal.style.display = "none";



        }
    })

}


Videos.init()
Users.init()
unlockDifficulties();
renderQuizzes(Videos.getAllVideos(), 'Easy');

