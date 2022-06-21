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
              location.reload();
             }
          })
        }
      })
    })
  }

}


function editQuestion() {



  const editBtns = document.getElementsByClassName('edit')
  for (const btn of editBtns) {
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
        customClass: 'swal-wide',
        title:"Add Timestamp",
        html: `
        <div>
            <label for="question" >Question</label>
            <input type="text" id="question" class="swal2-input" placeholder="Question" value="${currentQuestion.question}" />
        </div>
        <div>
            <label for="correctAnswer" >Correct Answer</label>
            <input type="text" id="correctAnswer" class="swal2-input" placeholder="Correct Answer" value="${currentQuestion.correctAnswer}"/>
        </div>
        <div>
            <label for="answer1" >Answer 1</label>
            <input type="text" id="answer1" class="swal2-input" placeholder="Answer 1" value="${currentQuestion.answer1}" />
        </div>
        <div>
            <label for="answer2" >Answer 2</label>
            <input type="text" id="answer2" class="swal2-input" placeholder="Answer 2" value="${currentQuestion.answer2}" />
        </div>
        <div>
            <label for="answer3" >Answer 3</label>
            <input type="text" id="answer3" class="swal2-input" placeholder="Answer 3" value="${currentQuestion.answer3}" />
        </div>
        <div>
            <label for="answer4" >Answer 4</label>
            <input type="text" id="answer4" class="swal2-input" placeholder="Answer 4" value="${currentQuestion.answer4}" />
        </div>
    
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        preConfirm: () => {
          const question = Swal.getPopup().querySelector('#question').value
          const correctAnswer = Swal.getPopup().querySelector('#correctAnswer').value
          const answer1 = Swal.getPopup().querySelector('#answer1').value
          const answer2 = Swal.getPopup().querySelector('#answer2').value
          const answer3 = Swal.getPopup().querySelector('#answer3').value
          const answer4 = Swal.getPopup().querySelector('#answer4').value

          return { question:question, correctAnswer:correctAnswer, answer1:answer1, answer2:answer2, answer3:answer3, answer4:answer4}
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Done!',
            'Edited successfully!',
            'success',

            
            Question.edit(data[0].videoID,btn.id,result.value.question, result.value.correctAnswer,result.value.answer1,result.value.answer2,result.value.answer3,result.value.answer4)
          ).then((result) => {
            if (result) {
              location.reload()
              
            }
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
                        <button id='${qz.theme}' name="${q.question}"class="btn btn-success edit">Edit</button>
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
editQuestion()