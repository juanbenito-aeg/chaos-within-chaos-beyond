import globals from "./globals.js";
import { Game, SpriteID, State, GRAVITY } from "./constants.js";
import { initMagicalOrb, initArrow, initAcid } from "./initialize.js";
import detectCollisions from "./collisionsLogic.js";

export default function update() {
    // |||||||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.MAIN_MENU:
            break;
        
        case Game.STORY_MENU:
            break;
        
        case Game.CONTROLS_MENU:
            updateControlsMenuElements();
            break;
        
        case Game.PLAYING:
            playGame();
            break;
    }
}

function updateControlsMenuElements() {
    updateControlsMenuSprites();
}

function updateControlsMenuSprites() {
    for (let i = 0; i < globals.controlsMenuSprites.length; i++) {
        const sprite = globals.controlsMenuSprites[i];

        updateControlsMenuSprite(sprite);
    }
}

function updateControlsMenuSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| "LEFT ARROW" KEY
        case SpriteID.LEFT_ARROW_KEY:
            updateLeftArrowKey(sprite);
            break;

        // |||||||||||| "RIGHT ARROW" KEY
        case SpriteID.RIGHT_ARROW_KEY:
            updateRightArrowKey(sprite);
            break;

        // |||||||||||| "SPACE" KEY
        case SpriteID.SPACE_KEY:
            updateSpaceKey(sprite);
            break;

        // |||||||||||| "A" LETTER KEY
        case SpriteID.A_LETTER_KEY:
            updateALetterKey(sprite);
            break;

        // |||||||||||| "S" LETTER KEY
        case SpriteID.S_LETTER_KEY:
            updateSLetterKey(sprite);
            break;
    }
}

function updateLeftArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateRightArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSpaceKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateALetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSLetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function playGame() {
    updateHUD();
    updateScreenSprites();
    detectCollisions();
    updateLifePoints();
}

function updateHUD() {
    updateRageLevel();
}

function updateRageLevel() {
    globals.rageLevel = 50;
}

function updateScreenSprites() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if (sprite.state === State.OFF) {
            const indexOfSpriteToDelete = globals.screenSprites.indexOf(sprite);
            globals.screenSprites.splice(indexOfSpriteToDelete, 1);
        } else {
            updateScreenSprite(sprite);
        }
    }
}

function updateScreenSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| PLAYER
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;
        
        // |||||||||||| CHAOTIC HUMAN (BOW)
        case SpriteID.CHAOTIC_HUMAN_BOW:
            updateChaoticHumanBow(sprite);
            break;
        
        // |||||||||||| CHAOTIC HUMAN (SWORD)
        case SpriteID.CHAOTIC_HUMAN_SWORD:
            updateChaoticHumanSword(sprite);
            break;
        
        // |||||||||||| FAST WORM
        case SpriteID.FAST_WORM:
            updateFastWorm(sprite);
            break;
        
        // |||||||||||| HELL BAT (ACID)
        case SpriteID.HELL_BAT_ACID:
            updateHellBatAcid(sprite);
            break;
        
        // |||||||||||| HELL BAT (HAND-TO-HAND)
        case SpriteID.HELL_BAT_HAND_TO_HAND:
            updateHellBatHandToHand(sprite);
            break;
        
        // |||||||||||| POTION (GREEN)
        case SpriteID.POTION_GREEN:
            updatePotionGreen(sprite);
            break;
        
        // |||||||||||| POTION (BLUE)
        case SpriteID.POTION_BLUE:
            updatePotionBlue(sprite);
            break;
        
        // |||||||||||| MAGICAL ORB
        case SpriteID.MAGICAL_ORB:
            updateMagicalOrb(sprite);
            break;
        
        // |||||||||||| ARROW
        case SpriteID.ARROW:
            updateArrow(sprite);
            break;
        
        // |||||||||||| ACID
        case SpriteID.ACID:
            updateAcid(sprite);
            break;
    }
}

function updatePlayer(sprite) {
    readKeyboardAndAssignState(sprite);

    // |||||||||||| HORIZONTAL MOVEMENT

    const isStateLeftOrLeftJump = (sprite.state === State.LEFT) || (sprite.state === State.LEFT_JUMP);
    const isStateRightOrRightJump = (sprite.state === State.RIGHT) || (sprite.state === State.RIGHT_JUMP);

    if (isStateLeftOrLeftJump && globals.action.moveLeft) {
        sprite.physics.vx = -sprite.physics.vLimit;        
    } else if (isStateRightOrRightJump && globals.action.moveRight) {
        sprite.physics.vx = sprite.physics.vLimit;        
    } else {
        sprite.physics.vx = 0;
    }

    // |||||||| CALCULATE THE DISTANCE IT MOVES
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    // |||||||||||| VERTICAL MOVEMENT

    // |||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
    sprite.physics.ay = GRAVITY;

    if (sprite.collisions.isCollidingWithObstacleOnTheBottom) {
        sprite.physics.isOnGround = true;
    } else {
        sprite.physics.isOnGround = false;
    }

    sprite.physics.vy += sprite.physics.ay * globals.deltaTime;

    if (sprite.physics.isOnGround && globals.action.jump) {
        sprite.physics.isOnGround = false;
    
        // |||||||| ASSIGN INITIAL JUMP VELOCITY
        sprite.physics.vy += sprite.physics.jumpForce;
    }

    // |||||||| CALCULATE THE DISTANCE IT MOVES
    if (sprite.physics.vy > 0) {
        sprite.yPos += Math.max(sprite.physics.vy * globals.deltaTime, 1);
    } else {
        sprite.yPos += sprite.physics.vy * globals.deltaTime;
    }

    updateAnimationFrame(sprite);

    if (((sprite.state === State.LEFT_ATTACK_MAGICAL_ORB) || (sprite.state === State.RIGHT_ATTACK_MAGICAL_ORB)) && sprite.frames.frameCounter === 3) {
        if ((globals.nextOrbThrowDelay.timeChangeCounter === 0) && (globals.nextOrbThrowDelay.value === 5)) {
            initMagicalOrb();
        }
    }
}

function updateChaoticHumanBow(sprite) {
    if (globals.nextArrowShotDelay.value <= 0) {
        updateAnimationFrame(sprite);

        if ((sprite.frames.frameChangeCounter === 5) && (sprite.frames.frameCounter === 2)) {
            initArrow();
            globals.nextArrowShotDelay.timeChangeCounter = 0;
            globals.nextArrowShotDelay.value = 5;
        }
    } else {
        globals.nextArrowShotDelay.timeChangeCounter += globals.deltaTime;
    
        if (globals.nextArrowShotDelay.timeChangeCounter > globals.nextArrowShotDelay.timeChangeValue) {
            globals.nextArrowShotDelay.value--;
    
            globals.nextArrowShotDelay.timeChangeCounter = 0;
        }
    }
}

function updateChaoticHumanSword(sprite) {
    // |||||||||||| STATES MACHINE
    switch (sprite.state) {
        case State.LEFT_3:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;
        
        case State.RIGHT_3:
            sprite.physics.vx = sprite.physics.vLimit;
            break;
    }

    // |||||||||||| CALCULATE THE DISTANCE IT MOVES
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    updateAnimationFrame(sprite);

    // |||||||||||| DIRECTION CHANGE
    updateDirection(sprite);
}

function updateFastWorm(sprite) {
    const player = globals.screenSprites[0];
    
    const vpVectorX = player.xPos - sprite.xPos;        
    const vpVectorY = player.yPos - sprite.yPos;
    const vpVectorLength = Math.sqrt((vpVectorX ** 2) + (vpVectorY ** 2));
    const MIN_DISTANCE_TO_START_CHASE = 200;

    if (vpVectorLength >= 7.5 && vpVectorLength <= MIN_DISTANCE_TO_START_CHASE) {
        if (vpVectorX < 0) {
            sprite.state = State.LEFT;
        } else {
            sprite.state = State.RIGHT;
        }

        const uvVectorX = vpVectorX / vpVectorLength;

        sprite.physics.vx = sprite.physics.vLimit * uvVectorX;        
    } else {
        sprite.physics.vx = 0;
    }

    // |||||||||||| CALCULATE THE DISTANCE IT MOVES (X AXIS)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    // |||||||||||| ACCELERATION IN THE Y AXIS IS THE GRAVITY
    sprite.physics.ay = GRAVITY;

    sprite.physics.vy += sprite.physics.ay * globals.deltaTime;

    // |||||||||||| CALCULATE THE DISTANCE IT MOVES (Y AXIS)
    if (sprite.physics.vy > 0) {
        sprite.yPos += Math.max(sprite.physics.vy * globals.deltaTime, 1);
    } else {
        sprite.yPos += sprite.physics.vy * globals.deltaTime;
    }

    if (vpVectorLength > MIN_DISTANCE_TO_START_CHASE) {
        sprite.frames.frameCounter = 0;
    } else {
        updateAnimationFrame(sprite);
    }
}

function updateHellBatAcid(sprite) {
    // |||||||||||| UPDATE TURNING ANGLE
    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    // |||||||||||| CALCULATE NEW POSITION
    setHellBatAcidPosition(sprite);

    updateAnimationFrame(sprite);

    if (globals.nextAcidDropDelay.value <= 0) {
        initAcid();
        globals.nextAcidDropDelay.timeChangeCounter = 0;   
        globals.nextAcidDropDelay.value = 5;   
    } else {
        globals.nextAcidDropDelay.timeChangeCounter += globals.deltaTime;
    
        if (globals.nextAcidDropDelay.timeChangeCounter > globals.nextAcidDropDelay.timeChangeValue) {
            globals.nextAcidDropDelay.value--;
    
            globals.nextAcidDropDelay.timeChangeCounter = 0;
        }
    }
}

function setHellBatAcidPosition(sprite) {
    // |||||||||||| SEMI-MAJOR AXIS OF THE ELLIPSE
    const aRadius = 60;
    
    // |||||||||||| SEMI-MINOR AXIS OF THE ELLIPSE
    const bRadius = 20;

    sprite.xPos = sprite.physics.xRotCenter + aRadius * Math.cos(sprite.physics.angle);
    sprite.yPos = sprite.physics.yRotCenter + bRadius * Math.sin(sprite.physics.angle);
}

function updateHellBatHandToHand(sprite) {
    const amplitude = 80;

    if ((sprite.xPos + sprite.imageSet.xDestinationSize) > globals.canvas.width) {
        sprite.physics.vx = -sprite.physics.vLimit;
    } else if (sprite.xPos < 0) {
        sprite.physics.vx = sprite.physics.vLimit;
    }

    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos = sprite.physics.yRef + amplitude * Math.sin(sprite.physics.angle);

    updateAnimationFrame(sprite);
}

function updatePotionGreen(sprite) {
    sprite.xPos = 306;
    sprite.yPos = 48;
}

function updatePotionBlue(sprite) {
    sprite.xPos = 206;
    sprite.yPos = 48;
}

function updateMagicalOrb(sprite) {
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    
    updateAnimationFrame(sprite);

    if ((globals.nextOrbThrowDelay.value <= 0) && ((sprite.xPos <= (0 - sprite.imageSet.xDestinationSize)) || (sprite.xPos >= globals.canvas.width))) {
        globals.nextOrbThrowDelay.timeChangeCounter = 0;
        globals.nextOrbThrowDelay.value = 5;
        sprite.state = State.OFF;
    } else if (globals.nextOrbThrowDelay.value > 0) {
        globals.nextOrbThrowDelay.timeChangeCounter += globals.deltaTime;
    
        if (globals.nextOrbThrowDelay.timeChangeCounter > globals.nextOrbThrowDelay.timeChangeValue) {
            globals.nextOrbThrowDelay.value--;
    
            globals.nextOrbThrowDelay.timeChangeCounter = 0;
        }
    }
}

function updateArrow(sprite) {
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    if ((globals.nextArrowShotDelay.value <= 0) && ((sprite.xPos <= (0 - sprite.imageSet.xDestinationSize)) || (sprite.xPos >= globals.canvas.width))) {
        sprite.state = State.OFF;
    }
}

function updateAcid(sprite) {
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);

    if ((globals.nextAcidDropDelay.value <= 0) && (sprite.yPos >= globals.canvas.height)) {
        sprite.state = State.OFF;
    }
}

function updateLifePoints() {
    const enemiesAndHarmfulElements = [
        SpriteID.CHAOTIC_HUMAN_BOW,
        SpriteID.ARROW,
        SpriteID.CHAOTIC_HUMAN_SWORD,
        SpriteID.FAST_WORM,
        SpriteID.HELL_BAT_ACID,
        SpriteID.ACID,
        SpriteID.HELL_BAT_HAND_TO_HAND,
    ];

    for (let i = 1; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if (sprite.collisions.isCollidingWithPlayer) {
            if ((globals.afterAttackLeeway.value === 0) && (globals.lifePoints > 1) && enemiesAndHarmfulElements.includes(sprite.id)) {
                globals.afterAttackLeeway.value = 3;
                globals.lifePoints--;
            } else if ((globals.lifePoints < 5) && (sprite.id === SpriteID.POTION_GREEN)) {
                globals.lifePoints++;
            } else if ((globals.lifePoints < 4) && (sprite.id === SpriteID.POTION_BLUE)) {
                globals.lifePoints += 2;
            }
        }
    }

    if (globals.afterAttackLeeway.value > 0) {
        globals.afterAttackLeeway.timeChangeCounter += globals.deltaTime;

        if (globals.afterAttackLeeway.timeChangeCounter > globals.afterAttackLeeway.timeChangeValue) {
            globals.afterAttackLeeway.value--;

            globals.afterAttackLeeway.timeChangeCounter = 0;
        }
    }
}

function updateAnimationFrame(sprite) {
    switch (sprite.state) {
        case State.UP_STILL:
        case State.LEFT_STILL:
        case State.DOWN_STILL:
        case State.RIGHT_STILL:
        case State.LEFT_JUMP:
        case State.RIGHT_JUMP:
            sprite.frames.frameCounter = 0;
            sprite.frames.frameChangeCounter = 0;
            break;

        case State.UP_ATTACK_HAND_TO_HAND:
        case State.LEFT_ATTACK_HAND_TO_HAND:
        case State.DOWN_ATTACK_HAND_TO_HAND:
        case State.RIGHT_ATTACK_HAND_TO_HAND:
            sprite.frames.frameChangeCounter++;
        
            if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
                sprite.frames.frameCounter++;
                sprite.frames.frameChangeCounter = 0;
            }
        
            if (sprite.frames.frameCounter === 5) {
                sprite.frames.frameCounter = 0;

                switch (sprite.state) {
                    case State.LEFT_ATTACK_HAND_TO_HAND:
                        sprite.state = State.LEFT_STILL;
                        break;
                    
                    case State.RIGHT_ATTACK_HAND_TO_HAND:
                        sprite.state = State.RIGHT_STILL;
                        break;
                }
            }

            break;
        
        case State.LEFT_ATTACK_MAGICAL_ORB:
        case State.RIGHT_ATTACK_MAGICAL_ORB:
            sprite.frames.frameChangeCounter++;
        
            if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
                sprite.frames.frameCounter++;
                sprite.frames.frameChangeCounter = 0;
            }
        
            if (sprite.frames.frameCounter === 4) {
                sprite.frames.frameCounter = 0;

                switch (sprite.state) {
                    case State.LEFT_ATTACK_MAGICAL_ORB:
                        sprite.state = State.LEFT_STILL;
                        break;
                    
                    case State.RIGHT_ATTACK_MAGICAL_ORB:
                        sprite.state = State.RIGHT_STILL;
                        break;
                }
            }

            break;

        case State.LEFT_ATTACK_2:
        case State.RIGHT_ATTACK_2:
            sprite.frames.frameChangeCounter++;
        
            if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
                sprite.frames.frameCounter++;
                sprite.frames.frameChangeCounter = 0;
            }
        
            if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
                sprite.frames.frameCounter = 0;
            }

            break;

        default:
            sprite.frames.frameChangeCounter++;
        
            // |||||||||||| CHANGE FRAME WHEN THE ANIMATION LAG REACHES "speed"
            if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
                // |||||||| CHANGE FRAME & RESET THE FRAME CHANGE COUNTER
                sprite.frames.frameCounter++;
                sprite.frames.frameChangeCounter = 0;
            }
        
            // |||||||||||| IF THE LAST FRAME HAS BEEN REACHED, RESTART COUNTER (CYCLIC ANIMATION)
            if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
                sprite.frames.frameCounter = 0;
            }

            break;
    }
}

function readKeyboardAndAssignState(sprite) {
    const isStateLeftOrLeftStill = (sprite.state === State.LEFT) || (sprite.state === State.LEFT_STILL);
    const isStateRightOrRightStill = (sprite.state === State.RIGHT) || (sprite.state === State.RIGHT_STILL);
    
    const isStateLeftOrLeftJump = (sprite.state === State.LEFT) || (sprite.state === State.LEFT_JUMP);
    const isStateRightOrRightJump = (sprite.state === State.RIGHT) || (sprite.state === State.RIGHT_JUMP);

    if (sprite.physics.isOnGround) {
        sprite.state = globals.action.jump && (sprite.state === State.LEFT_STILL)  ? State.LEFT_JUMP :
                       globals.action.jump && (sprite.state === State.RIGHT_STILL) ? State.RIGHT_JUMP :
                       globals.action.moveLeft                                     ? State.LEFT :
                       globals.action.moveRight                                    ? State.RIGHT :
                       globals.action.attackHandToHand && isStateLeftOrLeftStill   ? State.LEFT_ATTACK_HAND_TO_HAND :
                       globals.action.attackHandToHand && isStateRightOrRightStill ? State.RIGHT_ATTACK_HAND_TO_HAND :
                       globals.action.throwMagicalOrb && isStateLeftOrLeftStill    ? State.LEFT_ATTACK_MAGICAL_ORB :
                       globals.action.throwMagicalOrb && isStateRightOrRightStill  ? State.RIGHT_ATTACK_MAGICAL_ORB :
                       isStateLeftOrLeftJump                                       ? State.LEFT_STILL : 
                       isStateRightOrRightJump                                     ? State.RIGHT_STILL : 
                       sprite.state;
    } else {
        sprite.state = globals.action.moveLeft || (sprite.state === State.LEFT)   ? State.LEFT_JUMP :
                       globals.action.moveRight || (sprite.state === State.RIGHT) ? State.RIGHT_JUMP :
                       sprite.state;
    }
}

function updateDirection(sprite) {
    // |||||||||||| INCREMENT TIME FOR DIRECTION CHANGE
    sprite.directionChangeCounter += globals.deltaTime;

    if (sprite.directionChangeCounter > sprite.maxTimeToChangeDirection) {
        // |||||||||||| RESET THE COUNTER
        sprite.directionChangeCounter = 0;

        swapDirection(sprite);
    }
}

function swapDirection(sprite) {
    sprite.state = (sprite.state === State.LEFT_3) ? State.RIGHT_3 : State.LEFT_3;
}

export { setHellBatAcidPosition };