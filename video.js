class Video{
    constructor(videoSource, x, y, w, h) {
        this.videoSource = videoSource
        this.size = {
            w,
            h
        }
        this.position = {
            x,
            y
        };
        this.fps = 30
        this.raf = null;
    }
    createVideo() {
        this.video = document.createElement("video")
        this.video.src = this.videoSource

        this.video.play()
        this.video.mute = true
        this.video.loop = true
    }
    positionVideo() {
        ctx.drawImage(this.video, this.position.x, this.position.y, this.size.w, this.size.h)

        texture.needsUpdate = true
    }

    run() {
        setTimeout(() => {
            this.raf = window.requestAnimationFrame(this.run.bind(this))
     
            this.positionVideo()
        }, 1000 / this.fps)
    }
    

    init() {
        this.createVideo()
        this.positionVideo()
        this.run()
    }
}

export default Video