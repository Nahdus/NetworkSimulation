import {createCircleOutline} from "./geometry/circleOutline"
import {createRingOutline} from "./geometry/circleOutline"

const outlineNode = (coOrdinateX,coOrdinateY,radius) =>{

    const circle = createRingOutline(radius,0xFFFFFF)
    circle.position.x = coOrdinateX
    circle.position.y = coOrdinateY
    circle.userData={"componentType":"nodeOutline"}
    return circle
}


export {outlineNode}
