import * as Avatar from "../models/avatarsModel.js";
import * as User from "../models/usersModel.js";


const editButtonModal = document.querySelector('#editBtnModal');
const editBtn = document.querySelector('#editBtn')

const editModal = document.querySelector('#modal');

const spanEdit = document.getElementById('closeModal');

// When the user clicks on the button, open the modal
editButtonModal.onclick = function () {
    editModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function () {
    editModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}
const user = JSON.parse(sessionStorage.getItem('loggedUser')) 


function renderUserInfo(){


    const content = document.getElementById("userInfo")

    const avatars = Avatar.getAllAvatars()
    
    const avatar = avatars.find(avatar  =>  avatar.level == user.level )
    
    user.avatarName = avatar.name
    user.avatarPhoto = avatar.url


    content.innerHTML += ` <img src=${user.avatarPhoto} alt="Profile Picture" id="profileImg">

    <form id="profileInfo">
        <div id="line2" class="col-lg-10">
            <div class="row">
                <div class="col-sm-2">
                    <div class="label-wrapper">
                        <label class="labels" for="level">Level:</label>
                    </div>
                </div>
                <div id="info-wrapper" class="col-sm-8">
                <p class="infoDisplay" id="name">${user.level} (${user.experience}xp/500xp)</p>
            </div>
                       
                      
                   
            </div>
        </div>

        <div id="line2" class="col-lg-10">
            <div class="row">
                <div class="col-sm-2">
                    <div class="label-wrapper">
                        <label class="labels" for="name">Name:</label>
                    </div>
                </div>
                <div id="info-wrapper" class="col-sm-8">
                    <p class="infoDisplay" id="name">${user.name} (${user.avatarName})</p>
                </div>
            </div>
        </div>

        <div id="line2" class="col-lg-10">
            <div class="row">
                <div class="col-sm-2">
                    <div class="label-wrapper">
                        <label class="labels" for="email">Email:</label>
                    </div>
                </div>
                <div id="info-wrapper" class="col-sm-8">
                    <p class="infoDisplay" id="email">${user.email}</p>
                </div>
            </div>
        </div>

        <div id="line2" class="col-lg-10">
            <div class="row">
                <div class="col-sm-2">
                    <div class="label-wrapper">
                        <label class="labels" for="birthdate">Birthdate:</label>
                    </div>
                </div>
                <div id="info-wrapper" class="col-sm-8">
                    <p class="infoDisplay" id="birthdate">${user.birthdate}</p>
                </div>
            </div>
        </div>

        <div id="line2" class="col-lg-10">
            <div class="row">
                <div class="col-sm-2">
                    <div class="label-wrapper">
                        <label class="labels" for="location">Location:</label>
                    </div>
                </div>
                <div id="info-wrapper" class="col-sm-8">
                    <p class="infoDisplay" id="location">${user.location}</p>
                </div>
            </div>
        </div>

        
    </form>`

}


function showModal() {

   const content = document.getElementById('content')
   content.innerHTML += ` <form id="editModal">
       <div class="form-container">
           <label class="labels" for="name">Name</label><br>
           <input class="inputs" type="text" id="name" required value=${user.name}><br><br>

           <label class="labels" for="password">Password</label><br>
           <input class="inputs" type="password" id="password" required value=${user.password}><br><br>

           <label class="labels" for="password2">Password</label><br>
           <input class="inputs" type="password" id="password2" required value=${user.password}><br><br>

           <label class="labels" for="email">Email</label><br>
           <input class="inputs" type="text" id="email"required value=${user.email}><br><br>

           <label class="labels" for="birthdate">BirthDate</label><br>
           <input class="inputs" type="date" id="birthdate" required value=${user.birthdate}><br><br>

           <label class="labels" for="location">Location</label><br>
           <input class="inputs" type="text" id="location"required value=${user.location}><br><br>

           <label class="genderLabel" for="gender">Gender</label><br>
           <div class="radio-wrapper">
               <input type="radio" class="radio" id="male" name="gender" value="male" checked>
               <label class="radio" for="male">Male</label><br>

               <input type="radio" class="radio" id="female" name="gender" value="female">
               <label class="radio" for="female">Female</label><br>

               <input type="radio" class="radio" id="other" name="gender" value="other">
               <label class="radio" for="other">Other</label><br>
           </div>
           <button type="submit" id="editBtn">Edit</button>
       </div>
   </form>
`

}


function editUser(){

    const form = document.getElementById('editModal')

    form.addEventListener('submit',(e)  => {
        e.preventDefault()
    
        const password = document.querySelector('#password').value;
        const password2 = document.querySelector('#password2').value;
        const gender = document.querySelector('input[name="gender"]:checked').value
    
        if(password === password2){
            Swal.fire(
                'Done',
                `User successfuly updated`,
                'success'
              ).then((result) => {
                if (result) {
                  location.reload()
                  User.editUser(user.id,form.name.value,password,form.email.value,form.location.value,user.avatarName,user.avatarPhoto,gender,form.birthdate.value,user.level,user.experience,user.blocked,user.quizzesCompleted)

                }
              })
        }
        else{
            Swal.fire(
                'Oops',
                `Passwords should match!`,
                'error'
              )
        }
    
    
    })
    

}


Avatar.init()
User.init()
renderUserInfo()
showModal()
editUser()