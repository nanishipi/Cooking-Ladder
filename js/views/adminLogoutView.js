import * as Users from "../models/usersModel.js";


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

    }