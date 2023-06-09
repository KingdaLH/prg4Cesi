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
    const formattedTime = this.elapsedTime !== undefined ? this.elapsedTime.toFixed(2) : 'N/A';
    const viewportWidth = engine.drawWidth;
    const viewportHeight = engine.drawHeight;

    // const label = new ex.Label({
    //   text: `Time taken: ${formattedTime} seconds`,
    //   pos: new ex.Vector(viewportWidth / 2, viewportHeight / 2),
    //   font: new ex.Font({
    //     family: 'Arial',
    //     size: 40,
    //     unit: ex.FontUnit.Px,
    //   }),
    //   color: ex.Color.White,
    //   textAlign: ex.TextAlign.Center,
    // });

    const restartText = new ex.Label({
      text: 'Please reload the page',
      pos: new ex.Vector(viewportWidth / 2, viewportHeight / 2 + 100),
      font: new ex.Font({
        size: 20,
        family: 'Arial',
      }),
      color: ex.Color.Chartreuse,
      textAlign: ex.TextAlign.Center,
    });

    engine.input.keyboard.on("down", (evt) => {
      if (evt.key === ex.Input.Keys.Space) {
        // console.log(this.flipLabel.visible)
        this.restart();
      }
    })

    //this.add(label);
    this.add(restartText);
  }

  restart() {
    // Reset the game state
    window.location.reload;
  }

}