import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

import imageSource from './src/img/kickboxer_cut0.png';
import imageSource_full from './src/img/kickboxer_full0.png';

document.addEventListener("DOMContentLoaded", () => {

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 0, 1);

    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    let dome = new THREE.Mesh(
        new THREE.SphereGeometry(49, 32, 32).scale(-1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load( imageSource_full ),     
            alphaMap: new THREE.TextureLoader().load( imageSource ),
            alphaTest: 0.1
        })
    );

    scene.add(dome);

    let videoID = document.querySelector("video");

    let video = new THREE.Mesh(
        new THREE.SphereGeometry(50, 32, 32, 0).scale(-1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: new THREE.VideoTexture(videoID)
        })
    );

    videoID.play();

    scene.add(video);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );  
    })

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera)
    };

    new animate();

});