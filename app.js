// Import the necessary Three.js modules
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";

// Setup canvas and scene
let canvasform = document.getElementById("dCanvas");
let width = canvasform.offsetWidth;
let height = canvasform.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// Mouse position tracking
let mouseX = width / 2;
let mouseY = height / 2;

// Global model variable
let object;

// OrbitControls for camera movement
let controls;
const loader = new GLTFLoader();
loader.load(
  "./genshin_impact_-_arlecchino.glb",
  function (gltf) {
    object = gltf.scene;
    object.scale.set(1, 1, 1);
    object.position.set(0, 0, 0);
    object.rotation.y = Math.PI; // Rotate the model to face the camera (adjust as needed)
    scene.add(object);
    object.traverse((child) => {
      if (child.isMesh) {
        child.geometry.center();
      }
    });
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Fetch to ensure file exists
fetch("./genshin_impact_-_arlecchino.glb")
  .then((response) => {
    if (!response.ok) throw new Error("File not found");
    console.log("File found!");
  })
  .catch((error) => console.error("Error:", error));

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000); // Set background to black
document.getElementById("dCanvas").appendChild(renderer.domElement);

// Camera positioning
camera.position.set(-50, 45, -100);

// Lights setup (dimmed)
let ambientLight = new THREE.AmbientLight(0x404040, 0.1); // Dimmed ambient light
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2); // Dimmed directional light
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

let light = new THREE.PointLight(0xc4c4c4, 1); // Dimmed point light
light.position.set(0, 300, 500);
scene.add(light);

let light2 = new THREE.PointLight(0xc4c4c4, 1); // Dimmed second point light
light2.position.set(500, 100, 0);
scene.add(light2);

let light3 = new THREE.PointLight(0xc4c4c4, 1); // Dimmed third point light
light3.position.set(0, 100, -500);
scene.add(light3);

let light4 = new THREE.PointLight(0xc4c4c4, 1); // Dimmed fourth point light
light4.position.set(-500, 300, 500);
scene.add(light4);

// OrbitControls for camera rotation/zoom
controls = new OrbitControls(camera, renderer.domElement);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();

// Adjust for window resize
window.addEventListener("resize", function () {
  width = canvasform.offsetWidth;
  height = canvasform.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
