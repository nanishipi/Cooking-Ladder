import * as Question from "../models/questionsModel.js";
import * as Video from "../models/videosModel.js";

const videos = Video.getAllVideos();
const selectVideo = document.querySelector('#video')
const selectQuizz = document.querySelector("#quizz");


function renderVideoOptions() {

    videos.map(v => {
        selectVideo.innerHTML += ` 
        <option value=${v.id}>${v.name}</option>      
        `
    })
    console.log(selectVideo.value);


    let result = ""
    const video = videos.filter(v => v.id == selectVideo.value)
    console.log(video[0].quizzes);
    video[0].quizzes.map(q => {
        result += ` 
        <option value=${q.theme}>${q.theme}</option>      
        `
    })

    selectQuizz.innerHTML = result
}



function renderQuizzOptions() {


    selectVideo.addEventListener('change', () => {
        let result = ""
        const video = videos.filter(v => v.id == selectVideo.value)
        console.log(video[0].quizzes);
        video[0].quizzes.map(q => {
            result += ` 
            <option value=${q.theme}>${q.theme}</option>      
            `
        })

        selectQuizz.innerHTML = result

    })

}

function addQuestion() {

    document.querySelector("#addQuestion").addEventListener("submit", (event) => {
        event.preventDefault();
        let videoID = document.querySelector("#video").value;
        let theme = document.querySelector("#quizz").value;
        let question = document.querySelector("#question").value;
        let correctAnswer = document.querySelector("#correctAnswer").value;
        let answer1 = document.querySelector("#answer1").value;
        let answer2 = document.querySelector("#answer2").value;
        let answer3 = document.querySelector("#answer3").value;
        let answer4 = document.querySelector("#answer4").value;

        const video = videos.filter(v => v.id == videoID)
        const quizz = video[0].quizzes.find(q => q.theme === theme)
        const questionToAdd = quizz.questions.find(q => q.question === question)
        
        if (questionToAdd != undefined) {
            Swal.fire("Error", `Question "${question}" already exists!`, 'error');
        }

        else {
            Question.add(
                Number(videoID),
                theme,
                question,
                correctAnswer,
                answer1,
                answer2,
                answer3,
                answer4,

            );
            Swal.fire(
                'Done!',
                'Question added Successfuly!',
                'success'
            )
        }
    }
    )
}


Video.init();
renderVideoOptions();
renderQuizzOptions();
addQuestion()

