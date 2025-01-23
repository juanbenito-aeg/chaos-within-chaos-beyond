import Sprite from "./sprites/Sprite.js";
import Sun from "./sprites/Sun.js";
import Player from "./sprites/Player.js";
import MagicalOrb from "./sprites/MagicalOrb.js";
import ChaoticHumanBow from "./sprites/ChaoticHumanBow.js";
import Arrow from "./sprites/Arrow.js";
import ChaoticHumanSword from "./sprites/ChaoticHumanSword.js";
import FastWorm from "./sprites/FastWorm.js";
import HellBatAcid from "./sprites/HellBatAcid.js";
import Acid from "./sprites/Acid.js";
import HellBatHandToHand from "./sprites/HellBatHandToHand.js";
import Potion from "./sprites/Potion.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import Physics from "./Physics.js";
import HitBox from "./HitBox.js";
import Collisions from "./Collisions.js";
import Timer from "./Timer.js";
import Camera from "./Camera.js";
import globals from "./globals.js";
import { RageSymbolParticle, ControlsMenuSparkle, CheckpointParticle, LavaParticle, EnemyDeathParticle } from "./Particle.js";
import { Level, level1 } from "./Level.js";
import { Game, FPS, Block, SpriteID, State, ParticleID, ParticleState, GRAVITY } from "./constants.js";
import { keydownHandler, keyupHandler } from "./events.js";

function initEssentials() {
    // |||||||||||| INITIALIZE HTML ELEMENTS
    initHTMLElements();

    // |||||||||||| INITIALIZE GAME VARIABLES
    initVars();

    initEvents();

    // |||||||||||| LOAD ASSETS SUCH AS TILEMAPS, IMAGES & SOUNDS
    loadAssets();
}

function initHTMLElements() {
    // |||||||| CANVAS, CONTEXT (SCREEN)
    globals.canvas = document.getElementById("gameScreen");
    globals.ctx = globals.canvas.getContext("2d");
    
    // |||||||| CANVAS, CONTEXT (HUD)
    globals.canvasHUD = document.getElementById("gameHUD");
    globals.ctxHUD = globals.canvasHUD.getContext("2d");

    // |||||||| ANTI-ALIASING DELETION
    globals.ctx.imageSmoothingEnabled = false;
    globals.ctxHUD.imageSmoothingEnabled = false;
}

function initVars() {
    // |||||||| INITIALIZE TIME MANAGEMENT VARIABLES
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;

    // |||||||| INITIALIZE GAME STATE
    globals.gameState = Game.LOADING;

    // |||||||| INITIALIZE STATE OF ACTIONS
    globals.action = {
        confirmSelection: false,
        return: false,
        jump: false,
        moveLeft: false,
        moveUp: false,
        moveRight: false,
        moveDown: false,
        attackHandToHand: false,
        throwMagicalOrb: false,
    };

    globals.highScores = [
        {
            playerName: "AAA",
            playerScore: 2500,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
        {
            playerName: "---",
            playerScore: 0,
        },
    ];
}

function initEvents() {
    // |||||||||||| ADD KEYBOARD EVENT LISTENERS
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

function loadAssets() {
    let tileSet;

    // |||||||| LOAD SPRITESHEET
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
    
    // |||||||| LOAD MAP TILESET
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/map-tileset.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}

// |||||||||||| CODE BLOCK TO CALL EACH TIME AN ASSET IS LOADED
function loadHandler() {
    globals.assetsLoaded++;

    if (globals.assetsLoaded === globals.assetsToLoad.length) {
        for (let i = 0; i < globals.tileSets.length; i++) {
            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }

        console.log("Assets finished loading");

        globals.gameState = Game.LOADING_LEVEL_1;
    }
}

function initMainMenu() {
    // |||||||||||| RESET GLOBAL VARIABLES USED ON THE MAIN MENU
    globals.mainMenuSprites             = [];
    globals.currentMainMenuSelection    = "NEW GAME";

    initMainMenuSprites();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.MAIN_MENU;
}

function initMainMenuSprites() {
    // |||||||||||| INITIALIZE BACKGROUND IMAGE
    initMainMenuBackgroundImg();

    // |||||||||||| INITIALIZE THE REST OF THE SPRITES
    initNewGameIcon();
    initStoryIcon();
    initHighScoresIcon();
    initControlsIcon();
    initSun();
}

function initMainMenuBackgroundImg() {
    const imageSet = new ImageSet(0, 1432, 597, 341, 597, 358, 77, 0, -1, -1);

    const frames = new Frames(1);

    const mainMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_MAIN_MENU, State.STILL, 0, 0, imageSet, frames);

    globals.mainMenuBackgroundImg = mainMenuBackgroundImg;
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

function initSun() {
    const imageSet = new ImageSet(150, 150, 148, 148, 150, 150, 0, 0, 50, 50);

    const frames = new Frames(1);

    const sun = new Sun(SpriteID.SUN, State.STILL, 200, 155, imageSet, frames);

    // |||||||||||| ADD THE SUN TO ITS CORRESPONDING SPRITES ARRAY
    globals.mainMenuSprites.push(sun);
}

function initStoryMenu() {
    // |||||||||||| RESET GLOBAL VARIABLES USED ON THE STORY MENU
    globals.storyLineFromLeftSideXCoordinate    = 0;
    globals.storyLineFromRightSideXCoordinate   = globals.canvas.width;

    initStoryMenuBackgroundImg();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.STORY_MENU;
}

function initStoryMenuBackgroundImg() {
    const imageSet = new ImageSet(601, 1432, 597, 341, 601, 358, 74, 0, -1, -1);

    const frames = new Frames(1);

    const storyMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_STORY_MENU, State.STILL, 0, 0, imageSet, frames);

    globals.storyMenuBackgroundImg = storyMenuBackgroundImg;
}

function initHighScoresMenu() {
    initHighScoresMenuBackgroundImg();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.HIGH_SCORES_MENU;
}

function initHighScoresMenuBackgroundImg() {
    const imageSet = new ImageSet(601, 1074, 597, 341, 601, 358, 110, 10, -1, -1);

    const frames = new Frames(1);

    const highScoresMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_HIGH_SCORES_MENU, State.STILL, 0, 0, imageSet, frames);

    globals.highScoresMenuBackgroundImg = highScoresMenuBackgroundImg;
}

function initControlsMenu() {
    // |||||||||||| RESET GLOBAL VARIABLES USED ON THE CONTROLS MENU
    globals.controlsMenuSprites = [];
    globals.controlsMenuParticles = [];

    initControlsMenuSprites();

    initControlsMenuParticles();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.CONTROLS_MENU;
}

function initControlsMenuSprites() {
    // |||||||||||| INITIALIZE BACKGROUND IMAGE
    initControlsMenuBackgroundImg();

    // |||||||||||| INITIALIZE THE REST OF THE SPRITES
    initLeftArrowKey();
    initRightArrowKey();
    initSpaceKey();
    initALetterKey();
    initSLetterKey();
}

function initControlsMenuBackgroundImg() {
    const imageSet = new ImageSet(1204, 1432, 597, 341, 602, 358, 74, 0, -1, -1);

    const frames = new Frames(1);

    const controlsMenuBackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_CONTROLS_MENU, State.STILL, 0, 0, imageSet, frames);

    globals.controlsMenuBackgroundImg = controlsMenuBackgroundImg;
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

function initControlsMenuParticles() {
    initControlsMenuSparkles();
}

function initControlsMenuSparkles() {
    const numOfParticles = 10;

    for (let i = 0; i < numOfParticles; i++) {
        createControlsMenuSparkle();
    }
}

function createControlsMenuSparkle() {
    const xPos = Math.random() * globals.canvas.width;
    const yPos = Math.random() * globals.canvas.height;
    
    const alpha = 1.0;

    const width = 3.5;
    const height = 3.5;

    const radius = 3.5;

    const colors = [
        "rgb(215 255 252 / 0.75)",
        "rgb(246 251 148 / 0.75)",
        "rgb(106 176 201 / 0.75)",
    ];
    const randomColorsArrayIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomColorsArrayIndex];

    const particle = new ControlsMenuSparkle(ParticleID.CONTROLS_MENU_SPARKLE, ParticleState.FADE, xPos, yPos, null, alpha, width, height, radius, color);

    globals.controlsMenuParticles.push(particle);
}

function initLevel1() {
    // |||||||||||| RESET GLOBAL VARIABLES USED ON THE FIRST LEVEL
    globals.HUDSprites      = [];
    globals.score           = 0;
    globals.level1Sprites   = [];
    globals.levelsParticles = [];
    
    // |||||||||||| INITIALIZE MAP
    initLevel1Map();

    // |||||||||||| INITIALIZE 180-SECONDS TIMER FOR DEMO
    initDemoTimer();

    // |||||||||||| INITIALIZE CAMERA
    initCamera();

    initLevel1Sprites();

    initLevelsParticles();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.PLAYING_LEVEL_1;
}

function initLevel1Map() {
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 16, 0, 0, 16, 16);

    globals.level = new Level(level1, imageSet);
}

function initDemoTimer() {
    globals.demoTimer = new Timer(180, 1);
}

function initCamera() {
    globals.camera = new Camera(0, 0);
}

function initLevel1Sprites() {
    // |||||||||||| INITIALIZE THE HUD SPRITES
    initTheEruditeHUD();
    initRageBarSymbol();
    initRageBarContainer();
    initRageBarContent();

    // |||||||||||| INITIALIZE BACKGROUND IMAGE
    initLevel1BackgroundImg();

    // |||||||||||| INITIALIZE THE REST OF THE SPRITES
    initPlayer();
    initChaoticHumanBow();
    initFastWorm();
    initHellBatAcid();
    initPotionGreen();
}

function initTheEruditeHUD() {
    const imageSet = new ImageSet(0, 1321, 85, 85, 85, 85, 0, 0, 85, 85);

    const frames = new Frames(5);

    const theEruditeHUD = new Sprite(SpriteID.THE_ERUDITE_HUD, State.STILL, 181, 0, imageSet, frames);

    // |||||||||||| ADD THE ERUDITE (HUD) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(theEruditeHUD);
}

function initRageBarSymbol() {
    const imageSet = new ImageSet(0, 975, 71, 71, 75, 75, 0, 0, 25, 25);

    const frames = new Frames(3);

    const rageBarSymbol = new Sprite(SpriteID.RAGE_BAR_SYMBOL, State.STILL, 281, 30, imageSet, frames);

    // |||||||||||| ADD RAGE BAR'S SYMBOL TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(rageBarSymbol);
}

function initRageBarContainer() {
    const imageSet = new ImageSet(0, 1404, 112, 28, 112, 26, 0, 0, 112, 28);

    const frames = new Frames(1);

    const rageBarContainer = new Sprite(SpriteID.RAGE_BAR_CONTAINER, State.STILL, 321, 29, imageSet, frames);

    // |||||||||||| ADD RAGE BAR (CONTAINER) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(rageBarContainer);
}

function initRageBarContent() {
    const imageSet = new ImageSet(112, 1404, 86, 14, 86, 14, 0, 0, 86, 14);

    const frames = new Frames(1);

    const rageBarContent = new Sprite(SpriteID.RAGE_BAR_CONTENT, State.STILL, 334, 36, imageSet, frames);

    // |||||||||||| ADD RAGE BAR (CONTENT) TO ITS CORRESPONDING SPRITES ARRAY
    globals.HUDSprites.push(rageBarContent);
}

function initLevel1BackgroundImg() {
    const imageSet = new ImageSet(0, 1063, 448, 256, 448, 329, 0, 0, -1, -1);

    const frames = new Frames(1);

    const level1BackgroundImg = new Sprite(SpriteID.BACKGROUND_IMG_LEVEL_1, State.STILL, 0, 0, imageSet, frames);

    globals.level1BackgroundImg = level1BackgroundImg;
}

function initPlayer() {
    const xPos = 18;
    const yPos = 155;

    const imageSet = new ImageSet(2048, 0, 59, 62, 64, 64, 3, 2, 43, 46);

    // |||||||||||| ANIMATION DATA CREATION: 9 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
    const frames = new Frames(9, 3);

    const physics = new Physics(55, 0, 1, -145);

    const hitBox = new HitBox(12, 34, 16, 5);

    const collisions = new Collisions();

    // |||||||||||| LIFE POINTS, STARTING IN 3 AND RANGING FROM 1 TO 5 (REPRESENTED BY X.G FACE'S DIFFERENT FRAMES)
    const lifePoints = 3;

    const afterAttackLeeway = new Timer(0, 1);
    
    const checkpoints = [
        {
            xPosLowerLimit: xPos,
            xPosUpperLimit: xPos,
            yPosLowerLimit: yPos,
            yPosUpperLimit: yPos,
        },
        // {
        //     xPosLowerLimit: 120,
        //     xPosUpperLimit: 125,
        //     yPosLowerLimit: 535,
        //     yPosUpperLimit: 555,
        // },
        {
            xPosLowerLimit: 840,
            xPosUpperLimit: 845,
            yPosLowerLimit: 130,
            yPosUpperLimit: 205,
        },
        // {
        //     xPosLowerLimit: 1145,
        //     xPosUpperLimit: 1150,
        //     yPosLowerLimit: 660,
        //     yPosUpperLimit: 735,
        // },
        {
            xPosLowerLimit: 1815,
            xPosUpperLimit: 1820,
            yPosLowerLimit: 675,
            yPosUpperLimit: 700,
        },
    ];

    const player = new Player(SpriteID.PLAYER, State.RIGHT_STILL, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway, checkpoints);

    // |||||||||||| ADD PLAYER TO ITS CORRESPONDING SPRITES ARRAY
    globals.level1Sprites.push(player);
}

function initMagicalOrb() {
    const player = globals.level1Sprites[0];
    
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

    const imageSet = new ImageSet(576, 512, 32, 32, 32, 32, 0, 0, 19, 19);

    const frames = new Frames(4, 1);

    const physics = new Physics(vLimit);
    physics.vx = vLimit;

    const hitBox = new HitBox(19, 19, 0, 0);

    const collisions = new Collisions();

    const magicalOrb = new MagicalOrb(SpriteID.MAGICAL_ORB, State.STILL, magicalOrbXPos, magicalOrbYPos, imageSet, frames, physics, hitBox, collisions);

    // |||||||||||| ADD MAGICAL ORB TO ITS CORRESPONDING SPRITES ARRAY
    globals.level1Sprites.push(magicalOrb);
}

function initChaoticHumanBow() {
    // |||||||||||| CREATE ALL THE SPRITES FOR THE CAVE'S FIRST SECTION (LEVEL)

    const chaoticHumanBowSpritesAttributes = [
        {
            state: State.LEFT_ATTACK_2,
            xPos: 293,
            yPos: 55,
        },
        {
            state: State.RIGHT_ATTACK_2,
            xPos: 112,
            yPos: 328,
        },
        {
            state: State.LEFT_ATTACK_2,
            xPos: 765,
            yPos: 343,
        },
        {
            state: State.LEFT_ATTACK_2,
            xPos: 1448,
            yPos: 168,
        },
        {
            state: State.LEFT_ATTACK_2,
            xPos: 1629,
            yPos: 530,
        },
        {
            state: State.LEFT_ATTACK_2,
            xPos: 2333,
            yPos: 854,
        },
    ];

    for (let i = 0; i < chaoticHumanBowSpritesAttributes.length; i++) {
        const currentSpriteState = chaoticHumanBowSpritesAttributes[i].state;
        
        const currentSpriteXPos = chaoticHumanBowSpritesAttributes[i].xPos;
        const currentSpriteYPos = chaoticHumanBowSpritesAttributes[i].yPos;
        
        const imageSet = new ImageSet(1152, 0, 48, 64, 64, 63, 4, 0, 30, 46);

        // |||||||||||| ANIMATION DATA CREATION: 3 FRAMES PER STATE & ANIMATION SPEED
        const frames = new Frames(3, 6);

        const physics = new Physics(-1);

        const hitBox = new HitBox(8, 36, 15, 5);
        if (currentSpriteState === State.RIGHT_ATTACK_2) {
            hitBox.xOffset = 13;
        }

        const collisions = new Collisions();

        const lifePoints = 2;

        const afterAttackLeeway = new Timer(0, 1);

        const nextArrowShotDelay = new Timer(5, 1);

        const chaoticHumanBow = new ChaoticHumanBow(SpriteID.CHAOTIC_HUMAN_BOW, currentSpriteState, currentSpriteXPos, currentSpriteYPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway, nextArrowShotDelay);
     
        // |||||||||||| ADD CHAOTIC HUMAN (BOW) TO ITS CORRESPONDING SPRITES ARRAY
        globals.level1Sprites.push(chaoticHumanBow);
    }
}

function initArrow(chaoticHumanBow) {
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

    const imageSet = new ImageSet(580, 555, 16, 7, 20, 15, 0, 0, 16, 7);

    // |||||||||||| ANIMATION DATA CREATION: 1 FRAME PER STATE & ANIMATION SPEED
    const frames = new Frames(1, 1);

    const physics = new Physics(vLimit);
    physics.vx = vLimit;

    const hitBox = new HitBox(16, 7, 0, 0);

    const collisions = new Collisions();

    const arrow = new Arrow(SpriteID.ARROW, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions);

    // |||||||||||| ADD ARROW TO ITS CORRESPONDING SPRITES ARRAY
    globals.level1Sprites.push(arrow);
}

function initFastWorm() {
    // |||||||||||| CREATE ALL THE SPRITES FOR THE CAVE'S FIRST SECTION (LEVEL)

    const fastWormSpritesAttributes = [
        {
            state: State.LEFT,
            xPos: 396,
            yPos: 180,
        },
        {
            state: State.RIGHT,
            xPos: 234,
            yPos: 483,
        },
        {
            state: State.RIGHT,
            xPos: 2012,
            yPos: 990,
        },
    ];

    for (let i = 0; i < fastWormSpritesAttributes.length; i++) {
        const currentSpriteState = fastWormSpritesAttributes[i].state;
        
        const currentSpriteXPos = fastWormSpritesAttributes[i].xPos;
        const currentSpriteYPos = fastWormSpritesAttributes[i].yPos;
        
        const imageSet = new ImageSet(896, 512, 43, 49, 64, 64, 12, 0, 27, 33);

        // |||||||||||| ANIMATION DATA CREATION: 6 FRAMES PER STATE & ANIMATION SPEED
        const frames = new Frames(6, 4);

        const physics = new Physics(20);

        const hitBox = new HitBox(13, 28, 5, 3);

        const collisions = new Collisions();

        const lifePoints = 2;

        const afterAttackLeeway = new Timer(0, 1);

        const fastWorm = new FastWorm(SpriteID.FAST_WORM, currentSpriteState, currentSpriteXPos, currentSpriteYPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
     
        // |||||||||||| ADD FAST WORM TO ITS CORRESPONDING SPRITES ARRAY
        globals.level1Sprites.push(fastWorm);
    }
}

function initHellBatAcid() {
    // |||||||||||| CREATE ALL THE SPRITES FOR THE CAVE'S FIRST SECTION (LEVEL)

    const hellBatAcidSpritesAttributes = [
        {
            omega: 1,
            xRotCenter: 94,
            yRotCenter: 59,
            aRadius: 60,
            bRadius: 20,
        },
        {
            omega: 3,
            xRotCenter: 502,
            yRotCenter: 450,
            aRadius: 20,
            bRadius: 10,
        },
        {
            omega: 1,
            xRotCenter: 998,
            yRotCenter: 50,
            aRadius: 60,
            bRadius: 10,
        },
        {
            omega: 1.5,
            xRotCenter: 1300,
            yRotCenter: 80,
            aRadius: 110,
            bRadius: 40,
        },
        {
            omega: 1.25,
            xRotCenter: 1734,
            yRotCenter: 325,
            aRadius: 50,
            bRadius: 30,
        },
        {
            omega: 1.25,
            xRotCenter: 2183,
            yRotCenter: 800,
            aRadius: 95,
            bRadius: 40,
        },
        {
            omega: 1.75,
            xRotCenter: 2286,
            yRotCenter: 260,
            aRadius: 41,
            bRadius: 10,
        },
    ];

    for (let i = 0; i < hellBatAcidSpritesAttributes.length; i++) {        
        const imageSet = new ImageSet(1952, 1180, 92, 90, 122, 118, 30, 28, 52, 50);

        // |||||||||||| ANIMATION DATA CREATION: 6 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
        const frames = new Frames(6, 7);

        // |||||||||||| INITIAL VALUES FOR "Physics"
        const initAngle = 90 * Math.PI / 180;
        const currentSpriteOmega = hellBatAcidSpritesAttributes[i].omega;
        const currentSpriteXRotCenter = hellBatAcidSpritesAttributes[i].xRotCenter;
        const currentSpriteYRotCenter = hellBatAcidSpritesAttributes[i].yRotCenter;
        const currentSpriteARadius = hellBatAcidSpritesAttributes[i].aRadius;
        const currentSpriteBRadius = hellBatAcidSpritesAttributes[i].bRadius;

        const physics = new Physics(60, 0, 1, 0, currentSpriteOmega, initAngle, currentSpriteXRotCenter, currentSpriteYRotCenter, 0, currentSpriteARadius, currentSpriteBRadius);

        const hitBox = new HitBox(34, 27, 1, 12);

        const collisions = new Collisions();

        const lifePoints = 2;

        const afterAttackLeeway = new Timer(0, 1);

        const nextAcidDropDelay = new Timer(5, 1);

        const hellBatAcid = new HellBatAcid(SpriteID.HELL_BAT_ACID, State.DOWN, -1, -1, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway, nextAcidDropDelay);
    
        // |||||||||||| POSITION THE SPRITE
        hellBatAcid.setPosition();

        // |||||||||||| ADD HELL BAT (ACID) TO ITS CORRESPONDING SPRITES ARRAY
        globals.level1Sprites.push(hellBatAcid);
    }
}

function initAcid(hellBatAcid) {    
    const xPos = hellBatAcid.xPos + (hellBatAcid.imageSet.xDestinationSize / 3.35);
    const yPos = hellBatAcid.yPos + (hellBatAcid.imageSet.yDestinationSize / 2.5);
    
    const vLimit = 180;

    const imageSet = new ImageSet(570, 440, 19, 35, 30, 40, 7, 2, 4, 20);

    const frames = new Frames(4, 3);

    const physics = new Physics(vLimit);
    physics.vy = vLimit;

    const hitBox = new HitBox(4, 20, 0, 0);

    const collisions = new Collisions();

    const acid = new Acid(SpriteID.ACID, State.STILL, xPos, yPos, imageSet, frames, physics, hitBox, collisions);

    // |||||||||||| ADD ACID TO ITS CORRESPONDING SPRITES ARRAY
    globals.level1Sprites.push(acid);
}

function initPotionGreen(xPos = -1, yPos = -1) {
    let numOfSpritesToCreate;
    
    const potionGreenSpritesAttributes = [
        {
            xPos: 337,
            yPos: 80,
        },
        {
            xPos: 209,
            yPos: 435,
        },
        {
            xPos: 689,
            yPos: 80,
        },
        {
            xPos: 2337,
            yPos: 977,
        },
        {
            xPos: 2337,
            yPos: 675,
        },
    ];

    if ((xPos === -1) && (yPos === -1)) {
        numOfSpritesToCreate = potionGreenSpritesAttributes.length;
    } else {
        numOfSpritesToCreate = 1;
    }

    for (let i = 0; i < numOfSpritesToCreate; i++) {
        let currentSpriteXPos;
        let currentSpriteYPos;

        if (numOfSpritesToCreate !== 1) {
            currentSpriteXPos = potionGreenSpritesAttributes[i].xPos;
            currentSpriteYPos = potionGreenSpritesAttributes[i].yPos;
        } else {
            currentSpriteXPos = xPos;
            currentSpriteYPos = yPos;
        }
        
        const imageSet = new ImageSet(748, 510, 28, 30, 34, 30, 0, 0, 14, 16);

        const frames = new Frames(1);

        const physics = new Physics(-1);

        const hitBox = new HitBox(14, 16, 0, 0);

        const collisions = new Collisions();

        const potionGreen = new Potion(SpriteID.POTION_GREEN, State.STILL, currentSpriteXPos, currentSpriteYPos, imageSet, frames, physics, hitBox, collisions);
     
        // |||||||||||| ADD POTION (GREEN) TO ITS CORRESPONDING SPRITES ARRAY
        globals.level1Sprites.push(potionGreen);
    }
}

function initPotionBlue(xPos = -1, yPos = -1) {
    const imageSet = new ImageSet(714, 510, 28, 30, 34, 30, 0, 0, 14, 16);

    const frames = new Frames(1);

    const physics = new Physics(-1);

    const hitBox = new HitBox(14, 16, 0, 0);

    const collisions = new Collisions();

    const potionBlue = new Potion(SpriteID.POTION_BLUE, State.STILL, xPos, yPos, imageSet, frames, physics, hitBox, collisions);

    // |||||||||||| ADD POTION (BLUE) TO ITS CORRESPONDING SPRITES ARRAY
    globals.level1Sprites.push(potionBlue);
}

function initLevelsParticles() {
    initRageSymbolParticles();
    initLavaParticles();
}

function initRageSymbolParticles() {
    const rageBarSymbol = globals.HUDSprites[1];

    const player = globals.level1Sprites[0];

    const numOfParticles = 10;
    const xInit = rageBarSymbol.xPos + rageBarSymbol.imageSet.xDestinationSize / 2;
    const yInit = rageBarSymbol.yPos + rageBarSymbol.imageSet.yDestinationSize / 2;
    const alpha = 1.0;
    const spikes = 20;
    const outerRadius = 3;
    const innerRadius = 1.5;
    const timeToFade = 2.5;
    
    let color;
    if (player.rageLevel === 100) {
        color = "rgb(208 0 0 / 0.75)";
    } else if (player.rageLevel > 50) {
        color = "rgb(232 93 4 / 0.75)";
    } else {
        color = "rgb(255 186 8 / 0.75)";
    }

    let angle = Math.PI * 2;

    for (let i = 0; i < numOfParticles; i++) {
        const physics = new Physics(6);

        const particle = new RageSymbolParticle(ParticleID.RAGE_SYMBOL, ParticleState.ON, xInit, yInit, physics, alpha, spikes, outerRadius, innerRadius, timeToFade, color);

        particle.physics.vx = particle.physics.vLimit * Math.cos(angle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(angle);
        
        angle += 0.625;

        globals.levelsParticles.push(particle);
    }
}

function initLavaParticles() {
    const brickSize = globals.level.imageSet.xGridSize;

    const numOfParticlesForEachLavaBlock = 4;

    for (let i = 0; i < level1.length; i++) {
        for (let j = 0; j < level1[0].length; j++) {
            if (level1[i][j] === Block.LAVA_1) {
                const lavaBlockXPos = j * brickSize;
                const lavaBlockYPos = i * brickSize;
                
                for (let k = 0; k < numOfParticlesForEachLavaBlock; k++) {
                    createLavaParticle(lavaBlockXPos, lavaBlockYPos);
                }
            }
        }
    }
}

function createLavaParticle(lavaBlockXPos, lavaBlockYPos) {
    const xPos = lavaBlockXPos + (Math.random() * 14);
    const velocity = (Math.random() * 20) + 10;
    const physics = new Physics(velocity);
    const alpha = 1.0;
    const width = Math.random() + 1;
    const height = (Math.random() * 3) + 1;
    const timeToFade = (Math.random() * 10) + 1;

    const particle = new LavaParticle(ParticleID.LAVA, ParticleState.ON, xPos, lavaBlockYPos, physics, alpha, width, height, timeToFade, lavaBlockXPos, lavaBlockYPos);

    particle.physics.vy = -particle.physics.vLimit;

    globals.levelsParticles.push(particle);
}

function initCheckpointParticles(player) {
    const numOfParticles = 6;
    const xInitLeft = player.xPos + player.hitBox.xOffset;
    const xInitRight = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
    const yInit = player.yPos + player.hitBox.yOffset + player.hitBox.ySize;
    const alpha = 1.0;
    const spikes = 5;
    const outerRadius = 3;
    const innerRadius = 1.5;
    const timeToFade = 0.5;
    const whiteColor = "rgb(255 255 255)";
    const angles = [
        ((5 * Math.PI) / 6),
        ((3 * Math.PI) / 4),
        ((2 * Math.PI) / 3),
        (Math.PI / 3),
        (Math.PI / 4),
        (Math.PI / 6),
    ];

    for (let i = 0; i < numOfParticles; i++) {
        let xPos;
        if (i < 3) {
            xPos = xInitLeft;
        } else {
            xPos = xInitRight;
        }

        const physics = new Physics(45);

        const particle = new CheckpointParticle(ParticleID.CHECKPOINT, ParticleState.ON, xPos, yInit, physics, alpha, spikes, outerRadius, innerRadius, timeToFade, whiteColor);

        particle.physics.vx = particle.physics.vLimit * Math.cos(angles[i]);
        particle.physics.vy = -particle.physics.vLimit * Math.sin(angles[i]);

        globals.levelsParticles.push(particle);
    }
}

function initEnemyDeathParticles(enemy) {
    const numOfParticles = 150;
    const xInit = enemy.xPos + enemy.hitBox.xOffset + (enemy.hitBox.xSize / 2);
    const yInit = enemy.yPos + enemy.hitBox.yOffset + (enemy.hitBox.ySize / 2);
    const alpha = 1.0;
    const timeToFade = 0.75;

    for (let i = 0; i < numOfParticles; i++) {
        const velocity = (Math.random() * 30) + 10;
        const physics = new Physics(velocity, 60);

        const particle = new EnemyDeathParticle(ParticleID.ENEMY_DEATH, ParticleState.ON, xInit, yInit, physics, alpha, 2.5, 2.5, timeToFade);

        const randomAngle = (Math.random() * 2) * Math.PI;

        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);
        
        particle.physics.ax = -particle.physics.aLimit * Math.cos(randomAngle);
        particle.physics.ay = -particle.physics.aLimit * Math.sin(randomAngle);

        globals.levelsParticles.push(particle);
    }
}

function initChaoticHumanSword() {
    // |||||||||||| CREATE ALL THE SPRITES FOR THE CAVE'S SECOND SECTION (LEVEL)

    const chaoticHumanSwordSpritesAttributes = [
        {
            state: State.LEFT_3,
            xPos: 250,
            yPos: 60,
        },
    ];

    for (let i = 0; i < chaoticHumanSwordSpritesAttributes.length; i++) {
        const currentSpriteState = chaoticHumanSwordSpritesAttributes[i].state;
        
        const currentSpriteXPos = chaoticHumanSwordSpritesAttributes[i].xPos;
        const currentSpriteYPos = chaoticHumanSwordSpritesAttributes[i].yPos;
        
        const imageSet = new ImageSet(576, 0, 56, 53, 64, 64, 3, 10, 44, 41);

        // |||||||||||| ANIMATION DATA CREATION: 9 (OR LESS IN THIS CASE) FRAMES PER STATE & ANIMATION SPEED
        const frames = new Frames(9, 3);

        const physics = new Physics(20);

        const maxTimeToChangeDirection = 3

        const hitBox = new HitBox(26, 40, 2, 1);

        const collisions = new Collisions();

        const lifePoints = 2;

        const afterAttackLeeway = new Timer(0, 1);

        const chaoticHumanSword = new ChaoticHumanSword(SpriteID.CHAOTIC_HUMAN_SWORD, currentSpriteState, currentSpriteXPos, currentSpriteYPos, imageSet, frames, physics, maxTimeToChangeDirection, hitBox, collisions, lifePoints, afterAttackLeeway);
     
        // |||||||||||| ADD CHAOTIC HUMAN (SWORD) TO ITS CORRESPONDING SPRITES ARRAY
        globals.level2Sprites.push(chaoticHumanSword);
    }
}

function initHellBatHandToHand() {
    // |||||||||||| CREATE ALL THE SPRITES FOR THE CAVE'S SECOND SECTION (LEVEL)

    const hellBatHandToHandSpritesAttributes = [
        {
            xPos: 0,
            yPos: 0,
            vLimit: 50,
            omega: 2.5,
            yRef: globals.canvas.height / 2.15,
            amplitude: 80,
        },
    ];
    
    for (let i = 0; i < hellBatHandToHandSpritesAttributes.length; i++) {        
        const currentSpriteXPos = hellBatHandToHandSpritesAttributes[i].xPos;
        const currentSpriteYPos = hellBatHandToHandSpritesAttributes[i].yPos;
        
        const imageSet = new ImageSet(1334, 0, 33, 39, 46, 59, 8, 19, 33, 39);

        // |||||||||||| ANIMATION DATA CREATION: 3 FRAMES PER STATE & ANIMATION SPEED
        const frames = new Frames(3, 7);

        // |||||||||||| INITIAL VALUES FOR "Physics"
        const initAngle = 90 * Math.PI / 180;
        const currentSpriteVLimit = hellBatHandToHandSpritesAttributes[i].vLimit;
        const currentSpriteOmega = hellBatHandToHandSpritesAttributes[i].omega;
        const currentSpriteYRef = hellBatHandToHandSpritesAttributes[i].yRef;
        const currentSpriteAmplitude = hellBatHandToHandSpritesAttributes[i].amplitude;

        const physics = new Physics(currentSpriteVLimit, 0, 1, 0, currentSpriteOmega, initAngle, 100, 100, currentSpriteYRef, 0, 0, currentSpriteAmplitude);
        physics.vx = currentSpriteVLimit;

        const hitBox = new HitBox(32, 21, 1, 2);

        const collisions = new Collisions();

        const lifePoints = 2;

        const afterAttackLeeway = new Timer(0, 1);

        const hellBatHandToHand = new HellBatHandToHand(SpriteID.HELL_BAT_HAND_TO_HAND, State.DOWN_3, currentSpriteXPos, currentSpriteYPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
     
        // |||||||||||| ADD HELL BAT (HAND-TO-HAND) TO ITS CORRESPONDING SPRITES ARRAY
        globals.level2Sprites.push(hellBatHandToHand);
    }
}

function initGameOver() {
    // |||||||||||| RESET GLOBAL VARIABLES USED ON THE "GAME OVER" SCREEN
    globals.currentGameOverSelection = "CHECK HIGH SCORES TABLE";

    initSkull();

    // |||||||||||| CHANGE GAME STATE
    globals.gameState = Game.OVER;
}

function initSkull() {
    const imageSet = new ImageSet(153, 1780, 120, 162, 153, 178, 32, 14, 80, 122);

    const frames = new Frames(1);

    const skull = new Sprite(SpriteID.SKULL, State.STILL, 186, 20, imageSet, frames);

    // |||||||||||| ASSIGN SKULL TO ITS CORRESPONDING VARIABLE
    globals.gameOverSprite = skull;
}

// |||||||||||| EXPORTS
export {
    initEssentials,
    initMainMenu,    
    initStoryMenu,    
    initHighScoresMenu,    
    initControlsMenu,    
    createControlsMenuSparkle,
    initLevel1,    
    initMagicalOrb,
    initArrow,
    initAcid,
    initPotionGreen,
    initPotionBlue,
    initRageSymbolParticles,
    createLavaParticle,
    initCheckpointParticles,
    initEnemyDeathParticles,
    initGameOver,    
};