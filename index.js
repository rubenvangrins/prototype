import './style.scss'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js';
import imageSource from './src/img/kick_cut.png';
import videoSource from './src/video/kickboxer_cut_out.webm';

let scene, camera, renderer, controls, stats, video, texture, dome, material, mesh

let canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');

canvas.width  = 2048
canvas.height = 1024

canvas.offscreenCanvas = document.createElement('canvas');
canvas.offscreenCanvas.width = 895;
canvas.offscreenCanvas.height = 457.5;

function getCanvasImage() {     
    texture = new THREE.CanvasTexture(canvas)

    let img = new Image()

    img.onload = function() {
        ctx.drawImage(img, 0, 0, 2048, 1024);
        texture.needsUpdate = true;
    }

    img.src = imageSource;

    // let video = document.createElement("video")
    // video.src = videoSource

    // video.play();

    // video.oncanplay = () => {
    //     requestAnimationFrame( animation );
    //     video.play()
    // }

    // function animation() {
    //     ctx.drawImage(video, 895, 457.5, 502, 318)
    //     texture.needsUpdate = true
    //     setTimeout( function() {
    //         requestAnimationFrame( animation );
    //     }, 1000 / 30 ); 
    // }

    // video.addEventListener("play", () => {
    //     (function loop() {
    //         if(!video.paused && !video.ended) {
    //             console.log('tet');
    //             ctx.drawImage(video, 895, 457.5, 502, 318)
    //             setTimeout(loop, 1000 / 60)
    //         }
    //     })
    // })

    return texture;
}

const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 1);

    renderer = new THREE.WebGLRenderer( {
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new THREE.OrbitControls(camera, renderer.domElement)

    // Create material
    material = new THREE.MeshBasicMaterial({
        map:getCanvasImage()
    });

    // Create cube and add to scene.
    var geometry = new THREE.SphereBufferGeometry(10, 32, 32).scale(-1, 1, 1);

    mesh = new THREE.Mesh(geometry, material);
    
    scene.add(mesh);


    stats = new Stats();
    stats.showPanel( 0 );
    document.body.appendChild( stats.dom );

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize( window.innerWidth, window.innerHeight ); 
    })
}

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
    controls.update();
}

document.addEventListener("DOMContentLoaded", () => {
    init()
    animate()
});