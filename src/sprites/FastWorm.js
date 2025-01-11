import Character from "./Character.js";
import globals from "../globals.js";
import { State, GRAVITY } from "../constants.js";

export default class FastWorm extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    update() {
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
            
            if (this.collisions.isCollidingWithSlope) {
                const uvVectorY = vpVectorY / vpVectorLength;
                this.physics.vy = this.physics.vLimit * uvVectorY;
            }
        } else {
            this.physics.vx = 0;
        }

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (X AXIS)
        this.xPos += this.physics.vx * globals.deltaTime;

        // |||||||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
        this.physics.ay = GRAVITY;

        this.physics.vy += this.physics.ay * globals.deltaTime;

        // |||||||||||| CALCULATE THE DISTANCE IT MOVES (Y AXIS)
        this.yPos += this.physics.vy * globals.deltaTime;

        if (vpVectorLength > MIN_DISTANCE_TO_START_CHASE) {
            this.frames.frameCounter = 0;
        } else {
            this.updateAnimationFrame();
        }

        // |||||||||||| CHECK CHARACTER'S POSSIBLE DEATH
        if (this.collisions.isCollidingWithSpikes || this.collisions.isCollidingWithLava) {
            this.state = State.OFF;
        }
    }
}