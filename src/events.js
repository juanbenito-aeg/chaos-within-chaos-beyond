import globals from "./globals.js";
import { Game, Key } from "./constants.js";

function performRandomMagicalOrbThrow() {
    const player = globals.level1Sprites[0];

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
    const player = globals.level1Sprites[0];
    
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

function updateEvents() {
    performRandomMagicalOrbThrow();
    lowerPlayerLifePointsDueToRageBeing100();
}

function isMagicalOrbThrowCanceledDueToRageBeing100() {
    const player = globals.level1Sprites[0];

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

export { updateEvents, keydownHandler, keyupHandler };