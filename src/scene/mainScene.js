import * as THREE from 'three';


const MainScene = ()=>{
    let scene = new THREE.Scene();
    
    const addToScene = (entity)=>{
        scene.add(entity)
        
    }

    const clearScene=()=>{
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // If it's a mesh, dispose its geometry and material
                if (child.geometry) child.geometry.dispose();
                
                if (child.material) {
                    // Check if material is an array (multi-material)
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => disposeMaterial(material));
                    } else {
                        disposeMaterial(child.material);
                    }
                }
            }
            
            // If the object has children itself, Three.js will handle that traversal
            // scene.remove(child) isn't necessary because we will remove all after traversal
        });
    
        // Clear all objects from the scene
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    }
    
    // Helper function to dispose of a material and its textures
    function disposeMaterial(material) {
        // Loop through each property of the material and check for textures
        for (const key in material) {
            if (material[key] && material[key].isTexture) {
                material[key].dispose();  // Dispose of the texture
            }
        }
        
        material.dispose();  // Dispose of the material itself
        
    }

    const getScene=()=>{
        return scene
    }
    return{
        addToScene,
        getScene,
        clearScene
    }
    
}

export {MainScene}