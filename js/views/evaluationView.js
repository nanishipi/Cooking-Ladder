const quizzModal = document.querySelector('#quizzModal');

const logoutBtn = document.getElementById('logoutBtn');

// Get the <span> element that closes the modal
const spanQuizz = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
logoutBtn.onclick = function() {
    quizzModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanQuizz.onclick = function() {
    quizzModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == quizzModal) {
    quizzModal.style.display = "none";
  }
}
