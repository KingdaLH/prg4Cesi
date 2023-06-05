import { LevelScene } from './levelScene';
import { EndGameScene } from './endGameScene';
import { resourceLoader } from './resources';

export class Game extends ex.Engine {
  constructor() {
    super({
      viewport: { width: 800, height: 600 },
      resolution: { width: 800, height: 600 },
    });

    this.addScene('level', new LevelScene(this));
    this.addScene('endgame', new EndGameScene(this));
    resourceLoader.load().then(() => this.goToScene('level'));
  }
}
