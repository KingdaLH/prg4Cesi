import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class background extends Actor {

    constructor() {
        super();
        
    }

    onInitialize(engine) {
        this.anchor = new Vector(0.5, 0.5);

        this.graphics.use(Resources.Background.toSprite());
        this.w = Resources.Background.width;
        this.h = Resources.Background.height;
        this.pos = new Vector(960, 540);
    }
}