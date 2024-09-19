import * as THREE from 'three';
import { drawEdgeBetween } from "./drawedge"
import {drawOutlineBetween} from "./drawoutline"
import { MeshedEntity } from "../../entity/meshedEntity"

/**
 * 
 * @param {[number,number]} from 
 * @param {[number,number]} to 
 */
const EdgeEntity = (from,to,color)=>{
    let _color = color
    let start = new THREE.Vector2(from[0],from[1])
    let end = new THREE.Vector2(to[0],to[1])
    let midPoint = new THREE.Vector2().addVectors(start,end).multiplyScalar(0.5)
    let outlineEntity = MeshedEntity(midPoint.x,midPoint.y,drawOutlineBetween(from,to))
    
    let edgeEntity = MeshedEntity(midPoint.x,midPoint.y,drawEdgeBetween(from,to,_color))
    const setColor = (color)=>{
        _color = color
        edgeEntity = MeshedEntity(midPoint.x,midPoint.y,drawEdgeBetween(start,end,_color))
    }
    const setPosition = (from,to)=>{
        start = new THREE.Vector2(from[0],from[1])
        end = new THREE.Vector2(to[0],to[1])
        midPoint = new THREE.Vector2().addVectors(start,end).multiplyScalar(0.5)
        edgeEntity = MeshedEntity(midPoint.x,midPoint.y,drawEdgeBetween(start,end,_color))
    }

    const getPosition = () =>{
        return [midPoint.x,midPoint.y]
    }

    const makeOutlineVisible = ()=>{
        outlineEntity.getMesh().visible=true
    }

    const makeOutlineInVisible = ()=>{
        outlineEntity.getMesh().visible=false
    }
    return {
        entity:edgeEntity.entity,
        setColor:setColor,
        setPosition:setPosition,
        getPosition:getPosition,
        getMesh:edgeEntity.getMesh,
        getOutlineMesh:outlineEntity.getMesh,
        makeOutlineVisible,
        makeOutlineInVisible
    }
}

export {EdgeEntity}



