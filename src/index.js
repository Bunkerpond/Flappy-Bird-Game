

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
debugger
}


function create(){
debugger
}

new Phaser.Game(config);