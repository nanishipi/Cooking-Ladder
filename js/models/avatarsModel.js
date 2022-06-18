let avatars;


// CARREGAR CATs DA LOCALSTORAGE
export function init() {
    avatars = localStorage.avatars ? JSON.parse(localStorage.avatars) : [];
}

export function add(level, name, url) {
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
                  editVideo(level,name,url)
                  location.reload();
                }
              })
            }
          })
    }
    else {
        avatars.push(new Avatar(level, name, url));
        localStorage.setItem("avatars", JSON.stringify(avatars));
    }
}

export function getAllAvatars() {

    return avatars

};


export function editVideo(level,name,url) {

    const AvatarNew = {
        level:level,
        name: name,
        url: url,

    }
    avatars = avatars.map(avatar => avatar.level == level ? AvatarNew : avatar)
    localStorage.setItem('avatars', JSON.stringify(avatars));

}


class Avatar {
    level = null
    name = ""
    url = ""



    constructor(level, name, url) {
        this.level = level,
        this.name = name,
        this.url = url
      

    }
}

