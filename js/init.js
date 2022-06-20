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
       level: 10,
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
        photo:"https://cdn.discordapp.com/attachments/822430293704441866/988163789474111539/unknown.png",
        url:"https://www.youtube.com/watch?v=Xx7sxWI9FNI",
        level:"Easy",
        tag:"Others",
        theme:"Rice",
        timestamp:[],
        duration:5,
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

  if(!localStorage.avatars){
    const avatars = [
      {
       level:1,
       name:"Noob",
       url: "https://pbs.twimg.com/profile_images/3721528514/a9911346006c26738225b5b7bdbbb41c_400x400.png"
      },
      {
        level:5,
        name:"Junior",
        url:"https://png.pngtree.com/png-clipart/20210914/ourmid/pngtree-cute-young-chef-png-image_3929096.jpg"
      },
      {
        level:25,
        name:"Master",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnRq9jlDVU9hZapKOjDOfLxPeAjJJeovSOQ&usqp=CAU"
      }

    ]
    
  localStorage.setItem("avatars", JSON.stringify(avatars));
  }

}
