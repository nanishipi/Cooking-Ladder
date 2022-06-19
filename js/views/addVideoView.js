import * as Video from "../models/videosModel.js";


function addVideo() {

  document.querySelector("#addVideo").addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      Video.add(
        Video.getAllVideos().length + 1,
        document.querySelector("#title").value,
        document.querySelector("#theme").value,
        document.querySelector("#photo").value,
        document.querySelector("#url").value,
        document.querySelector("#level").value,
        document.querySelector("#tag").value,
        [],
        []


      );
      Swal.fire(
        'Done!',
        'Video added Successfuly!',
        'success'
      )
    } catch (error) {
      alert(error.message);
    }
  });

}

Video.init();
addVideo();