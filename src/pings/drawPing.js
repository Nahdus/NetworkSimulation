import {pingParticle} from "./pingParticle/pingParticle"


const drawPingParticle =(coOrdinateX,coOrdinateY)=>{
    let colorList = [0x86469C,0xBC7FCD,0xFB9AD1,0xFFCDEA]
    let colorIndex = Math.floor(Math.random()*4)
    let particleMesh = pingParticle(coOrdinateX,coOrdinateY,0.05,colorList[colorIndex])
    return particleMesh
    
}

export {drawPingParticle}