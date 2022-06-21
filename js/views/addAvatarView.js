import * as Avatar from "../models/avatarsModel.js";


function addAvatar() {

  document.querySelector("#addAvatar").addEventListener("submit", (event) => {
    event.preventDefault();

    const level = document.querySelector("#level").value
    const name = document.querySelector("#avatar").value
    const url = document.querySelector("#image").value

    const avatars = Avatar.getAllAvatars()

    if (avatars.some((avatar) => avatar.level === level)) {
      Swal.fire({
        title: 'Avatar already exsit!',
        text: "Do you want replace it?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Replaced!',
            'Avatar successfully replaced!',
            'success'
          ).then((result) => {
            if (result) {
              Avatar.editVideo(level, name, url)
              location.reload();
            }
          })
        }
      })
    }
    else {
      Avatar.add(level, name, url)
    }

  });

}

Avatar.init();
addAvatar();