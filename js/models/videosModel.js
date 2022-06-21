let videos;

// CARREGAR CATs DA LOCALSTORAGE
export function init() {
    videos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
}

export function add(id, name, theme, duration, photo, url, path, level, tag, timestamp, quizzes, likes, comments) {
    if (videos.some((video) => video.name === name)) {
        throw Error(`Video with name "${name}" already exists!`);
    }
    else {
        videos.push(new Video(id, name, theme, duration, photo, url, path, level, tag, timestamp, quizzes, likes, comments));
        localStorage.setItem("videos", JSON.stringify(videos));
    }
}

export function getAllVideos() {
    return videos
};

export function removeVideo(id) {
    videos = videos.filter((video) => video.id !== id);
    localStorage.setItem("videos", JSON.stringify(videos));
}

export function editVideo(name, theme, duration, photo, url, path, level, tag, timestamp, quizzes, likes, comments) {

    const currentVideo = getCurrentVideo()

    const VideoNew = {
        id: currentVideo.id,
        name: name,
        theme: theme,
        duration: duration,
        photo: photo,
        url: url,
        path: path,
        level: level,
        tag: tag,
        timestamp: timestamp,
        quizzes: quizzes,
        likes: likes,
        comments: comments
    }
    videos = videos.map(video => video.id == currentVideo.id ? VideoNew : video)
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
    name = ""
    theme = ""
    duration = null
    photo = ""
    url = ""
    path = ""
    level = null
    tag = ""
    timestamp = []
    quizzes = []
    likes = []
    comments = []

    constructor(id, name, theme, duration, photo, url, path, level, tag, timestamp, quizzes, likes, comments) {
        this.id = id
        this.name = name,
            this.theme = theme,
            this.duration = duration,
            this.photo = photo,
            this.url = url,
            this.path = path
        this.level = level,
            this.tag = tag
        this.timestamp = timestamp
        this.quizzes = quizzes
        this.likes = likes
        this.comments = comments
    }
}