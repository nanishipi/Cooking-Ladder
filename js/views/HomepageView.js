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


loginModal.addEventListener('submit',()  => {

    try{
        const email = document.querySelector('#emailLogin').value;
        const password = document.querySelector('#passwordLogin').value;
        Users.login(email,password)


    }catch (error) {
        console.log(error);
    }

})


registerModalForm.addEventListener('submit', (event) => {
    try {
        const name = document.querySelector('#nameRegister').value;
        const password = document.querySelector('#passwordRegister').value;
        const email = document.querySelector('#email').value;
        const birthdate = document.querySelector('#birthdate').value;
        const location = document.querySelector('#location').value;
        const gender = document.querySelector('input[name="gender"]:checked').value

        Users.addUser(
            Users.getAllUsers().length + 1,
            name,
            password,
            email,
            location,
            gender,
            birthdate
        )
    } catch (error) {
        console.log(error);
    }


    event.preventDefault();
})

