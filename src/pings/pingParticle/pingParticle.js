import {createCircle} from "./geometry/circle"

const pingParticle = (coOrdinateX,coOrdinateY,radius,color) =>{

    const circle = createCircle(radius,color)
    circle.position.x = coOrdinateX
    circle.position.y = coOrdinateY
    // circle.userData={"componentType":"ping"}
    return circle
}

export {pingParticle}