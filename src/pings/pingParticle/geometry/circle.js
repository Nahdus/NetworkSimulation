import * as THREE from 'three';

const createCircle = (radius,color) =>{
    const geometry = new THREE.CircleGeometry(radius,64)
    const material = new THREE.MeshBasicMaterial({ color: color })
    const sphere = new THREE.Mesh(geometry,material)
    sphere.renderOrder = 999
    return sphere
}

export { createCircle }