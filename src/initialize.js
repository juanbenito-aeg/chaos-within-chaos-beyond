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
    initBackgroundImg();
    initPlayer();
}

function initPlayer() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 64, 61, 64, 64, 0, 3);

    // |||||||||||| CREATE THE ANIMATION DATA. 9 FRAMES / STATE
    const frames = new Frames(9);

    // |||||||||||| CREATE SPRITE
    const player = new Sprite(SpriteID.PLAYER, State.UP, 0, 0, imageSet, frames);

    // |||||||||||| ADD PLAYER TO THE SPRITES' ARRAY
    globals.sprites.push(player);
}

function initBackgroundImg() {
    const imageSet = new ImageSet(0, 1063, 448, 256, 448, 329, 0, 0);

    const frames = new Frames(0);

    const backgroundImg = new Sprite(SpriteID.BACKGROUND_IMG, State.STILL, 0, 0, imageSet, frames);

    globals.sprites.push(backgroundImg);
}


// |||||||||||| EXPORTS

export { initHTMLElements, loadAssets, initVars, initSprites };