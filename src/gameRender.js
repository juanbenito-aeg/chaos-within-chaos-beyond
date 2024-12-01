import globals from "./globals.js";
import { Game } from "./constants.js";

// |||||||||||| RENDERS THE GRAPHICS

export default function render() {
    // |||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE

    switch (globals.gameState) {
        case Game.LOADING:
            // DRAW LOADING SPINNER
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        default:
            console.error("Error: Invalid game state");
    }
}


function drawGame() {
    // |||||||||||| CLEAR THE WHOLE SCREEN
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    drawSprites();
}


function renderSprite(sprite) {
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    // |||||||||||| CALCULATE POSITION IN THE TILEMAP
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| DRAW THE SPRITE'S NEW FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSet,                                // THE IMAGE FILE
        xTile, yTile,                                   // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                     // THE DESTINATION X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
    );
}


function drawSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];

        // TEST
        drawSpriteRectangle(sprite);

        renderSprite(sprite);
    }
}


function drawSpriteRectangle(sprite) {
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, w1, h1);
}