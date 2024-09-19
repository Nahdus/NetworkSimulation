import {Entity} from "./entity"

/**
 * 
 * @param {number} coOrdinateX 
 * @param {number} coOrdinateY 
 * @returns {{entity:import("./entity").EntityType,getPosition:function():[number,number],setPosition:function([number,number]):void}}
 */
const PositionalEntity = (coOrdinateX,coOrdinateY) =>{
    const entity = Entity()
    entity.setProperty("position",[coOrdinateX,coOrdinateY])
    /**
     * 
     * @returns {[number,number]}
     */
    const getPosition = () =>{
        return entity.getProperty("position")
    }
    /**
     * 
     * @param {[number,number]} position 
     */
    const setPosition=(position)=>{
        entity.setProperty("position",position)
    }
    return {
        entity:entity,
        getPosition:getPosition,
        setPosition:setPosition
    }
} 

export {PositionalEntity}