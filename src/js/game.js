import '../css/style.css'
import { Actor, Engine, Vector, Random, Label, Color, Font, FontUnit , Input, Scene} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { DVD } from './DVD'

export class Game extends Engine {

    score;
    mylabel;
    
    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.score = 0;
        console.log("start de game!");
        
        //const fish = new DVD();
        for (let i = 0; i < 15; i++) {
            this.add(new DVD());
        };

        this.mylabel = new Label({
        text: `score: ${this.score}`,
        pos: new Vector(100, 100),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
        });
        this.add(this.mylabel);
    }

    onPostUpdate(engine) {
        this.handleGamepadInput;
    }

    handleGamepadInput() {
        
        // Check for gamepad/joystick input
        window.addEventListener("gamepadconnected", function(e) {
        var gamepad = navigator.getGamepads()[e.gamepad.index];
        
        // Map gamepad/joystick input to click event
        var inputBinding = new Input.GamepadButtonBinding(gamepad, Input.Buttons.A);
        game.addBinding(inputBinding, "click");
        });
    }

    updateScore() {
        this.score++;
        this.mylabel.text = `score: ${this.score}`;
    } 
}

new Game();
