var light = undefined;
var LIGHT_HEIGHT = 1.3;
var LIGHT_MIN_HEIGHT = 3;
var LIGHT_MAX_INTENSITY = 0.5;
var torch = undefined;
var torch_flickering = true;
var TORCH_MIN_DISTANCE = 2.5;
var TORCH_MAX_DISTANCE = 3;
var TORCH_FLICKERING_INTENSITY = 0.01;
var TORCH_INTENSITY = 10;

function createLight() {
    light= new THREE.PointLight(0xffffff, LIGHT_MAX_INTENSITY);
    light.position.set(1, 1, LIGHT_HEIGHT);
}

function updateLight() {
    torch.distance = torch_flickering? torch.distance - TORCH_FLICKERING_INTENSITY : torch.distance + TORCH_FLICKERING_INTENSITY;
    if(torch.distance > TORCH_MAX_DISTANCE || torch.distance < TORCH_MIN_DISTANCE){
        torch_flickering = !torch_flickering;
    }
    light.position.x = camera.position.x;
    light.position.y = camera.position.y;
    light.position.z = Math.max(camera.position.z - 3.7, LIGHT_MIN_HEIGHT);
    torch.position.x = headMesh.position.x;
    torch.position.y = headMesh.position.y;
    torch.position.z = headMesh.position.z;
}

function initializeLighting() {
    light.position.set(1, 1, LIGHT_HEIGHT);
    light.intensity = 0;
}

function increaseLighting() {
    light.intensity += 0.1 * (LIGHT_MAX_INTENSITY - light.intensity);
}

function decreaseLighting() {
    light.intensity += 0.1 * (0.0 - light.intensity);
}

function lightingIsOn() {
    return Math.abs(light.intensity - LIGHT_MAX_INTENSITY) < 0.05;
}

function lightingIsOff() {
    return Math.abs(light.intensity - 0.0) < 0.1
}

function setLightingIntensity(intensity) {
    light.intensity = intensity;
}

function setLightingMaxIntensity() {
    setLightingIntensity(LIGHT_MAX_INTENSITY);
}

function createTorch() {
    torch = new THREE.PointLight( 0xe25822, TORCH_INTENSITY, 3);
    torch.position.set(1,1,1);
}