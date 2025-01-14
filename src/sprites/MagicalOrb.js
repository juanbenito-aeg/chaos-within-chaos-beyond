import InGameSprite from "./InGameSprite.js";
import globals from "../globals.js";
import { State } from "../constants.js";

export default class MagicalOrb extends InGameSprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);
    }

    updatePhysics() {
        this.xPos += this.physics.vx * globals.deltaTime;
    
        this.updateAnimationFrame();

        if ((globals.nextOrbThrowDelay.value <= 0) && ((this.xPos <= (0 - this.imageSet.xDestinationSize)) || (this.xPos >= globals.canvas.width))) {
            globals.nextOrbThrowDelay.timeChangeCounter = 0;
            globals.nextOrbThrowDelay.value = 5;
            this.state = State.OFF;
        } else if (globals.nextOrbThrowDelay.value > 0) {
            globals.nextOrbThrowDelay.timeChangeCounter += globals.deltaTime;
        
            if (globals.nextOrbThrowDelay.timeChangeCounter > globals.nextOrbThrowDelay.timeChangeValue) {
                globals.nextOrbThrowDelay.value--;
        
                globals.nextOrbThrowDelay.timeChangeCounter = 0;
            }
        }
    }
}