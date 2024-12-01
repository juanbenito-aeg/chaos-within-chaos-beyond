import { Game } from "./constants.js";

export default {
    // |||||||||||| CANVAS & CONTEXT
    canvas: {},
    ctx: {},

    // |||||||||||| GAME STATE
    gameState: Game.INVALID,

    // |||||||||||| PREVIOUS CYCLE TIME (MILLISECONDS)
    previousCycleMilliseconds: -1,

    // |||||||||||| ACTUAL GAME CYCLE TIME (SECONDS)
    deltaTime: 0,

    // |||||||||||| GOAL CYCLE TIME (SECONDS, CONSTANT)
    frameTimeObj: 0,

    cycleRealTime: 0,

    // |||||||||||| TEXT BOX TO DISPLAY DEBUGGING DATA
    txtPruebas: {},

    // |||||||||||| IMAGE DATA (TILESET)
    tileSet: {},

    // |||||||||||| VARIABLES TO MANAGE ASSETS LOADING
    // |||||||| HOLDS THE ELEMENTS TO LOAD (PRIMARILY, IMAGES & SOUNDS)
    assetsToLoad: [],
    // |||||||| INDICATES THE NUMBER OF ELEMENTS THAT HAVE BEEN LOADED SO FAR
    assetsLoaded: 0,

    // |||||||||||| ARRAY WITH SPRITES' DATA
    sprites: [],
};