import * as THREE from 'three';
// "#dfe3eb"
const createLine = (start, end, color) => {
    const distance = start.distanceTo(end);
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    // Create a thin plane geometry to represent the line
    const geometry = new THREE.PlaneGeometry(0.02, distance); // Width, height
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    const lineMesh = new THREE.Mesh(geometry, material);

    // Position the plane in the middle between the two points
    lineMesh.position.copy(midPoint);

    // Rotate the plane to align with the line between start and end
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const axis = new THREE.Vector3(0, 1, 0);  // Change axis since planes face different direction
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
    lineMesh.quaternion.copy(quaternion);
    lineMesh.renderOrder = 0;

    return lineMesh;
}

export { createLine };
