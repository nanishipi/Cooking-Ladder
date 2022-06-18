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

export function addUser(id,name, password, email, location, gender, birthdate, level, experience, blocked, quizzesCompleted) {
    if (users.some((user) => user.email === email)) {
        throw Error(`Theres already an user with the email "${email}"!`);
    }
    else {
        console.log(email);
        users.push(new User(id,name, password, email, location, gender, birthdate, level, experience, blocked, quizzesCompleted));
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users);
    }
}


export function editUser(name, password, email, location, gender, birthdate, level, experience, blocked, quizzesCompleted) {

    const currentUser = getCurrentUser()

    const UserNew = {
        id: currentUser.id,
        name: name,
        password: password,
        email: email,
        location: location,
        gender: gender,
        birthdate: birthdate,
        level: level,
        experience: experience,
        blocked: blocked,
        quizzesCompleted: quizzesCompleted
    }
    users = users.map(user => user.id == currentUser.id ? UserNew : user)
    localStorage.setItem('users', JSON.stringify(users));

}

export function login(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      return true;
    } else {
      throw Error("Invalid login!");
    }
  }
  
  export function logout() {
    sessionStorage.removeItem("loggedUser");
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
    id=
    name = ""
    password = ""
    email = ""
    location = ""
    gender = ""
    birthday = ""
    level = 1
    experience = 0
    blocked = false
    quizzesCompleted = []

    constructor(id,name, password, email, location, gender, birthday, level = 1, experience = 0, blocked = false, quizzesCompleted = []) {
        this.id = id  ,  
        this.name = name,
            this.password = password,
            this.email = email,
            this.location = location,
            this.gender = gender,
            this.birthday = birthday,
            this.level = level,
            this.experience = experience,
            this.blocked = blocked,
            this.quizzesCompleted = quizzesCompleted
    }
}

