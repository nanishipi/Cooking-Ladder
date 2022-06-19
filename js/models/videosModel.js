let videos;


// CARREGAR CATs DA LOCALSTORAGE
export function init() {
  videos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
}

export function add(id, name,theme,durantion,photo, url, level, tag,timestamp,quizzes) {
  if (videos.some((video) => video.name === name)) {
    throw Error(`Video with name "${name}" already exists!`);
  } 
  else {
    videos.push(new Video(id,name,theme,durantion,photo, url,  level, tag, timestamp,quizzes));
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

export function editVideo(name,theme,durantion,photo,url,level,tag,timestamp,quizzes) {

    const currentVideo = getCurrentVideo()

    const VideoNew = {
        id:currentVideo.id,
        name:name,
        theme:theme,
        durantion:durantion,
        photo:photo,
        url:url,
        level:level,
        tag:tag,
        timestamp:timestamp,
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
    theme=""
    duration = null
    photo=""
    url=""
    level= null
    tag=""
    timestamp=[]
    quizzes=[]

  
    constructor(id,name,theme,duration,photo,url,level,tag,timestamp,quizzes) {
      this.id = id
      this.name = name,
      this.theme = theme,
      this.duration = duration,
      this.photo = photo,
      this.url = url,
      this.level = level,
      this.tag = tag
      this.timestamp = timestamp
      this.quizzes = quizzes

    
    }
  } 

