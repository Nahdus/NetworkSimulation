import {MainScene} from "../scene/mainScene"
import {renderScene} from "../renderer/renderer"
import {setupCamera} from "../camera/camera"

const Stage =(entities)=>{
    let mainScene = MainScene()
    let _scene = mainScene.getScene()
    
    // console.log(drawOutlineBetween([-1.0],[1,0]))
    let _camera = setupCamera()
    let _entities = entities
    _entities.forEach((entity)=>{
    mainScene.addToScene(entity.getMesh())
    })
    
    const removeEntity=(entity)=>{
        console.log("remove Entity function before")
        console.log(_entities)
        let filtered_entities = _entities.filter((each,i)=>{
            if(each.getMesh()["uuid"] == entity.getMesh()["uuid"]){
                console.log(`deleting index ${i}`)
                return false
            }
            return true
        })
        mainScene = MainScene()
        console.log("remove Entity function after")
        console.log(filtered_entities)
        _entities=[]
        filtered_entities.forEach((each)=>{
            addEntity(each)
        })
        
    }

    

    const updateEntities=(entities)=>{
        mainScene.clearScene()
        mainScene.getScene().clear()
        mainScene = MainScene()
        entities.forEach((entity)=>{
        mainScene.addToScene(entity.getMesh())

        if ('getOutlineMesh' in entity){
            mainScene.addToScene(entity.getOutlineMesh())
        }
        if ('getSelectionOutlineMesh' in entity){
            mainScene.addToScene(entity.getSelectionOutlineMesh())
        }
        })
    }
    const updateCamera=(camera)=>{
        _camera = camera
    }
    const getCamera=()=>{
        return _camera
    }
    const addEntity=(entity)=>{
        _entities.push(entity)
        mainScene.addToScene(entity.getMesh())
        _scene = mainScene.getScene()
    }

    const view=(camera=_camera)=>{
        _scene = mainScene.getScene()
        renderScene(_scene,camera)
    }
    

    const play=()=>{
        renderScene(_scene,_camera)
        requestAnimationFrame(()=>{
                renderScene(_scene,_camera)

                play()
            })
        
    }
    const getScene=()=>{
        return mainScene.getScene()
    }


    return {
        getCamera,
        addEntity,
        removeEntity,
        updateCamera,
        updateEntities,
        view,
        getScene:getScene
    }
}

export {Stage}