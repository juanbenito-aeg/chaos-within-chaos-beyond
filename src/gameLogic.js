import globals from "./globals.js";
import { Game, SpriteID, State } from "./constants.js";

export default function update() {
    // |||||||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.MAIN_MENU:
            break;
        
        case Game.STORY_MENU:
            break;
        
        case Game.CONTROLS_MENU:
            updateControlsMenuElements();
            break;
        
        case Game.PLAYING:
            playGame();
            break;
        
        default:
            console.error("Error: Invalid game state");
    }
}

function updateControlsMenuElements() {
    updateControlsMenuSprites();
}

function updateControlsMenuSprites() {
    for (let i = 0; i < globals.controlsMenuSprites.length; i++) {
        const sprite = globals.controlsMenuSprites[i];

        updateControlsMenuSprite(sprite);
    }
}

function updateControlsMenuSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| "UP ARROW" KEY
        case SpriteID.UP_ARROW_KEY:
            updateUpArrowKey(sprite);
            break;
        
        // |||||||||||| "DOWN ARROW" KEY
        case SpriteID.DOWN_ARROW_KEY:
            updateDownArrowKey(sprite);
            break;

        // |||||||||||| "LEFT ARROW" KEY
        case SpriteID.LEFT_ARROW_KEY:
            updateLeftArrowKey(sprite);
            break;

        // |||||||||||| "RIGHT ARROW" KEY
        case SpriteID.RIGHT_ARROW_KEY:
            updateRightArrowKey(sprite);
            break;

        // |||||||||||| "SPACE" KEY
        case SpriteID.SPACE_KEY:
            updateSpaceKey(sprite);
            break;

        // |||||||||||| "A" LETTER KEY
        case SpriteID.A_LETTER_KEY:
            updateALetterKey(sprite);
            break;

        // |||||||||||| "S" LETTER KEY
        case SpriteID.S_LETTER_KEY:
            updateSLetterKey(sprite);
            break;

        // |||||||||||| OTHERS
        default:
            break;
    }
}

function updateUpArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateDownArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateLeftArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateRightArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSpaceKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateALetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSLetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function playGame() {
    updateHUD();
    updateScreenSprites();
}

function updateHUD() {
    updateLifePoints();
    updateRageLevel();
}

function updateLifePoints() {
    globals.lifePoints = 1;
}

function updateRageLevel() {
    globals.rageLevel = 50;
}

function updateScreenSprites() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        updateScreenSprite(sprite);
    }
}

function updateScreenSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| PLAYER
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;
        
        // |||||||||||| CHAOTIC HUMAN (BOW)
        case SpriteID.CHAOTIC_HUMAN_BOW:
            updateChaoticHumanBow(sprite);
            break;
        
        // |||||||||||| CHAOTIC HUMAN (SWORD)
        case SpriteID.CHAOTIC_HUMAN_SWORD:
            updateChaoticHumanSword(sprite);
            break;
        
        // |||||||||||| FAST WORM
        case SpriteID.FAST_WORM:
            updateFastWorm(sprite);
            break;
        
        // |||||||||||| HELL BAT (ACID)
        case SpriteID.HELL_BAT_ACID:
            updateHellBatAcid(sprite);
            break;
        
        // |||||||||||| HELL BAT (HAND-TO-HAND)
        case SpriteID.HELL_BAT_HAND_TO_HAND:
            updateHellBatHandToHand(sprite);
            break;
        
        // |||||||||||| POTION (GREEN)
        case SpriteID.POTION_GREEN:
            updatePotionGreen(sprite);
            break;
        
        // |||||||||||| POTION (BLUE)
        case SpriteID.POTION_BLUE:
            updatePotionBlue(sprite);
            break;

        // |||||||||||| OTHERS
        default:
            break;
    }
}

function updatePlayer(sprite) {
    sprite.xPos = 0;
    sprite.yPos = 190;

    sprite.frames.frameCounter = 0;

    sprite.state = State.RIGHT;
}

function updateChaoticHumanBow(sprite) {
    sprite.xPos = 275;
    sprite.yPos = 24.85;

    sprite.frames.frameCounter = 0;

    sprite.state = State.LEFT_ATTACK_2;
}

function updateChaoticHumanSword(sprite) {
    sprite.xPos = 200;
    sprite.yPos = 20.85;

    sprite.frames.frameCounter = 4;

    sprite.state = State.UP_3;
}

function updateFastWorm(sprite) {
    sprite.xPos = 390;
    sprite.yPos = 124;

    sprite.frames.frameCounter = 0;

    sprite.state = State.LEFT;
}

function updateHellBatAcid(sprite) {
    sprite.xPos = 30;
    sprite.yPos = 18;

    sprite.frames.frameCounter = 2;

    sprite.state = State.DOWN;
}

function updateHellBatHandToHand(sprite) {
    sprite.xPos = 100;
    sprite.yPos = 18;

    sprite.frames.frameCounter = 0;

    sprite.state = State.DOWN_3;
}

function updatePotionGreen(sprite) {
    sprite.xPos = 306;
    sprite.yPos = 48;
}

function updatePotionBlue(sprite) {
    sprite.xPos = 206;
    sprite.yPos = 48;
}