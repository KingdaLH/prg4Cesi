import '../css/style.css';
import * as ex from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { DVD } from './DVD';
import { npc } from './npc';
import { Player } from './player';
import { background } from './background';

export class Game extends ex.Engine {

    score;
    mylabel;
    
    constructor() {
        super({
            // set the viewport dimensions
            viewport: { width: 1900, height: 920 },
          
            // sets the resolution
            resolution: { width: 1920, height: 1080 },
            suppressHiDPIScaling: true,
          })
        this.start(ResourceLoader).then(() => this.startGame());
        this.showDebug(true);
    }
    
    startGame() {
        this.score = 0;
        console.log("start de game!");
        
        this.add(new background());

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
