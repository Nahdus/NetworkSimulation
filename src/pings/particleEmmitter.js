import {pingParticleMovement} from "./pingParticleMovement"
import {buildCumulativeMap,cumulativeWeightedChooseRandom} from "./NextPathDecision"
const particleEmitter = (network)=>{
    let networkObj = network
    /**
     * networkMap
     * nodeCordinate
     * nodeAttributes
     */
    let _network = networkObj
    let neighbourWeight = {}
    let route = {}
    let cumulativeWeight = {}

    let movemets

    const signal=(changedNetwork,funcName)=>{
        _network = changedNetwork
        cumulativeWeight = buildCumulativeMap(_network.networkMap)
        console.log("----------------signal--------------")
        updateRoute()
        movemets = Object.keys(route).map((key)=>{
            if (route[key]){
    
                return {from:key,mover:pingParticleMovement(route[key]["fromto"][0],route[key]["fromto"][1])}
            }
            else{
                return false
            }
        })
    }
    networkObj.subscribe(signal)

    const selectRandom=(listofStuff)=>{

        const randomBetween=(end,start=0)=>{
            return Math.floor(Math.random()*(end - start))
        }

        let randIndex = randomBetween(listofStuff.length)
        return listofStuff[randIndex]
    }

    
    
    const updateRoute = () =>{
        if(Object.keys(_network.networkMap).length==0){
            route={}
        }
        Object.keys(_network.networkMap).forEach((fromUuid)=>{
            if(_network.networkMap[fromUuid].length>0){
                // let toUuid = selectRandom(_network.networkMap[fromUuid])
                console.log("---------------------------updating route---------------------------------")
                
                let toUuid = cumulativeWeightedChooseRandom(fromUuid,cumulativeWeight)
                route[fromUuid]={fromto:[_network.nodeCordinate[fromUuid],_network.nodeCordinate[toUuid]],destination:toUuid}
            }else{

                route[fromUuid]=false
            }
        })
    }
    movemets = Object.keys(route).map((key)=>{
        if (route[key]){ 

            return {from:key,mover:pingParticleMovement(route[key]["fromto"][0],route[key]["fromto"][1])}
        }
        else{
            return false
        }
    })
    const update=(delta)=>{
        movemets.forEach((movemet)=>{
            if (movemet){

                if (movemet.mover.hasEeached()){
                    
                    let newFromID = route[movemet.from].destination
                    updateRoute()
                    let nextFromCordinate = route[newFromID]["fromto"][0]
                    let nextDestinationCordinate = route[newFromID]["fromto"][1]
                    let mover = pingParticleMovement(nextFromCordinate,nextDestinationCordinate)
                    // movemet.mover.resetReach()
                    movemet.mover = mover
                }else{
                    movemet.mover.update(delta)
                }
            }
        })
        
    }

    const getParticles = ()=>{
        let particles = []
        movemets.forEach((movemet)=>{
            if (movemet){
                particles.push(movemet.mover)
            }
        })
        return particles
    }

    return {
        update,
        getParticles
    }

}

export {particleEmitter}
