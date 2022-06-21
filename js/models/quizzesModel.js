import * as Video from "../models/videosModel.js";

let quizzes

Video.init()
let videos = Video.getAllVideos()

export function init() {
  quizzes = localStorage.quizzes ? JSON.parse(localStorage.quizzes) : [];
}

export function add(videoID, theme, questions, xp) {


  let video = videos.find(v => v.id == videoID)
  video.quizzes.push(new Quizz(videoID, theme, questions, xp))
  localStorage.setItem("videos", JSON.stringify(videos));

}

export function getAllQuizzes() {

  const quizzes = videos.map(video => video.quizzes)

  return quizzes

};

export function setXP(videoID, theme, questions, xp) {

  const QuizzNew = {
    videoID: videoID,
    theme: theme,
    questions: questions,
    xp: xp

  }
    let quizz 
   for (const v of videos) {
     if (v.id === videoID) {
     quizz = v.quizzes.map(q => q.theme === theme ? QuizzNew : q); 

   }
   }
   const data = videos.find(v => v.id === videoID)
   data.quizzes = quizz
   videos = videos.map(v => v.id === videoID ? data : v)
   localStorage.setItem('videos', JSON.stringify(videos)); 

}

export function setCurrentQuizz(id, videoID) {
  localStorage.setItem("quizz", id);
  localStorage.setItem("videoID", videoID);

}

export function getCurrentQuizz() {

  const quizzes = getAllQuizzes()
  let quizzTheme = String(localStorage.getItem('quizz'))
  let quizzVideoID = String(localStorage.getItem('videoID'))
  let quizz = []

  for (let i = 0; i < quizzes.length; i++) {

    const data = quizzes[i].find((quizz) => quizz.theme == quizzTheme && quizz.videoID == quizzVideoID)
    if (data != undefined) {
      quizz.push(data)
    }
  }
  return quizz

}



class Quizz {
  videoID = null
  theme = ""
  questions = []
  xp = null


  constructor(videoID, theme, questions, xp) {
    this.videoID = videoID,
      this.theme = theme,
      this.questions = questions,
      this.xp = xp
  }
}

