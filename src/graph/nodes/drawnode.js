import {createSphere} from "./geometry/sphere"
import {createCircle} from "./geometry/circle"

const sphereNode = (coOrdinateX,coOrdinateY,type)=>{
    if (typeof(type) !=="string"||type ==undefined){
        throw new Error(`please specify if node type is hub or ordinary, type of type is ${typeof(type)}` ) 
    }
    if(type!=="hub" && type!=="ordinary"){
        throw new Error(`only hub or ordinary are allowed as type, type of type is ${type}`) 
    }
    const hubRadius = 0.5
    const ordinaryRadius = 0.1
    if (type =="hub"){
        return createSphere(hubRadius)
    }
    if (type=="ordinary"){
        return createSphere(ordinaryRadius)
    }


};

const circleNode = (coOrdinateX,coOrdinateY,radius,color) =>{

    const circle = createCircle(radius,color)
    circle.position.x = coOrdinateX
    circle.position.y = coOrdinateY
    circle.userData={"componentType":"node"}
    return circle
}

export {sphereNode,circleNode}

