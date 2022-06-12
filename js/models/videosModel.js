let videos;

// CARREGAR CATs DA LOCALSTORAGE
export function init() {
  videos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
}

export function getAllVideos(){

    return videos

};

export function removeVideo(id) {
    videos = videos.filter((video) => video.id !== id);
    localStorage.setItem("videos", JSON.stringify(videos));
  }

export function editVideo(name,url,level,tag) {

    const currentVideo = getCurrentVideo()

    const VideoNew = {
        id:currentVideo.id,
        name:name,
        url:url,
        level:level,
        tag:tag

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
    name=""
    url=""
    level= null
    tag=""

  
    constructor(name,url,level,tag) {
      this.name = name,
      this.url = url,
      this.level = level,
      this.tag = tag
    
    }
  } 

