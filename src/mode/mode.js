const mode = ()=>{
    //[none, addNode, addEdge, delete]
    let _mode = "none"

    const setMode=(mode)=>{
        if (!(mode in ["addNode", "addEdge", "delete"])){
            throw "mode must be one of these none, addNode, addEdge, delete"
        }
        else{
            if(_mode == mode){
                _mode = "none"
            }else{
                _mode = mode
            }
        }

    }

    const getMode = () =>{
        return _mode
    }

    return {
        setMode,
        getMode
    }

}

export {mode}