import Phaser from "phaser";
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene'; 
import PreLoadScene from "./scenes/PreLoadScene";
import ScoreScene from "./scenes/ScoreScene";

const WIDTH = 800; 
const HEIGHT = 600; 
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT/2};
const SHARED_CONFIG = {
  width: WIDTH, 
  height: HEIGHT, 
  startPosition: BIRD_POSITION,
}

const Scenes = [PreLoadScene, MenuScene, ScoreScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))


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
  scene:initScenes()
}
  
new Phaser.Game(config);