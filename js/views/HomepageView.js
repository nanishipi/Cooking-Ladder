import * as Users from "../models/usersModel.js";
Users.init();

// Get the modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

const registerText = document.getElementById('registerText');
// Get the button that opens the modal
const loginButtonModal = document.getElementById('loginButtonModal');

// Get the <span> element that closes the modal
const spanLogin = document.getElementsByClassName('close')[0];
const spanRegister = document.getElementsByClassName('close')[1];

const registerModalForm = document.getElementById('registerModalForm');
const navbar = document.querySelector('.navbar-wrapper');

const logoutBtn = document.getElementById('logoutBtn');

const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

if (loggedUser) {
    navbar.innerHTML = ''

    navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg">
    <div class="logo-wrapper">
        <a class="navbar-logo-wrapper" href="../index.html">
            <img class="navbar-brand" src="../images/Cooking Ladder Logo.png" href="#">
        </a>
    </div>
    <h3><a href="../index.html">Cooking Ladder</a></h3>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarLinks" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-link" href="./html/videos.html"></i>Videos</a>
            <a class="nav-link" href="./html/evaluation.html"></i>Evaluation</a>
            <a class="nav-link" href="./html/profile.html"></i>Profile</a>
        </div>
    </div>
    <button id="logoutBtn" class="nav-item">Logout</button>
</nav>
    
    `
}

// When the user clicks on the button, open the modal
loginButtonModal.onclick = function () {
    loginModal.style.display = "block";
}

registerText.onclick = function () {
    registerModal.style.display = 'block'
    loginModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanLogin.onclick = function () {
    loginModal.style.display = "none";
}

spanRegister.onclick = function () {
    registerModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }

    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}


loginModal.addEventListener('submit',(e)  => {
        e.preventDefault()
        const email = document.querySelector('#emailLogin').value;
        const password = document.querySelector('#passwordLogin').value;
        Users.login(email,password)

})


registerModalForm.addEventListener('submit', (event) => {
    event.preventDefault();

        const users = Users.getAllUsers()
        const name = document.querySelector('#nameRegister').value;
        const password = document.querySelector('#passwordRegister').value;
        const password2 = document.querySelector('#passwordRegister2').value;
        const email = document.querySelector('#email').value;
        const birthdate = document.querySelector('#birthdate').value;
        const location = document.querySelector('#location').value;
        const gender = document.querySelector('input[name="gender"]:checked').value

        if(password === password2){
            if (users.some((user) => user.email === email)) {
                Swal.fire(
                    `User with email ${email} already exist!`,
                    'Try Again',
                    'error'
                )
            }
            else {
                Swal.fire(
                    'Done',
                    `User successfuly registed`,
                    'success'
                ).then((result) => {
                    if (result) {
                        Users.addUser(
                            Users.getAllUsers().length + 1,
                            name,
                            password,
                            email,
                            location,
                            "",
                            "",
                            gender,
                            birthdate
                        )
                        window.location.href = "/"
                      
                    }
                })
            }          
        }
        else{
            Swal.fire(
                'Oops',
                `Passwords should match!`,
                'error'
              )
        }

})

