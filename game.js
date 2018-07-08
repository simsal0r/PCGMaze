var scene          = undefined,
    renderer       = undefined,
    mouseX         = undefined,
    mouseY         = undefined,
    keyAxis        = [0, 0],

    // Box2D shortcuts
    b2World        = Box2D.Dynamics.b2World,
    b2FixtureDef   = Box2D.Dynamics.b2FixtureDef,
    b2BodyDef      = Box2D.Dynamics.b2BodyDef,
    b2Body		   = Box2D.Dynamics.b2Body,
    b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Settings     = Box2D.Common.b2Settings,
    b2Vec2         = Box2D.Common.Math.b2Vec2,

    // Box2D world variables
    physicsWorld         = undefined;

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}


function onMoveKey(axis) {
    keyAxis = axis.slice(0);
}


jQuery.fn.centerv = function () {
    wh = window.innerHeight;
    h = this.outerHeight();
    this.css("position", "absolute");
    this.css("top", Math.max(0, (wh - h)/2) + "px");
    return this;
}


jQuery.fn.centerh = function () {
    ww = window.innerWidth;
    w = this.outerWidth();
    this.css("position", "absolute");
    this.css("left", Math.max(0, (ww - w)/2) + "px");
    return this;
}


jQuery.fn.center = function () {
    this.centerv();
    this.centerh();
    return this;
}


$(document).ready(function() {
    mazeDimension = parseInt(localStorage.getItem("startDifficulty"));
    document.body.style.fontFamily = getAtmosphere(localStorage.getItem("atmosphere"), localStorage.getItem("sound"), "font-family");
    // console.log(localStorage.getItem("atmosphere"));
    // console.log(localStorage.getItem("sound"));
    // console.log(localStorage.getItem("sound"));
    // console.log(localStorage.getItem("gameC"));
    // console.log(localStorage.getItem("gameS"));
    // Prepare the instructions.
    $('#instructions').center();
    $('#instructions').hide();
    $('#confirmationPopup').hide();
    $('#jump_scare').hide();
    $('#jump_scare2').hide();
    $('#jump_scare3').hide();
    $('#jump_scare4').hide();
    $('#jump_happy').hide();
    $('#jump_happy2').hide();
    $('#jump_happy3').hide();
    $('#jump_happy4').hide();
    $('#cookies').hide();
    KeyboardJS.bind.key('i', function(){$('#instructions').show()},
        function(){$('#instructions').hide()});

    // Create the renderer.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Bind keyboard and resize events.
    $(window).resize(onResize);

    // Set the initial game state.
    gameState = 'initialize';

    // Start the game loop.
    requestAnimationFrame(gameLoop);
})

var modal;
var modalA;
var modalB;

function showModal(){
    modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function showAnnotation(){
    modalA = document.getElementById('annotationModal');
    modalA.style.display = "block";
}

function showThanks(){
    modalB = document.getElementById('thanksModal');
    modalB.style.display = "block";
    console.log(new Date().toLocaleTimeString() + " Event[Game] Type[Thank you message]");
}

function confirmLevel() {

    $('#confirmationPopup').hide();
}

function handleAnnotation(){

    annotationConfirmationNeeded = false;
    document.getElementById('annotationModal').style.display = "none";
    //1+1=2
    if (parseInt(localStorage.getItem("gameS"))===2) {
        restart();
    }
    else if (parseInt(localStorage.getItem("gameS"))===2){
        showThanks();
    }
    else{
        showModal();
    }
    console.log(new Date().toLocaleTimeString() + " Event[Annotaion] Type[Done]");
 }

function handleData() {
    confirmationNeeded = false;
    // Get the modal
    modal = document.getElementById('myModal');
    var radios = document.getElementsByName('fun');
    console.log(new Date().toLocaleTimeString() + " Event[Survey] Type[Begin]");
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            console.log(new Date().toLocaleTimeString() + " Event[Survey] Question[Q1] Value[" + radios[i].value +"]");
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    var radios2 = document.getElementsByName('difficulty');

    for (var i = 0, length = radios2.length; i < length; i++)
    {
        if (radios2[i].checked)
        {
            console.log(new Date().toLocaleTimeString() + " Event[Survey] Question[Q2] Value[" + radios2[i].value +"]");
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    modal.style.display = "none";
    console.log(new Date().toLocaleTimeString() + " Event[Survey] Type[Done]");
    var gamestep1 = parseInt(localStorage.getItem("gameS"));
    //Start the game again
    if (gamestep1 <= 4)
    {
        restart();
    }
    else
    {
       showThanks();
    }

}



