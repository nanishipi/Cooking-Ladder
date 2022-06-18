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

export function addUser(name, password, email, location, gender, birthdate, level, experience, blocked, quizzesCompleted) {
    if (users.some((user) => user.name === name)) {
        throw Error(`Theres already an user with the name "${name}"!`);
    }
    else {
        console.log(name);
        users.push(new User(name, password, email, location, gender, birthdate, level, experience, blocked, quizzesCompleted));
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

export function setCurrentUser(id) {
    localStorage.setItem("user", id);
}

export function getCurrentUser() {
    return users.find((user) => user.id === +localStorage.getItem("user"));
}


class User {
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

    constructor(name, password, email, location, gender, birthday, level = 1, experience = 0, blocked = false, quizzesCompleted = []) {
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

