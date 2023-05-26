import * as ex from "excalibur";
import { Resources } from "./resources";

export class npc extends ex.Actor{

    constructor() {
        super();
        this.initGraphics();
    }

    onInitialize(engine){
        const { Vector } = ex;
        this.anchor = new ex.Vector(0,0);
        this.pos = new ex.Vector(100, 100);
        this.scale = new ex.Vector(5, 5);
    }

initGraphics = () => {
const spriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.Npc,
    grid: {
        rows: 1,
        columns: 9,
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
            },
            {
                graphic: sprites[5],
                duration: duration
            },
            {
                graphic: sprites[6],
                duration: duration
            },
            {
                graphic: sprites[7],
                duration: duration
            },
            {
                graphic: sprites[8],
                duration: duration
            }
        ]
    })
    this.graphics.use(idleAnimation);
}
}