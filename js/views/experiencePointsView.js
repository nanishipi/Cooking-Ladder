import * as Quizz from "../models/quizzesModel.js";
import * as Video from "../models/videosModel.js";


function setXP(){

    const xpBtns =  document.getElementsByClassName("setXP")
    for(const btn of xpBtns){
       btn.addEventListener('click',() => {

        Quizz.setCurrentQuizz(btn.name,btn.id)
        const currentQuizz = Quizz.getCurrentQuizz()
  /*         console.log(currentQuizz[0]);
 */        
        Swal.fire({
            customClass: 'swal-wide',
            title:"Set XP",
            html: `
            <div>
                <label for="xp" >Experience Points</label>
                <input type="number" id="xp" class="swal2-input" placeholder="XP" value="${currentQuizz[0].xp}" />
            </div>
      
            `,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            preConfirm: () => {
              const xp = Swal.getPopup().querySelector('#xp').value
              return { xp:xp }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Done!',
                'success',
                Quizz.setXP(currentQuizz[0].videoID,currentQuizz[0].theme,currentQuizz[0].questions,result.value.xp)
    
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




function renderTable(quizzes) {


    // Renderizar a tabela de users 
    let result = ''
    const table = document.querySelector('table')
    if (quizzes.length != 0) {


        table.innerHTML = `
  <thead class="table-dark">
              <tr>
                <th>Video</th>
                <th>Quizz</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
  `;
        // renderizar tabela com base no array de objetos

        for (let quizz of quizzes) {

            console.log(quizz);

            quizz.map(q => {
                const videos = Video.getAllVideos()
               const video = videos.find(video => video.id == q.videoID)
               console.log(video);
                result += `
                <tr class = "">
                <td>${video.name}</td>
                <td>${q.theme}</td>
                <td>${q.xp}</td>
                <td>
                <button id='${q.videoID}' name="${q.theme}"class="btn btn-success setXP">Set XP</button> 
                </td> 
                  </tr>
            `

            })


        }
        table.innerHTML += result

    }
    else {
        const div = document.querySelector('#noQuizzes')

        result = `<p class="info">Sem Quizzes!</p>`
        div.innerHTML += result
    }


}

Video.init();
renderTable(Quizz.getAllQuizzes())
setXP()