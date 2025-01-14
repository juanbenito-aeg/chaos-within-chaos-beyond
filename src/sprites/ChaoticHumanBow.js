import Character from "./Character.js";
import globals from "../globals.js";
import { GRAVITY } from "../constants.js";
import { initArrow } from "../initialize.js";

export default class ChaoticHumanBow extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    update() {
        // |||||||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
        this.physics.ay = GRAVITY;

        this.physics.vy += this.physics.ay * globals.deltaTime;

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (Y AXIS)
        if (this.physics.vy > 0) {
            this.yPos += Math.max(this.physics.vy * globals.deltaTime, 1);
        } else {
            this.yPos += this.physics.vy * globals.deltaTime;
        }

        if (globals.nextArrowShotDelay.value === 0) {
            this.updateAnimationFrame();

            if ((this.frames.frameChangeCounter === 5) && (this.frames.frameCounter === 2)) {
                initArrow();
                globals.nextArrowShotDelay.value = 5;
            }
        } else {
            globals.nextArrowShotDelay.timeChangeCounter += globals.deltaTime;
        
            if (globals.nextArrowShotDelay.timeChangeCounter > globals.nextArrowShotDelay.timeChangeValue) {
                globals.nextArrowShotDelay.value--;
        
                globals.nextArrowShotDelay.timeChangeCounter = 0;
            }
        }

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