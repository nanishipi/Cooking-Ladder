import * as Quizz from "../models/quizzesModel.js";
import * as Video from "../models/videosModel.js";

const videos = Video.getAllVideos(); 


function renderVideoOptions() {

    const select = document.querySelector("#video");
    videos.map(v => {
        select.innerHTML += ` 
        <option value=${v.id}>${v.name}</option>      
        `
    } )


  }

function addQuizz(){
  document.querySelector("#addQuizz").addEventListener("submit", (event) => {
    event.preventDefault();
    let videoID =  document.querySelector("#video").value;
    let theme = document.querySelector("#theme").value;
    let question = document.querySelector("#question").value;
    let correctAnswer = document.querySelector("#correctAnswer").value;
    let answer1 = document.querySelector("#answer1").value;
    let answer2 = document.querySelector("#answer2").value;
    let answer3 = document.querySelector("#answer3").value;
    let answer4 = document.querySelector("#answer4").value;
    let xp = 0
    
    const video = videos.filter(v => v.id == videoID)

        const quizz = video[0].quizzes.find(q  => q.theme === theme)
      if( quizz != undefined ){
        Swal.fire("Error",`Quizz with name "${theme}" already exists!`,'error');
      }

      else {
        Quizz.add(
            Number(videoID),
            theme,
            [{
                question,
                correctAnswer,
                answer1,
                answer2,
                answer3,
                answer4,
            }],
            xp

          );
          Swal.fire(
            'Done!',
            'Quizz added Successfuly!',
            'success'
          )
      }  
}
    )  
}


Video.init();
renderVideoOptions();
addQuizz()