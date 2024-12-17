import { Key } from "./constants.js";
import globals from "./globals.js";

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
            globals.action.throwMagicalOrb = true;
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

export { keydownHandler, keyupHandler };