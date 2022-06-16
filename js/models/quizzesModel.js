import * as Video from "../models/videosModel.js";

Video.init()
let videos = Video.getAllVideos()

export function add(videoID,theme,questions  ) {
    
    
        let video =  videos.find(v => v.id == videoID)
        video.quizzes.push(new Quizz(videoID,theme,questions))     
        localStorage.setItem("videos", JSON.stringify(videos));
        
      }
 
 export function getAllQuizzes(){

    const quizzes = videos.map(video => video.quizzes)

    return quizzes

};


class Quizz {
    videoID=null
    theme=""
    questions=[]

  
    constructor(videoID,theme,questions) {
      this.videoID = videoID,
      this.theme = theme,
      this.questions = questions
    }
  } 

