import imageSource from './src/img/kickboxer_cut.png'
import videoSource from './src/video/kickboxer_cut_out.webm'

let canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d')

canvas.width  = 4096
canvas.height = 2048

document.body.appendChild(canvas)

let img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}

img.src = imageSource;

let video = document.createElement("video")
video.src = videoSource

video.oncanplay = () => {
    requestAnimationFrame(animation)
    video.play()
    video.loop = true
}

function animation() {
    ctx.drawImage(video, 1801, 925)
    requestAnimationFrame(animation)
}


