const healthPriorityDistributionMap=(health)=>{
    let p1 = 0
    let p2 = 0
    let p3 = 0
    let p4 = 0.05
    let p5 = 0.95
    if (health<=10){

        p1 = Math.floor(10*Math.exp(-0.11*health))
    }
    if (health<=30){
        p2 = Math.floor(40*Math.exp(-0.11*health))
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

console.log(healthPriorityDistributionMap(1))