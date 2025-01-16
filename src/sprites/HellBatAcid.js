import Character from "./Character.js";
import globals from "../globals.js";
import { State } from "../constants.js";
import { initAcid, initPotionGreen, initPotionBlue } from "../initialize.js";

export default class HellBatAcid extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway, nextAcidDropDelay) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    
        this.nextAcidDropDelay = nextAcidDropDelay; // TIMING OF THE DELAY BETWEEN SUCCESSIVE ACID DROPS
    }

    setPosition() {
        this.xPos = this.physics.xRotCenter + this.physics.aRadius * Math.cos(this.physics.angle);
        this.yPos = this.physics.yRotCenter + this.physics.bRadius * Math.sin(this.physics.angle);
    }

    updatePhysics() {
        // |||||||||||| UPDATE TURNING ANGLE
        this.physics.angle += this.physics.omega * globals.deltaTime;

        // |||||||||||| CALCULATE NEW POSITION
        this.setPosition();

        this.updateAnimationFrame();

        if (this.nextAcidDropDelay.value === 0) {
            initAcid(this);
            this.nextAcidDropDelay.value = 5;   
        } else {
            this.nextAcidDropDelay.timeChangeCounter += globals.deltaTime;
        
            if (this.nextAcidDropDelay.timeChangeCounter > this.nextAcidDropDelay.timeChangeValue) {
                this.nextAcidDropDelay.value--;
        
                this.nextAcidDropDelay.timeChangeCounter = 0;
            }
        }
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS
        if (this.collisions.isCollidingWithPlayer) {
            const player = globals.screenSprites[0];
            
            if ((player.isLeftwardsHandToHandAttackEffective || player.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                this.lifePoints--;

                globals.score += 150;

                if (this.lifePoints === 0) {
                    globals.score += 150;
                
                    this.state = State.OFF;
                } else {
                    this.afterAttackLeeway.value = 4;
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

            if (this.afterAttackLeeway.timeChangeCounter > 0.5) {
                this.isDrawn = false;
            } else {
                this.isDrawn = true;                
            }
        }
    }
}