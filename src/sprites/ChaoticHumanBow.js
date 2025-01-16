import Character from "./Character.js";
import globals from "../globals.js";
import { State, GRAVITY } from "../constants.js";
import { initArrow, initPotionGreen, initPotionBlue } from "../initialize.js";

export default class ChaoticHumanBow extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway, nextArrowShotDelay) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    
        this.nextArrowShotDelay = nextArrowShotDelay;   // TIMING OF THE DELAY BETWEEN SUCCESSIVE ARROW SHOTS
    }

    updatePhysics() {
        // |||||||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
        this.physics.ay = GRAVITY;

        this.physics.vy += this.physics.ay * globals.deltaTime;

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (Y AXIS)
        if (this.physics.vy > 0) {
            this.yPos += Math.max(this.physics.vy * globals.deltaTime, 1);
        } else {
            this.yPos += this.physics.vy * globals.deltaTime;
        }

        if (this.nextArrowShotDelay.value === 0) {
            this.updateAnimationFrame();

            if (this.frames.frameCounter === 2) {
                initArrow(this);
                this.nextArrowShotDelay.value = 5;

                this.frames.frameCounter = 0;
            }
        } else {
            this.nextArrowShotDelay.timeChangeCounter += globals.deltaTime;
        
            if (this.nextArrowShotDelay.timeChangeCounter >= this.nextArrowShotDelay.timeChangeValue) {
                this.nextArrowShotDelay.value--;
        
                this.nextArrowShotDelay.timeChangeCounter = 0;
            }
        }
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS & SCORE
        if (this.collisions.isCollidingWithPlayer) {
            const player = globals.screenSprites[0];
            
            if ((player.isLeftwardsHandToHandAttackEffective || player.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                this.lifePoints--;

                globals.score += 150;

                if (this.lifePoints === 0) {
                    globals.score += 150;
                
                    this.state = State.OFF;
                } else {
                    this.afterAttackLeeway.value = 3;
                }
            }
        }
        
        if (this.collisions.isCollidingWithMagicalOrb && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;

            globals.score += 100;

            if (this.lifePoints === 0) {
                globals.score += 100;
                
                this.state = State.OFF;
            } else {
                this.afterAttackLeeway.value = 3;
            }
        }

        // |||||||||||| WHEN KILLED, DROP A GREEN OR A BLUE POTION
        if (this.lifePoints === 0) {
            const randomNumBetween1AndN = Math.floor(Math.random() * 100) + 1;

            const potionDropXPos = this.xPos + this.hitBox.xOffset;
            const potionDropYPos = this.yPos + this.hitBox.xOffset;

            if (randomNumBetween1AndN > 85) {
                initPotionBlue(potionDropXPos, potionDropYPos);
            } else if (randomNumBetween1AndN > 45) {
                initPotionGreen(potionDropXPos, potionDropYPos);
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