import * as Video from "../models/videosModel.js";
import * as Question from "../models/questionsModel.js";
import * as Quizz from "../models/quizzesModel.js";



function removeQuestion() {



  const removeBtns = document.getElementsByClassName('remove')
  for (const btn of removeBtns) {
    btn.addEventListener('click', () => {
      Question.setCurrentQuestion(btn.name,btn.id)
      const currentQuestion = Question.getCurrentQuestion()
      const quizzes = Quizz.getAllQuizzes()
      let data = []
      quizzes.filter(quizz => {
        const result = quizz.find(q => q.theme == btn.id)
        if(result != undefined)
        data.push(result)
      })

      Swal.fire({
        title: 'Are you sure?',
        text: "Question " + '"' + currentQuestion.question + '"' + " will be removed!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Removed!',
            'Video successfully removed!',
            'success'
          ).then((result) => {
            if (result) {
              Question.remove(data[0].videoID,btn.id,btn.name)
/*               location.reload();
 */            }
          })
        }
      })
    })
  }

}

function renderQuestionsTable(quizzes) {


    // Renderizar a tabela de users 
    let result = ''
    const table = document.querySelector('table')
    if (quizzes.length != 0) {
  
  
      table.innerHTML = `
    <thead class="table-dark">
                <tr>
                  <th>Video</th>
                  <th>Quizz</th>
                  <th>Question</th>
                  <th>Actions</th>
                </tr>
              </thead>
    `
      // renderizar tabela com base no array de objetos
        for(let quizz of quizzes){
            quizz.map(qz =>{
                const videos = Video.getAllVideos()
                const currentVideo = videos.find(v => v.id == qz.videoID)
                qz.questions.map(q =>{
                    result += `
                    <tr class = "">
                        <td>${currentVideo.name}</td>    
                        <td>${qz.theme}</td>
                        <td>${q.question}</td>
                        <td>
                        <button id='${qz.theme}' name="${q.question}"class="btn btn-danger remove">Remove</button>
                        </td>
                        
                      </tr>
                `
                })
            })
            
        
      }

      table.innerHTML += result

  
    }
    else {
      const div = document.querySelector('#noQuestions')
  
      result = `<p class="info">No questions!</p>`
      div.innerHTML += result
    }
  
  
  }
  
Video.init();
renderQuestionsTable(Quizz.getAllQuizzes());
removeQuestion()