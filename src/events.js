import globals from "./globals.js";
import { Key } from "./constants.js";

function performPlayerRandomAttack() {
    const player = globals.screenSprites[0];

    if (player.rageLevel >= 25) {
        // |||||||||||| THE HIGHER THE RAGE LEVEL, THE LOWER THE UPPER LIMIT OF THE RANDOM NUMBER
        let randomNumUpperLimit;

        if (player.rageLevel >= 85) {
            randomNumUpperLimit = 25;
        } else if (player.rageLevel >= 55) {
            randomNumUpperLimit = 40;
        } else {
            randomNumUpperLimit = 55;
        }
    
        const randomNumBetween1AndN = Math.floor(Math.random() * randomNumUpperLimit) + 1;

        // |||||||||||| IF A 1 IS GOTTEN, A MAGICAL ORB THROW WILL BE PERFORMED
        if (randomNumBetween1AndN === 1) {
            const event = new KeyboardEvent("keydown", {keyCode: 83});
            window.dispatchEvent(event);
        }
    }
}

function updateEvents() {
    performPlayerRandomAttack();
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

function keydownHandler(event) {
    switch (event.keyCode) {
        case Key.JUMP:
            globals.action.jump = true;
            break;
        
        case Key.LEFT:
            globals.action.moveLeft = true;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = true;
            break;
        
        case Key.A:
            if (!isPlayerAttackCanceledDueToRageBeingOverN()) {
                globals.action.attackHandToHand = true;
            }
            break;
        
        case Key.S:
            if (!isPlayerAttackCanceledDueToRageBeingOverN()) {
                globals.action.throwMagicalOrb = true;
            }
            break;
    }
}

function keyupHandler(event) {
    switch (event.keyCode) {
        case Key.JUMP:
            globals.action.jump = false;
            break;
        
        case Key.LEFT:
            globals.action.moveLeft = false;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = false;
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