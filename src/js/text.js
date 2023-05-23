import { Actor, Vector, randomInRange, Random, randomIntInRange } from "excalibur";
import { Resources } from "./resources";

export class DVD extends Actor {

    constructor() {
        super({});
    }

    onInitialize(engine) {
        const game = new Engine({});
        let time = 15;
        const text = new Text({
            text: time.toString()
        });

        const actor = new ex.Actor({
            pos: vec(100, 100)
        });

        actor.graphics.use(text);
    }
}