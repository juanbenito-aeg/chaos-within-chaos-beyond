import globals from "./globals.js";
import { Game, Sound, Key } from "./constants.js";
import { initHellBatHandToHand } from "./initialize.js";

function updateMusic() {
    const buffer = 0.25;
    const music = globals.sounds[Sound.LEVEL_MUSIC];
    if ((globals.gameState === Game.PLAYING) && (music.currentTime > (music.duration - buffer))) {
        music.currentTime = 0;
        music.play();
    } else if (globals.gameState !== Game.PLAYING) {
        music.currentTime = 0;
        music.pause();
    }
}

function performRandomMagicalOrbThrow() {
    const player = globals.levelSprites[0];

    if (player.rageLevel > 50) {
        // |||||||||||| THE HIGHER THE RAGE LEVEL, THE LOWER THE UPPER LIMIT OF THE RANDOM NUMBER
        let randomNumUpperLimit;

        if (player.rageLevel === 100) {
            randomNumUpperLimit = 25;
        } else if (player.rageLevel > 75) {
            randomNumUpperLimit = 40;
        } else {
            randomNumUpperLimit = 55;
        }
    
        const randomNumBetween1AndN = Math.floor(Math.random() * randomNumUpperLimit) + 1;

        // |||||||||||| IF A 1 IS GOTTEN & THE REQUIRED DELAY HAS PASSED, A MAGICAL ORB THROW WILL BE PERFORMED
        if ((randomNumBetween1AndN === 1) && (player.nextOrbThrowDelay.value === 0)) {
            const event = new KeyboardEvent("keydown", {keyCode: 83});
            window.dispatchEvent(event);

            player.isMagicalOrbThrowRandomlyPerformed = true;
        }
    }
}

function lowerPlayerLifePointsDueToRageBeing100() {
    const player = globals.levelSprites[0];
    
    if ((player.rageLevel === 100) && (player.nextLifePointsReductionDelay.value === 0)) {
        player.lifePoints -= 0.25;
        player.nextLifePointsReductionDelay.value = 10;    
    } else if ((player.rageLevel === 100) && (player.nextLifePointsReductionDelay.value > 0)) {
        player.nextLifePointsReductionDelay.timeChangeCounter += globals.deltaTime;

        if (player.nextLifePointsReductionDelay.timeChangeCounter >= player.nextLifePointsReductionDelay.timeChangeValue) {
            player.nextLifePointsReductionDelay.value--;
            player.nextLifePointsReductionDelay.timeChangeCounter = 0;
        }
    } else {
        player.nextLifePointsReductionDelay.value = 10;    
        player.nextLifePointsReductionDelay.timeChangeCounter = 0;        
    }
}

function doFastWormsFly() {
    // |||||||||||| THIS EVENT TAKES PLACE DURING THE SECOND LEVEL
    if (globals.level.number === 2) {                
        const randomNumBetween1AndN = Math.floor(Math.random() * 200) + 1;

        // |||||||| IF A 1 IS GOTTEN & THE FAST WORMS ARE NOT CURRENTLY FLYING, MAKE THEM DO SO FOR A NUMBER OF SECONDS
        if ((randomNumBetween1AndN === 1) && !globals.doFastWormsFly) {
            globals.doFastWormsFly = true;
        }

        if (globals.fastWormsFlyingStateTimer.value === 0) {
            globals.fastWormsFlyingStateTimer.value = 20;
            globals.doFastWormsFly = false;
        } else if (globals.doFastWormsFly) {
            globals.fastWormsFlyingStateTimer.timeChangeCounter += globals.deltaTime;
            
            if (globals.fastWormsFlyingStateTimer.timeChangeCounter >= globals.fastWormsFlyingStateTimer.timeChangeValue) {
                globals.fastWormsFlyingStateTimer.value--;
                globals.fastWormsFlyingStateTimer.timeChangeCounter = 0;
            }
        }
    }
}

function makeHellBatsAppearDueToRageBeing100() {
    // |||||||||||| THIS EVENT TAKES PLACE DURING THE SECOND LEVEL
    if (globals.level.number === 2) {
        const player = globals.levelSprites[0];

        if (player.rageLevel > 50) {
            const randomNumBetween1AndN = Math.floor(Math.random() * 100) + 1;
    
            // |||||||| IF A 1 IS GOTTEN, MAKE TWO HELL BATS (HAND-TO-HAND) SPAWN NEAR THE PLAYER
            if (randomNumBetween1AndN === 1) {
                const hellBatHandToHandSpritesAttributes = [
                    {
                        xPos: Math.max(0, (player.xPos - 20)),
                        yPos: player.yPos,
                        vLimit: 50,
                        omega: 2.5,
                        yRef: player.yPos,
                        amplitude: 80,
                    },
                    {
                        xPos: Math.min(((globals.level.data[0].length * 16) - 33), (player.xPos + player.imageSet.xSize)),
                        yPos: player.yPos,
                        vLimit: 50,
                        omega: 2.5,
                        yRef: player.yPos,
                        amplitude: 80,
                    },
                ];

                for (let i = 0; i < hellBatHandToHandSpritesAttributes.length; i++) {
                    initHellBatHandToHand(true, hellBatHandToHandSpritesAttributes[i].xPos, hellBatHandToHandSpritesAttributes[i].yPos, hellBatHandToHandSpritesAttributes[i].vLimit, hellBatHandToHandSpritesAttributes[i].omega, hellBatHandToHandSpritesAttributes[i].yRef, hellBatHandToHandSpritesAttributes[i].amplitude);
                }
            }
        }
    }
}

function updateEvents() {
    performRandomMagicalOrbThrow();
    lowerPlayerLifePointsDueToRageBeing100();

    doFastWormsFly();

    makeHellBatsAppearDueToRageBeing100();
}

function isMagicalOrbThrowCanceledDueToRageBeing100() {
    const player = globals.levelSprites[0];

    let isMagicalOrbThrowCanceled = false;

    if ((player.rageLevel === 100) && (!player.isMagicalOrbThrowRandomlyPerformed)) {
        isMagicalOrbThrowCanceled = true;
    }

    return isMagicalOrbThrowCanceled;
}

function keydownHandler(event) {
    switch (event.keyCode) {
        case Key.ENTER:
            globals.action.confirmSelection = true;
            break;
        
        case Key.ESCAPE:
            globals.action.return = true;
            break;

        case Key.JUMP:
            globals.action.jump = true;
            break;
        
        case Key.LEFT:
            globals.action.moveLeft = true;
            break;
        
        case Key.UP:
            globals.action.moveUp = true;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = true;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = true;
            break;
        
        case Key.A:
            globals.action.attackHandToHand = true;
            break;
        
        case Key.S:
            if ((globals.gameState === Game.PLAYING) && !isMagicalOrbThrowCanceledDueToRageBeing100()) {
                globals.action.throwMagicalOrb = true;
            }
            break;
    }
}

function keyupHandler(event) {
    switch (event.keyCode) {
        case Key.ENTER:
            globals.action.confirmSelection = false;
            break;

        case Key.ESCAPE:
            globals.action.return = false;
            break;

        case Key.JUMP:
            globals.action.jump = false;
            break;
        
        case Key.LEFT:
            globals.action.moveLeft = false;
            break;
        
        case Key.UP:
            globals.action.moveUp = false;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = false;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = false;
            break;

        case Key.A:
            globals.action.attackHandToHand = false;
            break;
        
        case Key.S:
            globals.action.throwMagicalOrb = false;
            break;
    }
}

export { updateMusic, updateEvents, keydownHandler, keyupHandler };