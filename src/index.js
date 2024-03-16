import Phaser from "phaser";
import PlayScene from './scenes/PlayScene';

const WIDTH = 800; 
const HEIGHT = 600; 
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT/2};
const SHARED_CONFIG = {
  width: WIDTH, 
  height: HEIGHT, 
  startPosition: BIRD_POSITION,
}
//adjusts width and height of game
const config = {
  //WebGL (Web graphics Library) JS Api for rendering 2d and 3d graphics 
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics:{ 
    //arcade physics plugin, manages physics simulation 
    default:'arcade',
    arcade:{
      debug: true,
    },  
  },
  scene:[new PlayScene(SHARED_CONFIG)]
}
  
new Phaser.Game(config);