import * as Users from "../models/usersModel.js";


document.getElementById('logoutButton').addEventListener('click',() => {

Users.logout()

})

