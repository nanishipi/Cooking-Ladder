import * as User from "../models/usersModel.js";

function removeUser() {

  const removeBtns = document.getElementsByClassName('remove')
  for (const btn of removeBtns) {
    btn.addEventListener('click', () => {
      User.setCurrentUser(btn.id)
      const currentUser = User.getCurrentUser()

      Swal.fire({
        title: 'Are you sure?',
        text: "User " + '"' + currentUser.name + '"' + " will be removed!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Removed!',
            'User successfully removed!',
            'success'
          ).then((result) => {
            if (result) {
              User.removeUser(currentUser.id)
              location.reload();
            }
          })
        }
      })
    })
  }

}

function blockUser() {
  const blockBtns = document.getElementsByClassName('block')
  for (const btn of blockBtns) {
    btn.addEventListener('click', () => {
      User.setCurrentUser(btn.id)
      const currentUser = User.getCurrentUser()
      Swal.fire({
        title: 'Are you sure?',
        text: "User " + '"' + currentUser.name + '"' + " will be blocked!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Blocked!',
            'User successfully blocked!',
            'success'
          ).then((result) => {
            if (result) {
              User.editUser(currentUser.id, currentUser.name, currentUser.password, currentUser.email, currentUser.location, currentUser.avatarName, currentUser.avatarPhoto, currentUser.gender, currentUser.birthday, currentUser.level, currentUser.experience, true, currentUser.quizzesCompleted)
              location.reload();
            }
          })
        }
      })

    })
  }
}

function unlockUser() {
  const unlockBtns = document.getElementsByClassName('unlock')
  for (const btn of unlockBtns) {
    btn.addEventListener('click', () => {
      User.setCurrentUser(btn.id)
      const currentUser = User.getCurrentUser()
      Swal.fire({
        title: 'Are you sure?',
        text: "User " + currentUser.name + " will be unlocked!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Unlocked!',
            'User successfully unlocked!',
            'success'
          ).then((result) => {
            if (result) {
              User.editUser(currentUser.id, currentUser.name, currentUser.password, currentUser.email, currentUser.location, currentUser.avatarName, currentUser.avatarPhoto, currentUser.gender, currentUser.birthday, currentUser.level, currentUser.experience, false, currentUser.quizzesCompleted)
              location.reload();

            }
          })
        }
      })

    })
  }
}

function renderUsersTable(users) {


  // Renderizar a tabela de users 
  let result = ''
  const table = document.querySelector('table')
  if (users.length != 0) {


    table.innerHTML = `
  <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
  `;
    // renderizar tabela com base no array de objetos

    for (let user of users) {
      let button = ''
      if (user.blocked == false) {
        button = `<button id='${user.id}' class="btn btn-warning block">Block</button>`
      }
      else {
        button = ` <button id='${user.id}' class="btn btn-warning unlock">Unlock</button>`
      }

      result += `
              <tr class = "">
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>    
                  ${button}
                  <button id='${user.id}' class="btn btn-danger remove">Remove</button>
                  </td> 
                </tr>
          `
    }
    table.innerHTML += result

  }
  else {
    const div = document.querySelector('#noUsers')

    result = `<p class="info">Sem utilizadores!</p>`
    div.innerHTML += result
  }


}


User.init();
renderUsersTable(User.getAllUsers());
blockUser();
unlockUser();
removeUser();