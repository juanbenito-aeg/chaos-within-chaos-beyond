import globals from "./globals.js";
import { Game, FPS, SpriteID, State } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";

// |||||||||||| INITIALIZES THE HTML ELEMENTS

function initHTMLElements() {
    // |||||||| CANVAS
    globals.canvas = document.getElementById("gameScreen");

    // |||||||| CONTEXT
    globals.ctx = globals.canvas.getContext("2d");

    // |||||||| ANTI-ALIASING DELETION
    globals.ctx.imageSmoothingEnabled = false;

    // |||||||| TEXT BOX FOR TESTING
    globals.txtPruebas = document.getElementById("txtPruebas");
}


// |||||||||||| INITIALIZES THE GAME'S VARIABLES

function initVars() {
    // |||||||| INITIALIZE THE TIME MANAGEMENT VARIABLES
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;

    // |||||||| INITIALIZE THE GAME STATE
    globals.gameState = Game.LOADING;
}


// |||||||||||| ASSETS LOADING: TILEMAPS, IMAGES, SOUNDS

function loadAssets() {
    // |||||||| LOAD THE tileSet IMAGE
    globals.tileSet = new Image();
    globals.tileSet.addEventListener("load", loadHandler, false);
    globals.tileSet.src = "./images/spritesheet.png";
    globals.assetsToLoad.push(globals.tileSet);
}


// |||||||||||| FUNCTION THAT IS CALLED EACH TIME AN ASSET IS LOADED

function loadHandler() {
    globals.assetsLoaded++;

    if (globals.assetsLoaded === globals.assetsToLoad.length) {
        globals.tileSet.removeEventListener("load", loadHandler, false);

        console.log("Assets finished loading");

        globals.gameState = Game.PLAYING;
    }
}


function initSprites() {
    initPlayer();
}

function initPlayer() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(3, 0, 66, 66, 66, 0, 0);

    // |||||||||||| CREATE THE ANIMATION DATA. 8 FRAMES / STATE
    const frames = new Frames(8);

    // |||||||||||| CREATE SPRITE
    const player = new Sprite(SpriteID.PLAYER, State.UP, 100, 70, imageSet, frames);

    // |||||||||||| ADD PLAYER TO THE SPRITES' ARRAY
    globals.sprites.push(player);
}


// |||||||||||| EXPORTS

export { initHTMLElements, loadAssets, initVars, initSprites };