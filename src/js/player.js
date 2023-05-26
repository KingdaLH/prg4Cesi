import * as ex from "excalibur";
import { Resources } from "./resources";

export class Player extends ex.Actor {
    constructor() {
        super({ width: Resources.Reticle.width, height: Resources.Reticle.height });
    }

    onInitialize(engine) {
        super.onInitialize(engine); // Call base onInitialize

        this.anchor = new ex.Vector(5, -10);

        this.graphics.use(Resources.Reticle.toSprite());
        this.w = Resources.Reticle.width;
        this.h = Resources.Reticle.height;
        this.pos = new ex.Vector(100, 100);
        this.scale = new ex.Vector(10, 10);

        // Enable gamepad support
        engine.input.gamepads.enabled = true;

        // Add event listener for gamepad input
        engine.on('update', () => {
            const xAxisValue = engine.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickX);
            const yAxisValue = engine.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickY);

            // Set player velocity based on gamepad input
            const speed = 100; // Adjust the speed as needed
            this.vel = new ex.Vector(xAxisValue * speed, yAxisValue * speed);
        });
    }

    onPostUpdate(engine) {
        // Apply player velocity to position
        this.pos = this.pos.add(this.vel.scale(engine.deltaTime));
        this.vel = ex.Vector.Zero.clone(); // Reset velocity after applying

        // Make sure the player stays within the game boundaries
        const gameWidth = engine.drawWidth;
        const gameHeight = engine.drawHeight;
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        
        this.pos.x = clamp(this.pos.x, halfWidth, gameWidth - halfWidth);
        this.pos.y = clamp(this.pos.y, halfHeight, gameHeight - halfHeight);
    }
}

// Clamp function to restrict a value within a range
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
