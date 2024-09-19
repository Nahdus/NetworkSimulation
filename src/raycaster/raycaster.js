import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.01;

export {raycaster}