import globals from "./globals.js";
import { Game, SpriteID, Tile } from "./constants.js";

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
    const backgroundImg = globals.sprites[3];

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

function drawSpriteRectangle(sprite, destinationWidth, destinationHeight) {
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, destinationWidth, destinationHeight);
}

function renderScreenSprite(sprite) {
    // |||||||||||| SET SIZES SOME SPRITES WILL APPEAR WITH IN THE CANVAS
    let destinationWidth;
    let destinationHeight;

    switch (sprite.id) {
        // |||||||| PLAYER
        case SpriteID.PLAYER:
            destinationWidth = 55.6;
            destinationHeight = 53;
            break;
        
        // |||||||| CHAOTIC HUMAN (BOW)
        case SpriteID.CHAOTIC_HUMAN_BOW:
            destinationWidth = 33;
            destinationHeight = 49;
            break;
        
        // |||||||| FAST WORM
        case SpriteID.FAST_WORM:
            destinationWidth = 32.15;
            destinationHeight = 48;
            break;
        
        // |||||||| HELL BAT (ACID)
        case SpriteID.HELL_BAT_ACID:
            destinationWidth = 52;
            destinationHeight = 51;
            break;
        
        // |||||||| POTION (GREEN)
        case SpriteID.POTION_GREEN:
            destinationWidth = 17;
            destinationHeight = 19;
            break;

        default:
            break;
    }
    
    // |||||||||||| CALCULATE POSITION IN THE TILEMAP
    const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
    const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| TEST
    drawSpriteRectangle(sprite, destinationWidth, destinationHeight);

    // |||||||||||| DRAW THE SPRITE'S NEW FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],             // THE IMAGE FILE
        xTile, yTile,                                   // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                     // THE DESTINATION X & Y POSITION
        destinationWidth, destinationHeight             // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderScreenSprites() {
    for (let i = 0; i < globals.sprites.length; i++) {
        // |||||||||||| AVOID RENDERING THE HUD'S THE ERUDITE'S FACE AND HIS RAGE BAR AND THE SCREEN'S BACKGROUND IMAGE, AS THEY ALREADY DO IT ON THEIR OWN ON SEPARATE FUNCTIONS (renderHUDSprites & renderBackgroundImg)
        if (i > 3) {
            const sprite = globals.sprites[i];
    
            renderScreenSprite(sprite);
        } 
    }
}

function renderHUDSprites() {
    for (let i = 0; i < 3; i++) {
        const sprite = globals.sprites[i];

        const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
        const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

        const xPos = Math.floor(sprite.xPos);
        const yPos = Math.floor(sprite.yPos);

        globals.ctxHUD.drawImage(
            globals.tileSets[Tile.SIZE_OTHERS],             // THE IMAGE FILE
            xTile, yTile,                                   // THE SOURCE X & Y POSITION
            sprite.imageSet.xSize, sprite.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
            xPos, yPos,                                     // THE DESTINATION X & Y POSITION
            sprite.imageSet.xSize, sprite.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
        );
    }
}

function renderHUD() {
    // |||||||||||| HARD-CODED DATA
    const score = 1000;
    const highScore = 10000;

    // |||||||||||| DRAW SCORE
    globals.ctxHUD.font = "8.5px emulogic";
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("SCORE", 15, 39.5);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(score, 15, 54.5);
    
    // |||||||||||| DRAW HIGH SCORE
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("HIGH SCORE", 80, 39.5);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(highScore, 80, 54.5);
    
    // |||||||||||| DRAW RAGE BAR'S SYMBOL
    globals.ctxHUD.font = "20px emulogic";
    globals.ctxHUD.fillText("💢", 282.5, 49.5);

    // |||||||||||| RENDER THE ERUDITE'S FACE & HIS RAGE BAR
    renderHUDSprites();
}