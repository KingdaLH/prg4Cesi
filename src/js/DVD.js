import {Actor, Vector, randomInRange} from "excalibur";
import { Resources } from "./resources";
export class DVD extends Actor {

    constructor () {
        super({width:Resources.Fish.width, height:Resources.Fish.height});
    }

    onInitialize(engine) {
        this.anchor = new Vector(0,0);
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(randomInRange(100, -10), randomInRange(-200, 400));
        this.vel = new Vector(randomInRange(10, 100),randomInRange(10, 100));
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.on("pointerup", (event => {
            console.log(`aaaaa`);
            this.pos = new Vector(100, 100);
            this.kill();
        }))
        
    }

    onPostUpdate(engine) {
        if (this.pos.x < 0 || this.pos.x + Resources.Fish.width > engine.drawWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y + Resources.Fish.height > engine.drawHeight) {
            this.vel.y *= -1;
        }
    }
    
}