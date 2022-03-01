import * as THREE from 'three.js';
import * as TWEEN from 'tween.js';

// Creating View Camera
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;

// Initiliazing a New Scene
const scene = new THREE.Scene();
const star1_scene = new THREE.Scene();

// Lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);
const star1Light = new THREE.PointLight(0xFFFFFF, 100);
star1Light.position.set(0.5, 0.2, 10);
star1_scene.add(star1Light);


// Moon :D
const moonTexture = new THREE.TextureLoader().load('./imgs/moontexture.jpg');
const normalTexture = new THREE.TextureLoader().load('./imgs/normalmap.jpg');

const geometry = new THREE.SphereGeometry(0.2, 32, 32);
const material = new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture});
const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// Star Creations
let star_shape = new THREE.OctahedronGeometry(0.25, 0);
let star_mat = new THREE.MeshStandardMaterial({color: 0x000000});
let star_1 = new THREE.Mesh(star_shape, star_mat);
star_1.position.set(0.5, 0.2, 0);
star1_scene.add(star_1);


// Creating Renderer in the Background Canvas
const renderer = new THREE.WebGLRenderer( { canvas: document.querySelector('#background'), antialias: true } );
// const star_render = new THREE.WebGLRenderer( {canvas: document.querySelector('#about-star'), antialias: true, alpha: true})
renderer.setSize( window.innerWidth, window.innerHeight );


//Loops :D
renderer.setAnimationLoop( animation );


// Setting Background of 3D Space
const spaceTexture = new THREE.TextureLoader().load('./imgs/space3.jpg');
scene.background = spaceTexture;

// Animation Function
function animation( time ) {

	moon.rotation.x = time / 5000;
	moon.rotation.y = time / 3000;
    moon.rotation.z = time / 3500;
    star_1.rotation.x = time / 4000;
    star_1.rotation.y = time / 4000;
    star_1.rotation.y = time / 4000;
	renderer.render(scene, camera);
    // star_render.render(star1_scene, camera);
}


// Explore Button
const explore = document.querySelector('#explore');
const intro = document.querySelector('#intro-screen');
const info = document.querySelector('#info-pages');
explore.addEventListener('click', function() {
    intro.classList.remove("fade-in-visible");
    intro.classList.add("fade-out");
    createjs.Tween.get(camera.position)
    .to (
        {
            x: camera.position.x + 7,
            y: camera.position.y - 5,
            z: camera.position.z - 2,
        },
        7500
    )
    info.classList.remove("fade-out");
    info.classList.add("fade-in-visible");
});

const tothemoon = document.querySelector('#tothemoon');
tothemoon.addEventListener('click', function() {
    info.classList.remove("fade-in-visible");
    info.classList.add("fade-out");
    createjs.Tween.get(camera.position)
    .to (
        {
            x: 0,
            y: 0,
            z: 1,
        },
        5000
    )
    intro.classList.add("fade-in-visible");
})
