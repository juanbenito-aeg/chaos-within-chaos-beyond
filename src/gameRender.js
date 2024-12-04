import globals from "./globals.js";
import { Game, Tile } from "./constants.js";

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
    // |||||||||||| CLEAR SCREEN & HUD
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderBackgroundImg();
    renderMap();
    renderScreenSprites();
    renderHUD();
}

// |||||||||||| DRAWS THE BACKGROUND IMAGE
function renderBackgroundImg() {
    const backgroundImg = globals.sprites[1];

    const xTile = backgroundImg.imageSet.xInit + backgroundImg.frames.frameCounter * backgroundImg.imageSet.xGridSize + backgroundImg.imageSet.xOffset;
    const yTile = backgroundImg.imageSet.yInit + backgroundImg.state * backgroundImg.imageSet.yGridSize + backgroundImg.imageSet.yOffset;

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                           // THE IMAGE FILE
        xTile, yTile,                                                 // THE SOURCE X & Y POSITION
        backgroundImg.imageSet.xSize, backgroundImg.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        0, 0,                                                         // THE DESTINATION X & Y POSITION
        backgroundImg.imageSet.xSize, backgroundImg.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
    );
}

// |||||||||||| DRAWS THE MAP
function renderMap() {
    const numColTileSet = 9;

    const brickSize = globals.level.imageSet.xGridSize;
    const levelData = globals.level.data;

    const numFil = levelData.length;
    const numCol = levelData[0].length;

    for (let i = 0; i < numFil; i++) {
        for (let j = 0; j < numCol; j++) {
            const xTile = Math.floor((levelData[i][j] - 1) % numColTileSet) * brickSize;
            const yTile = Math.floor((levelData[i][j] - 1) / numColTileSet) * brickSize;
            const xPos = j * brickSize;
            const yPos = i * brickSize;

            globals.ctx.drawImage(
                globals.tileSets[Tile.SIZE_16],
                xTile, yTile,
                brickSize, brickSize,
                xPos, yPos,
                brickSize, brickSize
            );
        }
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

function renderScreenSprite(sprite) {
    // |||||||||||| CALCULATE POSITION IN THE TILEMAP
    const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
    const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| DRAW THE SPRITE'S NEW FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],             // THE IMAGE FILE
        xTile, yTile,                                   // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                     // THE DESTINATION X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderScreenSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        // |||||||||||| AVOID RENDERING THE HUD'S "THE ERUDITE" AND THE SCREEN'S BACKGROUND IMAGE, AS THEY ALREADY DO IT ON THEIR OWN ON SEPARATE FUNCTIONS (renderTheEruditeHUD & renderBackgroundImg, RESPECTIVELY)
        if (i !== 0 && i !== 1) {
            const sprite = globals.sprites[i];
    
            // TEST
            drawSpriteRectangle(sprite);
    
            renderScreenSprite(sprite);
        } 
    }
}

function renderTheEruditeHUD() {
    const theEruditeHUD = globals.sprites[0];

    const xTile = theEruditeHUD.imageSet.xInit + theEruditeHUD.frames.frameCounter * theEruditeHUD.imageSet.xGridSize + theEruditeHUD.imageSet.xOffset;
    const yTile = theEruditeHUD.imageSet.yInit + theEruditeHUD.state * theEruditeHUD.imageSet.yGridSize + theEruditeHUD.imageSet.yOffset;

    const xPos = Math.floor(theEruditeHUD.xPos);
    const yPos = Math.floor(theEruditeHUD.yPos);

    globals.ctxHUD.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                           // THE IMAGE FILE
        xTile, yTile,                                                 // THE SOURCE X & Y POSITION
        theEruditeHUD.imageSet.xSize, theEruditeHUD.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                   // THE DESTINATION X & Y POSITION
        theEruditeHUD.imageSet.xSize, theEruditeHUD.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderHUD() {
    // |||||||||||| HARD-CODED DATA
    const score = 1000;
    const highScore = 10000;

    // |||||||||||| DRAW SCORE
    globals.ctxHUD.font = "10px emulogic";
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("SCORE", 15, 40);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(score, 15, 55);
    
    // |||||||||||| DRAW HIGH SCORE
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("HIGH SCORE", 85, 40);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(highScore, 85, 55);

    // |||||||||||| RENDER THE ERUDITE'S FACE
    renderTheEruditeHUD();
    
    // |||||||||||| DRAW RAGE BAR'S SYMBOL AND FIRST HALF
    globals.ctxHUD.font = "20px emulogic";
    globals.ctxHUD.fillText("💢", 300, 48.5);
}