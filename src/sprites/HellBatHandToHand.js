import Character from "./Character.js";
import globals from "../globals.js";
import { State } from "../constants.js";
import { initPotionGreen, initPotionBlue } from "../initialize.js";
 
export default class HellBatHandToHand extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    updatePhysics() {
        const amplitude = 80;
    
        this.physics.angle += this.physics.omega * globals.deltaTime;
    
        this.xPos += this.physics.vx * globals.deltaTime;
        this.yPos = this.physics.yRef + amplitude * Math.sin(this.physics.angle);
    
        this.updateAnimationFrame();
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS
        if (this.collisions.isCollidingWithPlayer) {
            const player = globals.screenSprites[0];
            
            if ((player.isLeftwardsHandToHandAttackEffective || player.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                this.lifePoints--;

                globals.score += 200;

                if (this.lifePoints === 0) {
                    globals.score += 200;

                    this.state = State.OFF;
                } else {
                    this.afterAttackLeeway.value = 4;
                }
            }
        }
        
        if (this.collisions.isCollidingWithMagicalOrb && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;

            globals.score += 150;

            if (this.lifePoints === 0) {
                globals.score += 150;

                this.state = State.OFF;
            } else {
                this.afterAttackLeeway.value = 4;
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

            // |||||||||||| MAKE THE SPRITE BLINK DURING THE LEEWAY IT IS GIVEN JUST AFTER IT IS ATTACKED 
            if (this.afterAttackLeeway.timeChangeCounter > 0.75) {
                this.isDrawn = false;
            } else if (this.afterAttackLeeway.timeChangeCounter > 0.5) {
                this.isDrawn = true;                
            } else if (this.afterAttackLeeway.timeChangeCounter > 0.25) {
                this.isDrawn = false;                
            } else {
                this.isDrawn = true;                
            }
        }
    }
}