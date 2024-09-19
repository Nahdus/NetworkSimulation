import {PositionalEntity} from "./positionalEntity"





const MeshedEntity=(coOrdinateX,coOrdinateY,mesh)=>{
    //inherits positional entity
    
    if (!(typeof(coOrdinateX)=="number"&&typeof(coOrdinateY)=="number")){
        throw "coOrdinates for node entity must be numbers"
    }
   
    const positionalEntity = PositionalEntity(coOrdinateX,coOrdinateY)
    const entity = positionalEntity.entity
    entity.setProperty("mesh",mesh)
    
    const getPosition = ()=>{
        return positionalEntity.getPosition()
    }

    const setPosition = (position)=>{
        entity.getProperty("mesh").position.x = position[0]
        entity.getProperty("mesh").position.y = position[1]
        return positionalEntity.setPosition(position)
    }

    const setMesh = (mesh)=>{
        entity.setProperty("mesh",mesh)
    }

    const getMesh =()=>{
        return entity.getProperty("mesh")
    }

    return{
        entity,
        getPosition:getPosition,
        setPosition:setPosition,
        getMesh:getMesh,
        setMesh:setMesh
    }
}

export {MeshedEntity}