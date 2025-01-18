import globals from "./globals.js";
import { Key } from "./constants.js";

function performRandomMagicalOrbThrow() {
    const player = globals.screenSprites[0];

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
        if ((randomNumBetween1AndN === 1) && (globals.nextOrbThrowDelay.value === 0)) {
            const event = new KeyboardEvent("keydown", {keyCode: 83});
            window.dispatchEvent(event);

            player.isMagicalOrbThrowRandomlyPerformed = true;
        }
    }
}

function updateEvents() {
    performRandomMagicalOrbThrow();
}

function isMagicalOrbThrowCanceledDueToRageBeing100() {
    const player = globals.screenSprites[0];

    let isMagicalOrbThrowCanceled = false;

    if ((player.rageLevel === 100) && (!player.isMagicalOrbThrowRandomlyPerformed)) {
        isMagicalOrbThrowCanceled = true;
    }

    return isMagicalOrbThrowCanceled;
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
            globals.action.attackHandToHand = true;
            break;
        
        case Key.S:
            if (!isMagicalOrbThrowCanceledDueToRageBeing100()) {
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