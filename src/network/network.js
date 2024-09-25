

// const networkMap = {
//     node1:["node2","node3"],
//     node2:["node1","node5"],
//     node3:["node4","node1"],
//     node4:["node3"],
//     node5:["node2"],
// }



// const nodeCordinates = {
//     node1:[1,2],
//     node2:[5,3],
//     node3:[4,2],
//     node4:[7,1],
//     node5:[9,6]
// }

const network =()=>{
    let networkMap = {}
    let nodeCordinate = {}
    let nodeAttributes ={}
    let _callbackfns = []
    const subscribe=(callbackfn)=>{
        _callbackfns.push(callbackfn)
    }

    const _notify = (fromFunc)=>{
        if (_callbackfns){
            _callbackfns.forEach((_callbackfn)=>{
                _callbackfn({
                    networkMap,
                nodeCordinate,
                nodeAttributes
                },fromFunc)
            })
        }
    }
    const addNode=(uuid,coordinate,health,nodeType)=>{
        networkMap[uuid] = []
        nodeCordinate[uuid] = coordinate
        let attribute = {
            "health":health,
            "nodeType":nodeType
            }
        nodeAttributes[uuid]=attribute
        _notify("addNode")
    }

    const connectNode=(uuid1,uuid2)=>{
        console.log(uuid1,uuid2)
        if (!(uuid1 in networkMap)) {
            throw `node ${uuid1} does not exist`
        }
        if (!(uuid2 in networkMap)) {
            throw `node ${uuid2} does not exist`
        }
        let existingConnectionUuid1 = networkMap[uuid1]
        if (existingConnectionUuid1.indexOf(uuid2)!==-1){
            console.log(`${uuid1} and ${uuid2} are already connected`)
            return 
        }
        existingConnectionUuid1.push(uuid2)
        console.log(existingConnectionUuid1)
        networkMap[uuid1] = existingConnectionUuid1
        let existingConnectionUuid2 = networkMap[uuid2]
        if (existingConnectionUuid2.indexOf(uuid1)!==-1){
            console.log(`${uuid1} and ${uuid2} are already connected`)
            return 
        }
        existingConnectionUuid2.push(uuid1)
        networkMap[uuid2] = existingConnectionUuid2
        console.log(existingConnectionUuid2)
        _notify("connectNode")
}

    const disconnectNode=(uuid1,uuid2)=>{
        console.log(`disocnnecting ${uuid1} and ${uuid2}`)
        
        let existingConnectionUuid1 = networkMap[uuid1]
        let uuid2index = existingConnectionUuid1.indexOf(uuid2)
        if (uuid2index==-1){
            throw `node ${uuid1} is not connected to ${uuid2}` 
        }
        existingConnectionUuid1.splice(uuid2index,1)
        networkMap[uuid1] = existingConnectionUuid1

        let existingConnectionUuid2 = networkMap[uuid2]
        let uuid1index = existingConnectionUuid2.indexOf(uuid1)
        if (uuid1index==-1){
            throw `node ${uuid2} is not connected to ${uuid1}` 
        }

        existingConnectionUuid2.splice(uuid1index,1)
        networkMap[uuid2] = existingConnectionUuid2
        _notify("disconnectNode")
        
    }

    const setNodeCoordinate =(uuid,coOrdinate)=>{
        if (!(nodeCordinate.indexOf(uuid)!==-1)){
            throw `${uuid} node is not added to the network`
        }
        nodeCordinate[uuid] = coOrdinate
    }

    const deleteNode = (uuid)=>{
        if (!(uuid in networkMap)){
            throw `${uuid} node is not added to the network`
        }
        if (!(uuid in nodeCordinate)){
            throw `${uuid} node is not added to the network`
        }
        if (!( uuid in nodeAttributes)){
            throw `${uuid} node is not added to the network`
        }
        delete networkMap[uuid]
        
        Object.keys(networkMap).forEach((each)=>{

            let index = networkMap[each].indexOf(uuid)
            if (index!==-1){
                console.log(`removeing connections from ${each}`)
                networkMap[each].splice(index,1)
            }
        })
        delete nodeCordinate[uuid]
        delete nodeAttributes[uuid]
        console.log(`deleting ${uuid}`)
        _notify("deleteNode")
    }

    const setNodeHealth = (uuid,health)=>{
        if (!(Object.keys(nodeAttributes).indexOf(uuid)!==-1)){
            throw `${uuid} node is not added to the network`
        }
        nodeAttributes[uuid]["health"] = health
        _notify("setNodeHealth")
    }

    const getNetworkDetail=()=>{
        return {
        networkMap,
        nodeCordinate,
        nodeAttributes
        }
    }

    const clearNetwork=()=>{
        networkMap = {}
        nodeCordinate = {}
        nodeAttributes = {}
        _notify("clearNetwork")
    }

    return {
        addNode,
        connectNode,
        disconnectNode,
        setNodeCoordinate,
        deleteNode,
        setNodeHealth,
        getNetworkDetail,
        clearNetwork,
        subscribe
    }
    
}

export {network}
    