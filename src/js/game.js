import * as ex from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { DVD } from './DVD';
import { npc } from './npc';
import { Player } from './player';
import { background } from './background';
import { EndGameScene } from './endGameScene';
import { Timer } from './timer.js';
import { bigDVD } from "./bigDVD.js";

export class Game extends ex.Engine {
  score;
  mylabel;
  game;
  isPaused;
  backgroundActor;
  isFlipButtonPressed;

  constructor() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const viewportWidth = 1920;
    const viewportHeight = 1080;
    const scale = Math.min(screenWidth / viewportWidth, screenHeight / viewportHeight);

    const actualViewportWidth = viewportWidth * scale;
    const actualViewportHeight = viewportHeight * scale;

    super({
      viewport: { width: actualViewportWidth, height: actualViewportHeight, scalars: { scaleX: scale, scaleY: scale } },
      suppressHiDPIScaling: true,
    });

    this.isPaused = false;
    this.backgroundActor = null;
    this.isFlipButtonPressed = false;

    this.start(ResourceLoader).then(() => this.startGame());
    this.showDebug(true);

    // Add the EndGameScene to the engine's scenes
    this.addScene('endgame', new EndGameScene(0, this));
    
  }

  startGame() {
    this.score = 0;
    this.timer = new Timer();
    this.timer.start();

    console.log("start de game!");

    this.add(new background());
    this.backgroundActor = this.currentScene.actors.find(actor => actor instanceof background);
    
      this.input.pointers.primary.on('down', () => {
        if (this.isPaused) {
          this.isFlipButtonPressed = true;
        }
      });
    
      // Create flip label
      this.flipLabel = new ex.Label({
        text: 'The game is paused, welcome to the pause menu! Here you can do a few things. Press P if you want to resume the game. Press A for accesibility mode. Press F to flip the background!',
        pos: new ex.Vector(150, 150),
        color: ex.Color.black,
        font: new ex.Font({
          family: 'Arial',
          size: 12,
          unit: ex.FontUnit.Px
        })
      });
      this.flipLabel.anchor.setTo(0.5, 0.5);
      //this.flipLabel.visible = false;

    this.mylabel = new ex.Label({
      text: `score: ${this.score}`,
      pos: new ex.Vector(100, 100),
      font: new ex.Font({
        family: 'impact',
        size: 24,
        unit: ex.FontUnit.Px
      })
    });
    this.add(this.mylabel);
    this.add(new npc());

    this.add(new Player());

    for (let i = 0; i < 15; i++) {
      this.add(new DVD());
    }

    this.add(new bigDVD());

    this.input.keyboard.on("down", (evt) => {
      if (evt.key === ex.Input.Keys.P) {
        console.log(this.isPaused);
       // console.log(this.flipLabel.visible)
        this.togglePause();
      } else if (evt.key === ex.Input.Keys.F && this.isPaused) {
        this.flipBackground();
      } else if (evt.key === ex.Input.Keys.A && this.isPaused) {
        console.log('Activating accesibility mode');
        this.flipLabel.font.size = 15;
        this.mylabel.font.size = 48;
      }
    });

    this.input.pointers.primary.on('down', () => {
      if (this.isPaused) {
        this.isFlipButtonPressed = true;
      }
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.add(this.flipLabel);
      setTimeout(() => {
        this.stop();
      }, 100);
      console.log(this.flipLabel)
      //this.flipLabel.visible = true;
      //this.stop();
      //console.log(this.flipLabel.visible);
      // Add flip label to the scene
    } else {
      this.start();
      //this.flipLabel.visible = false;
      this.isFlipButtonPressed = false;
      // Add flip label to the scene
      this.remove(this.flipLabel);3
    }
  }
  
  

  onPostUpdate(engine) {
    this.game = engine;
    if (this.isPaused && this.isFlipButtonPressed) {
      this.flipBackground();
      this.isFlipButtonPressed = false;
    }
  }

  flipBackground() {
    if (this.backgroundActor) {
      this.backgroundActor.scale.y *= -1;
    }
  }

  updateScore() {
    this.score++;
    this.mylabel.text = `score: ${this.score}`;

    if (this.score >= 15) {
      this.timer.stop();
      const elapsedTime = this.timer.getElapsedTime();
      this.goToScene('endgame', { elapsedTime });
    }
  }

  spawnEnemy() {
    this.add(new DVD());
    console.log('spawned');
  }
}

// Create the Engine instance
const game = new Game();

// Start the engine
game.start();
