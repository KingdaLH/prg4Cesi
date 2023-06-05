// game.js
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

    
    for (let i = 0; i < 15; i++) {
      this.add(new DVD());
    }

    this.add(new bigDVD);

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
    const npcActor = new npc();
    this.add(npcActor);

    console.log(npcActor);
    this.add(new Player());
  }

  onPostUpdate(engine) {

    this.game = engine;
    this.handleGamepadInput();
  }

  handleGamepadInput() {
    // Handle gamepad input logic here
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
