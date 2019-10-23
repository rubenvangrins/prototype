import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import TweenMax from "gsap/TweenMax";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;

let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2();

/* Button create */
let texture = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .8
});

const circleButton = new THREE.Group();

let innerCircleGeometry = new THREE.CircleGeometry(5, 100, 100);
let outerCircleGeometry = new THREE.CircleGeometry( 5, 100, 100);

let innerCircle = new THREE.Mesh(innerCircleGeometry, texture);
innerCircle.name = "button";
circleButton.add( innerCircle );

let outerCircle = new THREE.Mesh(outerCircleGeometry, texture);
circleButton.add( outerCircle );
outerCircle.position.x = 20;

scene.add( circleButton );

let hoveredObjects = {};

function onMouseEnter(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);

    // collect array of uuids of currently hovered objects
    let hoveredObjectUuids = intersects.map(el => el.object.uuid);
    
    for (let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.parent.id === 9) {

            let hoveredObj = intersects[i].object;
            
            if (hoveredObjects[hoveredObj.uuid]) {
                continue; // this object was hovered and still hovered
            }

            document.body.style.cursor = 'pointer';

            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, {
                x: 1.1,
                y: 1.1,
                z: 1.1,
                ease: Expo.easeOut
            });
            this.tl.to(intersects[i].object.material, 1, {
                opacity: 1
            }, "=-1");

            // collect hovered object
            hoveredObjects[hoveredObj.uuid] = hoveredObj;
        }

    }
    
    for (let uuid of Object.keys(hoveredObjects)) {
        let idx = hoveredObjectUuids.indexOf(uuid);
        if (idx === -1) {
            // object with given uuid was unhovered
            let unhoveredObj = hoveredObjects[uuid];
            delete hoveredObjects[uuid];

            document.body.style.cursor = 'default';

            this.tl = new TimelineMax();
            this.tl.to(unhoveredObj.scale, 1, {
            x: 1,
            y: 1,
            z: 1,
            ease: Expo.easeOut
            });
            this.tl.to(unhoveredObj.material, 1, {
                opacity: .8
            }, "=-1");        
      }
    }
}    

/* Resize Window */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );  
})

const onMouseClick = (event) => {
    event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);

    let openLink = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < openLink.length; i++) {
        if(openLink[i].object.name === 'button') {
            openLink[i].object.name = "button_clicked";

            TweenMax.to(outerCircle.scale, 1, {x:2, y:2, z:2});

            TweenMax.to(camera.position, 1, {z: 35});

        } else if(openLink[i].object.name === 'button_clicked') {
            openLink[i].object.name = "button";

            TweenMax.to(outerCircle.scale, 1, {x:1, y:1, z:1});

            TweenMax.to(camera.position, 1, {z: 40});            
        }
    }
};

window.addEventListener('mousemove', onMouseEnter, false);
window.addEventListener('click', onMouseClick);

const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

new animate();