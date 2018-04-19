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
    document.body.style.fontFamily = getAtmosphere(localStorage.getItem("atmosphere"), "font-family");
    // Prepare the instructions.
    $('#instructions').center();
    $('#instructions').hide();
    $('#confirmationPopup').hide();
    $('#jump_scare').hide();
    $('#jump_scare2').hide();
    $('#jump_scare3').hide();
    $('#jump_scare4').hide();
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

    // Get the modal
    var modal = document.getElementById('myModal');

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        $('#displayTime').html('Time consumed: ' + getTimeElapsed() + '<//br>Chests opened: ' + getChestsOpened());
        modal.style.display = "block";
    }


})

function confirmLevel() {
    confirmationNeeded = false;
    $('#confirmationPopup').hide();
}

var nameValue;

function handleData() {
    nameValue = document.getElementById("uniqueID").value;
    console.log(nameValue);
    $('#confirmationPopup').show();
}



