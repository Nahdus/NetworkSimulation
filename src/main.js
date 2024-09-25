import * as THREE from 'three';
import {raycaster} from "./raycaster/raycaster"
import {networkNode} from "./graph/nodes/networkNode"
import {networkEdge} from "./graph/edges/networkEdge"
import {network} from "./network/network"
import {networkHeartBeat} from "./network/networkHeartBeat"
import {Stage} from "./stage/stage"
import { v4 as uuidv4 } from 'uuid';
import {pingParticleMovement} from "../src/pings/pingParticleMovement"
import {particleEmitter} from "../src/pings/particleEmmitter"
import {ticketSim} from "./ticketSim/ticketsim"
let entities = []
let networkGraph = network()
networkHeartBeat(networkGraph)


const stage = Stage([...entities])
let highlight = {
  /**@type {[string?]} */
  edge:[],
  /**@type {[string?]} */
  node:[],
  /**@type {string[]} */
  selectedNode:[]
}





// let particle = pingParticleMovement([-1,0],[1,1])
let emitter = particleEmitter(networkGraph)
let ticketSimulator = ticketSim(networkGraph)
let previousTime = 0
const update = (currentTime)=>{


  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;
  // particle.update(deltaTime)
  emitter.update(deltaTime)
  ticketSimulator.update(deltaTime)
  let {nodeCordinate,networkMap,nodeAttributes} = networkGraph.getNetworkDetail()
  let nodeEntities = Object.keys(nodeCordinate).map(each=>{
    let xC = nodeCordinate[each][0]
    let yC = nodeCordinate[each][1]
    let {health,nodeType} = nodeAttributes[each]
    let node =  networkNode(xC,yC,nodeType,health)
    if (highlight["node"].indexOf(each)!==-1){
      node.getOutlineMesh().visible=true
    }
    if(highlight["selectedNode"].indexOf(each)!==-1){
      node.getSelectionOutlineMesh().visible=true
    }
    node.setUuid(each)
    return node

  })
  
  let visitedNodes=[]
  let edgeEntities = []
  Object.keys(networkMap).forEach((from)=>{
      networkMap[from].forEach((to)=>{
        
        if (visitedNodes.indexOf(to)==-1){
          let edge = networkEdge(nodeCordinate[from],nodeCordinate[to])
          if ((highlight.edge.indexOf(from)!==-1)&&(highlight.edge.indexOf(to)!==-1)){
            console.log("setting visibility true")
            edge.getOutlineMesh().visible=true
          }
          else{
            console.log("setting visibility true")
            edge.getOutlineMesh().visible=false
          }
          edge.setEndPointids(from,to)
          edgeEntities.push(edge)
        }
      })
      visitedNodes.push(from)
    
  })

  stage.updateEntities(edgeEntities.concat(nodeEntities).concat(emitter.getParticles()),highlight)
  stage.view()
  requestAnimationFrame(update)
}
// setInterval(update,20)
requestAnimationFrame(update)
stage.view()





let type = "ordinary"
let mode = "node"
const canvas = document.getElementById("c")
const nodeButton = document.getElementById("addNode")
const hubButton = document.getElementById("addHub")
const edgeButton = document.getElementById("addEdge")
const modifyButton = document.getElementById("modify")
const deleteButton = document.getElementById("delete")
const clearButton = document.getElementById("clear")
const slider = document.getElementById("healthSlider")

const resetHighlight = ()=>{
  highlight = {
    /**@type {[string?]} */
    edge:[],
    /**@type {[string?]} */
    node:[],
    /**@type {string[]} */
    selectedNode:[]
  }
  slider.className ="slider-container hide"
}



clearButton?.addEventListener("click",()=>{
  networkGraph.clearNetwork()
  resetHighlight()
  
})

nodeButton?.addEventListener("click",()=>{
  mode ="node"
  type = "ordinary"
  console.log("clicked on node Button")
  resetHighlight()
})

hubButton?.addEventListener("click",()=>{
  mode ="node"
  type = "hub"
  resetHighlight()
})

edgeButton?.addEventListener("click",()=>{
  mode ="edge"
  resetHighlight()
})

deleteButton?.addEventListener("click",()=>{
  mode ="delete"
  resetHighlight()
})

modifyButton?.addEventListener("click",()=>{
  mode = "modify"
  resetHighlight()
})


const canvasBounds = canvas?.getBoundingClientRect();


// let tempEdgeEndPoints = []


const onMouseMove = (event) =>{
  const mouse = {}
  if(canvasBounds){
    mouse.x = (((event.clientX - canvasBounds.left)/canvasBounds.width) * 2 - 1)//*(1.25)
    mouse.y = -(((event.clientY - canvasBounds.top)/canvasBounds.height) * 2 - 1 )//*(10/6)
  }else{
    throw("canvas is undefined")
  }
  raycaster.setFromCamera(mouse,stage.getCamera())
  const hoverOnobjects = raycaster.intersectObjects(stage.getScene().children);
  if(hoverOnobjects.length>0){

    hoverOnobjects.forEach(each=>{
      console.log(each.object['userData']['componentType'])
      if(each.object['userData']['componentType'] == "node"){
        highlight.node = [each.object.uuid]
      }
      if(each.object['userData']['componentType'] == "edge"){
        console.log(each.object.userData.endPointid1)
        console.log(each.object.userData.endPointid2)
        // @ts-ignore
        highlight.edge = [each.object.userData.endPointid1,each.object.userData.endPointid2]
      }
    })
  }else{
    highlight.edge =[]
    highlight.node =[]
  }
}






const onCanvasClick = (event) =>{
  console.log(networkGraph.getNetworkDetail().networkMap)
  const mouse = {}
  if(canvasBounds){
    mouse.x = (((event.clientX - canvasBounds.left)/canvasBounds.width) * 2 - 1)//*(1.25)
    mouse.y = -(((event.clientY - canvasBounds.top)/canvasBounds.height) * 2 - 1 )//*(10/6)
  }else{
    throw("canvas is undefined")
  }
  console.log(mouse)
  raycaster.setFromCamera(mouse,stage.getCamera())
  
  const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); 
  const intersection = new THREE.Vector3();
  const clickedOnobjects = raycaster.intersectObjects(stage.getScene().children);


  raycaster.ray.intersectPlane(planeZ, intersection);

  if (mode == "node"){

    if(clickedOnobjects.length>0){
      console.log("already an node is present at that location")
      return
    }

    // if(type=="hub"){
    //   type = "ordinary"
    // }else{
    //   type="hub"
    // }

    let health = 100//Math.ceil(Math.random()*100)
    let uuid = uuidv4()
    let coordinate = [intersection.x,intersection.y]
    networkGraph.addNode(uuid,coordinate,health,type)
  }

  if(mode =="edge"){

    if(clickedOnobjects.length>0){
      if(highlight.selectedNode.length<2){
        clickedOnobjects.forEach(each=>{
          if(each.object['userData']['componentType'] == "node"){
            highlight.selectedNode.push(each.object["uuid"])
            // tempEdgeEndPoints.push(each.object["uuid"])
            console.log("added one endpoint")
          }
        })
      }
      if(highlight.selectedNode.length==2){
        if( highlight.selectedNode[0]== highlight.selectedNode[1]){
          console.log("cannot draw edge to same vertex")
          highlight.selectedNode=[]
          // tempEdgeEndPoints=[]
        }else{
          try{

            networkGraph.connectNode( highlight.selectedNode[0], highlight.selectedNode[1])
            // tempEdgeEndPoints=[]
            highlight.selectedNode=[]
            console.log("A edge is added")
          }catch(err){
            highlight.selectedNode=[]
          }
        }
        highlight.selectedNode=[]
      }
      if (highlight.selectedNode.length>2){
        console.log(`resetting nodes too many nodes selected ${highlight.selectedNode}`)
        // tempEdgeEndPoints=[]
        highlight.selectedNode=[]
      }
    }
  }
  if(mode=="delete"){
    if(clickedOnobjects.length>0){
      console.log(clickedOnobjects[0].object.userData)
      console.log(clickedOnobjects[0].object.userData.componentType)
      clickedOnobjects.forEach((each)=>{

        if (each.object.userData.componentType=="node"){
          let nodeUuid = each.object.uuid
          console.log("deleting node")
          console.log(nodeUuid)
          networkGraph.deleteNode(nodeUuid)
          return
        }
        if(each.object.userData.componentType=="edge"){
          let edge1uuid = each.object.userData.endPointid1
          let edge2uuid = each.object.userData.endPointid2
          console.log(edge1uuid)
          console.log(edge2uuid)
          networkGraph.disconnectNode(edge1uuid,edge2uuid)
        }
  
        return
      })
    }
    console.log("nothing to delete")
  }
  if (mode=="modify"){
    if(clickedOnobjects.length>0){
      
        clickedOnobjects.forEach(each=>{
          if(each.object['userData']['componentType'] == "node"){
            // console.log(slider?.className)
            let selectedUuid = each.object["uuid"]
            highlight.selectedNode=[selectedUuid]
            // tempEdgeEndPoints.push(each.object["uuid"])
            console.log("added one endpoint")
            let classes = slider?.classList.toString().split(" ")
            let index = classes?.indexOf("hide")
            if(index!==-1){
              classes?.splice(index,1)
            }
            // @ts-ignore
            let new_class = classes?.join("")
            slider.className = new_class
            let slideAdjuster = slider?.getElementsByTagName("input")[0]
            let {nodeAttributes} =networkGraph.getNetworkDetail()
            console.log()
            slideAdjuster.value = nodeAttributes[selectedUuid]["health"]
            slideAdjuster.onchange=function() {
              console.log(this.value)
              networkGraph.setNodeHealth(selectedUuid,Number(this.value))
            }

          }
        })
      
  }

}else{
  slider.className ="slider-container hide"
}
}


canvas?.addEventListener('click',onCanvasClick)
canvas?.addEventListener('mousemove',onMouseMove)


