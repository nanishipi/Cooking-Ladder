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
       experience:360,
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
        level: 50,
        experience:200,
        blocked: false,
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
        photo:"https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg",
        url:"https://www.youtube.com/watch?v=Xx7sxWI9FNI",
        path:"../videos/How to Cook Rice.mp4",
        level:"Easy",
        tag:"Rice",
        theme:"Rice",
        timestamp:[],
        duration:"4:33",
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
              answer4:"400ml"          
            }
        ],
           xp:200,
        }],
      likes: [],
      comments: []
      },
      {
        id:2,
        name:"How to Cook Soup",
        photo:"https://www.eatthis.com/wp-content/uploads/sites/4/2022/01/hot-and-sour-soup.jpg?quality=82&strip=all",
        url:"https://www.youtube.com/watch?v=dMrNqNcQ6qY",
        path:"../videos/Delicious_Chicken_soup__Chicken-vegetable_egg_drop_soup_for_Kids_lunch_by_tiffin_Box.mp4",
        level:"Easy",
        tag:"Soup",
        theme:"Soup",
        timestamp:[],
        duration:"4:03",
        quizzes:[{
          videoID:2,
          theme:"Soup",
          questions:[
            {
              question:"How much water you need for make soup for 2 peaple?",
              correctAnswer:"500ml",
              answer1:"100ml",
              answer2:"120ml",
              answer3:"500ml",
              answer4:"300ml"          
            },
            {
              question:"What the most important ingredient for soup?",
              correctAnswer:"water",
              answer1:"Juice",
              answer2:"Water",
              answer3:"Salt",
              answer4:"Potatos"          
            },
            {
              question:"How much time you need to make the soup?",
              correctAnswer:"15 minutes",
              answer1:"1 minute",
              answer2:"10 minutes",
              answer3:"5 minutes",
              answer4:"15 minutes"          
            }

        ],
           xp:200,
        }],
      likes: [],
      comments: []
      },
      {
        id:3,
        name:"How to Cook Pasta",
        photo:"https://www.seriouseats.com/thmb/DeOzmC_A8yHIiCLo2KCcUfedwv4=/1500x844/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__03__20200224-carretteira-pasta-vicky-wasik-21-ffe68515b25f4b348cbde845a59d6a62.jpg",
        url:"https://www.youtube.com/watch?v=OMRUIrbZDpM",
        path:"../videos/How_To_Cook_Pasta_Properly__Step_by_Step_Pasta_Cooking.mp4",
        level:"Medium",
        tag:"Pasta",
        theme:"Pasta",
        timestamp:[],
        duration:"3:34",
        quizzes:[{
          videoID:3,
          theme:"Pasta",
          questions:[
            {
              question:"How much water you need for cook 200g rice?",
              correctAnswer:"400ml",
              answer1:"100ml",
              answer2:"200ml",
              answer3:"300ml",
              answer4:"400ml"          
            }
        ],
           xp:350,
        }],
      likes: [],
      comments: []
      },
      {
        id:4,
        name:"How to Cook Fish",
        photo:"https://static.independent.co.uk/2021/11/30/11/iStock-1156413921.jpg?quality=75&width=982&height=726&auto=webp",
        url:"https://www.youtube.com/watch?v=SsSX-eJsPtw",
        path:"../videos/Gordon_Ramsays_Guide_To_Fish.mp4",
        level:"Medium",
        tag:"Fish",
        theme:"Fish",
        timestamp:[],
        duration:"10:40",
        quizzes:[{
          videoID:4,
          theme:"Fish",
          questions:[
            {
              question:"How much water you need for cook 200g rice?",
              correctAnswer:"400ml",
              answer1:"100ml",
              answer2:"200ml",
              answer3:"300ml",
              answer4:"400ml"          
            }
        ],
           xp:350,
        }],
      likes: [],
      comments: []
      },
      {
        id:5,
        name:"Gordon Ramsay's Guide to Steak",
        photo:"https://www.seriouseats.com/thmb/uGGwEqPZf7PzhES1ZCAqHLgCbG8=/1500x844/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg",
        url:"https://www.youtube.com/watch?v=uNT_AxXrUGs",
        path:"../videos/Gordon_Ramsays_Guide_To_Steak.mp4",
        level:"Hard",
        tag:"Meat",
        theme:"Meat",
        timestamp:[],
        duration:"9:13",
        quizzes:[{
          videoID:5,
          theme:"Meat",
          questions:[
            {
              question:"How much water you need for cook 200g rice?",
              correctAnswer:"400ml",
              answer1:"100ml",
              answer2:"200ml",
              answer3:"300ml",
              answer4:"400ml"          
            }
        ],
           xp:500,
        }],
      likes: [],
      comments: []
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
