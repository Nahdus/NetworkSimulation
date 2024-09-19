import * as THREE from 'three';
import { circleNode } from "../src/graph/nodes/drawnode"
import { drawEdgeBetween } from "../src/graph/edges/drawedge"
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const setupCamera = () => {
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    return camera
}


const addToScene = (sceneEntitiesList) => {
    const scene = new THREE.Scene();
    console.log(sceneEntitiesList)
    sceneEntitiesList.forEach(entity => {
        console.log(entity)
        scene.add(entity)
    })
    return scene
}


const renderScene = (camera, scene) => {

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera);
    return {
        renderer: renderer,
        scene: scene

    }

}





const render = (isAnimating) => {
    let _isAnimating = isAnimating
    const changeAnimatingStatus = (status) => {
        _isAnimating = status
    }
    let circle = circleNode(0, 0, "hub")
    let circle1 = circleNode(1, 0, "ordinary")
    let circle2 = circleNode(-1, 0, "ordinary")
    let circle3 = circleNode(0, -1, "ordinary")
    let circle4 = circleNode(0, 1, "ordinary")
    let edge = drawEdgeBetween(circle, circle1)
    let camera = setupCamera()
    console.log("edge")
    console.log(edge)
    let sceneEntities = [circle, circle1, circle2, circle3, circle4, edge]
    const scene = addToScene(sceneEntities)
    // renderScene(camera,sceneEntities)
    let direction = "forward"
    let prevtime = 0
    const animationLoop = (time) => {
        let delta = 0.001 * (time - prevtime)
        prevtime = time
        if(!_isAnimating){
            return
        }
        if (direction == "forward") {
            if (circle1.position.x < 2) {
                circle1.position.x += 0.5 * delta

            }
            else {
                direction = "backward"
            }

        }
        if (direction == "backward") {
            if (circle1.position.x > 1) {

                circle1.position.x -= 0.5 * delta
                // edge.geometry.attributes.position.array[5]=circle1.position.y
            }
            else {
                direction = "forward"

            }

        }
        edge.geometry.attributes.position.array[3] = circle1.position.x
        edge.geometry.attributes.position.needsUpdate = true;
        renderScene(camera, scene)

        requestAnimationFrame(animationLoop);


    }

    requestAnimationFrame(animationLoop)
    return {
        changeAnimatingStatus
    }

}


export { render }


