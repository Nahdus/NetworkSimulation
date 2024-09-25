import {schedule} from "./scheduler/schedule"
import {raise} from "./raiseTicket/raiseTicket"
// const calculateFrequencyForNextTicket = (health)=>{
//     let minimumFrequency = 2
//     let frequency = minimumFrequency*(Math.E**(-0.0588*health))
//     return frequency
// }


// const variableTimeForNextTicket=(health)=>{
//     let frequency = calculateFrequencyForNextTicket(health)
//     let uniformRandomVariable = Math.random()
//     let nextTicketTime = -(1/frequency)*Math.log(uniformRandomVariable)
//     return nextTicketTime
// }


// const healthPriorityDistributionMap=(health)=>{
//     let p1 = 0
//     let p2 = 0
//     let p3 = 0
//     let p4 = 0.05
//     let p5 = 0.95
//     if (health<=10){

//         p1 = Math.floor(10*Math.exp(-23.256*health))
//     }
//     if (health<=30){
//         p2 = Math.floor(40*Math.exp(-23.394*health))
//     }
//     if(health<=50){
//         p3 = Math.floor(-0.00668*(health-50)**2+33.3)
//         p4 = Math.floor(-0.00668*(health-50)**2+33.3)
//         p5 = Math.floor(16.6*Math.exp(0.0139*health))

//     }
//     if(health>50&&health<=60){
//         p3 = Math.floor((8.515*(10**100))*Math.exp(-4.67*health))
//     }
//     if(health>50){
//         p4 = Math.floor(221.52*Math.exp(-0.0379*health))
//         p5 = Math.floor(16.6*Math.exp(0.01744*health))
//     }

    
//     let sum = p1+p2+p3+p4+p5
//     return {
//         p1:(p1/sum)*100,
//         p2:(p2/sum)*100,
//         p3:(p3/sum)*100,
//         p4:(p4/sum)*100,
//         p5:(p5/sum)*100
//     }
//     // return {
//     //     p1,
//     //     p2,
//     //     p3,
//     //     p4,
//     //     p5
//     // }

// }

// let x = healthPriorityDistributionMap(0)
// console.log(x)
//  x = healthPriorityDistributionMap(50)
// console.log(x)
//  x = healthPriorityDistributionMap(100)
// console.log(x)

// console.log("30%")
// x = healthPriorityDistributionMap(30)
// console.log(x)




// console.log(calculateFrequencyForNextTicket(0))
// console.log(calculateFrequencyForNextTicket(100))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))
// console.log(variableTimeForNextTicket(0))


// console.log("------------------------------------------")
// console.log(variableTimeForNextTicket(100))
// console.log(variableTimeForNextTicket(100))
// console.log(variableTimeForNextTicket(100))
// console.log(variableTimeForNextTicket(100))

const ticketSim = (networkObj)=>{
    //networkObj.getNetworkDetail=()=>{
        // networkMap,
        // nodeCordinate,
        // nodeAttributes
    // }
    let _networkObj = networkObj
    let {networkMap, nodeCordinate, nodeAttributes} = _networkObj.getNetworkDetail()
    
    let timers = {}
    let healthPriorityDistribution = {}
    let priorityIntervalMap = {}
    let scheduleEntities = {}


    const calculateFrequencyForNextTicket = (health)=>{
        let minimumFrequency = 2
        let frequency = minimumFrequency*(Math.E**(-0.0588*health))
        return frequency
    }
    
    
    const variableTimeForNextTicket=(health)=>{
        let frequency = calculateFrequencyForNextTicket(health)
        let uniformRandomVariable = Math.random()
        let nextTicketTime = -(1/frequency)*Math.log(uniformRandomVariable)
        return nextTicketTime
    }

    const healthPriorityDistributionMap=(health)=>{
        let p1 = 0
        let p2 = 0
        let p3 = 0
        let p4 = 0.05
        let p5 = 0.95
        if (health<=10){
    
            p1 = Math.floor(10*Math.exp(-23.256*health))
        }
        if (health<=30){
            p2 = Math.floor(40*Math.exp(-23.394*health))
        }
        if(health<=50){
            p3 = Math.floor(-0.00668*(health-50)**2+33.3)
            p4 = Math.floor(-0.00668*(health-50)**2+33.3)
            p5 = Math.floor(16.6*Math.exp(0.0139*health))
    
        }
        if(health>50&&health<=60){
            p3 = Math.floor((8.515*(10**100))*Math.exp(-4.67*health))
        }
        if(health>50){
            p4 = Math.floor(221.52*Math.exp(-0.0379*health))
            p5 = Math.floor(16.6*Math.exp(0.01744*health))
        }




        
        
        let sum = p1+p2+p3+p4+p5
        return {
            p1:(p1/sum)*100,
            p2:(p2/sum)*100,
            p3:(p3/sum)*100,
            p4:(p4/sum)*100,
            p5:(p5/sum)*100
        }
    
    }

    const stetupSchedule = (uuid,priority,interval)=>{
        let cbf = ()=>{
            raise(uuid,priority)
        }
        let _schedule = schedule(cbf,interval,uuid)
        _schedule.setNotifier(expiredInterval)
        _schedule.startSchedule()
        scheduleEntities[uuid]=_schedule
    }

    const expiredInterval = (uuid)=>{
        if (Object.keys(timers).indexOf(uuid)==-1||Object.keys(nodeAttributes).indexOf(uuid)==-1||Object.keys(priorityIntervalMap).indexOf(uuid)==-1){
            console.log("uuid no longer found")
        }else{
            timers[uuid] = variableTimeForNextTicket(nodeAttributes[uuid]["health"])
            updateNextTicketTimer(networkMap,healthPriorityDistribution,timers)
            let interval=priorityIntervalMap[uuid]["Interval"]
            let priority=priorityIntervalMap[uuid]["priority"]
            stetupSchedule(uuid,priority,interval)
        }

    }

    const chooseWeightedPriority=(uuid,healthPriorityDistribution)=>{
        const {p1,p2,p3,p4,p5} = healthPriorityDistribution[uuid]
        let index = Math.ceil(Math.random()*100)
        if (index<p1){
            return 'p1'
        }
        else if (index<p1+p2){
            return 'p2'
        }
        else if (index<p1+p2+p3){
            return 'p3'
        }
        else if (index<p1+p2+p3+p4){
            return 'p4'
        }
        else if (index<p1+p2+p3+p4+p5){
            return 'p5'
        }
        else{
            return 'p5'
        }
    }



    const updateNextTicketTimer = (networkMap,healthPriorityDistribution,timers) =>{
        Object.keys(networkMap).forEach((eachuuid)=>{
            const {p1,p2,p3,p4,p5} = healthPriorityDistribution[eachuuid]
            let index = Math.ceil(Math.random()*100)
            if (index<p1){
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p1"}
            }
            else if (index<p1+p2){
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p2"}
            }
            else if (index<p1+p2+p3){
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p3"}
            }
            else if (index<p1+p2+p3+p4){
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p4"}
            }
            else if (index<p1+p2+p3+p4+p5){
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p5"}
            }
            else{
                priorityIntervalMap[eachuuid] = {"Interval":timers[eachuuid],"priority":"p5"}
            }
        })
    }

    let updateChange=(networkDetails,fn)=>{
        ({networkMap ,nodeCordinate,nodeAttributes} = networkDetails)
        if(fn=="deleteNode"){
            Object.keys(healthPriorityDistribution).forEach((each)=>{
                if(Object.keys(networkMap).indexOf(each)==-1){
                 delete healthPriorityDistribution[each]
                 delete timers[each]
                 delete priorityIntervalMap[each]
                 delete scheduleEntities[each]
                }
            })
        }
        if(fn=="addNode"){
            Object.keys(networkMap).forEach(newuuid=>{
                if (Object.keys(healthPriorityDistribution).indexOf(newuuid)==-1){
                    healthPriorityDistribution[newuuid]= healthPriorityDistributionMap(nodeAttributes[newuuid]["health"])
                    timers[newuuid] = variableTimeForNextTicket(nodeAttributes[newuuid]["health"])
                    let priority = chooseWeightedPriority(newuuid,healthPriorityDistribution)
                    priorityIntervalMap[newuuid] = {"Interval":timers[newuuid],"priority":priority}
                    scheduleEntities[newuuid]
                    stetupSchedule(newuuid,priority,timers[newuuid])
                }
            })
        }
        if(fn=="clearNetwork"){
            healthPriorityDistribution={}
            priorityIntervalMap={}
            scheduleEntities={}
            timers={}
        }

        if (fn=="setNodeHealth"){
            timers = {}
            Object.keys(networkMap).forEach(eachUuid=>{
                healthPriorityDistribution[eachUuid] = healthPriorityDistributionMap(nodeAttributes[eachUuid]["health"])
                timers[eachUuid] = variableTimeForNextTicket(nodeAttributes[eachUuid]["health"])
    
            })
            updateNextTicketTimer(networkMap,healthPriorityDistribution,timers)
            
            Object.keys(priorityIntervalMap).forEach((uuid)=>{
            let interval = priorityIntervalMap[uuid]["Interval"]
            let priority = priorityIntervalMap[uuid]["priority"]
            stetupSchedule(uuid,priority,interval)
        })
        }
        

    }

    updateChange(_networkObj.getNetworkDetail())
    _networkObj.subscribe(updateChange)


    const update = (delta)=>{
        Object.keys(scheduleEntities).forEach((scheduleId)=>{
            scheduleEntities[scheduleId].update(delta)
        })
        
    }


    return {
        update
    }



}

export {ticketSim}