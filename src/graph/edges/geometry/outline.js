import * as THREE from 'three';
const createOutline=(start,end)=>{

    const distance = start.distanceTo(end)
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    const geometry = new THREE.BoxGeometry(0.05, 0.05, distance); // Width, height, length
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    const outlinemesh = new THREE.Mesh(geometry, outlineMaterial);

    //outlinemesh.scale.set(1.05, 1.05, 1.05); // Slightly larger than the main box
    outlinemesh.visible = false;

    outlinemesh.position.copy(midPoint);

    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const axis = new THREE.Vector3(0, 0, 1);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
    outlinemesh.quaternion.copy(quaternion);

    return outlinemesh
}


export {createOutline}