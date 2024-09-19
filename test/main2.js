import * as THREE from 'three';


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube (button)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Raycaster setup for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to detect clicks
function onMouseClick(event) {
    
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  console.log(mouse)
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects)
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    clickedObject.material.color.set(0xff0000); // Change color on click
    alert("Cube clicked!");
  }
}

// Event listener for clicks
window.addEventListener('click', onMouseClick);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

