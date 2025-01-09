import Character from "./Character.js";
import globals from "../globals.js";
import { State, GRAVITY } from "../constants.js";
import { initMagicalOrb } from "../initialize.js";

export default class Player extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);

        this.rageLevel = 0; // RAGE LEVEL, STARTING IN 0 AND RANGING FROM 0 TO 100
    }

    updateRageLevel() {
        if ((globals.nextRagePtUpDelay.value === 0) && (this.rageLevel < 100)) {
            this.rageLevel++;
            globals.nextRagePtUpDelay.value = this.lifePoints;
        } else {
            globals.nextRagePtUpDelay.timeChangeCounter += globals.deltaTime;

            if (globals.nextRagePtUpDelay.timeChangeCounter > globals.nextRagePtUpDelay.timeChangeValue) {
                globals.nextRagePtUpDelay.value--;
                globals.nextRagePtUpDelay.timeChangeCounter = 0;
            }
        }
    }

    readKeyboardAndAssignState() {
        const isStateLeftOrLeftStill = (this.state === State.LEFT) || (this.state === State.LEFT_STILL);
        const isStateRightOrRightStill = (this.state === State.RIGHT) || (this.state === State.RIGHT_STILL);
        
        const isStateLeftOrLeftJump = (this.state === State.LEFT) || (this.state === State.LEFT_JUMP);
        const isStateRightOrRightJump = (this.state === State.RIGHT) || (this.state === State.RIGHT_JUMP);

        if (this.physics.isOnGround) {
            this.state = globals.action.jump && (this.state === State.LEFT_STILL)    ? State.LEFT_JUMP :
                         globals.action.jump && (this.state === State.RIGHT_STILL)   ? State.RIGHT_JUMP :
                         globals.action.moveLeft                                     ? State.LEFT :
                         globals.action.moveRight                                    ? State.RIGHT :
                         globals.action.attackHandToHand && isStateLeftOrLeftStill   ? State.LEFT_ATTACK_HAND_TO_HAND :
                         globals.action.attackHandToHand && isStateRightOrRightStill ? State.RIGHT_ATTACK_HAND_TO_HAND :
                         globals.action.throwMagicalOrb && isStateLeftOrLeftStill    ? State.LEFT_ATTACK_MAGICAL_ORB :
                         globals.action.throwMagicalOrb && isStateRightOrRightStill  ? State.RIGHT_ATTACK_MAGICAL_ORB :
                         isStateLeftOrLeftJump                                       ? State.LEFT_STILL : 
                         isStateRightOrRightJump                                     ? State.RIGHT_STILL : 
                         this.state;
        } else {
            this.state = globals.action.moveLeft || (this.state === State.LEFT)   ? State.LEFT_JUMP :
                         globals.action.moveRight || (this.state === State.RIGHT) ? State.RIGHT_JUMP :
                         this.state;
        }
    }

    update() {
        this.readKeyboardAndAssignState();

        // |||||||||||| HORIZONTAL MOVEMENT

        const isStateLeftOrLeftJump = (this.state === State.LEFT) || (this.state === State.LEFT_JUMP);
        const isStateRightOrRightJump = (this.state === State.RIGHT) || (this.state === State.RIGHT_JUMP);

        if (isStateLeftOrLeftJump && globals.action.moveLeft) {
            this.physics.vx = -this.physics.vLimit;        
        } else if (isStateRightOrRightJump && globals.action.moveRight) {
            this.physics.vx = this.physics.vLimit;        
        } else {
            this.physics.vx = 0;
        }

        // |||||||| CALCULATE THE DISTANCE IT MOVES
        this.xPos += this.physics.vx * globals.deltaTime;

        // |||||||||||| VERTICAL MOVEMENT

        // |||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
        this.physics.ay = GRAVITY;

        if (this.collisions.isCollidingWithObstacleOnTheBottom) {
            this.physics.isOnGround = true;
        } else {
            this.physics.isOnGround = false;
        }

        this.physics.vy += this.physics.ay * globals.deltaTime;

        if (this.physics.isOnGround && globals.action.jump) {
            this.physics.isOnGround = false;
        
            // |||||||| ASSIGN INITIAL JUMP VELOCITY
            this.physics.vy += this.physics.jumpForce;
        }

        // |||||||| CALCULATE THE DISTANCE IT MOVES
        if (this.physics.vy > 0) {
            this.yPos += Math.max(this.physics.vy * globals.deltaTime, 1);
        } else {
            this.yPos += this.physics.vy * globals.deltaTime;
        }

        this.updateAnimationFrame();

        if (((this.state === State.LEFT_ATTACK_MAGICAL_ORB) || (this.state === State.RIGHT_ATTACK_MAGICAL_ORB)) && this.frames.frameCounter === 3) {
            if ((globals.nextOrbThrowDelay.timeChangeCounter === 0) && (globals.nextOrbThrowDelay.value === 5)) {
                initMagicalOrb();
            }
        }

        if (this.state === State.RIGHT_ATTACK_HAND_TO_HAND) {
            this.hitBox.xSize = 28;
            this.hitBox.xOffset = 15;
        } else if (this.state === State.LEFT_ATTACK_HAND_TO_HAND) {
            this.hitBox.xSize = 28;
            this.hitBox.xOffset = 0;
        } else {
            this.hitBox.xSize = 13;
            this.hitBox.xOffset = 15;
        }

        // |||||||||||| UPDATE LIFE POINTS
        
        const playerLifePtsBeforeChecks = this.lifePoints;

        if (this.collisions.isCollidingWithSpikes && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;
            this.afterAttackLeeway.value = 3;
        } else if (this.collisions.isCollidingWithLava) {
            this.lifePoints = 0;
        }

        // |||||||| IF THE PLAYER HAS LOST LIFE POINTS, UPDATE THE TIMER USED TO INCREASE THEIR RAGE LEVEL
        if (this.lifePoints !== playerLifePtsBeforeChecks) {
            globals.nextRagePtUpDelay.value = this.lifePoints;
            globals.nextRagePtUpDelay.timeChangeCounter = 0;
        }
    
        this.updateRageLevel();
    }
}