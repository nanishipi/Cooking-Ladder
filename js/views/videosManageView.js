import * as Video from "../models/videosModel.js";


function removeVideo() {

  const removeBtns = document.getElementsByClassName('remove')
  for (const btn of removeBtns) {
    btn.addEventListener('click', () => {
      Video.setCurrentVideo(btn.id)
      const currentVideo = Video.getCurrentVideo()

      Swal.fire({
        title: 'Are you sure?',
        text: "Video " + '"' + currentVideo.name + '"' + " will be removed!",
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
              Video.removeVideo(currentVideo.id)
              location.reload();
            }
          })
        }
      })
    })
  }

}


function editVideo() {

  const editBtns = document.getElementsByClassName('edit')
  for (const btn of editBtns) {
    btn.addEventListener('click', () => {
      Video.setCurrentVideo(btn.id)
      const currentVideo = Video.getCurrentVideo()

      const levels = [{
        value: "Easy",
        label: "Easy"
      },
      {
        value: "Medium",
        label: "Medium"
      },
      {
        value: "Hard",
        label: "Hard"
      }]
      const noSelectedLevels = levels.filter(l => l.label != currentVideo.level )

      const tags = [{
        value: "Meat",
        label: "Meat"
      },
      {
        value: "Fish",
        label: "Fish"
      },
      {
        value: "Salad",
        label: "Salad"
      },
      {
        value: "Others",
        label: "Others"
      }]
      const noSelectedTags = tags.filter(t => t.label != currentVideo.tag )

    
      Swal.fire({
        customClass: 'swal-wide',
        title:"Edit Video",
        html: `
        <div>
            <label for="name" >Name</label>
            <input type="text" id="name" class="swal2-input" placeholder="Name" value="${currentVideo.name}"/>
        </div>
        <div>
            <label for="url" >Url</label>
            <input type="url" id="url" class="swal2-input" placeholder="Url" value="${currentVideo.url}">
        </div>
        <div>
            <label for="level" >Level</label>
            <select id="level"  class="swal2-input">
            <option value=${currentVideo.level}>${currentVideo.level}</option>
            ${noSelectedLevels.map(l => `<option value=${l.value}>${l.label}</option>` )} 
            </select>
        </div>
        <div>
        <label for="tag" >Tag</label>
        <select id="tag"  class="swal2-input">
        <option value=${currentVideo.tag}>${currentVideo.tag}</option>
        ${noSelectedTags.map(t => `<option value=${t.value}>${t.label}</option>` )} 
        </select>
        </div>

       
        
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        preConfirm: () => {
          const name = Swal.getPopup().querySelector('#name').value
          const url = Swal.getPopup().querySelector('#url').value
          const level = Swal.getPopup().querySelector('#level').value
          const tag = Swal.getPopup().querySelector('#tag').value


          if (!name || !url || !level) {
            Swal.showValidationMessage(`Please fill the inputs`)
          }
          return { name: name, url: url, level: level, tag:tag }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Edited!',
            'Video successfully edited!',
            'success',
            Video.editVideo(result.value.name,result.value.url,result.value.level,result.value.tag,currentVideo.quizzes)

          ).then((result) => {
            if (result) {
              location.reload();
              
            }
          })
        }
      })
    })
  }

}

function renderVideosTable(videos) {


  // Renderizar a tabela de users 
  let result = ''
  const table = document.querySelector('table')
  if (videos.length != 0) {


    table.innerHTML = `
  <thead class="table-dark">
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
  `
    // renderizar tabela com base no array de objetos

    for (let video of videos) {

      result += `
              <tr class = "">
                  <td>${video.name}</td>
                  <td>${video.level}</td>
                  <td>${video.tag}</td>
                  <td>    
                  <button id='${video.id}' class="btn btn-success edit">Edit</button>
                  <button id='${video.id}' class="btn btn-danger remove">Remove</button>
                  </td> 
                </tr>
          `
    }
    table.innerHTML += result

  }
  else {
    const div = document.querySelector('#noVideos')

    result = `<p class="info">Sem videos!</p>`
    div.innerHTML += result
  }


}


Video.init();
renderVideosTable(Video.getAllVideos());
removeVideo();
editVideo();