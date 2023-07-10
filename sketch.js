// our VR world object
let world;

let dog;

let container

let particles = [];
let ornaments = [];


let pointerX,pointerY,pointerZ


function setup() {

  let buffer=createCanvas(512,512)
  let buffer1 = buffer.id();
  background(255)

  // create a VR World (tell it to look for the 'VRScene' id for our scene tag)
  world = new World('VRScene');

  // set a background color (RGB)
  world.setBackground(0, 0, 0);

  // cone primitive
    var co = new Cone({
              x: 4 , y:6, z:0,
              height:8,
              radiusBottom: 3, radiusTop: 0.01,
              red:0, green:200, blue:0,
              overFunction: function(theBox,intersectionInfo) {
                pointerX=intersectionInfo.point3d.x
                pointerY=intersectionInfo.point3d.y
                pointerZ=intersectionInfo.point3d.z
              },

              clickFunction:function(theBox){
                let temp = new Box({
                  x:pointerX,y:pointerY,z:pointerZ,
                  width:0.5,height:0.5,depth:0.5,
                  red:random(0,255),
                  green:random(0,255),
                  blue:random(0,255),
                })
                world.add(temp)
                ornaments.push(temp)
              }
            });
    world.add(co);

    // cylinder primitive
    var cl = new Cylinder({
              x: 4 , y:1, z:0,
              height:2,
              radius: 0.5,
              red:80, green:54, blue:54,
            });
    world.add(cl);


    container = new Container3D({x:4, y:0, z:0});

    // add the container to the world
    world.add(container);

    dog = new GLTF({
    asset: 'dog',
    x: -1.5,
    y: 1,
    z: -1.5,
    });
    container.addChild(dog);

  // make a floor
  let floor = new Plane({
    x: 0,
    y: 0,
    z: 0,
    width: 100,
    height: 100,
    rotationX: -90,
    red:50,
    green:50,
    blue:50,
  });
  world.add(floor);


  let theCanva = new Plane({
    x: -1,
    y: 4,
    z: 4,
    width: 5,
    height: 5,
    asset:buffer1,
    dynamicTexture: true,
    dynamicTextureWidth: 512,
    dynamicTextureHeight: 512
    
  });
  world.add(theCanva)


  let draw = new Box({
    x:-2,y:0.5,z:4,
    width:1,
    height:1,
    red:255,
    green:0,
    blue:0,
  clickFunction:function(theBox){
    if (mouseIsPressed){
    fill(random(255),random(255),random(255))
    buffer.ellipse(mouseX,mouseY,1,1)
  }
  }
  })
  world.add(draw)

  let clear = new Box({
    x:0,y:0.5,z:4,
    width:1,
    height:1,
    red:0,
    green:255,
    blue:0,
    clickFunction:function(theBox){
      buffer.background(255)
    }
  })
  world.add(clear)

}

function draw() {


  container.spinY(2);

  // always create a new particle
  var temp = new Particle(random(-20,20), 30, random(-20,20));

  // add to array
  particles.push( temp );

  // draw all particles
  for (var i = 0; i < particles.length; i++) {
    var result = particles[i].move();
    if (result == "gone") {
      particles.splice(i, 1);
      i-=1;
    }
  }

  for (var i = 0; i < ornaments.length; i++) {
    ornaments[i].spinY(0.5)
  }

}


class Particle {

  constructor(x,y,z) {

    // construct a new Box that lives at this position
    this.myBox = new Plane({
                x:x, y:y, z:z,
                asset:'snowflake',
                width:0.6,
                height:0.6,
                transparent:true,
                side:'double'

    });

    // add the box to the world
    world.add(this.myBox);

  }

  // function to move our box
  move() {
    // compute how the particle should move
    // the particle should always move up by a small amount
    var yMovement = -0.05;

    // set the position of our box (using the 'nudge' method)
    this.myBox.nudge(0, yMovement, 0);
    this.myBox.spinY(1)

    if (this.myBox.getY() < 0) {
      // remove the box from the world
      world.remove(this.myBox);
      return "gone";
    }
    else {
      return "ok";
    }
  }
}

