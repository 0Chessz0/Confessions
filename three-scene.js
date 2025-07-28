import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.classList.add('three-canvas');
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 60);

scene.add(new THREE.AmbientLight(0xcccccc, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

const loader = new GLTFLoader();
const planets = [];

[
  { name: 'earth', x: -30 },
  { name: 'mars', x: 0 },
  { name: 'jupiter', x: 30 }
].forEach(info => {
  loader.load(`assets/models/${info.name}.glb`, gltf => {
    const mesh = gltf.scene;
    mesh.position.set(info.x, 0, 0);
    mesh.scale.setScalar(5);
    scene.add(mesh);
    planets.push(mesh);
  });
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

function animate() {
  requestAnimationFrame(animate);
  planets.forEach(p => p.rotation.y += 0.001);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
