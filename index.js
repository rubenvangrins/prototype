import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 1, 0);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

let dome = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 32).scale(-1, 1, 1),
    new THREE.MeshBasicMaterial({
         wireframe: true
    })
);

scene.add(dome);

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