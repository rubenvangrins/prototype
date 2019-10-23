import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import TweenMax, { Expo, TimelineMax } from "gsap/TweenMax";
import { Interaction } from 'three.interaction';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;

const interaction = new Interaction(renderer, scene, camera);

let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2();

/* Button create */
let texture = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .8
});

let innerCircleGeometry = new THREE.CircleGeometry(5, 100, 100);
let outerCircleGeometry = new THREE.RingGeometry( 5, 6, 100);

let innerCircle = new THREE.Mesh(innerCircleGeometry, texture);
innerCircle.name = "button";
let outerCircle = new THREE.Mesh(outerCircleGeometry, texture);
outerCircle.name = "ring";
var circleButton = new THREE.Group();
circleButton.add( innerCircle );
circleButton.add( outerCircle );

scene.add( circleButton );

// const tl = new TimelineMax();

// innerCircle.on('mouseover', ev => {
//     console.log('tst');
//     tl.to(outerCircle.scale, .5, {x: 2, y: 2, ease: Expo.easeOut})
// })

// innerCircle.on('mouseout', ev => {
//     console.log('muisje uit');
//     tl.to(outerCircle.scale, .5, {x: 1, y: 1, ease: Expo.easeOut})
// })

/* Resize Window */
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
        const objects = intersects[i].object.parent.children;
        console.log(objects);
        TweenMax.to(objects[1].scale, 1, {x:2, y:2})
    }
}

const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

window.addEventListener('click', onMouseEnter);

new animate();