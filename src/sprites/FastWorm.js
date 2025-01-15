import Character from "./Character.js";
import globals from "../globals.js";
import { State, GRAVITY } from "../constants.js";

export default class FastWorm extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    updatePhysics() {
        // |||||||||||| RANDOMLY MODIFY THE FAST WORM'S VELOCITY

        const Velocity = {
            LOW: 20,
            INTERMEDIATE: 40,
            HIGH: 60,
        };

        const randomNumBetween1AndN = Math.floor(Math.random() * 25) + 1;

        // |||||||| IF A 1 IS GOTTEN, CHANGE VELOCITY OF THE FAST WORM'S MOVEMENT
        if (randomNumBetween1AndN === 1) {
            const nextVelocityIndicator = Math.floor(Math.random() * 3) + 1;

            switch (nextVelocityIndicator) {
                case 1:
                    this.physics.vLimit = Velocity.LOW;
                    break;
                
                case 2:
                    this.physics.vLimit = Velocity.INTERMEDIATE;
                    break;
                
                case 3:
                    this.physics.vLimit = Velocity.HIGH;
                    break;
            }
        }

        const player = globals.screenSprites[0];
    
        const vpVectorX = player.xPos - this.xPos;        
        const vpVectorY = player.yPos - this.yPos;
        const vpVectorLength = Math.sqrt((vpVectorX ** 2) + (vpVectorY ** 2));
        const MIN_DISTANCE_TO_START_CHASE = 200;

        let distanceLimitToStopApproachingPlayer;
        if (vpVectorX < 0) {
            distanceLimitToStopApproachingPlayer = 20;
        } else {
            distanceLimitToStopApproachingPlayer = 1;
        }

        if ((vpVectorLength >= distanceLimitToStopApproachingPlayer) && (vpVectorLength <= MIN_DISTANCE_TO_START_CHASE)) {
            if (vpVectorX < 0) {
                this.state = State.LEFT;

                this.hitBox.xSize = 13;
                this.hitBox.xOffset = 5;
                this.hitBox.yOffset = 3;
            } else {
                this.state = State.RIGHT;
                
                this.hitBox.xSize = 14;
                this.hitBox.xOffset = 7;
                this.hitBox.yOffset = 1;
            }

            const uvVectorX = vpVectorX / vpVectorLength;
            this.physics.vx = this.physics.vLimit * uvVectorX;
        } else {
            this.physics.vx = 0;
        }

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (X AXIS)
        this.xPos += this.physics.vx * globals.deltaTime;

        // |||||||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
        this.physics.ay = GRAVITY;

        this.physics.vy += this.physics.ay * globals.deltaTime;

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (Y AXIS)
        if (this.physics.vy > 0) {
            this.yPos += Math.max(this.physics.vy * globals.deltaTime, 1);
        } else {
            this.yPos += this.physics.vy * globals.deltaTime;
        }

        if (vpVectorLength > MIN_DISTANCE_TO_START_CHASE) {
            this.frames.frameCounter = 0;
        } else {
            this.updateAnimationFrame();
        }
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS
        
        // |||||||| COLLISION WITH HARMFUL TILES
        if (this.collisions.isCollidingWithLava) {
            this.state = State.OFF;
        }

        // |||||||| COLLISION WITH PLAYER & THEIR MAGICAL ORBS
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

        if (this.afterAttackLeeway.value > 0) {
            this.afterAttackLeeway.timeChangeCounter += globals.deltaTime;
    
            if (this.afterAttackLeeway.timeChangeCounter >= this.afterAttackLeeway.timeChangeValue) {
                this.afterAttackLeeway.value--;
                this.afterAttackLeeway.timeChangeCounter = 0;
            }
        }
    }
}