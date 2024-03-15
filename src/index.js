

import Phaser from "phaser";

//adjusts width and height of game
const config = {
  //WebGL (Web graphics Library) JS Api for rendering 2d and 3d graphics 
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    //arcade physics plugin, manages physics simulation 
    default:'arcade',
    arcade:{
      debug: true,
    }
  },
  scene:{
    preload,
    create, 
    update, 
  }
}

//loading assets
function preload(){
this.load.image('sky', 'assets/sky.png');
this.load.image('bird', 'assets/bird.png');
this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 200; 
let bird = null;
let upperpipe = null; 
let lowerpipe = null; 
const PipeVerticalDistanceRange = [150, 250];
let PipeVerticalDistance = Phaser.Math.Between(...PipeVerticalDistanceRange);
const flapVelocity = 300; 
const initialBirdPosition = {x: config.width/10, y:config.height/2, }

function create(){
  this.add.image(0,0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);//bird.body.gravity.y = 200; another way to do gravity
  bird.body.gravity.y = 400; 

  upperpipe = this.add.sprite(400, 100, 'pipe').setOrigin(0,1); 
  lowerpipe = this.add.sprite(400, upperpipe.y + PipeVerticalDistance, 'pipe').setOrigin(0,0); 

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function update(time, delta){
  if(bird.y > config.height || bird.y < -bird.height){
    restartBirdPosition();
  }
}

function restartBirdPosition(){
  bird.x= initialBirdPosition.x; 
  bird.y= initialBirdPosition.y; 
  bird.body.velocity.y = 0;
}

function flap(){
bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);