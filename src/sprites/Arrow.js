import InGameSprite from "./InGameSprite.js";
import globals from "../globals.js";
import { State } from "../constants.js";

export default class Arrow extends InGameSprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);
    }

    updatePhysics() {
        this.xPos += this.physics.vx * globals.deltaTime;
        
        if ((globals.nextArrowShotDelay.value <= 0) && ((this.xPos <= (0 - this.imageSet.xDestinationSize)) || (this.xPos >= globals.canvas.width))) {
            this.state = State.OFF;
        }
    }
}