import InGameSprite from "./InGameSprite.js";
import { State } from "../constants.js";

export default class Potion extends InGameSprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);
    }

    update() {
        if (this.collisions.isCollidingWithPlayer) {
            this.state = State.OFF;
        }
    }
}