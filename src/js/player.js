import * as ex from "excalibur";
import { Resources } from "./resources";

export class Player extends ex.Actor {
    constructor() {
        super({ width: Resources.Reticle.width, height: Resources.Reticle.height });

        this.colliderId = 15; // Assign a unique ID to the Player's Collider
    }

    onInitialize(engine) {
        super.onInitialize(engine); // Call base onInitialize

        this.anchor = new ex.Vector(0.5, 0.5);

        this.graphics.use(Resources.Reticle.toSprite());
        this.w = Resources.Reticle.width;
        this.h = Resources.Reticle.height;
        this.pos = new ex.Vector(200, 200);
        this.scale = new ex.Vector(0.2, 0.2);

        // Enable gamepad support
        engine.input.gamepads.enabled = true;
    }

    onPreUpdate(engine) {
        const xAxisValue = engine.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickX);
        const yAxisValue = engine.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickY);

        // Set player velocity based on gamepad input
        const speed = 100; // Adjust the speed as needed
        this.vel = new ex.Vector(xAxisValue * speed, yAxisValue * speed);

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
        this.vel = new ex.Vector(xspeed, yspeed)
    }

    onPostUpdate(engine) {
        // Apply player velocity to position
        this.pos = this.pos.add(this.vel.scale(engine.deltaTime));
        this.vel = ex.Vector.Zero.clone(); // Reset velocity after applying


        this.pos.x = clamp(this.pos.x, this.width/2, engine.drawWidth - this.width/2);
        this.pos.y = clamp(this.pos.y, this.height/3, engine.drawHeight - this.height/2);

        // Output the collider ID and position if it's outside the world bounds
        if (
            this.pos.x < this.width/2 ||
            this.pos.x > engine.drawWidth - this.width/2 ||
            this.pos.y < this.height/3 ||
            this.pos.y > engine.drawHeight - this.height/2
        ) {
            console.warn(`Collider with ID ${this.colliderId} is outside the world bounds.`);
        }
    }
}

// Clamp function to restrict a value within a range
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
