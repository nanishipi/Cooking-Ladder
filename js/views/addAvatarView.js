import * as Avatar from "../models/avatarsModel.js";


function addAvatar() {

  document.querySelector("#addAvatar").addEventListener("submit", (event) => {
    event.preventDefault();
    
      Avatar.add(
        document.querySelector("#level").value,
        document.querySelector("#avatar").value,
        document.querySelector("#image").value,
      
      )
  });

}

Avatar.init();
addAvatar();