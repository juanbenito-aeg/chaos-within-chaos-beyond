import Character from "./Character.js";
import globals from "../globals.js";
import { SpriteID, State, GRAVITY } from "../constants.js";
import { initMagicalOrb } from "../initialize.js";

export default class Player extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);

        this.isLeftwardsHandToHandAttackEffective   = false;
        this.isRightwardsHandToHandAttackEffective  = false;
        this.rageLevel                              = 0; // RAGE LEVEL, STARTING IN 0 AND RANGING FROM 0 TO 100
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
            this.state = (globals.action.moveLeft || (this.state === State.LEFT))   ? State.LEFT_JUMP :
                         (globals.action.moveRight || (this.state === State.RIGHT)) ? State.RIGHT_JUMP :
                         this.state;
        }

        // |||||||||||| MANUALLY DISPATCH "keyup" EVENT FOR MAGICAL ORB THROWS IN CASE THEY HAVE BEEN PERFORMED RANDOMLY IN "events.js"
        if (globals.action.throwMagicalOrb) {
            const event = new KeyboardEvent("keyup", {keyCode: 83});    
            window.dispatchEvent(event);
        }
    }

    updateRageLevel() {
        if ((globals.nextRagePtUpDelay.value === 0) && (this.rageLevel < 100)) {
            this.rageLevel++;
            globals.nextRagePtUpDelay.value = this.lifePoints;
        } else {
            globals.nextRagePtUpDelay.timeChangeCounter += globals.deltaTime;

            if (globals.nextRagePtUpDelay.timeChangeCounter >= globals.nextRagePtUpDelay.timeChangeValue) {
                globals.nextRagePtUpDelay.value--;
                globals.nextRagePtUpDelay.timeChangeCounter = 0;
            }
        }
    }

    updatePhysics() {
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

        if (((this.state === State.LEFT_ATTACK_MAGICAL_ORB) || (this.state === State.RIGHT_ATTACK_MAGICAL_ORB)) && (this.frames.frameCounter === 3) && (globals.nextOrbThrowDelay.value === 0)) {
            initMagicalOrb();
            globals.nextOrbThrowDelay.timeChangeCounter = 0;
            globals.nextOrbThrowDelay.value = 5;
        }

        if (globals.nextOrbThrowDelay.value > 0) {
            globals.nextOrbThrowDelay.timeChangeCounter += globals.deltaTime;
        
            if (globals.nextOrbThrowDelay.timeChangeCounter >= globals.nextOrbThrowDelay.timeChangeValue) {
                globals.nextOrbThrowDelay.value--;
        
                globals.nextOrbThrowDelay.timeChangeCounter = 0;
            }
        }

        if (this.state === State.RIGHT_ATTACK_HAND_TO_HAND) {
            this.hitBox.xSize = 28;
            this.hitBox.xOffset = 15;
        } else if (this.state === State.LEFT_ATTACK_HAND_TO_HAND) {
            this.hitBox.xSize = 28;
            this.hitBox.xOffset = 0;
        } else {
            this.hitBox.xSize = 12;
            this.hitBox.xOffset = 16;
        }
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS, SCORE & RAGE LEVEL
        
        const playerLifePtsBeforeChecks = this.lifePoints;

        // |||||||| CONDITIONS THAT MAKE THE PLAYER LOSE LIFE POINTS

        // |||| COLLISION WITH HARMFUL TILES
        
        if (this.collisions.isCollidingWithSpikes && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;
            this.afterAttackLeeway.value = 4;
        }
        
        if (this.collisions.isCollidingWithLava) {
            this.lifePoints = 0;
        }

        // |||| COLLISION WITH ENEMIES

        const enemies = [
            SpriteID.CHAOTIC_HUMAN_BOW,
            SpriteID.CHAOTIC_HUMAN_SWORD,
            SpriteID.FAST_WORM,
            SpriteID.HELL_BAT_ACID,
            SpriteID.HELL_BAT_HAND_TO_HAND,
        ];

        for (let i = 1; i < globals.screenSprites.length; i++) {
            const sprite = globals.screenSprites[i];

            if (sprite.collisions.isCollidingWithPlayer && enemies.includes(sprite.id)) {
                this.isLeftwardsHandToHandAttackEffective = ((this.state === State.LEFT_ATTACK_HAND_TO_HAND) && ((sprite.xPos + sprite.hitBox.xOffset + sprite.hitBox.xSize) <= (this.xPos + this.hitBox.xOffset + (this.hitBox.xSize / 2))));

                this.isRightwardsHandToHandAttackEffective = ((this.state === State.RIGHT_ATTACK_HAND_TO_HAND) && ((sprite.xPos + sprite.hitBox.xOffset) >= (this.xPos + this.hitBox.xOffset + (this.hitBox.xSize / 2))));

                if ((!this.isLeftwardsHandToHandAttackEffective && !this.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                    this.lifePoints--;
                    this.afterAttackLeeway.value = 4;
                }
            }
        }
        
        // |||| COLLISION WITH HARMFUL ELEMENTS
        
        if (this.collisions.isCollidingWithAcid && (this.afterAttackLeeway.value === 0)) {            
            this.lifePoints--;
            this.afterAttackLeeway.value = 4;
        }
        
        if (this.collisions.isCollidingWithArrow && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;
            this.afterAttackLeeway.value = 4;
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

        // |||||||| CONDITIONS THAT MAKE THE PLAYER EARN LIFE POINTS & SCORE & LOSE RAGE
        if (this.hitBox.xSize !== 28) {
            if (this.collisions.isCollidingWithGreenPotion) {                
                this.lifePoints++;
                if (this.lifePoints > 5) {
                    this.lifePoints = 5;
                }

                globals.score += 50;

                this.rageLevel -= 10;
                if (this.rageLevel < 0) {
                    this.rageLevel = 0;
                }
            }
            
            if (this.collisions.isCollidingWithBluePotion) {
                this.lifePoints += 2;
                if (this.lifePoints > 5) {
                    this.lifePoints = 5;
                }

                globals.score += 75;

                this.rageLevel -= 20;
                if (this.rageLevel < 0) {
                    this.rageLevel = 0;
                }
            }
        }

        // |||||||||||| IF THE PLAYER HAS EITHER LOST OR EARNED LIFE POINTS, UPDATE THE TIMER USED TO INCREASE THEIR RAGE LEVEL
        if (this.lifePoints !== playerLifePtsBeforeChecks) {
            globals.nextRagePtUpDelay.value = this.lifePoints;
            globals.nextRagePtUpDelay.timeChangeCounter = 0;
        }
    
        this.updateRageLevel();
    }
}