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
    }
}

export { keydownHandler, keyupHandler };