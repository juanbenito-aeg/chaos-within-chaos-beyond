import globals from "./globals.js";
import { Game, FPS, SpriteID, State } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Level.js";
import Physics from "./Physics.js";
import { keydownHandler, keyupHandler } from "./events.js";

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

    // |||||||| INITIALIZE THE STATE OF THE ACTIONS
    globals.action = {
        jump: false,
        moveLeft: false,
        moveRight: false,
        attackHandToHand: false,
        throwMagicalOrb: false,
    };
}

function initEvents() {
    // |||||||||||| ADD THE KEYBOARD EVENT LISTENERS
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
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

        // |||||||| SHOW [-]
        globals.gameState = Game.PLAYING;
    }
}

function initLevel() {
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 16, 0, 0);

    // |||||||||||| CREATE AND SAVE THE CAVE SECTION (LEVEL)
    globals.level = new Level(level1, imageSet);
}

function initSprites() {
    // |||||||||||| INITIALIZATION OF THE MENUS BACKGROUND IMAGES SPRITES
    initMainMenuBackgroundImg();
    initStoryMenuBackgroundImg();
    initHighScoresMenuBackgroundImg();
    initControlsMenuBackgroundImg();
    
    // |||||||||||| INITIALIZATION OF THE SCREEN BACKGROUND IMAGES SPRITES
    initScreenCaveSect1BackgroundImg();
    // initScreenCaveSect2BackgroundImg();

    // |||||||||||| INITIALIZATION OF THE MAIN MENU SPRITES
    initNewGameIcon();
    initStoryIcon();
    initHighScoresIcon();
    initControlsIcon();

    // |||||||||||| INITIALIZATION OF THE CONTROLS MENU SPRITES
    initUpArrowKey();
    initDownArrowKey();
    initLeftArrowKey();
    initRightArrowKey();
    initSpaceKey();
    initALetterKey();
    initSLetterKey();

    // |||||||||||| INITIALIZATION OF THE HUD SPRITES
    initTheEruditeHUD();
    initRageBarContainer();
    initRageBarContent();

    // |||||||||||| INITIALIZATION OF THE SCREEN SPRITES
    initPlayer();
    initChaoticHumanBow();
    // initChaoticHumanSword();
    initFastWorm();
    initHellBatAcid();
    // initHellBatHandToHand();
    initPotionGreen();
    // initPotionBlue();

    // |||||||||||| INITIALIZATION OF THE "GAME OVER" SCREEN SPRITES
    initSkull();
}

function initMainMenuBackgroundImg() {
    const imageSet = new ImageSet(0, 1432, 597, 341, 597, 358, 77, 0, -1, -1);

    const frames = new Frames(1);

    const mainMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_MAIN_MENU, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD THE MAIN MENU'S BACKGROUND IMAGE TO ITS CORRESPONDING SPRITES ARRAY
    globals.menusBackgroundImgsSprites.push(mainMenuBackgroundImg);
}

function initStoryMenuBackgroundImg() {
    const imageSet = new ImageSet(601, 1432, 597, 341, 601, 358, 74, 0, -1, -1);

    const frames = new Frames(1);

    const storyMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_STORY_MENU, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD THE STORY MENU'S BACKGROUND IMAGE TO ITS CORRESPONDING SPRITES ARRAY
    globals.menusBackgroundImgsSprites.push(storyMenuBackgroundImg);
}

function initHighScoresMenuBackgroundImg() {
    const imageSet = new ImageSet(601, 1074, 597, 341, 601, 358, 110, 10, -1, -1);

    const frames = new Frames(1);

    const highScoresMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_HIGH_SCORES_MENU, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD THE HIGH SCORES MENU'S BACKGROUND IMAGE TO ITS CORRESPONDING SPRITES ARRAY
    globals.menusBackgroundImgsSprites.push(highScoresMenuBackgroundImg);
}

function initControlsMenuBackgroundImg() {
    const imageSet = new ImageSet(1204, 1432, 597, 341, 602, 358, 74, 0, -1, -1);

    const frames = new Frames(1);

    const controlsMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_CONTROLS_MENU, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD THE CONTROLS MENU'S BACKGROUND IMAGE TO ITS CORRESPONDING SPRITES ARRAY
    globals.menusBackgroundImgsSprites.push(controlsMenuBackgroundImg);
}

function initScreenCaveSect1BackgroundImg() {
    const imageSet = new ImageSet(0, 1063, 448, 256, 448, 329, 0, 0, -1, -1);

    const frames = new Frames(1);

    const screenCaveSect1BackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_CAVE_SECT_1, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD THE CAVE'S FIRST SECTION'S BACKGROUND IMAGE TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenBackgroundImgsSprites.push(screenCaveSect1BackgroundImg);
}

function initNewGameIcon() {
    const imageSet = new ImageSet(96, 1941, 64, 80, 96, 102.15, 0, 0, 28, 35);

    const frames = new Frames(1);

    const newGameIcon = new Sprite(SpriteID.NEW_GAME_ICON, State.STILL, 114.5, 133, imageSet, frames);

    // |||||||||||| ADD THE "NEW GAME" ICON TO ITS CORRESPONDING SPRITES ARRAY
    globals.mainMenuSprites.push(newGameIcon);
}

function initStoryIcon() {
    const imageSet = new ImageSet(0, 1846, 104, 88, 104, 97.15, 0, 7, 34, 34);

    const frames = new Frames(1);

    const storyIcon = new Sprite(SpriteID.STORY_ICON, State.STILL, 109, 234.5, imageSet, frames);

    // |||||||||||| ADD THE "STORY" ICON TO ITS CORRESPONDING SPRITES ARRAY
    globals.mainMenuSprites.push(storyIcon);
}

function initHighScoresIcon() {
    const imageSet = new ImageSet(0, 1941, 96, 96, 104, 102.15, 0, 0, 34, 34);

    const frames = new Frames(1);

    const highScoresIcon = new Sprite(SpriteID.HIGH_SCORES_ICON, State.STILL, 305, 133.5, imageSet, frames);

    // |||||||||||| ADD THE "HIGH SCORES" ICON TO ITS CORRESPONDING SPRITES ARRAY
    globals.mainMenuSprites.push(highScoresIcon);
}

function initControlsIcon() {
    const imageSet = new ImageSet(0, 1773, 112, 80, 112, 88.65, 0, 0, 40, 34);

    const frames = new Frames(1);

    const controlsIcon = new Sprite(SpriteID.CONTROLS_ICON, State.STILL, 302, 234, imageSet, frames);

    // |||||||||||| ADD THE "CONTROLS" ICON TO ITS CORRESPONDING SPRITES ARRAY
    globals.mainMenuSprites.push(controlsIcon);
}

function initUpArrowKey() {
    const imageSet = new ImageSet(1496, 22, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const upArrowKey = new Sprite(SpriteID.UP_ARROW_KEY, State.STILL, 414, 82, imageSet, frames);

    // |||||||||||| ADD THE "UP ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(upArrowKey);
}

function initDownArrowKey() {
    const imageSet = new ImageSet(1496, 44, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const downArrowKey = new Sprite(SpriteID.DOWN_ARROW_KEY, State.STILL, 414, 107.5, imageSet, frames);

    // |||||||||||| ADD THE "DOWN ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(downArrowKey);
}

function initLeftArrowKey() {
    const imageSet = new ImageSet(1496, 66, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const leftArrowKey = new Sprite(SpriteID.LEFT_ARROW_KEY, State.STILL, 414, 132, imageSet, frames);

    // |||||||||||| ADD THE "LEFT ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(leftArrowKey);
}

function initRightArrowKey() {
    const imageSet = new ImageSet(1496, 88, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const rightArrowKey = new Sprite(SpriteID.RIGHT_ARROW_KEY, State.STILL, 414, 157, imageSet, frames);

    // |||||||||||| ADD THE "RIGHT ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(rightArrowKey);
}

function initSpaceKey() {
    const imageSet = new ImageSet(1680, 22, 98, 21, 105, 22, 0, 0, 94, 17);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const spaceKey = new Sprite(SpriteID.SPACE_KEY, State.STILL, 337, 182.75, imageSet, frames);

    // |||||||||||| ADD THE "SPACE" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(spaceKey);
}

function initALetterKey() {
    const imageSet = new ImageSet(1584, 22, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const ALetterKey = new Sprite(SpriteID.A_LETTER_KEY, State.STILL, 414, 236.5, imageSet, frames);

    // |||||||||||| ADD THE "A" LETTER KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(ALetterKey);
}

function initSLetterKey() {
    const imageSet = new ImageSet(1584, 44, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const SLetterKey = new Sprite(SpriteID.S_LETTER_KEY, State.STILL, 414, 261.5, imageSet, frames);

    // |||||||||||| ADD THE "S" LETTER KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(SLetterKey);
}

function initTheEruditeHUD() {
    const imageSet = new ImageSet(0, 1321, 85, 85, 85, 85, 0, 0, -1, -1);

    const frames = new Frames(5);

    const theEruditeHUD = new Sprite(SpriteID.THE_ERUDITE_HUD, State.STILL, 181, 0, imageSet, frames);

    // |||||||||||| ADD THE ERUDITE (HUD) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(theEruditeHUD);
}

function initRageBarContainer() {
    const imageSet = new ImageSet(0, 1404, 112, 28, 112, 26, 0, 0, -1, -1);

    const frames = new Frames(1);

    const rageBarContainer = new Sprite(SpriteID.RAGE_BAR_CONTAINER, State.STILL, 321, 29, imageSet, frames);

    // |||||||||||| ADD RAGE BAR (CONTAINER) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(rageBarContainer);
}

function initRageBarContent() {
    const imageSet = new ImageSet(112, 1404, 86, 14, 86, 14, 0, 0, -1, -1);

    const frames = new Frames(1);

    const rageBarContent = new Sprite(SpriteID.RAGE_BAR_CONTENT, State.STILL, 334, 36, imageSet, frames);

    // |||||||||||| ADD RAGE BAR (CONTENT) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(rageBarContent);
}

function initPlayer() {
    const imageSet = new ImageSet(2036, 0, 59, 62, 63.6, 64, 4.6, 2, 43, 46);

    // |||||||||||| ANIMATION DATA CREATION: 9 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(9, 4);

    const physics = new Physics(40, 0, 1, -140);

    const player = new Sprite(SpriteID.PLAYER, State.RIGHT_STILL, 0, 186, imageSet, frames, physics);

    // |||||||||||| ADD PLAYER TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(player);
}

function initChaoticHumanBow() {
    const imageSet = new ImageSet(1151, 0, 48, 64, 64, 63, 4, 0, 30, 46);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const chaoticHumanBow = new Sprite(SpriteID.CHAOTIC_HUMAN_BOW, State.DOWN_2, 0, 0, imageSet, frames);

    // |||||||||||| ADD CHAOTIC HUMAN (BOW) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(chaoticHumanBow);
}

function initChaoticHumanSword() {
    const imageSet = new ImageSet(576, 0, 60, 62.5, 64, 62.5, 0, 0, 44, 46.5);

    // |||||||||||| 9 (OR LESS IN THIS CASE) FRAMES PER STATE
    const frames = new Frames(9);

    const chaoticHumanSword = new Sprite(SpriteID.CHAOTIC_HUMAN_SWORD, State.DOWN_3, 0, 0, imageSet, frames);

    // |||||||||||| ADD CHAOTIC HUMAN (SWORD) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(chaoticHumanSword);
}

function initFastWorm() {
    const imageSet = new ImageSet(899, 505, 42.15, 58, 64.15, 63.1, 0, 6, 28.15, 44);

    // |||||||||||| 6 FRAMES PER STATE
    const frames = new Frames(6);

    const fastWorm = new Sprite(SpriteID.FAST_WORM, State.UP, 0, 0, imageSet, frames);

    // |||||||||||| ADD FAST WORM TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(fastWorm);
}

function initHellBatAcid() {
    const imageSet = new ImageSet(0, 590, 92, 91, 122, 118, 30, 27, 50, 49);

    // |||||||||||| 7 FRAMES PER STATE
    const frames = new Frames(7);

    const hellBatAcid = new Sprite(SpriteID.HELL_BAT_ACID, State.UP, 0, 0, imageSet, frames);

    // |||||||||||| ADD HELL BAT (ACID) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(hellBatAcid);
}

function initHellBatHandToHand() {
    const imageSet = new ImageSet(1334, 0, 33, 37, 46, 59, 8, 21, 33, 37);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const hellBatHandToHand = new Sprite(SpriteID.HELL_BAT_HAND_TO_HAND, State.DOWN_3, 0, 0, imageSet, frames);

    // |||||||||||| ADD HELL BAT (HAND-TO-HAND) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(hellBatHandToHand);
}

function initPotionGreen() {
    const imageSet = new ImageSet(733, 510, 28, 30, 33.25, 30, 0, 0, 14, 16);

    const frames = new Frames(1);

    const potionGreen = new Sprite(SpriteID.POTION_GREEN, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD POTION (GREEN) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(potionGreen);
}

function initPotionBlue() {
    const imageSet = new ImageSet(699.75, 510, 28, 30, 33.25, 30, 1, 0, 14, 16);

    const frames = new Frames(1);

    const potionBlue = new Sprite(SpriteID.POTION_BLUE, State.STILL, 0, 0, imageSet, frames);

    // |||||||||||| ADD POTION (BLUE) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(potionBlue);
}

function initMagicalOrb() {
    const player = globals.screenSprites[0];
    const xPos = player.xPos + player.imageSet.xSize;
    const yPos = player.yPos;

    const imageSet = new ImageSet(572, 507, 31.8, 31.7, 31.8, 31.7, 0, 0, 31.8, 31.7);

    const frames = new Frames(4, 2);

    const physics = new Physics(200);

    const magicalOrb = new Sprite(SpriteID.MAGICAL_ORB, State.STILL, xPos, yPos, imageSet, frames, physics);

    // |||||||||||| ADD MAGICAL ORB TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(magicalOrb);
}

function initSkull() {
    const imageSet = new ImageSet(153, 1780, 120, 162, 153, 178, 32, 14, 80, 122);

    const frames = new Frames(1);

    const skull = new Sprite(SpriteID.SKULL, State.STILL, 186, 20, imageSet, frames);

    // |||||||||||| ASSIGN SKULL TO ITS CORRESPONDING VARIABLE
    globals.gameOverSprite = skull;
}

// |||||||||||| EXPORTS
export { initHTMLElements, loadAssets, initVars, initSprites, initLevel, initEvents, initMagicalOrb };