import {createCircleOutline} from "./geometry/circleOutline"
import {createRingOutline} from "./geometry/circleOutline"

const selectOutlineNode = (coOrdinateX,coOrdinateY,radius) =>{

    const circle = createRingOutline(radius,0x0000FF)
    circle.position.x = coOrdinateX
    circle.position.y = coOrdinateY
    circle.userData={"componentType":"nodeSelectOutline"}
    return circle
}


export {selectOutlineNode}
