import {render} from "./test_drawnode"

let isAnimating=true
const {changeAnimatingStatus} = render(isAnimating)

document.addEventListener(
    "click",
    event => {
        const mouse = {x:0,y:0}
        mouse.x = event.clientX / window.innerWidth * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(mouse.x,mouse.y)
    },
    false );


document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        isAnimating = false;  // Pause the animation
        changeAnimatingStatus(isAnimating)
        
    } else {
        isAnimating = true;   // Resume the animation
        changeAnimatingStatus(isAnimating)
        
    }
});