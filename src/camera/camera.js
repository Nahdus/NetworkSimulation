import * as THREE from 'three';

const setupCamera = (fov = 75, aspect = 2, near = 0.1, far = 5, z = 2) => {
    const _fov = fov;
    const _aspect = aspect;  // the canvas default
    const _near = near;
    const _far = far;
    const _camera = new THREE.PerspectiveCamera(_fov, _aspect, _near, _far);
    _camera.position.z = z;
    return _camera
}

export {setupCamera}