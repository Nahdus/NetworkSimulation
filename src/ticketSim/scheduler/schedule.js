

const schedule = (cbfunction,time,uuid)=>{
    let initTime = 0
    let _uuid = uuid
    let _cbFn = cbfunction
    let _time  = time
    let _notificationFns=[]

    let start = false
    const setNotifier = (notificationFn)=>{
        _notificationFns.push(notificationFn)
    }

    const startSchedule = ()=>{
        start = true
    }

    const update = (delta)=>{
        if (start){

            initTime+=delta
            if (initTime>_time){
                _cbFn(_uuid)
                _notificationFns.forEach((_notificationFn)=>{
                    _notificationFn(_uuid)
                    start=false
                })
                initTime=0
            }
        }
    }

    return {
        setNotifier,
        startSchedule,
        update
    }

}

export {schedule}