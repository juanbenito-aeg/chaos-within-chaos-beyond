import Sprite from "./sprites/Sprite.js";
import InGameSprite from "./sprites/InGameSprite.js";
import Player from "./sprites/Player.js";
import MagicalOrb from "./sprites/MagicalOrb.js";
import ChaoticHumanBow from "./sprites/ChaoticHumanBow.js";
import Arrow from "./sprites/Arrow.js";
import ChaoticHumanSword from "./sprites/ChaoticHumanSword.js";
import FastWorm from "./sprites/FastWorm.js";
import HellBatAcid from "./sprites/HellBatAcid.js";
import Acid from "./sprites/Acid.js";
import HellBatHandToHand from "./sprites/HellBatHandToHand.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import Physics from "./Physics.js";
import HitBox from "./HitBox.js";
import Collisions from "./Collisions.js";
import Timer from "./Timer.js";
import globals from "./globals.js";
import { Level, level1 } from "./Level.js";
import { Game, FPS, SpriteID, State } from "./constants.js";
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

function initTimers() {
    globals.nextOrbThrowDelay = new Timer(5, 1);
    globals.nextArrowShotDelay = new Timer(5, 1);
    globals.nextAcidDropDelay = new Timer(5, 1);
    globals.nextRagePtUpDelay = new Timer(3, 1);
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

        globals.gameState = Game.PLAYING;
    }
}

function initLevel() {
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 16, 0, 0, 16, 16);

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
    initChaoticHumanSword();
    initFastWorm();
    initHellBatAcid();
    initHellBatHandToHand();
    initPotionGreen();
    initPotionBlue();

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

function initLeftArrowKey() {
    const imageSet = new ImageSet(1496, 66, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const leftArrowKey = new Sprite(SpriteID.LEFT_ARROW_KEY, State.STILL, 414, 82, imageSet, frames);

    // |||||||||||| ADD THE "LEFT ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(leftArrowKey);
}

function initRightArrowKey() {
    const imageSet = new ImageSet(1496, 88, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const rightArrowKey = new Sprite(SpriteID.RIGHT_ARROW_KEY, State.STILL, 414, 107.5, imageSet, frames);

    // |||||||||||| ADD THE "RIGHT ARROW" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(rightArrowKey);
}

function initSpaceKey() {
    const imageSet = new ImageSet(1680, 22, 98, 21, 105, 22, 0, 0, 94, 17);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const spaceKey = new Sprite(SpriteID.SPACE_KEY, State.STILL, 337, 132, imageSet, frames);

    // |||||||||||| ADD THE "SPACE" KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(spaceKey);
}

function initALetterKey() {
    const imageSet = new ImageSet(1584, 22, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const ALetterKey = new Sprite(SpriteID.A_LETTER_KEY, State.STILL, 414, 193.5, imageSet, frames);

    // |||||||||||| ADD THE "A" LETTER KEY TO ITS CORRESPONDING SPRITES ARRAY
    globals.controlsMenuSprites.push(ALetterKey);
}

function initSLetterKey() {
    const imageSet = new ImageSet(1584, 44, 19, 21, 22, 22, 0, 0, 17, 19);

    // |||||||||||| 3 FRAMES PER STATE
    const frames = new Frames(3);

    const SLetterKey = new Sprite(SpriteID.S_LETTER_KEY, State.STILL, 414, 218.5, imageSet, frames);

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

    const hitBox = new HitBox(13, 34, 15, 5);

    const collisions = new Collisions();

    // |||||||||||| LIFE POINTS, STARTING IN 3 AND RANGING FROM 1 TO 5 (REPRESENTED BY X.G FACE'S DIFFERENT FRAMES)
    const lifePoints = 3;

    const afterAttackLeeway = new Timer(0, 1);
    
    const player = new Player(SpriteID.PLAYER, State.RIGHT_STILL, 40, 184, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);

    // |||||||||||| ADD PLAYER TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(player);
}

function initChaoticHumanBow() {
    const imageSet = new ImageSet(1151, 0, 48, 64, 64, 63, 4, 0, 30, 46);

    // |||||||||||| ANIMATION DATA CREATION: 3 FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(3, 6);

    const physics = new Physics(-1);

    const hitBox = new HitBox(7.9, 36, 15.5, 5);

    const collisions = new Collisions();

    const afterAttackLeeway = new Timer(0, 1);

    const chaoticHumanBow = new ChaoticHumanBow(SpriteID.CHAOTIC_HUMAN_BOW, State.LEFT_ATTACK_2, 275, 23, imageSet, frames, physics, hitBox, collisions, 2, afterAttackLeeway);

    // |||||||||||| ADD CHAOTIC HUMAN (BOW) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(chaoticHumanBow);
}

function initChaoticHumanSword() {
    const imageSet = new ImageSet(576, 0, 60, 62.5, 64, 62.5, 0, 0, 44, 46.5);

    // |||||||||||| ANIMATION DATA CREATION: 9 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(9, 3);

    const physics = new Physics(20);

    const hitBox = new HitBox(26, 38, 4, 5.5);

    const collisions = new Collisions();

    const afterAttackLeeway = new Timer(0, 1);

    const chaoticHumanSword = new ChaoticHumanSword(SpriteID.CHAOTIC_HUMAN_SWORD, State.LEFT_3, 225, 21, imageSet, frames, physics, 3, hitBox, collisions, 2, afterAttackLeeway);

    // |||||||||||| ADD CHAOTIC HUMAN (SWORD) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(chaoticHumanSword);
}

function initFastWorm() {
    const imageSet = new ImageSet(899, 505, 48, 55, 64.15, 63.1, 6, 6, 33, 40);

    // |||||||||||| ANIMATION DATA CREATION: 6 FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(6, 3);

    const physics = new Physics(20);

    const hitBox = new HitBox(24, 33, 5.5, 4.5);

    const collisions = new Collisions();

    const afterAttackLeeway = new Timer(0, 1);

    const fastWorm = new FastWorm(SpriteID.FAST_WORM, State.LEFT, 390, 124, imageSet, frames, physics, hitBox, collisions, 2, afterAttackLeeway);

    // |||||||||||| ADD FAST WORM TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(fastWorm);
}

function initHellBatAcid() {
    const imageSet = new ImageSet(1952, 1180, 92, 90, 122, 118, 30, 28, 52, 50);

    // |||||||||||| ANIMATION DATA CREATION: 6 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(6, 7);

    // |||||||||||| INITIAL VALUES FOR "Physics"
    const omega = 1;
    const initAngle = 90 * Math.PI / 180;
    const xRotCenter = 65;
    const yRotCenter = 30;

    const physics = new Physics(60, 0, 1, 0, omega, initAngle, xRotCenter, yRotCenter);

    const hitBox = new HitBox(32, 27, 1, 12);

    const collisions = new Collisions();

    const afterAttackLeeway = new Timer(0, 1);

    const hellBatAcid = new HellBatAcid(SpriteID.HELL_BAT_ACID, State.DOWN, 0, 0, imageSet, frames, physics, hitBox, collisions, 2, afterAttackLeeway);

    // |||||||||||| POSITION THE SPRITE
    hellBatAcid.setPosition();

    // |||||||||||| ADD HELL BAT (ACID) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(hellBatAcid);
}

function initHellBatHandToHand() {
    const imageSet = new ImageSet(1334, 0, 33, 39, 46, 59, 8, 19, 33, 39);

    // |||||||||||| ANIMATION DATA CREATION: 3 FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(3, 7);

    // |||||||||||| INITIAL VALUES FOR "Physics"
    const vLimit = 50;
    const omega = 2.5;
    const initAngle = 90 * Math.PI / 180;
    const yRef = globals.canvas.height / 2.15;

    const physics = new Physics(vLimit, 0, 1, 0, omega, initAngle, 100, 100, yRef);
    physics.vx = vLimit;

    const hitBox = new HitBox(32, 21, 1, 2);

    const collisions = new Collisions();

    const afterAttackLeeway = new Timer(0, 1);

    const hellBatHandToHand = new HellBatHandToHand(SpriteID.HELL_BAT_HAND_TO_HAND, State.DOWN_3, 0, 0, imageSet, frames, physics, hitBox, collisions, 2, afterAttackLeeway);

    // |||||||||||| ADD HELL BAT (HAND-TO-HAND) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(hellBatHandToHand);
}

function initPotionGreen() {
    const imageSet = new ImageSet(733, 510, 28, 30, 33.25, 30, 0, 0, 14, 16);

    const frames = new Frames(1);

    const hitBox = new HitBox(14, 16, 0, 0);

    const collisions = new Collisions();

    const potionGreen = new InGameSprite(SpriteID.POTION_GREEN, State.STILL, 306, 48, imageSet, frames, null, hitBox, collisions);

    // |||||||||||| ADD POTION (GREEN) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(potionGreen);
}

function initPotionBlue() {
    const imageSet = new ImageSet(699.75, 510, 28, 30, 33.25, 30, 1, 0, 14, 16);

    const frames = new Frames(1);

    const hitBox = new HitBox(14, 16, 0, 0);

    const collisions = new Collisions();

    const potionBlue = new InGameSprite(SpriteID.POTION_BLUE, State.STILL, 206, 48, imageSet, frames, null, hitBox, collisions);

    // |||||||||||| ADD POTION (BLUE) TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(potionBlue);
}

function initMagicalOrb() {
    const player = globals.screenSprites[0];
    
    let magicalOrbXPos;
    let magicalOrbYPos = player.yPos + (player.imageSet.yDestinationSize / 3);
    
    let vLimit;

    if (player.state === State.LEFT_ATTACK_MAGICAL_ORB) {
        magicalOrbXPos = player.xPos;
        vLimit = -210;
    } else {
        magicalOrbXPos = player.xPos + player.imageSet.xDestinationSize;
        vLimit = 210;
    }

    const imageSet = new ImageSet(572, 507, 31.8, 31.7, 31.8, 31.7, 0, 0, 18.8, 18.7);

    const frames = new Frames(4, 1);

    const physics = new Physics(vLimit);
    physics.vx = vLimit;

    const hitBox = new HitBox(17.5, 18, 1, 1);

    const collisions = new Collisions();

    const magicalOrb = new MagicalOrb(SpriteID.MAGICAL_ORB, State.STILL, magicalOrbXPos, magicalOrbYPos, imageSet, frames, physics, hitBox, collisions);

    // |||||||||||| ADD MAGICAL ORB TO ITS CORRESPONDING SPRITES ARRAY
    globals.screenSprites.push(magicalOrb);
}

function initArrow() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.CHAOTIC_HUMAN_BOW) {
            const chaoticHumanBow = globals.screenSprites[i];
            
            let state;
        
            let xPos;
            let yPos = chaoticHumanBow.yPos + (chaoticHumanBow.imageSet.yDestinationSize / 3.75);
            
            let vLimit;
        
            if (chaoticHumanBow.state === State.LEFT_ATTACK_2) {
                state = State.LEFT_4;
                xPos = chaoticHumanBow.xPos;
                vLimit = -210;
            } else {
                state = State.RIGHT_4;
                xPos = chaoticHumanBow.xPos + chaoticHumanBow.imageSet.xDestinationSize;
                vLimit = 210;
            }
        
            const imageSet = new ImageSet(580, 564, 16, 7, 20, 14.1, 0, 0, 16, 7);
        
            // |||||||||||| ANIMATION DATA CREATION: 1 FRAME PER STATE & ANIMATION SPEED
            const frames = new Frames(1, 1);
        
            const physics = new Physics(vLimit);
            physics.vx = vLimit;
        
            const hitBox = new HitBox(16, 7, 0, 0);
        
            const collisions = new Collisions();
        
            const arrow = new Arrow(SpriteID.ARROW, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);
        
            // |||||||||||| ADD ARROW TO ITS CORRESPONDING SPRITES ARRAY
            globals.screenSprites.push(arrow);

            break;
        }
    }
}

function initAcid() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.HELL_BAT_ACID) {
            const hellBatAcid = globals.screenSprites[i];
            
            const xPos = hellBatAcid.xPos + (hellBatAcid.imageSet.xDestinationSize / 3.35);
            const yPos = hellBatAcid.yPos + (hellBatAcid.imageSet.yDestinationSize / 2.5);
            
            const vLimit = 180;
        
            const imageSet = new ImageSet(570, 440, 19, 35, 30, 40, 7, 2, 4, 20);
        
            const frames = new Frames(4, 3);
        
            const physics = new Physics(vLimit);
            physics.vy = vLimit;
        
            const hitBox = new HitBox(4, 18, 0, 2);
        
            const collisions = new Collisions();
        
            const acid = new Acid(SpriteID.ACID, State.STILL, xPos, yPos, imageSet, frames, physics, hitBox, collisions);
        
            // |||||||||||| ADD ACID TO ITS CORRESPONDING SPRITES ARRAY
            globals.screenSprites.push(acid);

            break;
        }
    }
}

function initSkull() {
    const imageSet = new ImageSet(153, 1780, 120, 162, 153, 178, 32, 14, 80, 122);

    const frames = new Frames(1);

    const skull = new Sprite(SpriteID.SKULL, State.STILL, 186, 20, imageSet, frames);

    // |||||||||||| ASSIGN SKULL TO ITS CORRESPONDING VARIABLE
    globals.gameOverSprite = skull;
}

// |||||||||||| EXPORTS
export { initHTMLElements, loadAssets, initVars, initSprites, initLevel, initEvents, initMagicalOrb, initTimers, initArrow, initAcid };