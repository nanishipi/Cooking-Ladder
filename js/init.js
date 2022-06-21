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
       birthdate: "2008-03-03",
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
        birthdate: "2008-03-03",
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
        path:"../videos/KDA_-_VILLAIN_ft_Madison_Beer_and_Kim_Petras_Official_ConceptVideo-_Starring_Evelynn - 10Convert.com.mp4.mp4",
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
              correctAnswer:"400ml",
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
        level:10,
        name:"Veteran",
        url:"https://toppng.com/uploads/preview/o-to-image-food-chef-clip-art-11563230050s2jojm2i13.png"
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
