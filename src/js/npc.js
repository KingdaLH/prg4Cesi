import * as ex from "excalibur";
import { Resources } from "./resources";

export class npc extends ex.Actor {
    game;
  constructor() {
    super();
    this.initGraphics();
  }

  onInitialize(engine) {
    const { Vector } = ex;
    this.game = engine;
    const viewportWidth = engine.drawWidth;
    const viewportHeight = engine.drawHeight;

    this.anchor = new ex.Vector(0.5, 0.5); 
    this.pos = new ex.Vector(viewportWidth / 2, viewportHeight / 2);
    this.scale = new ex.Vector(5, 5);
  }

  initGraphics = () => {
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Npc,
      grid: {
        rows: 1,
        columns: 9,
        spriteWidth: 40,
        spriteHeight: 40,
      },
    });

    let sprites = [];

    for (let i = 0; i < spriteSheet.columns; i++) {
      sprites[i] = spriteSheet.getSprite(i, 0);
      sprites[i].width = 40
        }
    }
}