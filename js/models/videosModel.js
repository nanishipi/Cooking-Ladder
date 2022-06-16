let videos;


// CARREGAR CATs DA LOCALSTORAGE
export function init() {
  videos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
}

export function add(id, name, url, level, tag,quizzes) {
  if (videos.some((video) => video.name === name)) {
    throw Error(`Video with name "${name}" already exists!`);
  } 
  else {
    videos.push(new Video(id,name, url,  level, tag,quizzes));
    localStorage.setItem("videos", JSON.stringify(videos));
  }
}

export function getAllVideos(){

    return videos

};

export function removeVideo(id) {
    videos = videos.filter((video) => video.id !== id);
    localStorage.setItem("videos", JSON.stringify(videos));
  }

export function editVideo(name,url,level,tag,quizzes) {

    const currentVideo = getCurrentVideo()

    const VideoNew = {
        id:currentVideo.id,
        name:name,
        url:url,
        level:level,
        tag:tag,
        quizzes: quizzes
        
    }
    videos = videos.map(video=>video.id == currentVideo.id ? VideoNew:video)
    localStorage.setItem('videos', JSON.stringify(videos));

}

export function setCurrentVideo(id) {
    localStorage.setItem("video", id);
  }

export function getCurrentVideo() {
    return videos.find((video) => video.id === +localStorage.getItem("video"));
  }


class Video {
    id = null
    name=""
    url=""
    level= null
    tag=""
    quizzes=[]

  
    constructor(id,name,url,level,tag,quizzes) {
      this.id = id
      this.name = name,
      this.url = url,
      this.level = level,
      this.tag = tag
      this.quizzes = quizzes
    
    }
  } 

