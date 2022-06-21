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

function addTimestamp() {

  const btns = document.getElementsByClassName('timestamp')
  for (const btn of btns) {
    btn.addEventListener('click', () => {
      Video.setCurrentVideo(btn.id)
      const currentVideo = Video.getCurrentVideo()

      Swal.fire({
        customClass: 'swal-wide',
        title:"Add Timestamp",
        html: `
        <div>
            <label for="title" >Title</label>
            <input type="text" id="title" class="swal2-input" placeholder="Title" />
        </div>
        <div>
            <label for="time" >Time</label>
            <input type="number" id="time" class="swal2-input" placeholder="Time in seconds" />
        </div>
    
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          const time = Swal.getPopup().querySelector('#time').value
    
          return { title:title, time:time}
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Done!',
            'Added successfully!',
            'success',

            currentVideo.timestamp.push({
              title: result.value.title,
              time: result.value.time
            }),
            Video.editVideo(currentVideo.name,currentVideo.theme,currentVideo.duration,currentVideo.photo,currentVideo.url,currentVideo.path,currentVideo.level,currentVideo.tag,currentVideo.timestamp,currentVideo.quizzes)

          ).then((result) => {
            if (result) {
              location.reload()
              
            }
          })
        }
      })

    }
    )
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
      const noSelectedLevels = levels.filter(l => l.label != currentVideo.level)

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
      const noSelectedTags = tags.filter(t => t.label != currentVideo.tag)


      Swal.fire({
        customClass: 'swal-wide',
        title: "Edit Video",
        html: `
        <div>
            <label for="name" >Name</label>
            <input type="text" id="name" class="swal2-input" placeholder="Name" value="${currentVideo.name}"/>
        </div>
        <div>
            <label for="theme" >Theme</label>
            <input type="text" id="theme" class="swal2-input" placeholder="Theme" value="${currentVideo.theme}"/>
        </div>
        <div>
        <label for="duration" >Duration</label>
        <input type="number" id="duration" class="swal2-input" placeholder="Duration" value="${currentVideo.duration}"/>
    </div>
        <div>
        <label for="photo" >Photo</label>
        <input type="url" id="photo" class="swal2-input" placeholder="Photo" value="${currentVideo.photo}"/>
    </div>
        <div>
            <label for="url" >Url</label>
            <input type="url" id="url" class="swal2-input" placeholder="Url" value="${currentVideo.url}">
        </div>
        <div>
            <label for="path" >Path</label>
            <input type="text" id="path" class="swal2-input" placeholder="Path" value="${currentVideo.path}">
        </div>
        <div>
            <label for="level" >Level</label>
            <select id="level"  class="swal2-input">
            <option value=${currentVideo.level}>${currentVideo.level}</option>
            ${noSelectedLevels.map(l => `<option value=${l.value}>${l.label}</option>`)} 
            </select>
        </div>
        <div>
        <label for="tag" >Tag</label>
        <select id="tag"  class="swal2-input">
        <option value=${currentVideo.tag}>${currentVideo.tag}</option>
        ${noSelectedTags.map(t => `<option value=${t.value}>${t.label}</option>`)} 
        </select>
        </div>

       
        
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        preConfirm: () => {
          const name = Swal.getPopup().querySelector('#name').value
          const theme = Swal.getPopup().querySelector('#theme').value
          const duration = Swal.getPopup().querySelector('#duration').value
          const photo = Swal.getPopup().querySelector('#photo').value
          const url = Swal.getPopup().querySelector('#url').value
          const path = Swal.getPopup().querySelector('#path').value
          const level = Swal.getPopup().querySelector('#level').value
          const tag = Swal.getPopup().querySelector('#tag').value


          if (!name || !theme || !url || !level || !tag) {
            Swal.showValidationMessage(`Please fill the inputs`)
          }
          return { name: name, theme: theme, duration: duration, photo: photo, url: url, path:path, level: level, tag: tag }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Edited!',
            'Video successfully edited!',
            'success',
            Video.editVideo(result.value.name, result.value.theme, Number(result.value.duration) , result.value.photo, result.value.url,result.value.path, result.value.level, result.value.tag,currentVideo.timestamp, currentVideo.quizzes)

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
                  <button id='${video.id}' class="btn btn-warning timestamp">Timestamp</button>
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
addTimestamp()