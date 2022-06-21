import * as Users from "../models/usersModel.js";
import * as Avatar from "../models/avatarsModel.js";


Avatar.init()
Users.init()
loggedUser()



function loggedUser(){

    document.getElementById('logoutButton').addEventListener('click',() => {

        Users.logout()
        
        })

    const user = JSON.parse(sessionStorage.getItem('loggedUser'))
const avatars = Avatar.getAllAvatars()
    console.log(avatars)
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


    
    console.log(level);
    const avatar = avatars.find(avatar => avatar.level == level) //Falar com o Jia Acerca Disto
    user.avatarPhoto = avatar.url

    document.getElementById('user').innerHTML = ` <img src=${user.avatarPhoto} alt="Profile Picture" id="userImg">`
    document.getElementById('user').addEventListener('click',()=>{
    location.replace('./profile.html')
    })

}



