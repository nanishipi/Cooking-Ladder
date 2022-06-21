import * as Video from "../models/videosModel.js";
import * as Quizzes from "../models/quizzesModel.js";


Video.init()
Quizzes.init()

let videos = Video.getAllVideos()


export function remove(id,theme,question){
  const video = videos.find(video => video.id == id)
  console.log(id);
  const quizz = video.quizzes.find(quizz => quizz.theme == theme)
  const questionsFiltered = quizz.questions.filter(q => q.question !== question)

  
  let quizzFound
  for ( const v of videos){
    if(v.id === id){
      quizzFound = v.quizzes.find(q => q.theme === theme )
    }
  }
  quizzFound.questions = questionsFiltered
  console.log(quizzFound);

  let updated
  for (const v of videos) {
    if (v.id === id) {
    updated = v.quizzes.map(q => q.theme === theme ? quizzFound : q); 

  }
  }
  const data = videos.find(v => v.id === id)
  data.quizzes = updated
  
  videos = videos.map(v => v.id === id ? data : v)
  localStorage.setItem('videos', JSON.stringify(videos)); 



}

export function add(videoID,theme,question,correctAnswer,answer1,answer2,answer3,answer4) {
    
    
        let video =  videos.find(v => v.id == videoID)
        let quizz = video.quizzes.find(q  => q.theme == theme )
        console.log(quizz.questions);
        quizz.questions.push(new Question(question,correctAnswer,answer1,answer2,answer3,answer4))     
        localStorage.setItem("videos", JSON.stringify(videos));
       
      }
 

export function edit(id,theme,question,correctAnswer,answer1,answer2,answer3,answer4) {

        const QuestionNew = {
          question:question,
          correctAnswer:correctAnswer,
          answer1:answer1,
          answer2:answer2,
          answer2:answer3,
          answer2:answer4,

      
        }
        let updated
        for (const v of videos) {
          if (v.id === id) {
          updated = v.quizzes.map(q => q.theme === theme ? QuestionNew : q); 
      
        }
        }
        const data = videos.find(v => v.id === id)
        data.quizzes = updated
        
        videos = videos.map(v => v.id === id ? data : v)
        localStorage.setItem('videos', JSON.stringify(videos)); 
      
      }
















 export function getAllQuestions(){

    const quizzes = videos.map(video => video.quizzes)
    const questions = quizzes[0].map(quizz => quizz.questions )
    console.log(questions);

    return questions

};

export function setCurrentQuestion(question, quizzTheme) {
  localStorage.setItem("question", question);
  localStorage.setItem("quizzTheme", quizzTheme);

}

export function getCurrentQuestion() {

  const quizzes = Quizzes.getAllQuizzes()
  let quizzTheme = String(localStorage.getItem('quizzTheme'))
  let question = String(localStorage.getItem('question'))
  let quizz = []

  for (let i = 0; i < quizzes.length; i++) {
    const data = quizzes[i].find(q => q.theme == quizzTheme)
    if (data != undefined) {
      quizz.push(data)
    }

  }
  const questionFound = quizz[0].questions.find(q => q.question == question)
  return questionFound;
}


class Question {
    question=""
    correctAnswer=""
    answer1=""
    answer2=""
    answer3=""
    answer4=""

  
    constructor(question,correctAnswer,answer1,answer2,answer3,answer4) {
      this.question = question,
      this.correctAnswer = correctAnswer,
      this.answer1 = answer1,
      this.answer2 = answer2,
      this.answer3 = answer3,
      this.answer4 = answer4

  } 

}