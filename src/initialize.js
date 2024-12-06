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
    initChaoticHumanBow();
    initFastWorm();
    initHellBatAcid();
    initPotionGreen();
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
    const imageSet = new ImageSet(0, 0, 63.6, 61, 63.6, 64, 0, 3);

    // |||||||||||| CREATE THE ANIMATION DATA. 9 (OR LESS IN THIS CASE) FRAMES PER STATE
    const frames = new Frames(9);

    // |||||||||||| CREATE SPRITE
    const player = new Sprite(SpriteID.PLAYER, State.RIGHT, 0, 0, imageSet, frames);

    // |||||||||||| ADD PLAYER TO THE SPRITES' ARRAY
    globals.sprites.push(player);
}

function initChaoticHumanBow() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(1151, 0, 48, 64, 64, 63, 4, 0);

    // |||||||||||| CREATE THE ANIMATION DATA. 3 FRAMES PER STATE
    const frames = new Frames(3);

    // |||||||||||| CREATE SPRITE
    const chaoticHumanBow = new Sprite(SpriteID.CHAOTIC_HUMAN_BOW, State.DOWN_2, 0, 0, imageSet, frames);

    // |||||||||||| ADD CHAOTIC HUMAN (BOW) TO THE SPRITES' ARRAY
    globals.sprites.push(chaoticHumanBow);
}

function initFastWorm() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(899, 505, 42.15, 58, 64.15, 63.1, 0, 6);

    // |||||||||||| CREATE THE ANIMATION DATA. 6 FRAMES PER STATE
    const frames = new Frames(6);

    // |||||||||||| CREATE SPRITE
    const fastWorm = new Sprite(SpriteID.FAST_WORM, State.UP, 0, 0, imageSet, frames);

    // |||||||||||| ADD FAST WORM TO THE SPRITES' ARRAY
    globals.sprites.push(fastWorm);
}

function initHellBatAcid() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 590, 92, 91, 122, 118, 30, 27);

    // |||||||||||| CREATE THE ANIMATION DATA. 7 FRAMES PER STATE
    const frames = new Frames(7);

    // |||||||||||| CREATE SPRITE
    const hellBatAcid = new Sprite(SpriteID.HELL_BAT_ACID, State.UP, 0, 0, imageSet, frames);

    // |||||||||||| ADD HELL BAT (ACID) TO THE SPRITES' ARRAY
    globals.sprites.push(hellBatAcid);
}

function initPotionGreen() {
    // |||||||||||| CREATE THE IMAGES' PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(733, 510, 28, 30, 33.25, 30, 0, 0);

    // |||||||||||| CREATE THE ANIMATION DATA. 1 FRAME PER STATE
    const frames = new Frames(1);

    // |||||||||||| CREATE SPRITE
    const potionGreen = new Sprite(SpriteID.POTION_GREEN, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD POTION (GREEN) TO THE SPRITES' ARRAY
    globals.sprites.push(potionGreen);
}

function initLevel() {
    // |||||||||||| CREATE THE MAP'S IMAGES PROPERTIES: xInit, yInit, xSize, ySize, xGridSize, yGridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 16, 0, 0);

    // |||||||||||| CREATE AND SAVE THE CAVE SECTION (LEVEL)
    globals.level = new Level(level1, imageSet);
}

// |||||||||||| EXPORTS
export { initHTMLElements, loadAssets, initVars, initSprites, initLevel };