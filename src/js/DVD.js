import { Actor, Vector, randomInRange, Random } from "excalibur";
import { Resources } from "./resources";
export class DVD extends Actor {

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height });
    }

    onInitialize(engine) {  
        this.anchor = new Vector(0.5, 0.5);
        this.rand = new Random();
        this.graphics.use(Resources.Fish.toSprite());
        this.w = Resources.Fish.width;
        this.h = Resources.Fish.height;
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            this.rand.integer(this.h, engine.drawHeight - this.h)
        );
        this.vel = new Vector(Math.random() * 120 - 20, Math.random() * 120 - 20);
        // flip
        this.scale = new Vector(Math.random() * 0.1 + 0.5, Math.random() * 0.2 + 0.5);
        
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.on("pointerup", (event => {
            this.die(engine);
        }))

    }

    die (engine) {
        console.log(`aaaaa`);
        this.pos = new Vector(100, 100);
        engine.updateScore();
        this.kill();
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