import * as THREE from 'three';

const createSphere = (radius) =>{
    const geometry = new THREE.SphereGeometry(0.3,16,8)
    const material = new THREE.MeshPhongMaterial({ color: 0xffff00 })
    const sphere = new THREE.Mesh(geometry,material)
    return sphere
}

export { createSphere }