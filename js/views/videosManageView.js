import * as Video from "../models/videosModel.js";

function removeVideo(){

    const removeBtns = document.getElementsByClassName('remove')
    for(const btn of removeBtns){
        btn.addEventListener('click',()=>{
            Video.setCurrentVideo(btn.id)
            const currentVideo = Video.getCurrentVideo()
            
            Swal.fire({
                title: 'Are you sure?',
                text: "Video " + '"' +currentVideo.name + '"' + " will be removed!",
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
                  ).then((result)=>{
                      if(result){
                        Video.removeVideo(currentVideo.id)
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
  `;
        // renderizar tabela com base no array de objetos

        for (let video of videos) {
            
            result += `
              <tr class = "">
                  <td>${video.name}</td>
                  <td>${video.level}</td>
                  <td>${video.tag}</td>
                  <td>    
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