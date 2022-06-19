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
       avatarName:"",
       avatarPhoto:"", 
       gender:"male",
       birthday: "2008-03-03",
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
        avatarName:"",
        avatarPhoto:"", 
        gender:"male",
        birthday: "2008-03-03",
        level: 1,
        experience:0,
        blocked: true,
        quizzesCompleted:[]        
       }, 
      

    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  if(!localStorage.videos){
    const videos = [
      {
        id:1,
        name:"How to Cook Rice",
        photo:"https://nofilmschool.com/sites/default/files/styles/facebook/public/youtube_courtesy.png?itok=NYDuDmxD",
        url:"https://www.youtube.com/watch?v=Xx7sxWI9FNI",
        level:"Easy",
        tag:"Others",
        quizzes:[{
          videoID:1,
          theme:"Rice",
          questions:[
            {
              question:"How much water you need for cook 200g rice?",
              correct_answer:"400ml",
              answer1:"100ml",
              answer2:"200ml",
              answer3:"300ml",
              answer4:"400ml",          
            }
        ],
           xp:0,
        }]

      }
    ]
    
  localStorage.setItem("videos", JSON.stringify(videos));
  }

}
