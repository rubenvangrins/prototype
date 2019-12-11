// import Library
import './style.scss'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import TweenMax from 'gsap';
import Stats from 'stats.js'

// import assets
import scene1_imageDome from './src/img/beerze.png'
import scene2_imageDome from './src/img/kickboxer_cut0.png'
import { Layers } from 'three';

import scene1_videoDome from './src/video/beerze.webm'
import scene2_videoDome from './src/video/kickboxer_underlay.webm'

let scene, camera, renderer, controls, stats, imageTexture, imageDome, videoDome, sphereButton, scene1, scene2, raycaster, mouse, imageSource, videoSource, sphere, video

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10);

    camera.layers.enable( 1 );
    camera.layers.disable( 2 )

    renderer = new THREE.WebGLRenderer( {
        antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = .8

    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    // 360 Sphere Scene 1
    video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.width = 640
    video.height = 360
    video.loop = true
    video.muted = true
    video.src =  scene1_videoDome
    video.setAttribute('webkit-playsinline', 'webkit-playsinline')
    video.play()

    sphere = new THREE.SphereBufferGeometry(50, 32, 32).scale(-1, 1, 1)

    videoSource = new THREE.MeshBasicMaterial( {
        map: new THREE.VideoTexture( video )
    })

    imageTexture = new THREE.TextureLoader().load(scene1_imageDome)

    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;

    imageSource = new THREE.MeshBasicMaterial({
        map: imageTexture,
        transparent: true
    })

    sphereButton = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshNormalMaterial({

        }),
        
    )
    sphereButton.name = "scene1_button"

    sphereButton.position.set(40, 0, -30)

    imageDome = new THREE.Mesh(sphere, imageSource)
    videoDome = new THREE.Mesh(sphere , videoSource)
    
    scene1 = new THREE.Group()
    scene1.add(imageDome)
    scene1.add(videoDome)
    scene1.add(sphereButton)
    scene1.traverse( function( child ) { child.layers.set( 1 ) } )
    scene.add(scene1)

    // 360 Sphere Scene 2
    video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.width = 640
    video.height = 360
    video.loop = true
    video.muted = true
    video.src =  scene2_videoDome
    video.setAttribute('webkit-playsinline', 'webkit-playsinline')
    video.play()

    sphere = new THREE.SphereBufferGeometry(50, 32, 32).scale(-1, 1, 1)

    videoSource = new THREE.MeshBasicMaterial( {
        map: new THREE.VideoTexture( video )
    })

    imageTexture = new THREE.TextureLoader().load(scene2_imageDome)

    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;

    imageSource = new THREE.MeshBasicMaterial({
        map: imageTexture,
        transparent: true
    })

    sphereButton = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshNormalMaterial({

        }),
        
    )

    sphereButton.name = "scene2_button"

    imageDome = new THREE.Mesh(sphere, imageSource)
    videoDome = new THREE.Mesh(sphere , videoSource)
    
    scene2 = new THREE.Group()
    scene2.add(imageDome)
    scene2.add(videoDome)
    scene2.add(sphereButton)

    sphereButton.position.set(-10, -5, -45)

    // scene2.position.x = 100

    scene2.traverse( function( child ) { child.layers.set( 2 ) } )

    scene.add(scene2)     

    // navigate to other scene
    const onMouseClick = (event) => {
        event.preventDefault();
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
    
        let changeScene = raycaster.intersectObjects(scene.children, true);
    
        for (let i = 0; i < changeScene.length; i++) {
            if(changeScene[i].object.name === 'scene1_button') {

                console.log(changeScene[i].object.position);

                let tl = new TimelineMax();
                let cameraX = changeScene[i].object.position.x
                let cameraY = changeScene[i].object.position.y
                let cameraZ = changeScene[i].object.position.z

                // camera.layers.enable( 2 )
                // camera.layers.disable( 1 )

                tl.to(controls.target, .5, {z: cameraZ, x: cameraX})
                .add( function(){ 
                    controls.reset() 
                    camera.layers.enable( 2 )
                    camera.layers.disable( 1 )
                }  )


                // .to(changeScene[i].object.parent.position, .5, {x: -100})
                // .to(changeScene[i].object.parent.parent.children[1].position, .5, {x: 0}, "-=.5")
                

            } else if(changeScene[i].object.name === 'scene2_button') {
                let tl = new TimelineMax();
                let cameraX = changeScene[i].object.position.x
                let cameraY = changeScene[i].object.position.y
                let cameraZ = changeScene[i].object.position.z

                // camera.layers.enable( 1 )
                // camera.layers.disable( 2 )

                tl.to(controls.target, .5, {z: cameraZ, x: cameraX})
                .add( function(){ 
                    controls.reset() 
                    camera.layers.enable( 1 )
                    camera.layers.disable( 2 )
                }  )
                // .to(changeScene[i].object.parent.position, .5, {x: 100})
                // .to(changeScene[i].object.parent.parent.children[0].position, .5, {x: 0}, "-=.5")
            }
        }
    };

    window.addEventListener('click', onMouseClick, false)

    stats = new Stats()
    stats.showPanel(0)
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
    stats.update();
    controls.update()
}

document.addEventListener("DOMContentLoaded", () => {
})

init()
animate()
