

import Phaser from "phaser";

//adjusts width and height of game
const config = {
  //WebGL (Web graphics Library) JS Api for rendering 2d and 3d graphics 
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    //arcade physics plugin, manages physics simulation 
    default:'arcade'
  },
  scene:{
    preload,
    create, 
  }
}

//loading assets
function preload(){
this.load.image('sky', 'assets/sky.png');
}


function create(){
//x-400
//y-300
//key of the image 
  //this.add.image(config.width/2, config.height/2, 'sky'); <------ One way to do it but below is better
  this.add.image(0,0, 'sky').setOrigin(0);
}

new Phaser.Game(config);