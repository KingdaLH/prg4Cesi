import * as ex from 'excalibur';

export class EndGameScene extends ex.Scene {
  game;
  elapsedTime;

  constructor(elapsedTime) {
    super();
    this.elapsedTime = elapsedTime;
  }

  onInitialize(engine) {
    this.game = engine;
    const formattedTime = this.elapsedTime ? this.elapsedTime.toFixed(2) : 'N/A';
    const viewportWidth = engine.drawWidth;
    const viewportHeight = engine.drawHeight;

    const label = new ex.Label({
      text: `Time taken: ${formattedTime} seconds`,
      pos: new ex.Vector(viewportWidth / 2, viewportHeight / 2),
      font: new ex.Font({
        family: 'Arial',
        size: 40,
        unit: ex.FontUnit.Px,
      }),
      color: ex.Color.White,
      textAlign: ex.TextAlign.Center,
    });

    const restartButton = new ex.ScreenElement({
      text: 'Restart',
      pos: new ex.Vector(viewportWidth / 2, viewportHeight / 2 + 100),
      font: new ex.Font({
        size: 20,
        family: 'Arial',
      }),
      color: ex.Color.Chartreuse,
      textAlign: ex.TextAlign.Center,
    });

    restartButton.on('pointerup', () => {
        // Reset the game state
        this.game.stop();
        this.game.clearAll();
        this.game.start();
      });

    this.add(label);
    this.add(restartButton);
  }
}