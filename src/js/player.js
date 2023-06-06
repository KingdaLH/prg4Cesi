import * as ex from "excalibur";
import { Resources } from "./resources";
import { DVD } from './DVD';
import { SoundManager } from "./SoundManager";

export class Player extends ex.Actor {

    game
    soundManager;

    constructor() {
        super({ width: Resources.Reticle.width, height: Resources.Reticle.height });
        this.colliderId = 15;
    }

    onInitialize(engine) {
        super.onInitialize(engine); // Call base onInitialize

        this.soundManager = new SoundManager();
        this.soundManager.onInitialize(engine);

        this.game = engine
        this.anchor = new ex.Vector(0.5, 0.5);

        this.graphics.use(Resources.Reticle.toSprite());
        this.w = Resources.Reticle.width;
        this.h = Resources.Reticle.height;
        this.pos = new ex.Vector(200, 200);
        this.scale = new ex.Vector(0.3, 0.3);
        const circle = new ex.CircleCollider({
            radius: 30, // 10 pixel radius
          })
        this.collider.set(circle)
        // Enable gamepad support
        engine.input.gamepads.enabled = true;

        this.on("precollision", (event) => this.shoot(event))

        this.soundManager.playBGM();
    }

    shoot(event) {

        const kb = this.game.input.keyboard;
        if (kb.isHeld(ex.Input.Keys.Space)) {
            console.log("SHOOT");
            this.soundManager.playShootSound();
           // console.log(event);
           if(event.other.hittingPlayer) {
            event.other.die()
           }
           
        }
    }

    onPreUpdate(engine) {

        this.keyboardFunctionality(engine);
    }


    keyboardFunctionality(engine) {
        let xSpeed = 0
        let ySpeed = 0
        let kb = engine.input.keyboard

        if (kb.isHeld(ex.Input.Keys.W) || kb.isHeld(ex.Input.Keys.Up)) {
            ySpeed = -300
        }
        if (kb.isHeld(ex.Input.Keys.S) || kb.isHeld(ex.Input.Keys.Down)) {
            ySpeed = 300
        }
        if (kb.isHeld(ex.Input.Keys.A) || kb.isHeld(ex.Input.Keys.Left)) {
            xSpeed = -300
        }
        if (kb.isHeld(ex.Input.Keys.D) || kb.isHeld(ex.Input.Keys.Right)) {
            xSpeed = 300
        }

        
        this.vel = new ex.Vector(xSpeed, ySpeed)


        this.pos.x = clamp(this.pos.x, this.width/2, engine.drawWidth - this.width/2);
        this.pos.y = clamp(this.pos.y, this.height/3, engine.drawHeight - this.height/2);
    }

    gamepadControls() {
        let xSpeed = 0
        let ySpeed = 0

        if (this.gamepad.buttons[ex.Input.Buttons.Up].pressed) {
            ySpeed = 300
        }
        if (this.gamepad.buttons[ex.Input.Buttons.Down].pressed) {
            ySpeed = -300
        }
        if (this.gamepad.buttons[ex.Input.Buttons.Right].pressed) {
            xSpeed = 300
        }
        if (this.gamepad.buttons[ex.Input.Buttons.Left].pressed) {
            xSpeed = -300
        }

        this.pos.x = clamp(this.pos.x, this.width/2, engine.drawWidth - this.width/2);
        this.pos.y = clamp(this.pos.y, this.height/3, engine.drawHeight - this.height/2);
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}