

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
      //gravity: {y:200} 
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
}

const VELOCITY = 200; 

let bird = null;
let totaldelta = null; 

function create(){
  this.add.image(0,0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(config.width/10, config.height/2, 'bird').setOrigin(0);//bird.body.gravity.y = 200; another way to do gravity
  bird.body.velocity.x= VELOCITY; 
}

function update(time, delta){
  if(bird.x >= config.width - bird.width){
    bird.body.velocity.x= -VELOCITY;
  }else if(bird.x<=0){
    bird.body.velocity.x=VELOCITY;
  }
}

new Phaser.Game(config);