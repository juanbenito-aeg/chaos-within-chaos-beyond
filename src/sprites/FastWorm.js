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

        if (vpVectorLength >= 7.5 && vpVectorLength <= MIN_DISTANCE_TO_START_CHASE) {
            if (vpVectorX < 0) {
                this.state = State.LEFT;
            } else {
                this.state = State.RIGHT;
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

        // |||||||||||| CHECK CHARACTER'S POSSIBLE DEATH
        if (this.collisions.isCollidingWithSpikes || this.collisions.isCollidingWithLava) {
            this.state = State.OFF;
        }
    }
}