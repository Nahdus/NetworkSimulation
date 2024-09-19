import {MeshedEntity} from "../entity/meshedEntity"
import {drawPingParticle} from "./drawPing"

const pingParticleEntity = (cordx,cordy) =>{
    let mesh = drawPingParticle(cordx,cordy)
    let particleMesh = MeshedEntity(cordx,cordy,mesh)
    const getMesh=()=>{
        return mesh
    }
    let setPosition = (pos)=>{
        particleMesh.setPosition(pos)
    }

    return {
        getMesh,
        setPosition
    }
}

export {pingParticleEntity}