import './style.scss'
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js'

/* Sources */
import imageSource from './src/img/beerze.png';
import videoSource from './src/video/beerze.webm';
import musicSource from './src/mp3/music.mp3';
import borrelSource from './src/mp3/borreltafel.mp3';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 0, 2);

// sound listener
var listener = new THREE.AudioListener();
camera.add(listener);

let renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = .8;

let video = document.createElement('video');
video.crossOrigin = 'anonymous';
video.width = 640;
video.height = 360;
video.loop = true;
video.muted = true;
video.src =  videoSource;
video.setAttribute('webkit-playsinline', 'webkit-playsinline');
video.play();

let geometry = new THREE.SphereBufferGeometry( 50, 32, 32 ).scale(-1, 1, 1);
let geometryAudio = new THREE.BoxBufferGeometry(1,1,1);

let videoSrc = new THREE.MeshBasicMaterial( {
    map: new THREE.VideoTexture(video)
});

let texture = new THREE.TextureLoader().load( imageSource );

texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

let imageSrc = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
});

let audioSrc = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

let geometrySrc = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})

let videoMesh = new THREE.Mesh( geometry, videoSrc );
let imageMesh = new THREE.Mesh( geometry, imageSrc );
let muziekMesh = new THREE.Mesh( geometryAudio, audioSrc);
let borrelMesh = new THREE.Mesh( geometryAudio, audioSrc);
let sphereMesh = new THREE.Mesh( geometry, geometrySrc);

muziekMesh.position.z = -35;
muziekMesh.position.x = 35;

borrelMesh.position.y = -18;
borrelMesh.position.x = 42;
borrelMesh.position.z = 17;

let group = new THREE.Group();
group.add( sphereMesh );
group.add( videoMesh );
group.add( imageMesh );
group.add( muziekMesh );
group.add( borrelMesh );

scene.add( group );

let audioLoader = new THREE.AudioLoader();

let sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( musicSource, function ( buffer ) {
    sound1.setBuffer( buffer );
    sound1.setRolloffFactor(2);
    sound1.setLoop(true)
} );

muziekMesh.add( sound1 );

console.log(sound1.getRefDistance());

let sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( borrelSource, function ( buffer ) {
    sound2.setBuffer( buffer );
    sound2.setRefDistance(10);
} );

borrelMesh.add( sound2 );

let button = document.querySelector('#button')

button.addEventListener('click', () => {
    sound1.play()
})

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );  
})

let stats = new Stats()
document.body.appendChild(stats.dom)

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();

    stats.update()
};

new animate();