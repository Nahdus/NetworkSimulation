import * as THREE from 'three';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const canvasArea = 0.8
const renderScene = (scene, camera) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasArea*window.innerWidth, canvasArea*window.innerHeight)
    renderer.render(scene, camera)

}

export {renderScene}