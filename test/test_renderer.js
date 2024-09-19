

const renderScene=(camera,scene)=>{
    
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera);
    return {
        renderer:renderer,
        scene:scene
        
    }
    
}