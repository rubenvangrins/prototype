import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import TweenMax, { TimelineMax, Expo } from "gsap/TweenMax";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 70;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;

let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2();

let geometry = new THREE.SphereBufferGeometry(10, 10, 10);
let texture = new THREE.MeshNormalMaterial({
    wireframe: true
});

geometry.name = 'animate' + ' test';

let mesh = new THREE.Mesh(geometry, texture);
mesh.position.x = -40;
scene.add(mesh);

let geometry2 = new THREE.SphereBufferGeometry(10, 10, 10);
let texture2 = new THREE.MeshNormalMaterial({
    wireframe: true
});

geometry2.name = 'animate';

let mesh2 = new THREE.Mesh(geometry2, texture2);
scene.add(mesh2);

let geometry3 = new THREE.SphereBufferGeometry(10, 10, 10);
let texture3 = new THREE.MeshNormalMaterial({
    wireframe: true
});

let mesh3 = new THREE.Mesh(geometry3, texture3);
mesh3.position.x = 40;
scene.add(mesh3);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );  
})

function onMouseEnter(event) {
    event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {

        console.log(intersects[i].object.geometry.name);

        if(intersects[i].object.geometry.name === 'animate') {
            intersects[i].object.material.wireframe = false
        }
    }
}

const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

window.addEventListener('click', onMouseEnter);

new animate();