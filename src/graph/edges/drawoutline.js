import * as THREE from 'three';
import {createOutline} from "./geometry/outline"


const drawOutlineBetween = (vertex1,vertex2)=>{
    let point1 = new THREE.Vector3(vertex1[0],vertex1[1],0)
    let point2 = new THREE.Vector3(vertex2[0],vertex2[1],0)
    const outline = createOutline(point1,point2)
    outline.userData={"componentType":"edgeOutline"}
    return outline
}

export {drawOutlineBetween}