initdata();


// Injeta dados na localStorage, se não existirem
function initdata() {
  // Users
  if (!localStorage.users) {
    const users = [
      {
       id:1,
       name:"Jia",
       password:"dasinijj",
       email:"jia@gmail.com",
       location:"Porto", 
       gender:"Male",
       birthday: "03-03-2008",
       level: 1,
       experience:0,
       blocked: false,
       quizzesCompleted:[]

        
      }, 
      {
        id:2,
        name:"João",
        password:"dasinijj",
        email:"joao@gmail.com",
        location:"Porto", 
        gender:"Male",
        birthday: "03-03-2008",
        level: 1,
        experience:0,
        blocked: true,
        quizzesCompleted:[]        
       }, 
      

    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

 
}
