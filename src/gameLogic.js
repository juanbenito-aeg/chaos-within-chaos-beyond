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
    updateSprites();
}

function updateSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];

        updateSprite(sprite);
    }
}

function updateSprite(sprite) {
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
        
        // |||||||||||| RAGE BAR (CONTENT)
        case SpriteID.RAGE_BAR_CONTENT:
            updateRageBarContent(sprite);
            break;

        // |||||||||||| OTHERS
        default:
            break;
    }
}

function updatePlayer(sprite) {
    sprite.xPos = 10;
    sprite.yPos = 179;

    sprite.frames.frameCounter = 0;

    sprite.state = State.RIGHT;
}

function updateChaoticHumanBow(sprite) {
    sprite.xPos = 260;
    sprite.yPos = 20.85;

    sprite.frames.frameCounter = 0;

    sprite.state = State.LEFT_ATTACK_2;
}

function updateFastWorm(sprite) {
    sprite.xPos = 390;
    sprite.yPos = 119;

    sprite.frames.frameCounter = 0;

    sprite.state = State.LEFT;
}

function updateHellBatAcid(sprite) {
    sprite.xPos = 60;
    sprite.yPos = 2;

    sprite.frames.frameCounter = 2;

    sprite.state = State.DOWN;
}

function updatePotionGreen(sprite) {
    sprite.xPos = 306;
    sprite.yPos = 45;
}

function updateRageBarContent(sprite) {
    sprite.imageSet.xSize = 86;

    sprite.imageSet.xSize *= 0.5;
}