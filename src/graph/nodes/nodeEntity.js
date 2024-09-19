
import {circleNode} from "./drawnode"
import {outlineNode} from "./drawNodeOutline"
import {selectOutlineNode} from "./drawNodeSelectOutline"
import {MeshedEntity} from "../../entity/meshedEntity"



const NodeEntity = (coOrdinateX,coOrdinateY,radius,color)=>{
    
    
    let _color = color
    let _coOrdinateX = coOrdinateX
    let _coOrdinateY = coOrdinateY
    let _radius = radius
    let nodeentity = MeshedEntity(_coOrdinateX,_coOrdinateY,circleNode(_coOrdinateX,_coOrdinateY,_radius,_color))
    let outlineentity = MeshedEntity(_coOrdinateX,_coOrdinateY,outlineNode(_coOrdinateX,_coOrdinateY,_radius))
    let _selectOutlineNode = MeshedEntity(_coOrdinateX,_coOrdinateY,selectOutlineNode(_coOrdinateX,_coOrdinateY,_radius))
    
    const setColor = (color)=>{
        _color = color
        nodeentity = MeshedEntity(_coOrdinateX,_coOrdinateY,circleNode(_coOrdinateX,_coOrdinateY,_radius,_color))
        
        
    }

    const setPosition = (coOrdinateX,coOrdinateY)=>{
        _coOrdinateX = coOrdinateX
        _coOrdinateY = coOrdinateY
        nodeentity.setPosition([_coOrdinateX,_coOrdinateY])
    }

    // const getOutlineMesh = ()=>{

    // }

    return {
        entity:nodeentity.entity,
        setColor:setColor,
        setPosition:setPosition,
        getMesh:nodeentity.getMesh,
        getOutlineMesh:outlineentity.getMesh,
        getSelectOutlineMesh:_selectOutlineNode.getMesh
    }  
}





// const NodeEntity=(coOrdinateX,coOrdinateY,type)=>{
//     let _tick = 0
//     const tickReset = () =>{
//         _tick = 0
//     }
//     const colorRed = "#D2222D"
//     const colorAmber = "#FFBF00"
//     const colorGreen = "#238823"
    
//     let node_color = colorGreen
//     if (!(typeof(coOrdinateX)=="number"&&typeof(coOrdinateY)=="number")){
//         throw "coOrdinates for node entity must be numbers"
//     }
//     if (!(["hub","ordinary"].indexOf(type)!==-1)){
//         throw "type must be either hub or ordinary"
//     }
//     let nodeMesh = circleNode(coOrdinateX,coOrdinateY,type ,colorGreen)
//     let nodeUserTreshold
//     let nodeHealthPercent = 100
//     let nodeUsers = 0 
//     if (type=="hub"){
//         nodeUserTreshold = 100
//     }
//     if (type=="ordinary"){
//         nodeUserTreshold = 50
//     }
//     const setNodeHealth = (health)=>{
//         if(!(typeof(health)=="number")){
//             throw "health must be a number"

//         }
//         if (!(health>=0 && health<=100)){
//             throw "the health must be between zero and 100"
//         }
//         nodeHealthPercent = health

//     }
//     const getHealth = () =>{
//         return nodeHealthPercent
//     }
//     const setNodeUsers = (noOfUsers)=>{
//         if(!(typeof(noOfUsers)=="number")){
//             throw "number of users must be a number"

//         }
//         if (!(noOfUsers>=0)){
//             throw "the number of users must be greater than zero"
//         }
//         nodeUsers = noOfUsers
//     }
//     const getNodeMesh = () =>{
//         return nodeMesh
//     }
//     const update = (delta)=>{
//         _tick+=delta
//         const lazyUpdate =() =>{

//             const _health = getHealth() 
//             if ((0<=_health && _health<30) && (node_color!==colorRed)){
//                 nodeMesh = circleNode(coOrdinateX,coOrdinateY,type ,colorRed)
//             }
//             if ((30<=_health && _health<70) && (node_color!==colorAmber)){
//                 nodeMesh = circleNode(coOrdinateX,coOrdinateY,type ,colorAmber)
//             }
//             if ((70<=_health  && _health<100) && (node_color!==colorGreen)){
//                 nodeMesh = circleNode(coOrdinateX,coOrdinateY,type ,colorGreen)
//             }
//         }
//         if (_tick>1000){
//             lazyUpdate()
//             tickReset()
//         }
        

//     }
//     return {
//         setNodeHealth,
//         getHealth,
//         setNodeUsers,
//         getNodeMesh,
//         update
//     }

// }


export {NodeEntity}