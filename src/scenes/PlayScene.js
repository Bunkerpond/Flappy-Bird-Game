//to run and host game put npm run dev in terminal

import BaseScene from './BaseScene';

const PIPES_T0_RENDER = 4;


class PlayScene extends BaseScene {

  constructor(config) {
    super('PlayScene', config);

    this.bird = null;
    this.pipes = null;
    this.isPause = false;
    this.pipeHoriztonalDistance = 0;
    this.flapVelocity = 300; 

    this.score = 0; 
    this.scoreText = '';

    this.currentDifficulty = 'easy';
    this.difficulties = {
        'easy': {
            pipeHorizontalDistanceRange: [300, 350],
            pipeVerticalDistanceRange: [150, 200],
        },
        'normal': {
            pipeHorizontalDistanceRange: [280, 330],
            pipeVerticalDistanceRange: [140, 190],
        },
        'hard': {
            pipeHorizontalDistanceRange: [250, 310],
            pipeVerticalDistanceRange: [120, 150],
        },
    }

  }

//   preload() {
//     this.load.image('sky', 'assets/sky.png');
//     this.load.image('bird', 'assets/bird.png');
//     this.load.image('pipe', 'assets/pipe.png');
//     this.load.image('pause', 'assets/pause.png');
//   }

  create() {
    //this.createBG();
    this.currentDifficulty = 'easy'; 
    super.create();
    this.createBird();
    this.createPipes();
    this.createCollider();
    this.createScore();
    this.createPause();
    this.handleInputs();
    this.listenToEvents();

    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bird', {start: 8, end:15}), 
        frameRate: 8, 
        //repeat unlimittedly 
        repeat: -1
    })

    this.bird.play('fly');

  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  listenToEvents() {
    if (this.pauseEvent) { return; }
    this.pauseEvent = this.events.on('resume', () => {        
        this.initialTime = 3; 
        this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5);
        this.timedEvent = this.time.addEvent({
            delay: 1000, 
            callback: this.countDown,
            callbackScope: this, 
            loop: true,
        })
    })
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText('Fly in: ' + this.initialTime);
    if (this.initialTime <= 0) {
        this.isPause = false; 
        this.countDownText.setText('');
        this.physics.resume();
        this.timedEvent.remove();
    }
  }

    createBG(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
        .setFlipX(true)
        .setScale(2.5)
        .setOrigin(0);

        this.bird.setBodySize(this.bird.width, this.bird.height - 8);

        this.bird.body.gravity.y = 600;
        this.bird.setCollideWorldBounds(true);
    }

    createPipes(){
        this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_T0_RENDER; i++){  
        const upperPipe = this.pipes.create(0, 0, 'pipe')
            .setImmovable(true)
            .setOrigin(0, 1);
        const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);

        this.placePipe(upperPipe, lowerPipe)
        }

  this.pipes.setVelocityX(-200);
    }

    createCollider(){
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore(){
        this.score = 0;
        const bestScore = localStorage.getItem('bestScore'); 
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '32px', fill: '#000'});
        this.add.text(16, 52, `Best Score: ${bestScore || 0}`, {fontSize: '18px', fill: '#000'});
    }

    createPause(){
        this.isPause = false; 
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
        .setInteractive()
        .setScale(3)
        .setOrigin(1)

        pauseButton.on('pointerdown', () => {
        this.isPause = true;
        this.physics.pause();
        this.scene.pause(); 
        this.scene.launch('PauseScene');

        })

    }

    handleInputs(){
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }


    checkGameStatus(){
        if(this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0){
            this.gameOver();
          }
    }

    placePipe(uPipe, lPipe){
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHoriztonalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);
  
    
    uPipe.x = rightMostX + pipeHoriztonalDistance;
    uPipe.y = pipeVerticalPosition;
  
    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance
  }
  
     recyclePipes() {
    const tempPipes = []; 
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right <= 0){
        tempPipes.push(pipe);
        if(tempPipes.length ===2){
          this.placePipe(...tempPipes);
          this.increaseScore();
          this.saveBestScore();
          this.increaseDifficulty();
        }
      }
    })
  }

  increaseDifficulty(){
    if(this.score === 10){
        this.currentDifficulty = 'normal';
    }
    if (this.score === 25 ){
        this.currentDifficulty = 'hard';
    }
  }

   getRightMostPipe(){
    let rightMostX = 0; 
  
  
    this.pipes.getChildren().forEach(function(pipe){
      rightMostX = Math.max(pipe.x, rightMostX);
    })
  
  return rightMostX; 
  }
  
  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore){
        localStorage.setItem('bestScore', this.score); 
    }

  }

  gameOver(){
    this.physics.pause();
    this.bird.setTint(0xf70202);
    this.saveBestScore(); 
    this.time.addEvent({
        delay:1000, 
        callback: () => {
            this.scene.restart();
        },
        loop: false
    })
  }
  
   flap(){
    if(this.isPause){return;}
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  increaseScore(){
    this.score += 1; //did this and not ++ so i can change score if wanted in the future
    this.scoreText.setText(`Score: ${this.score}`)
  }



}

export default PlayScene;