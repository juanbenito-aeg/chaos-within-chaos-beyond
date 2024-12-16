import globals from "./globals.js";
import { initHTMLElements, loadAssets, initSprites, initVars, initLevel, initEvents } from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";

// |||||||||||| GAME INITIALIZATION

window.onload = init;

function init() {
    // |||||||| INITIALIZATION OF THE HTML ELEMENTS: CANVAS & CONTEXT (SCREEN & HUD)
    initHTMLElements();
    
    // |||||||| INITIALIZATION OF THE GAME'S VARIABLES
    initVars();
    
    initEvents();

    // |||||||| LOAD ALL ASSETS: TILEMAPS, IMAGES, SOUNDS
    loadAssets();

    // |||||||| INITIALIZATION OF THE GAME'S MAP
    initLevel();

    // |||||||| INITIALIZATION OF SPRITES
    initSprites();

    // |||||||| FIRST FRAME REQUEST
    window.requestAnimationFrame(gameLoop);
}

// |||||||||||| GAME EXECUTION

// |||||||| MAIN EXECUTION LOOP
function gameLoop(timeStamp) {
    // |||| KEEP REQUESTING ANIMATION FRAMES
    window.requestAnimationFrame(gameLoop, globals.canvas);

    // |||| ACTUAL EXECUTION CYCLE TIME
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000;

    // |||| PREVIOUS EXECUTION CYCLE TIME
    globals.previousCycleMilliseconds = timeStamp;

    // |||| VARIABLE CORRECTING THE FRAME TIME DUE TO DELAYS WITH RESPECT TO GOAL TIME (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;

    globals.cycleRealTime += elapsedCycleSeconds;

    if (globals.cycleRealTime >= globals.frameTimeObj) {
        // |||| UPDATE THE GAME LOGIC
        update();

        // |||| PERFORM THE DRAWING OPERATION
        render();

        // |||| CORRECT EXCESS OF TIME
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}