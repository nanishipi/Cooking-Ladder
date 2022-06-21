import * as Users from "../models/usersModel.js";
import * as Avatar from "../models/avatarsModel.js";


Avatar.init()
Users.init()
loggedUser()



function loggedUser(){

    document.getElementById('logoutButton').addEventListener('click',() => {

        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Success',
                    'Logged out successfully!',
                    'success'
                ).then((result) => {
                    if (result) {
                        Users.logout()
                        window.location.href = "/"
                    }
                })
            }
        })
        
        
        })

    const user = JSON.parse(sessionStorage.getItem('loggedUser'))
const avatars = Avatar.getAllAvatars()
    let level 
    if(user.level < 5){
        level = 1
    }
    if(user.level  >= 5 && user.level < 10){
        level = 5
    }
    if(user.level  >= 10 && user.level < 25){
        level = 10
    }
    else{
        level = 25
    }


    
    const avatar = avatars.find(avatar => avatar.level == level)
    const username = document.getElementById('username');
    user.avatarPhoto = avatar.url
    username.innerHTML = user.name

    document.getElementById('user').innerHTML = ` <img src=${user.avatarPhoto} alt="Profile Picture" id="userImg">`
    document.getElementById('user').addEventListener('click',()=>{
    location.replace('./profile.html')
    })

}



