import * as ex from "excalibur";
import { Resources } from "./resources";
import { Player } from './player';
import { LevelScene } from "./levelScene";
export class DVD extends ex.Actor {

    hittingPlayer = false;

    levelScene

    constructor(levelScene) {
        super({
          width: Resources.Fish.width * 0.2,
          height: Resources.Fish.height * 0.2
        });
        this.levelScene = levelScene;
        this.initGraphics();
    }

    onInitialize(engine) {  
    
        this.anchor = new ex.Vector(0.5, 0.5);
        this.rand = new ex.Random();
        this.w = Resources.Fish.width*0.2;
        this.h = Resources.Fish.height*0.2;
        this.pos = new ex.Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            this.rand.integer(this.h, engine.drawHeight - this.h)
        );
        this.vel = new ex.Vector(Math.random() * 120 - 20, Math.random() * 120 - 20);
        // flip
        this.scale = new ex.Vector(Math.random() * 1 + 2, Math.random() * 1 + 2);
        
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.on("pointerup", (event => {
            this.die();
        }))

        
        this.on("collisionstart", (event) => this.hitSomething(event));
        this.on("collisionend", (event) => this.notHitSomething(event));
    }

    hitSomething(event) {

         // Check if the collided object is an instance of the DVD class
         if (event.other instanceof Player){
           this.hittingPlayer = true
         }
    }
    
    notHitSomething(event) {

         // Check if the collided object is an instance of the DVD class
         if (event.other instanceof Player){
           this.hittingPlayer = true
         }
    }


    die () {
        console.log(`aaaaa`);
        this.pos = new ex.Vector(100, 100);
        this.levelScene.updateScore();
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

    initGraphics = () => {
        const spriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.Bird,
            grid: {
                rows: 1,
                columns: 5,
                spriteWidth: 40,
                spriteHeight: 40
            }
        });
        
            let sprites = [];
        
            for (let i = 0; i < spriteSheet.columns; i++)
            {
                sprites[i] = spriteSheet.getSprite(i, 0);
                sprites[i].width = 40;
                sprites[i].height = 40;
        
                if (!sprites[i]) {return};
                console.log(sprites[i])
            }
        
            let duration = 250;
            const idleAnimation = new ex.Animation({
                frames: [
                    {
                        graphic: sprites[0],
                        duration: duration
                    },
                    {
                        graphic: sprites[1],
                        duration: duration
                    },
                    {
                        graphic: sprites[2],
                        duration: duration
                    },
                    {
                        graphic: sprites[3],
                        duration: duration
                    },
                    {
                        graphic: sprites[4],
                        duration: duration
                    }
                ]
            })
            this.graphics.use(idleAnimation);
        }
}