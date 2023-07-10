// variable to hold a reference to our A-Frame world
let world;

let sensor;

let walkerArray;

// a box that will serve as the user's avatar
let bunny;
let normalBoxes=[]
let n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12,n13,n14,n15,n16,n17, n18, n19, n20, n21
let rotatingBoxes=[]
let r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14,r15,r16,r17,r18, r19
let greenBoxes=[] 
let g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14,g15,g16,g17,g18
let walls=[] 
let w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18
let c1, c2, c3
let fallSound, jumpSound, winSound
// let bunnyContainer
var h = 0
var hChange = 0.3
let jumpMode=false
let jumpPower=0.3
let gravity=-0.01
let gameIsOn=false
let coins=[]
let okToJump=false
let texture1
let hitThePlatform
let startFalling=false
let xPos = 5
let yPos = 5
let radius=5
let f1
let fallingSpeed=0.3




function setup() {

	document.getElementById('start').style.display = 'block'; // this will show the div
	texture1 = createCanvas(512,512).id()
	  noStroke();

	  // request a detailed noise landscape
	  noiseDetail(24);

	  // create our walker array
	  walkerArray = [];

	  // fill the walker array with 100 walkers!

	  // loop 100 times
	  for (let i = 0; i < 2; i++) {

	    // create a NoiseWalker
	    let tempWalker = new NoiseWalker( random(width), random(height) );

	    // put the walker into the array
	    walkerArray.push( tempWalker );
	  }

	jumpSound = loadSound('teleport.wav')
	fallSound = loadSound('fall.wav')
	winSound = loadSound('win.wav')
	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	let sky = new Sky({
		asset: 'sky1'
	});
	world.add(sky);

	// // disable mouse camera controls
	//world.camera.cameraEl.setAttribute('look-controls', "pointerLockEnabled: true");
	//world.camera.cameraEl.removeAttribute('wasd-controls');
	//world.camera.cameraEl.removeAttribute('look-controls');
	

	//construct the boxes
		n1=new normalBox(0,0)
		n2=new normalBox(7,0)
		n3=new normalBox(0,-7)
		n4=new normalBox(21,-7)
		n5=new normalBox(28,0)
		n6=new normalBox(33,-7)
		n7=new normalBox(35,0)
		n8=new normalBox(57,0)
		n9=new normalBox(40,-13)
		n10=new normalBox(40,-20)
		n11=new normalBox(54,-13)
		n12=new normalBox(53,-18)
		n13=new normalBox(21,-28)
		n14=new normalBox(34,-31)
		n15=new normalBox(46,-31)
		n16=new normalBox(36,-43)
		n17=new normalBox(50,-43)
		
		n18=new normalBox(74,0)
		n19=new normalBox(69,-18)
		n20=new normalBox(69,-30)
		n21=new normalBox(74,-49)

		r1=new rotatingBox(7,-7)
		r2=new rotatingBox(21,0)
		r3=new rotatingBox(55,-6)
		r4=new rotatingBox(47,-20)
		r5=new rotatingBox(28,-31)
		r6=new rotatingBox(40,-31)
		r7=new rotatingBox(52,-31)
		r8=new rotatingBox(29,-43)
		r9=new rotatingBox(43,-43)
		
		//top left corner
		r10=new rotatingBox(-2,-36)
		r11=new rotatingBox(2,-32)
		r12=new rotatingBox(1,-43)
		r13=new rotatingBox(5,-39)
		r14=new rotatingBox(9,-35)
		r15=new rotatingBox(12,-42)
		r16=new rotatingBox(16,-38)

		r17=new rotatingBox(69,0)
		r18=new rotatingBox(74,-7)
		r19=new rotatingBox(69,-24)

		g1=new greenBox(14,-3)
		g2=new greenBox(42,-3)
		g3=new greenBox(21,-18)
		g4=new greenBox(33,-17)

		g5=new greenBox(22,-38)
		g6=new greenBox(57,-27)
		g7=new greenBox(57,-40)
		g8=new greenBox(63,-40)
		g9=new greenBox(69,-40)
		g10=new greenBox(75,-40)
		g11=new greenBox(-2,-21)
		g12=new greenBox(3.5,-23)
		g13=new greenBox(9,-25)

		g14=new greenBox(69,-9)
		g15=new greenBox(74,-16)
		g16=new greenBox(74,-28)
		g17=new greenBox(75,-58)
		g18=new greenBox(69,-58)

		w1=new horizontalWall(35,6,88)
		w2=new horizontalWall(31,-49,80)
		w3=new horizontalWall(4.5,-13,23)
		w4=new horizontalWall(40,-26,24)
		w5=new horizontalWall(40,-37,24)
		w12=new horizontalWall(65,-67,28)
		
		w6=new verticalWall(-8,-21.5,53)
		w7=new verticalWall(80,-30.5,71)
		w8=new verticalWall(15,-23,18)
		w9=new verticalWall(27,-16,22)
		w10=new verticalWall(48,-7,20)
		w11=new verticalWall(63,-13.5,37)



	container = new Container3D({x:18, y:-5, z:-18,});
		world.add(container);
		c1 = new OBJ({
			asset: 'cloud_obj',
			mtl: 'cloud_mtl',
			x: -17,
			y: 0,
			z: -17,
			scaleX:0.1,
			scaleY:0.1,
			scaleZ:0.1,
			opacity:0.2,
		});

		c2 = new OBJ({
			asset: 'cloud_obj',
			mtl: 'cloud_mtl',
			x: -12,
			y: 0,
			z: -20,
			scaleX:0.2,
			scaleY:0.2,
			scaleZ:0.2,
			opacity:0.5,
		});

		c3 = new OBJ({
			asset: 'cloud_obj',
			mtl: 'cloud_mtl',
			x: -5,
			y: -3,
			z: -23,
			scaleX:0.4,
			scaleY:0.4,
			scaleZ:0.4,
			opacity:0.2,
		});
		// container.addChild(c1)
		// container.addChild(c2)
		// container.addChild(c3)

	//final steps
	let final1 = new Box({
		x:63, y:1, z:-58,
		width:4, height:1, depth:4,
		red:255, green:228, blue:131, 
		metalness:1.0,
	})
	final1.tag.object3D.userData.stairs = true;
	world.add(final1);

	let final2 = new Box({
		x:57, y:2.5, z:-58,
		width:4, height:1, depth:4,
		red:255, green:228, blue:131, 
		metalness:1.0,
	})
	final2.tag.object3D.userData.stairs = true;
	world.add(final2);

	let final3 = new Box({
		x:51, y:4, z:-58,
		width:4, height:1, depth:4,
		red:255, green:228, blue:131, 
		metalness:1.0,
	})
	final3.tag.object3D.userData.stairs = true;
	world.add(final3);


	bunny = new OBJ({
		asset: 'bunny_obj',
		mtl: 'bunny_mtl',
		x: 40,
		y: 8,
		z: -64,
		rotationY:60,
		scaleX:4,
		scaleY:4,
		scaleZ:4,
	});

	world.add(bunny);

	sensor = new Sensor();

	world.setUserPosition(0,20,0)
}


function draw() {

	for (let i = 0; i < rotatingBoxes.length; i++) {
		rotatingBoxes[i].spinX(0.3);
	}

	for(let i = 0; i < greenBoxes.length; i++){
		greenBoxes[i].nudge(0, greenBoxes[i].riseSpeed, 0)
		// bounce logic
		if ( greenBoxes[i].getY()> 2.5 || greenBoxes[i].getY() < -5.5) {
			greenBoxes[i].riseSpeed *= -1
		}
	}

	//container.spinY(0.1);

	  fill(0,20);
	  rect(0,0,width,height);

	  // visit each walker
	  for (let i = 0; i < walkerArray.length; i++) {
	    // ask the walker to move and display
	    walkerArray[i].move();
	    walkerArray[i].display();
	  }

	  if (gameIsOn){
//sensor
	// see what's below / in front of the user
	let whatsBelow = sensor.getEntityBelowUser();
	let objectAhead = sensor.getEntityInFrontOfUser();

	// if the W key is pressed
	// if (  keyIsDown(87)) {
	// 	// assume we cannot move forward
	// 	let okToMove = true;

	// 	//console.log(objectAhead);

	// 	// if there is an object, it is close and it is solid, prevent motion
	// 	if (objectAhead && objectAhead.distance < 1 && objectAhead.object.el.object3D.userData.solid) {
	// 		okToMove = false;
	// 	}
	// 	console.log(okToMove)
	// 	if (okToMove) {
	// 		world.moveUserForward(0.1);
	// 	}
	// }

	// if what's below us is a set of stairs we should adjust our y value so we are on top of it
	let cp = world.getUserPosition();
	if (whatsBelow) {
		// falling
		if (whatsBelow.distance >= 2.1) {
			world.setUserPosition( cp.x, cp.y-fallingSpeed, cp.z);
			hitThePlatform=false
		}

		else if (whatsBelow.object.el.object3D.userData.stairs && whatsBelow.distance < 2.1) {
			world.setUserPosition( cp.x, cp.y + (2-whatsBelow.distance), cp.z);
			okToJump=true
			if (hitThePlatform==false){
				jumpSound.play()
				hitThePlatform=true
			}
		}
	}

	else{
	 world.setUserPosition( cp.x, cp.y -fallingSpeed, cp.z);
	 if (startFalling==false && cp.y<-5){
	 	fallSound.play()
	 	startFalling=true
	 }
	}


	// if the S key is pressed
	if (  keyIsDown(83) ) {
		// move backwards (no collision detection)
		world.moveUserForward(-0.1);
	}

	jump()
	

	if (cp.y<-30){
		gameIsOn=false
		document.getElementById('end').style.display = 'block'; // this will hide the div

	}


	if (cp.x<51 && cp.x>49 && cp.z<-56 && cp.z>-60){
		gameIsOn=false
		winSound.play()
		document.getElementById('win').style.display = 'block'; // this will hide the div
	}

	}

}

function gameStart(){

	document.getElementById('start').style.display = 'none'; // this will hide the div
	gameIsOn = true 
}

function gameRestart(){

	document.getElementById('end').style.display = 'none'; // this will hide the div
	gameIsOn = true
	world.setUserPosition(0,20,0)
}

function gameWinRestart(){

	document.getElementById('win').style.display = 'none'; // this will hide the div
	gameIsOn = true
	world.setUserPosition(0,20,0)
}

function showInfo(){
	document.getElementById('start').style.display = 'block'; // this will hide the div
	gameIsOn = false 
}

class normalBox{
	constructor(x,z){
		this.nb = new Box({
		x:x, y:-1.5, z:z,
		width:4, height:1, depth:4,
		red:180, green:180, blue:180, 
		metalness:1.0,

	})
	normalBoxes.push(this.nb)
	this.nb.tag.object3D.userData.stairs = true;
	world.add(this.nb);
}

}

class rotatingBox{
	constructor(x,z){
		this.rb = new Box({
		x:x, y:-1.5, z:z,
		width:4, height:1, depth:4,
		asset:"bw",
		rotationX:random(0,180),
		repeatX:1.5,
		repeatY:1.5,
		metalness:1.0,
	})
	rotatingBoxes.push(this.rb)
	this.rb.tag.object3D.userData.stairs = true;
	world.add(this.rb);
	}
}


class greenBox{
	constructor(x,z){
		this.gb = new Box({
		x:x, y:random(-5.5,2.5), z:z,
		width:4, height:1, depth:10,
		red:91, green:226, blue:162,
		opacity:0.9
	})
	greenBoxes.push(this.gb)
	this.gb.tag.object3D.userData.stairs = true;
	world.add(this.gb);
	this.gb.riseSpeed=0.05
	}
}

class horizontalWall{
	constructor(x,z,l){
		this.w = new Box({
		x:x, y:-100, z:z,
		width: l, height:300, depth:2,
		asset: texture1,
		dynamicTexture: true,
		dynamicTextureWidth: 512,
		dynamicTextureHeight: 512,	
		repeatY: 10,	
		opacity:0.95,
		metalness:0,
	})
	walls.push(this.w)
	this.w.tag.object3D.userData.solid = true;
	world.add(this.w);
	}
}

class verticalWall{
	constructor(x,z,l){
		this.w = new Box({
		x:x, y:-100, z:z,
		width: 2, height:300, depth:l,
		asset: texture1,
		dynamicTexture: true,
		dynamicTextureWidth: 512,
		dynamicTextureHeight: 512,
		repeatY: 10,	
		opacity:0.95,
		metalness:0,
	})
	walls.push(this.w)
	this.w.tag.object3D.userData.solid = true;
	world.add(this.w);
	}
}


class Sensor {

	constructor() {
		// raycaster - think of this like a "beam" that will fire out of the
		// bottom of the user's position to figure out what is below their avatar
		this.rayCaster = new THREE.Raycaster();
		this.userPosition = new THREE.Vector3(0,0,0);
		this.downVector = new THREE.Vector3(0,-1,0);
		this.intersects = [];

		this.rayCasterFront = new THREE.Raycaster();
		this.cursorPosition = new THREE.Vector2(0,0);
		this.intersectsFront = [];
	}

	getEntityInFrontOfUser() {
		// update the user's current position
		let cp = world.getUserPosition();
		this.userPosition.x = cp.x;
		this.userPosition.y = cp.y;
		this.userPosition.z = cp.z;

		// make sure the camera is ready to go
		if (world.camera.cameraEl && world.camera.cameraEl.object3D && world.camera.cameraEl.object3D.children.length >= 2) {

			// cast a ray in front of the user and see what's there
			this.rayCasterFront.setFromCamera( this.cursorPosition, world.camera.cameraEl.object3D.children[1]);
			this.intersectsFront = this.rayCasterFront.intersectObjects( world.threeSceneReference.children, true );

			// determine which "solid" items are in front of the user
			for (let i = 0; i < this.intersectsFront.length; i++) {
				try {
					if (!this.intersectsFront[i].object.el.object3D.userData.solid) {
						this.intersectsFront.splice(i,1);
						i--;
					}
				}
				catch (e) {

				}
			}

			if (this.intersectsFront.length > 0) {
				return this.intersectsFront[0];
			}
			return false;
		}
	}

	getEntityBelowUser() {
		// update the user's current position
		let cp = world.getUserPosition();
		this.userPosition.x = cp.x;
		this.userPosition.y = cp.y;
		this.userPosition.z = cp.z;

		this.rayCaster.set(this.userPosition, this.downVector);
		this.intersects = this.rayCaster.intersectObjects( world.threeSceneReference.children, true );

		// determine which "solid" or "stairs" items are below
		for (let i = 0; i < this.intersects.length; i++) {
			if (!(this.intersects[i].object.el.object3D.userData.solid || this.intersects[i].object.el.object3D.userData.stairs)) {
				this.intersects.splice(i,1);
				i--;
			}
		}

		if (this.intersects.length > 0) {
			return this.intersects[0];
		}
		return false;
	}
}

function jump(){
	let cp = world.getUserPosition();
	if (keyIsDown(32) && okToJump) {
		startFalling=false
		jumpMode=true
	}
	if (jumpMode && jumpPower>=0 ){
		world.setUserPosition( cp.x, cp.y +jumpPower, cp.z);
		jumpPower+=gravity
	}

	if (jumpPower<=0){
		okToJump=false
		jumpMode=false
		jumpPower=0.3
	}
}

class NoiseWalker {

  constructor(x, y) {
    // store our position
    this.x = x;
    this.y = y;

    // create a "noise offset" to keep track of our position in Perlin Noise space
    this.xNoiseOffset = random(0,1000);
    //this.yNoiseOffset = random(1000,2000);
  }

  // display mechanics
  display() {
    colorMode(HSB)
	  h += hChange
	  if (h >= 256){
	    hChange = -0.3
	  }

	  if (h <= 0){
	    hChange = 0.3
	  }
	  fill(h,70,50)
    rect(this.x, this.y, 20, 20);
    colorMode(RGB)
  }

  // movement mechanics
  move() {
    // compute how much we should move
    let xMovement = map( noise(this.xNoiseOffset), 0, 1, 1, 10 );
    //let yMovement = map( noise(this.yNoiseOffset), 0, 1, -1, 1 );

    // update our position
    this.x += xMovement;
   // this.y += yMovement;

    // update our noise offset values
    this.xNoiseOffset += 0.01;
   // this.yNoiseOffset += 0.01;

   if (this.x>512){
   	this.x=0
   }
  }
}


