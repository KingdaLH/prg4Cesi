import * as ex from "excalibur";
import { Resources } from "./resources";
import { Player } from './player';
import { DVD } from './DVD';
import { background } from './background';
import { npc } from './npc';

export class LevelScene extends ex.Scene {
  score;
  mylabel;

  constructor(engine) {
    super(engine);
    this.score = 0;
    console.log("start the game!");

    this.add(new background());

    for (let i = 0; i < 15; i++) {
      this.add(new DVD(this));
    }

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
  }

  updateScore() {
    this.score++;
    this.mylabel.text = `score: ${this.score}`;
    if (this.score >= 15) {
      this.engine.goToScene('endgame');
    }
  }

  spawnEnemy() {
    this.add(new DVD());
    console.log('spawned');
  }
}

// Create the Engine instance
const engine = new ex.Engine({
  width: 800,
  height: 600,
  displayMode: ex.DisplayMode.FullScreen
});

// Load resources here...

// Create and start the LevelScene
const levelScene = new LevelScene(engine);
engine.addScene('level', levelScene);
engine.goToScene('level');

// Start the engine
engine.start();
