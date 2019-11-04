import './style.scss'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'
import imageSource from './src/img/beerze.jpg'
import jasper from './src/video/jasper_ivo.mp4'
import dj from './src/video/dj.mp4'
import borrelTafel from './src/video/borrel_tafel.mp4'


let scene, camera, renderer, controls, stats, material, 
    geometry, mesh, canvas, ctx, outerImage, texture,
    offscreenCanvas, offscreenCanvasCtx, video, video2, video3, textureCanvas

canvas = document.createElement('canvas')
ctx = canvas.getContext('2d')

canvas.width  = 3840
canvas.height = 2160

const getCanvasImage = (texture) => {
    texture = new THREE.CanvasTexture(canvas)

    outerImage = new Image()

    outerImage.onload = function() {
        ctx.drawImage(outerImage, 0, 0, this.width, this.height)
        texture.needsUpdate = true
    }

    outerImage.src = imageSource

    video = document.createElement("video")
    video.src = jasper

    video.play()
    video.mute = true
    video.loop = true
 
    video2 = document.createElement("video")
    video2.src = dj

    video2.play()
    video2.mute = true
    video2.loop = true

    video3 = document.createElement("video")
    video3.src = borrelTafel

    video3.play()
    video3.mute = true
    video3.loop = true

    const playVideo = () => {

        setTimeout( function() {
            playVideo()
        }, 1000 / 30 )

        ctx.drawImage(video, 2077, 1027, 174, 200)         
        ctx.drawImage(video2, 3274, 947.5, 170, 300) 
        ctx.drawImage(video3, 3489, 984.4, 1300, 900) 

        texture.needsUpdate = true
    }

    playVideo()

    return texture
}

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 10)
    camera.position.set(0, 0, .1)
    
    renderer = new THREE.WebGLRenderer({
        alpha: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new THREE.OrbitControls(camera, renderer.domElement)

    textureCanvas = getCanvasImage()
    textureCanvas.minFilter = THREE.LinearFilter;

    material = new THREE.MeshBasicMaterial({
        map: textureCanvas
    })

    geometry = new THREE.SphereBufferGeometry(1, 32, 32).scale(-1, 1, 1)

    mesh = new THREE.Mesh(geometry, material)
    
    scene.add(mesh)

    stats = new Stats()
    document.body.appendChild( stats.dom )

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight) 
    })
}

const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
	stats.update()
}

document.addEventListener("DOMContentLoaded", () => {
    init()
    animate()
})