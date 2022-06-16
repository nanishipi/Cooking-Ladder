import * as Video from "../models/videosModel.js";

Video.init()
let videos = Video.getAllVideos()


export function add(videoID,theme,question,correctAnswer,answer1,answer2,answer3,answer4) {
    
    
        let video =  videos.find(v => v.id == videoID)
        let quizz = video.quizzes.find(q  => q.theme == theme )
        console.log(quizz.questions);
        quizz.questions.push(new Question(question,correctAnswer,answer1,answer2,answer3,answer4))     
        localStorage.setItem("videos", JSON.stringify(videos));
       
      }
 
 export function getAllQuizzes(){

    const quizzes = videos.map(video => video.quizzes)

    return quizzes

};


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