import './style.scss'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js';

let scene, camera, renderer, controls, stats

const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    renderer = new THREE.WebGLRenderer( {
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new THREE.OrbitControls(camera, renderer.domElement)

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
    stats.begin();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

	stats.end();
}

document.addEventListener("DOMContentLoaded", () => {
    new init()
    new animate()
});