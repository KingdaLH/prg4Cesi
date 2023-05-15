import '../css/style.css'
import { Actor, Engine, Vector, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { DVD } from './DVD'

export class Game extends Engine {

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const fish = new DVD()
        
        this.add(fish);
        this.add(fish);
        this.add(fish);
    }
}

new Game()