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

        // |||||||||||| OTHERS
        default:
            break;
    }
}


// |||||||||||| UPDATES THE CHARACTER

function updatePlayer(sprite) {
    sprite.xPos = 10;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 2;

    sprite.state = State.LEFT;
}