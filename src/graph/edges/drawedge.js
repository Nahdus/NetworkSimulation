import * as THREE from 'three';
import {createLine} from "./geometry/line"


const drawEdgeBetween = (vertex1,vertex2,color)=>{
    let point1 = new THREE.Vector3(vertex1[0],vertex1[1],0)
    let point2 = new THREE.Vector3(vertex2[0],vertex2[1],0)
    const edge = createLine(point1,point2,color)
    edge.userData={"componentType":"edge"}
    return edge
}

export {drawEdgeBetween}