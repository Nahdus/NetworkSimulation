import * as THREE from 'three';
import {pingParticleEntity} from "./pingParticleEntity"


const pingParticleMovement = ([startPosX, startPosY],[endPosX,endPosY])=>{
    let currentX = startPosX
    let currentY = startPosY
    let _pingParticle = pingParticleEntity(startPosX,startPosY)
    let speed = 0.5
    let reached = false

    





    const fOf_y =(currentPosX) =>{

        return ((startPosY - endPosY)/(startPosX - endPosX))*(currentPosX - endPosX) + endPosY
    }

    const fOf_x =(currentPosY)=>{
        return ((startPosX-endPosX)/(startPosY-endPosY))*(currentPosY-endPosY) + endPosX
    }

    const update = (delta)=>{
        let theta = Math.atan((endPosY-startPosY)/(endPosX - startPosX))
        // let distance = new THREE.Vector2(startPosX,startPosY).distanceTo(new THREE.Vector2(endPosX,endPosY))
        if(Math.abs(endPosX - startPosX)<0.5){
            theta = Math.atan((endPosX - startPosX)/(endPosY-startPosY))
            if(currentY<endPosY){
                currentY = currentY + speed*delta*Math.cos(theta)
            }
            if(currentY>endPosY){
                currentY = currentY - speed*delta*Math.cos(theta)
            }
            currentX = fOf_x(currentY)
            if (Math.abs(endPosX-currentX)<0.01 && Math.abs(endPosY-currentY)<0.01){
                reached = true
                return
            }
            _pingParticle.setPosition([currentX,currentY])
        }else{

            if(currentX<endPosX){
                currentX = currentX + speed*delta*Math.cos(theta)
            }
            if(currentX>endPosX){
                currentX = currentX - speed*delta*Math.cos(theta)
            }
            currentY = fOf_y(currentX)
            if (Math.abs(endPosX-currentX)<0.01 && Math.abs(endPosY-currentY)<0.01){
                reached = true
                return
            }
            _pingParticle.setPosition([currentX,currentY])
        }
    }

    const getMesh =()=>{
        return _pingParticle.getMesh()
    }

    const hasEeached = ()=>{
        return reached
    }

    const resetReach=()=>{
        reached = false
    }

    return {
        update,
        getMesh,
        hasEeached,
        resetReach
    }

}

export {pingParticleMovement}

