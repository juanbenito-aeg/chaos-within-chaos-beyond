import InGameSprite from "./InGameSprite.js";

export default class Character extends InGameSprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);

        this.lifePoints        = lifePoints;        // LIFE POINTS
        this.afterAttackLeeway = afterAttackLeeway; // TIMING OF THE LEEWAY GIVEN TO THE SPRITE WHEN THEY ARE ATTACKED (IN ORDER TO AVOID THEM BEING INSTANTLY KILLED EVEN IF THEY HAVE MORE THAN ONE LIFE POINT)
    }
}