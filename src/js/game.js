import * as ex from "excalibur";
import { LevelScene } from './levelScene';
import { EndGameScene } from './endGameScene';
import { ResourceLoader } from './resources';

class Game extends ex.Engine {
  constructor() {
    super({
      viewport: { width: 800, height: 600 },
      resolution: { width: 800, height: 600 },
    });

    
    ResourceLoader.load().then(() => {
      this.addScene('level', new LevelScene(this));
      this.addScene('endgame', new EndGameScene(this));
      this.goToScene('level');
    });
  }
}

const game = new Game();
game.start();
