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

    // |||||||||||| ARRAY WITH SPRITES' DATA
    sprites: [],

    // |||||||||||| CAVE SECTION (LEVEL) DATA
    level: {},
};