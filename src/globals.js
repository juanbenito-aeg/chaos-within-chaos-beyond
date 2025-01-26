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

    // |||||||||||| OBJECT THAT HOLDS THE STATES OF THE KEYBOARD KEYS
    action: {},

    // |||||||||||| SOUNDS
    sounds: [],

    // |||||||||||| CURRENT SOUND TO PLAY
    currentSound: -1,

    // |||||||||||| MAIN MENU DATA
    mainMenuBackgroundImg: {},
    mainMenuSprites: [],
    currentMainMenuSelection: "NEW GAME",
    
    // |||||||||||| STORY MENU DATA
    storyMenuBackgroundImg: {},
    storyLineFromLeftSideXCoordinate: 0,
    storyLineFromRightSideXCoordinate: 0,
    
    // |||||||||||| HIGH SCORES MENU DATA
    highScoresMenuBackgroundImg: {},
    
    // |||||||||||| CONTROLS MENU DATA
    controlsMenuBackgroundImg: {},
    controlsMenuSprites: [],
    controlsMenuParticles: [],

    // |||||||||||| HUD DATA
    HUDSprites: [],

    score: 0,
    highScores: [],

    level: {},
    levelBackgroundImg: {},
    levelSprites: [],
    levelParticles: [],

    numOfRageSymbolParticlesOFF: 0,
    
    // |||||||||||| "GAME OVER" SCREEN DATA
    gameOverSprite: {},
    currentGameOverSelection: "CHECK HIGH SCORES TABLE",
};