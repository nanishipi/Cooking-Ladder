const name = document.querySelector('#name');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const location = document.querySelector('#location');
const interessts = document.querySelector('#interests');

const editButtonModal = document.querySelector('#editBtnModal');
const editBtn = document.querySelector('#editBtn')

const editModal = document.querySelector('#editModal');

const spanEdit = document.getElementsByClassName('close')[0];
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

