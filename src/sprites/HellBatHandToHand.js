import Character from "./Character.js";
import globals from "../globals.js";

export default class HellBatHandToHand extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    update() {
        const amplitude = 80;
    
        this.physics.angle += this.physics.omega * globals.deltaTime;
    
        this.xPos += this.physics.vx * globals.deltaTime;
        this.yPos = this.physics.yRef + amplitude * Math.sin(this.physics.angle);
    
        this.updateAnimationFrame();

        // |||||||||||| UPDATE LIFE POINTS
        if (this.collisions.isCollidingWithPlayer) {
            const player = globals.screenSprites[0];
            
            if ((player.isLeftwardsHandToHandAttackEffective || player.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                this.lifePoints--;

                if (this.lifePoints === 0) {
                    this.state = State.OFF;
                } else {
                    this.afterAttackLeeway.value = 3;
                }
            }
        } else if (this.collisions.isCollidingWithMagicalOrb && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;

            if (this.lifePoints === 0) {
                this.state = State.OFF;
            } else {
                this.afterAttackLeeway.value = 3;
            }
        }

        if (this.afterAttackLeeway.value > 0) {
            this.afterAttackLeeway.timeChangeCounter += globals.deltaTime;
    
            if (this.afterAttackLeeway.timeChangeCounter >= this.afterAttackLeeway.timeChangeValue) {
                this.afterAttackLeeway.value--;
                this.afterAttackLeeway.timeChangeCounter = 0;
            }
        }
    }
}