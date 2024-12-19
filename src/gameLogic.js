import globals from "./globals.js";
import { Game, SpriteID, State, GRAVITY } from "./constants.js";
import { initMagicalOrb, initArrow } from "./initialize.js";

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
        // |||||||||||| "UP ARROW" KEY
        case SpriteID.UP_ARROW_KEY:
            updateUpArrowKey(sprite);
            break;
        
        // |||||||||||| "DOWN ARROW" KEY
        case SpriteID.DOWN_ARROW_KEY:
            updateDownArrowKey(sprite);
            break;

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

function updateUpArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateDownArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
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
}

function updateHUD() {
    updateLifePoints();
    updateRageLevel();
}

function updateLifePoints() {
    globals.lifePoints = 1;
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

    if (!sprite.physics.isOnGround) {
        sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    } else {
        if (globals.action.jump) {
            sprite.physics.isOnGround = false;

            // |||||||| ASSIGN INITIAL JUMP VELOCITY
            sprite.physics.vy += sprite.physics.jumpForce;
        }
    }

    // |||||||| CALCULATE THE DISTANCE IT MOVES
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    // |||||||||||| COLLISION WITH THE GROUND (WHICH LATER WILL BE MOVED TO A SPECIFIC FILE FOR THE GAME'S COLLISIONS)
    if (sprite.yPos > 186) {
        sprite.physics.isOnGround = true;
        sprite.yPos = 186;
        sprite.physics.vy = 0;
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
        }
    } else {
        globals.nextArrowShotDelay.timeChangeCounter += globals.deltaTime;
    
        if (globals.nextArrowShotDelay.timeChangeCounter > globals.nextArrowShotDelay.timeChangeValue) {
            globals.nextArrowShotDelay.value--;
    
            globals.nextArrowShotDelay.timeChangeCounter = 0;
        }
    }

    // sprite.state = State.OFF;
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
    
    const vpVectorX = sprite.xPos - player.xPos;        
    const vpVectorY = sprite.yPos - player.yPos;
    
    const uvVectorX = vpVectorX / Math.sqrt((vpVectorX ** 2) + (vpVectorY ** 2));
    const uvVectorY = vpVectorY / Math.sqrt((vpVectorX ** 2) + (vpVectorY ** 2));

    sprite.physics.vx = -sprite.physics.vLimit * uvVectorX;
    sprite.physics.vy = -sprite.physics.vLimit * uvVectorY;
    
    if (vpVectorX > 0) {
        sprite.state = State.LEFT;
    } else {
        sprite.state = State.RIGHT;
    }

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);
}

function updateHellBatAcid(sprite) {
    // |||||||||||| UPDATE TURNING ANGLE
    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    // |||||||||||| CALCULATE NEW POSITION
    setHellBatAcidPosition(sprite);

    updateAnimationFrame(sprite);
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

    // sprite.state = State.OFF;
}

function updatePotionBlue(sprite) {
    sprite.xPos = 206;
    sprite.yPos = 48;

    // sprite.state = State.OFF;
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

    if ((sprite.xPos <= (0 - sprite.imageSet.xDestinationSize)) || (sprite.xPos >= globals.canvas.width)) {
        sprite.state = State.OFF;
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
                globals.nextArrowShotDelay.value = 5;
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