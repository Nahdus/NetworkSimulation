
// let x={networkMap:{
//     1:[2,3],
//     2:[1,5],
//     3:[1,5],
//     4:[5,6,7],
//     5:[4,2,3],
//     6:[4],
//     7:[4],
//     8:[]
// }}

// let neighbourWeight = {

// }

// let networkObj={
    
//    getNetworkDetail:()=>x
   
// }



const calculateNeighbourcount = (networkMap)=>{
    let netorkNeighbour ={}
    Object.keys(networkMap).forEach((from)=>{
        let neighbourCount = []
        networkMap[from].forEach(to=>{
            neighbourCount.push(networkMap[to].length-1)
            netorkNeighbour[from] = neighbourCount
        })
    })
    return netorkNeighbour
}

const applyLaplacianSmoothing = (neighbourcount)=>{
    let laplacianConstant = 0.4
    let laplacianSmoothWeight = {}
    Object.keys(neighbourcount).forEach(from=>{
        let weight = neighbourcount[from].reduce((p,c)=>p+c+laplacianConstant,0)
        let smoothWeights = []
        neighbourcount[from].forEach((toWeight)=>{
            let smoothWeight = (toWeight+laplacianConstant)/weight
            smoothWeights.push(smoothWeight)
        })
        laplacianSmoothWeight[from] = smoothWeights
    })
    return laplacianSmoothWeight
}

const pairWithMap = (networkMap,smoothLaplace)=>{
    let pathWeight = {}
    Object.keys(networkMap).forEach((from)=>{
        let pair = []
        networkMap[from].forEach((to,i)=>{
            
            pair.push([to,smoothLaplace[from][i]])
        })
        pathWeight[from]=pair
    })
    return pathWeight
}

const sortForCumulative = (madeCumulative)=>{
    let sortedCumulative = {}
    Object.keys(madeCumulative).forEach((from)=>{
       let sorted =  madeCumulative[from].sort((a,b)=>{
        if(a[1]<b[1]){
                return -1
        }if(b[1]<a[1]){
            return 1
        }
        return 0
    })
    
    sortedCumulative[from] = sorted
    })
    return sortedCumulative
}

const makeCumulative =(sortedWeights)=>{
    let cumulativeMap = {}
    Object.keys(sortedWeights).forEach((from)=>{
        let cumulative = []
        sortedWeights[from].forEach((each,i)=>{
            console.log(each)
            let copySortedWeights = [...sortedWeights[from]]
            let w = copySortedWeights.splice(0,i+1).reduce((p,e)=>p+e[1],0)
            cumulative.push([each[0],w])
        })
        cumulativeMap[from]=cumulative
    })
    return cumulativeMap

}


const setNeighbourWeight=(networkObj)=>{
    let networkmap = networkObj.getNetworkDetail().networkMap
    return networkmap
}


const cumulativeWeightedChooseRandom = (fromUUID,cumulativeMap)=>{
    let random = Math.random()
    let toWeightPair = cumulativeMap[fromUUID]
    console.log("pair size")
    console.log(toWeightPair)
    if (toWeightPair.length==0){
        return `There is nowhere to go from ${fromUUID}`
    }
    for (let i = 0; i < toWeightPair.length; i++) {
        console.log("to weight pair")
        console.log(toWeightPair[i])
        console.log("Random")
        console.log(random)
        if (random<toWeightPair[i][1]){
            return toWeightPair[i][0]
        }
        
    }
    
}



// const selectScoredRandomToUuid=(fromUuid)=>{
//     let neighbourScore={}
//     let laplaceSmoothingConstant = 0.01
//     let uuidWeightsPair = []
//     let weights = []
//     let uuidCumulativeWeightPair = []
//     let networkmap = networkObj.getNetworkDetail().networkMap
//     //triples[uuid,cumulativeweight]
    
//     networkmap[fromUuid].forEach((each)=>{
//         neighbourScore[each]=networkmap[each].length+laplaceSmoothingConstant
//         weights.push(neighbourScore[each]+laplaceSmoothingConstant)
//     })
//     console.log(neighbourScore)
//     let totalWeight = weights.reduce((p,e)=>p+e,0)
//     console.log(weights)
//     console.log(totalWeight)
//     Object.keys(neighbourScore).forEach((each)=>{
//         let score = neighbourScore[each]/totalWeight
//         neighbourScore[each]=score
//         uuidWeightsPair.push([each,score])
//     })
//     console.log(neighbourScore)
//     uuidWeightsPair.forEach((each,i)=>{
//         let cumulativeWeight = [...uuidWeightsPair].splice(0,i+1).reduce((p,e)=>p+e[1],0)
//         uuidCumulativeWeightPair.push([each[0],cumulativeWeight])
//     })
//     console.log(uuidWeightsPair)
//     console.log(uuidCumulativeWeightPair)
//     console.log("random")
//     let random = Math.random()
//     console.log(random)
//     for (let index = 0; index < uuidCumulativeWeightPair.length; index++) {
//         console.log("---------------------------")
//         console.log(uuidCumulativeWeightPair[index][1])
//         if (random<uuidCumulativeWeightPair[index][1]){
//             return uuidCumulativeWeightPair[index][0]
//         }
        
//     }

// }
// console.log("-----------------------------------------------------------------------------")
// console.log(setNeighbourWeight(networkObj))
// console.log("-----------------------------------------------------------------------------")
// console.log(applyLaplacianSmoothing(calculateNeighbourcount(setNeighbourWeight(networkObj))))
// console.log("-----------------------------------------------------------------------------")
// console.log(sortForCumulative(pairWithMap(networkObj.getNetworkDetail().networkMap,applyLaplacianSmoothing(calculateNeighbourcount(setNeighbourWeight(networkObj))))))
// console.log("-----------------------------------------------------------------------------")
// console.log(makeCumulative(sortForCumulative(pairWithMap(networkObj.getNetworkDetail().networkMap,applyLaplacianSmoothing(calculateNeighbourcount(setNeighbourWeight(networkObj)))))))
// console.log("-----------------------------------------------------------------------------")
// console.log(cumulativeWeightedChooseRandom(8,makeCumulative(sortForCumulative(pairWithMap(networkObj.getNetworkDetail().networkMap,applyLaplacianSmoothing(calculateNeighbourcount(setNeighbourWeight(networkObj))))))))

const buildCumulativeMap = (networkMap)=>{
    return makeCumulative(sortForCumulative(pairWithMap(networkMap,applyLaplacianSmoothing(calculateNeighbourcount(networkMap)))))
}





export {
    setNeighbourWeight,
    calculateNeighbourcount,
    applyLaplacianSmoothing,
    sortForCumulative,
    makeCumulative,
    buildCumulativeMap,
    cumulativeWeightedChooseRandom
}