var light = undefined;
var LIGHT_HEIGHT = 1.3;
var LIGHT_MIN_HEIGHT = 3;
var LIGHT_MAX_INTENSITY = 0.8;
var torch = undefined;

function createLight() {
    light= new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, LIGHT_HEIGHT);
}

function updateLight() {
    light.position.x = camera.position.x;
    light.position.y = camera.position.y;
    light.position.z = Math.max(camera.position.z - 3.7, LIGHT_MIN_HEIGHT);
    torch.position.x = camera.position.x;
    torch.position.y = camera.position.y;
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
    torch = new THREE.PointLight( 0x990000, 10, 3);
    torch.position.set(1,1,1);
}
