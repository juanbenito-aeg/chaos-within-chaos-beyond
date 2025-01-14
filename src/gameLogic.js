import globals from "./globals.js";
import detectCollisions from "./collisionsLogic.js";
import { Game, SpriteID, State } from "./constants.js";

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
            updateControlsMenuSprites();
            break;
        
        case Game.PLAYING:
            playGame();
            break;
    }
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
    // |||||||||||| UPDATE SPRITES' PHYSICS
    updateScreenSprites();

    // |||||||||||| COLLISIONS
    detectCollisions();

    // |||||||||||| UPDATE THE CAMERA
    updateCamera();

    // |||||||||||| UPDATE GAME'S LOGIC
    // updateLifePoints();

    // checkIfGameOver();
}

function updateScreenSprites() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if (sprite.state === State.OFF) {
            const indexOfSpriteToDelete = globals.screenSprites.indexOf(sprite);
            globals.screenSprites.splice(indexOfSpriteToDelete, 1);
        } else {
            sprite.update();
        }
    }
}

function updateCamera() {
    // |||||||||||| FOCUS THE CAMERA ON THE PLAYER
    
    const player = globals.screenSprites[0];
        
    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xDestinationSize - globals.canvas.width) / 2);
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.yDestinationSize - globals.canvas.height) / 2);
}

function updateLifePoints() {
    const player = globals.screenSprites[0];
    const playerLifePtsBeforeChecks = player.lifePoints;

    const enemies = [
        SpriteID.CHAOTIC_HUMAN_BOW,
        SpriteID.CHAOTIC_HUMAN_SWORD,
        SpriteID.FAST_WORM,
        SpriteID.HELL_BAT_ACID,
        SpriteID.HELL_BAT_HAND_TO_HAND,
    ];
    
    const harmfulElements = [
        SpriteID.ARROW,
        SpriteID.ACID,
    ];

    for (let i = 1; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if (sprite.collisions.isCollidingWithMagicalOrb && enemies.includes(sprite.id) && (sprite.afterAttackLeeway.value === 0)) {
            sprite.lifePoints--;
                
            if (sprite.lifePoints === 0) {
                sprite.state = State.OFF;
            } else {
                sprite.afterAttackLeeway.value = 3;
            }
        } else if (sprite.collisions.isCollidingWithPlayer) {
            if (enemies.includes(sprite.id)) {
                const isHandToHandAttackEffective = ((player.state === State.LEFT_ATTACK_HAND_TO_HAND) && (sprite.xPos <= player.xPos)) || ((player.state === State.RIGHT_ATTACK_HAND_TO_HAND) && (sprite.xPos > player.xPos));

                if (isHandToHandAttackEffective && (sprite.afterAttackLeeway.value === 0)) {
                    sprite.lifePoints--;
                    
                    if (sprite.lifePoints === 0) {
                        sprite.state = State.OFF;
                    } else {
                        sprite.afterAttackLeeway.value = 3;
                    }
                } else if ((player.lifePoints > 1) && (player.afterAttackLeeway.value === 0)) {
                    player.lifePoints--;
                    player.afterAttackLeeway.value = 3;
                }
            } else if (harmfulElements.includes(sprite.id) && (player.afterAttackLeeway.value === 0) && (player.lifePoints > 1)) {
                player.lifePoints--;
                player.afterAttackLeeway.value = 3;
            } else if ((sprite.id === SpriteID.POTION_GREEN) && (player.hitBox.xSize !== 28) && (player.lifePoints < 5)) {
                player.lifePoints++;

                player.rageLevel -= 10;
                if (player.rageLevel < 0) {
                    player.rageLevel = 0;
                }
                
                // |||||||||||| ONCE USED, MAKE THE POTION DISAPPEAR
                sprite.state = State.OFF;
            } else if ((sprite.id === SpriteID.POTION_BLUE) && (player.hitBox.xSize !== 28) && (player.lifePoints < 4)) {
                player.lifePoints += 2;

                player.rageLevel -= 20;
                if (player.rageLevel < 0) {
                    player.rageLevel = 0;
                }

                // |||||||||||| ONCE USED, MAKE THE POTION DISAPPEAR
                sprite.state = State.OFF;
            }
        }
    }

    // |||||||||||| IF THE PLAYER HAS EITHER LOST OR EARNED LIFE POINTS, UPDATE THE TIMER USED TO INCREASE THEIR RAGE LEVEL
    if (player.lifePoints !== playerLifePtsBeforeChecks) {
        globals.nextRagePtUpDelay.value = player.lifePoints;
        globals.nextRagePtUpDelay.timeChangeCounter = 0;
    }

    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if ((sprite.id === player.id) || enemies.includes(sprite.id)) {
            if (sprite.afterAttackLeeway.value > 0) {
                sprite.afterAttackLeeway.timeChangeCounter += globals.deltaTime;
        
                if (sprite.afterAttackLeeway.timeChangeCounter > sprite.afterAttackLeeway.timeChangeValue) {
                    sprite.afterAttackLeeway.value--;
        
                    sprite.afterAttackLeeway.timeChangeCounter = 0;
                }
            }
        }
    }
}

function checkIfGameOver() {
    const player = globals.screenSprites[0];

    if (player.lifePoints === 0) {
        globals.gameState = Game.OVER;
    }
}

function isPlayerAttackCanceledDueToRageBeingOverN() {
    const player = globals.screenSprites[0];

    if (player.rageLevel >= 25) {
        // |||||||||||| THE HIGHER THE RAGE LEVEL, THE LOWER THE UPPER LIMIT OF THE RANDOM NUMBER
        let randomNumUpperLimit;
    
        if (player.rageLevel >= 85) {
            randomNumUpperLimit = 3;
        } else if (player.rageLevel >= 55) {
            randomNumUpperLimit = 6;
        } else {
            randomNumUpperLimit = 9;
        }
    
        const randomNumBetween1AndN = Math.floor(Math.random() * randomNumUpperLimit) + 1;
    
        // |||||||||||| IF A 1 IS GOTTEN, THE ATTACK THE PLAYER HAS TRIED TO EXECUTE PRESSING THE CORRESPONDING KEY WON'T MATERIALIZE
        const isPlayerAttackCanceled = randomNumBetween1AndN === 1;

        return isPlayerAttackCanceled;
    }
}

export { isPlayerAttackCanceledDueToRageBeingOverN };