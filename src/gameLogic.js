import globals from "./globals.js";
import { Game, SpriteID, State } from "./constants.js";

export default function update() {
    // |||||||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.PLAYING:
            playGame();
            break;
        
        default:
            console.error("Error: Invalid game state");
    }
}

function playGame() {
    updateHUDSprites();
    updateScreenSprites();
}

function updateHUDSprites() {
    for (let i = 0; i < globals.HUDSprites.length; i++) {
        const sprite = globals.HUDSprites[i];

        updateHUDSprite(sprite);
    }
}

function updateHUDSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| THE ERUDITE (HUD)
        case SpriteID.THE_ERUDITE_HUD:
            updateTheEruditeHUD(sprite);
            break;

        // |||||||||||| RAGE BAR (CONTENT)
        case SpriteID.RAGE_BAR_CONTENT:
            updateRageBarContent(sprite);
            break;

        // |||||||||||| OTHERS
        default:
            break;
    }
}

function updateTheEruditeHUD(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateRageBarContent(sprite) {
    sprite.imageSet.xSize = 86;

    sprite.imageSet.xSize *= 0.5;
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
        
        // |||||||||||| POTION (GREEN)
        case SpriteID.POTION_GREEN:
            updatePotionGreen(sprite);
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

function updatePotionGreen(sprite) {
    sprite.xPos = 306;
    sprite.yPos = 48;
}