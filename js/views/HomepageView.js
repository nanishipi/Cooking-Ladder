// Get the modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

const registerText = document.getElementById('registerText');
// Get the button that opens the modal
const loginBtn = document.getElementById('loginButton');

// Get the <span> element that closes the modal
const spanLogin = document.getElementsByClassName('close')[0];
const spanRegister = document.getElementsByClassName('close')[1];

// When the user clicks on the button, open the modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

registerText.onclick = function() {
    registerModal.style.display = 'block'
    loginModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanLogin.onclick = function() {
    loginModal.style.display = "none";
}

spanRegister.onclick = function() {
    registerModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }

  if (event.target == registerModal) {
      registerModal.style.display = "none";
  }
}