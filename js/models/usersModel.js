let users;

// CARREGAR CATs DA LOCALSTORAGE
export function init() {
    users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

export function getAllUsers() {
    return users
};

export function removeUser(id) {
    users = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
}

export function addUser(id, name, password, email, location, avatarName, avatarPhoto, gender, birthdate, level, experience, blocked, quizzesCompleted) {
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
                window.location.href = "/"
                users.push(new User(id, name, password, email, location, avatarName, avatarPhoto, gender, birthdate, level, experience, blocked, quizzesCompleted));
                localStorage.setItem("users", JSON.stringify(users));
            }
        })



    }
}


export function editUser(id, name, password, email, location, avatarName, avatarPhoto, gender, birthdate, level, experience, blocked, quizzesCompleted) {


    const UserNew = {
        id: id,
        name: name,
        password: password,
        email: email,
        location: location,
        avatarName: avatarName,
        avatarPhoto: avatarPhoto,
        gender: gender,
        birthdate: birthdate,
        level: level,
        experience: experience,
        blocked: blocked,
        quizzesCompleted: quizzesCompleted
    }
    console.log(users);

    users = users.map(user => user.id == id ? UserNew : user)
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('loggedUser', JSON.stringify(UserNew))

}

export function login(email, password) {
    const user = users.find(
        (user) => user.email === email && user.password === password
    );


    if (user && user.blocked == false) {
        Swal.fire(
            'Login Success!',
            `Welcome ${user.name}`,
            'success'
        ).then((result) => {
            if (result) {
                window.location.href = "../html/videos.html"

            }
        })
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
        return true;
    }
    else if(email == "admin@gmail.com" && password == "admin"){
      Swal.fire(
        'Login Success!',
        `Welcome Admin`,
        'success'
      ).then((result) => {
        if (result) {
          window.location.href="../html/admin.html"
          sessionStorage.setItem("loggedUser", JSON.stringify("admin"));
        }
      })
    }
    else if(user && user.blocked == true){
        Swal.fire(
            'Oops!',
            'Your account was blocked!',
            'error'
        )
    }
    else {
        Swal.fire(
            'Invalid Login!',
            'Try Again',
            'error'
        )
    }
}

export function logout() {
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
                    sessionStorage.removeItem("loggedUser");
                    window.location.href = "/"
                }
            })
        }
    })
}


export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;
}

export function getUserLogged() {
    return JSON.parse(sessionStorage.getItem("loggedUser"));
}

export function setCurrentUser(id) {
    localStorage.setItem("user", id);
}

export function getCurrentUser() {
    return users.find((user) => user.id === +localStorage.getItem("user"));
}


class User {
    id =
        name = ""
    password = ""
    email = ""
    location = ""
    avatarName = ""
    avatarPhoto = ""
    gender = ""
    birthday = ""
    level = 1
    experience = 0
    blocked = false
    quizzesCompleted = []

    constructor(id, name, password, email, location, avatarName, avatarPhoto, gender, birthday, level = 1, experience = 0, blocked = false, quizzesCompleted = []) {
        this.id = id,
            this.name = name,
            this.password = password,
            this.email = email,
            this.location = location,
            this.avatarName = avatarName,
            this.avatarPhoto = avatarPhoto,
            this.gender = gender,
            this.birthday = birthday,
            this.level = level,
            this.experience = experience,
            this.blocked = blocked,
            this.quizzesCompleted = quizzesCompleted
    }
}

