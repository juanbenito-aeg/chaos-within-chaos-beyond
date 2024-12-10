import { Game } from "./constants.js";

export default {
    // |||||||||||| CANVAS & CONTEXT (SCREEN & HUD)
    canvas: {},
    ctx: {},
    canvasHUD: {},
    ctxHUD: {},

    // |||||||||||| GAME STATE
    gameState: Game.INVALID,

    // |||||||||||| PREVIOUS CYCLE TIME (MILLISECONDS)
    previousCycleMilliseconds: -1,

    // |||||||||||| ACTUAL GAME CYCLE TIME (SECONDS)
    deltaTime: 0,

    // |||||||||||| GOAL CYCLE TIME (SECONDS, CONSTANT)
    frameTimeObj: 0,

    cycleRealTime: 0,

    // |||||||||||| IMAGES DATA (TILESETS)
    tileSets: [],

    // |||||||||||| VARIABLES TO MANAGE ASSETS LOADING
    // |||||||| HOLDS THE ELEMENTS TO LOAD (PRIMARILY, IMAGES & SOUNDS)
    assetsToLoad: [],
    // |||||||| INDICATES THE NUMBER OF ELEMENTS THAT HAVE BEEN LOADED SO FAR
    assetsLoaded: 0,

    // |||||||||||| CAVE SECTION (LEVEL) DATA
    level: {},

    // |||||||||||| ARRAY WITH THE MENUS BACKGROUND IMAGES SPRITES' DATA
    menusBackgroundImgsSprites: [],
    
    // |||||||||||| ARRAY WITH THE SCREEN BACKGROUND IMAGES SPRITES' DATA
    screenBackgroundImgsSprites: [],
    
    // |||||||||||| ARRAY WITH THE MAIN MENU SPRITES' DATA
    mainMenuSprites: [],
    
    // |||||||||||| ARRAY WITH THE CONTROLS MENU SPRITES' DATA
    controlsMenuSprites: [],

    // |||||||||||| ARRAY WITH THE HUD SPRITES' DATA
    HUDSprites: [],

    // |||||||||||| ARRAY WITH THE SCREEN SPRITES' DATA
    screenSprites: [],

    // |||||||||||| PLAYER'S LIFE POINTS, STARTING IN 3 AND RANGING FROM 1 TO 5 (REPRESENTED BY X.G FACE'S DIFFERENT FRAMES)
    lifePoints: 3,

    // |||||||||||| X.G'S RAGE LEVEL, STARTING IN 0 AND RANGING FROM 0 TO 100
    rageLevel: 0,
};