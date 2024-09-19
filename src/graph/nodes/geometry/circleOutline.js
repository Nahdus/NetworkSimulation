import * as THREE from 'three';
// 0xFFFFFF
const createCircleOutline = (radius,color) =>{
    const points = []
    const geometry = new THREE.CircleGeometry(radius,64)
    geometry.scale(1.5,1.5,0)
    const positionAttribute = geometry.getAttribute('position');
    for (let i = 1; i < positionAttribute.count; i++) {
        points.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, i));
    }
    const material = new THREE.LineBasicMaterial({ color: color, linewidth:1})

    const circle = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material);
    circle.visible = false
    return circle
}


const createRingOutline =(radius,color)=>{
    const geometry = new THREE.RingGeometry( radius, 2*radius, 32 ); 
    const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geometry, material )
    mesh.visible = false
    return mesh
}

export { createCircleOutline, createRingOutline }