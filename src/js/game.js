import '../css/style.css';
import * as ex from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { DVD } from './DVD';
import { npc } from './npc';
import { Player } from './player';

export class Game extends ex.Engine {

    score;
    mylabel;
    
    constructor() {
        super( )
        this.start(ResourceLoader).then(() => this.startGame());
        this.showDebug(true);
    }
    
    startGame() {
        this.score = 0;
        console.log("start de game!");
        
        //const fish = new DVD();
        for (let i = 0; i < 15; i++) {
            this.add(new DVD());
        };

        this.mylabel = new ex.Label({
        text: `score: ${this.score}`,
        pos: new ex.Vector(100, 100),
        font: new ex.Font({
            family: 'impact',
            size: 24,
            unit: ex.FontUnit.Px
        })
        });
        this.add(this.mylabel);
        this.add(new npc());
        this.add(new Player())
    }

    onPostUpdate(engine) {
        this.handleGamepadInput;
    }


    updateScore() {
        this.score++;
        this.mylabel.text = `score: ${this.score}`;
    } 

    spawnEnemy() {
        this.add(new DVD());
        console.log('spawned')
    }
}

new Game();
