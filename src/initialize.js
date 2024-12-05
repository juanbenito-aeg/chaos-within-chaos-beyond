import globals from "./globals.js";
import { Game, FPS, SpriteID, State } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Level.js";

// |||||||||||| INITIALIZES THE HTML ELEMENTS
function initHTMLElements() {
    // |||||||| CANVAS, CONTEXT (SCREEN)
    globals.canvas = document.getElementById("gameScreen");
    globals.ctx = globals.canvas.getContext("2d");
    
    // |||||||| CANVAS, CONTEXT (HUD)
    globals.canvasHUD = document.getElementById("gameHUD");
    globals.ctxHUD = globals.canvasHUD.getContext("2d");

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
    let tileSet;

    // |||||||| LOAD THE SPRITESHEET
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
    
    // |||||||| LOAD THE MAP TILESET
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/map-tileset.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}

// |||||||||||| FUNCTION THAT IS CALLED EACH TIME AN ASSET IS LOADED
function loadHandler() {
    globals.assetsLoaded++;

    if (globals.assetsLoaded === globals.assetsToLoad.length) {
        for (let i = 0; i < globals.tileSets.length; i++) {
            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }

        console.log("Assets finished loading");

        // |||||||| START THE GAME
        globals.gameState = Game.PLAYING;
    }
}

function initSprites() {
    initTheEruditeHUD();
    initRageBarContainer();
    initRageBarContent();
    initBackgroundImg();
    initPlayer();
}

function initTheEruditeHUD() {
    const imageSet = new ImageSet(0, 1321, 85, 85, 85, 85, 0, 0);

    const frames = new Frames(5);

    const theEruditeHUD = new Sprite(SpriteID.THE_ERUDITE_HUD, State.STILL, 181, 0, imageSet, frames);

    globals.sprites.push(theEruditeHUD);
}

function initRageBarContainer() {
    const imageSet = new ImageSet(0, 1404, 112, 28, 112, 26, 0, 0);

    const frames = new Frames(1);

    const rageBarContainer = new Sprite(SpriteID.RAGE_BAR_CONTAINER, State.STILL, 321, 29, imageSet, frames);

    globals.sprites.push(rageBarContainer);
}

function initRageBarContent() {
    const imageSet = new ImageSet(112, 1404, 86, 14, 86, 14, 0, 0);

    const frames = new Frames(1);

    const rageBarContent = new Sprite(SpriteID.RAGE_BAR_CONTENT, State.STILL, 334, 36, imageSet, frames);

    globals.sprites.push(rageBarContent);
}

function initBackgroundImg() {
    const imageSet = new ImageSet(0, 1063, 448, 256, 448, 329, 0, 0);

    const frames = new Frames(1);

    const backgroundImg = new Sprite(SpriteID.BACKGROUND_IMG, State.STILL, 0, 0, imageSet, frames);

    globals.sprites.push(backgroundImg);
}

function initPlayer() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 64, 61, 64, 64, 0, 3);

    // |||||||||||| CREATE THE ANIMATION DATA. 9 (OR LESS IN THIS CASE) FRAMES PER STATE
    const frames = new Frames(9);

    // |||||||||||| CREATE SPRITE
    const player = new Sprite(SpriteID.PLAYER, State.RIGHT, 0, 0, imageSet, frames);

    // |||||||||||| ADD PLAYER TO THE SPRITES' ARRAY
    globals.sprites.push(player);
}

function initLevel() {
    // |||||||||||| CREATE THE MAP'S IMAGES PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 16, 0, 0);

    // |||||||||||| CREATE AND SAVE THE CAVE SECTION (LEVEL)
    globals.level = new Level(level1, imageSet);
}

// |||||||||||| EXPORTS
export { initHTMLElements, loadAssets, initVars, initSprites, initLevel };