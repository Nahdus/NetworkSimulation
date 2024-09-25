const networkHeartBeat=(networkObj)=>{


    let sendNetworkStatus = (networkDetails)=>{
        fetch(process.env.HEART_BEAT_URL, {
            method: "POST",
            body: JSON.stringify(networkDetails),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
    }



    const ObserveNetworkChanges = (networkDetails,fn)=>{
        sendNetworkStatus(networkDetails)
    }
    networkObj.subscribe(ObserveNetworkChanges)

}

export {networkHeartBeat}