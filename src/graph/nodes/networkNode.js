import {NodeEntity} from "./nodeEntity"


const networkNode = (x,y,type,health=100)=>{
    const colorRed = "#D2222D"
    const colorAmber = "#FFBF00"
    const colorGreen = "#238823"
    let _node_color = colorGreen
    let _x = x
    let _y = y
    let _health =health
    let _type = type
    let radius = 0.25
    if (!(["hub","ordinary"].indexOf(type)!==-1)){
        throw "type must be either hub or ordinary"
    }
    if (_type =="hub"){
        radius = 0.1
    }
    if (_type == "ordinary"){
        radius = 0.05
    }
    let node = NodeEntity(x,y,radius,_node_color)
    /**
     * 
     * @param {number} health 
     * @returns {void}
     */
    const setHealth=(health)=>{

        if(!(typeof(health)=="number")){
            throw "health must be a number"
        }
        if (!(health>=0 && health<=100)){
            throw "the health must be between zero and 100"
        }
        _health = health
        if ((0<=_health && _health<30) && (_node_color!==colorRed)){
            _node_color = colorRed
            node = NodeEntity(_x,_y,radius,colorRed)
        }
         if ((30<=_health && _health<70) && (_node_color!==colorAmber)){
            _node_color = colorAmber
            node = NodeEntity(x,y,radius,colorAmber)
        }
        if ((70<=_health  && _health<100) && (_node_color!==colorGreen)){
            _node_color = colorGreen
            node = NodeEntity(x,y,radius,colorGreen)
        }
    }

    const setType=(type)=>{
        if (!(["hub","ordinary"].indexOf(type)!==-1)){
            throw "type must be either hub or ordinary"
        }
        if (_type =="hub"){
            radius = 0.5
        }
        if (_type == "ordinary"){
            radius = 0.25
        }
        _type = type
        node = NodeEntity(x,y,radius,_node_color)
    }

    const setPosition=(x,y)=>{
        _x = x
        _y = y
        node.setPosition(x,y)
    }
    const getPosition=()=>{
        return [_x,_y]
    }

    const setUuid = (uuid)=>{
        node.getMesh().uuid = uuid
    }

    setHealth(_health)

    const getOutlineMesh = ()=>{
        return node.getOutlineMesh()
    }

    const getSelectionOutlineMesh = ()=> {
        return node.getSelectOutlineMesh()
    }


    return {
        entity:node.entity,
        setHealth,
        setType,
        setPosition,
        getMesh:node.getMesh,
        getPosition:getPosition,
        setUuid,
        getOutlineMesh,
        getSelectionOutlineMesh
    }

    
    
}

export {networkNode}