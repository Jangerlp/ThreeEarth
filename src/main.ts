import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DemoScene} from "./scene/DemoScene";

/**
 * Initialize WebGlRenderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three")!
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

/**
 * Set the Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(1.4);

/**
 * Add controls to navigate in space
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.8;
controls.maxDistance = 90;
controls.update();

/**
 * Helper function to handle the splashscreen
 */
function onReady() {
    let splashscreen = document.getElementById("splashScreen");
    if(splashscreen) {
        setTimeout(() => {
            splashscreen!.style.opacity = "0";
        }, 500);
        setTimeout(() => {
            console.log("LMAO")
            splashscreen!.remove();
        }, 5000);
    }
}

const scene = new DemoScene(onReady);

/**
 * Handles resizing the canvas when window is getting resized
 */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


/**
 * Main "Game"-loop
 */
function animate() {
    requestAnimationFrame( animate );

    scene.animate();

    controls.update();

    renderer.render(scene, camera);
}

animate();
