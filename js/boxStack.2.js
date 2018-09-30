
window.onload = function () {

function Start() {
    "use strict";
    var body = document.querySelector("body");

    //
    var Engine = Matter.Engine,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        World = Matter.World,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(body, {
        density: 0.0005,
        frictionAir: 0.06,
        render: {
            options: {
                isStatic: true,
                wireframes: false,
                width: 800,
                height: 600,
                background: "./img/background.png",
                visible: false
            }
        }
    });

    // add bodies

    // ground
        var ground = Bodies.rectangle(400, 600, 150, 232, {
            isStatic: true
        });

        var carpet = Bodies.rectangle(400, 470, 405, 14, {
            isStatic: false,
            friction: 0.8,
            density: 0.05,
            render: {
                visible: true

            }
        });

        var box = Bodies.rectangle(300, 100, 40, 40, {
            density: 0.0004
        });


    //var left wall
    var wallLeft = Bodies.rectangle(-28, 310, 60, 650, {
        isStatic: true,
        render: {
            visible: false
        }
    });

    // the Boxes
    var boxes = Composites.stack(220, 220, 4, 2, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 80, 80, {
            render: {
                sprite: {
                    texture: './img/heart.png'
                }
            }
        });
    });

    // add mouse control
    var mouse = MouseConstraint.create(engine, {
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true
                }
            }
        });
        //initial friction 
        var myAirFriction = 0.01;
        var myFriction = 0.8;
        var myRadius = 2;
        var nrOfBoxes = 0;

        Events.on(mouse, "mousedown", function (event) {
            var mousePosition = event.mouse.position;
            var randomPixel = Math.floor(38 * Math.random());
            box = Bodies.rectangle(mousePosition.x, mousePosition.y, 40, 40 + randomPixel, {
                density: 0.04,
                friction: myFriction,
                frictionAir: myAirFriction,
                chamfer: {radius: myRadius}
            });
            World.add(engine.world, box);
            nrOfBoxes = nrOfBoxes + 1;
            console.log("friction: " + myAirFriction + " radius: " + myRadius + " friction: " + myFriction);
            console.log("nr of boxes: " + nrOfBoxes);
            console.log("mosedown at " + mousePosition.x + " " + mousePosition.y);
            if (myAirFriction > 0) {
                myAirFriction = myAirFriction - 0.001;
            }
            if (myRadius < 8) {
                myRadius = myRadius + 0.5;
            }
            myFriction = Math.random();

        });

        World.add(engine.world, [ground, carpet, wallLeft, mouse]);

        Engine.run(engine);
    }

    Start();

};