import {EdgeEntity} from "./edgeEntity"


const networkEdge = (nodePosition1,nodePosition2,traffic=0)=>{
    const from = nodePosition1
    const to = nodePosition2
    const colorRed = "#D2222D"
    const colorAmber = "#FFBF00"
    const colorGreen = "#238823"
    const _traffic = traffic
    let edgeColor = colorGreen
    let _endpoint1
    let _endpoint2
    // console.log([from[0],from[1]])
    // console.log([to[0],to[1]])
    let edgeEntity =EdgeEntity([from[0],from[1]],[to[0],to[1]],edgeColor)
    
    const setEndPointids =(endpoint1,endpoint2)=>{
        _endpoint1 = endpoint1
        _endpoint2 = endpoint2
        let endpoints = {
            endPointid1:_endpoint1,
            endPointid2:_endpoint2
        }
        let userData = edgeEntity.getMesh().userData
        edgeEntity.getMesh().userData = {...userData,...endpoints}
    }
    const getEndPoints = ()=>{
        return [_endpoint1,_endpoint2]
    }
    const setTraffic=(traffic)=>{
        const _traffic = traffic
        if ((0<=100-_traffic && 100-_traffic<30) && (edgeColor!==colorRed)){
            edgeColor = colorRed
            edgeEntity = EdgeEntity([from[0],from[1]],[to[0],to[1]],edgeColor)
            setEndPointids(_endpoint1,_endpoint2)
        }
        if ((30<=100-_traffic && 100-_traffic<70) && (edgeColor!==colorAmber)){
            edgeColor = colorAmber
            edgeEntity = EdgeEntity([from[0],from[1]],[to[0],to[1]],edgeColor)
            setEndPointids(_endpoint1,_endpoint2)
        }
        if ((70<=100-_traffic  && 100-_traffic<100) && (edgeColor!==colorGreen)){
            edgeColor = colorGreen
            edgeEntity = EdgeEntity([from[0],from[1]],[to[0],to[1]],edgeColor)
            setEndPointids(_endpoint1,_endpoint2)
        }
    
    }
    setTraffic(_traffic)
    
    const getPosition = ()=>{
        return edgeEntity.getPosition()
    }
    const setPosition = (from,to)=>{
        return edgeEntity.setPosition(from,to)
    }
    const getMesh = ()=>{
        return edgeEntity.getMesh()
    }
    const getOutlineMesh = ()=>{
        return edgeEntity.getOutlineMesh()
    }

    
    return {
        entity:edgeEntity.entity,
        setEndPointids:setEndPointids,
        getEndPoints:getEndPoints,
        getPosition:getPosition,
        setPosition:setPosition,
        getMesh:getMesh,
        getOutlineMesh,
        setTraffic:setTraffic
    }

}

export {networkEdge}