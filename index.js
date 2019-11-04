import './style.scss'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'
import beerze from './src/img/beerze.jpg'
import jasper from './src/video/jasper_ivo.mp4'
import dj from './src/video/dj.mp4'
import borrelTafelSmall from './src/video/borrel_tafel_small.mp4'
import borrelTafelBig from './src/video/borrel_tafel_big.mp4'


let scene, camera, renderer, controls, stats, material, 
    geometry, mesh, canvas, ctx, texture,
    textureCanvas, sceneImage

canvas = document.createElement('canvas')
ctx = canvas.getContext('2d')

canvas.width  = 3840
canvas.height = 2160

const getCanvasImage = () => {
    texture = new THREE.CanvasTexture(canvas)

    const outerImage = new panoramicImage(beerze)
    outerImage.init()

    const video1 = new Video(jasper, 2077, 1027, 174, 200)
    const video2 = new Video(dj, 3274, 947.5, 170, 300)
    const video3 = new Video(borrelTafelSmall, 3489, 984.4, 408, 900) 
    const video4 = new Video(borrelTafelBig, 0, 984.4, 946, 900) 

    video1.init()
    video2.init()
    video3.init()
    video4.init()

    return texture
}

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 10)
    camera.position.set(0, 0, .1)
    
    renderer = new THREE.WebGLRenderer({})

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
    document.body.appendChild(stats.dom)

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