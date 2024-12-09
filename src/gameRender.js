import globals from "./globals.js";
import { Game, SpriteID, Tile } from "./constants.js";

// |||||||||||| RENDERS THE GRAPHICS
export default function render() {
    // |||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            // DRAW LOADING SPINNER
            break;
        
        case Game.MAIN_MENU:
            drawMainMenu();
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        default:
            console.error("Error: Invalid game state");
    }
}

function enlargeCanvasForMenus() {
    // |||||||||||| CLEAR SCREEN
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    const canvasOriginalHeight = 256;
    const canvasHUDOriginalHeight = 85;

    globals.canvasHUD.style.display = "none";
    globals.canvas.style.height = "auto";
    globals.canvas.height = canvasOriginalHeight + canvasHUDOriginalHeight;
}

function renderNMenuBackgroundImg(nMenuBackgroundImg) {
    const xTile = nMenuBackgroundImg.imageSet.xInit + nMenuBackgroundImg.frames.frameCounter * nMenuBackgroundImg.imageSet.xGridSize + nMenuBackgroundImg.imageSet.xOffset;
    const yTile = nMenuBackgroundImg.imageSet.yInit + nMenuBackgroundImg.state * nMenuBackgroundImg.imageSet.yGridSize + nMenuBackgroundImg.imageSet.yOffset;

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                       // THE IMAGE FILE
        xTile, yTile,                                                             // THE SOURCE X & Y POSITION
        nMenuBackgroundImg.imageSet.xSize, nMenuBackgroundImg.imageSet.ySize,     // THE SOURCE WIDTH & HEIGHT
        0, 0,                                                                     // THE DESTINATION X & Y POSITION
        nMenuBackgroundImg.imageSet.xSize, nMenuBackgroundImg.imageSet.ySize      // THE DESTINATION WIDTH & HEIGHT
    );
}

function drawMainMenu() {
    enlargeCanvasForMenus();

    const mainMenuBackgroundImg = globals.menusBackgroundImgsSprites[0];
    renderNMenuBackgroundImg(mainMenuBackgroundImg);

    renderMainMenuTxt();
    renderMainMenuButtons();
    renderMainMenuSprites();
}

function renderMainMenuTxt() {
    const canvasWidthDividedBy2 = globals.canvas.width / 2;
    globals.ctx.textAlign = "center";

    // |||||||||||| GAME TITLE
    globals.ctx.font = "18px emulogic";
    globals.ctx.strokeStyle = "rgb(222 249 219)";
    globals.ctx.strokeText("CHAOS WITHIN", canvasWidthDividedBy2, 37.15);
    globals.ctx.font = "24px emulogic";
    globals.ctx.strokeText("CHAOS BEYOND", canvasWidthDividedBy2, 80);
}

function renderMainMenuButtons() {
    globals.ctx.lineJoin = "bevel";
    globals.ctx.lineWidth = 5;

    // |||||||||||| "NEW GAME" BUTTON
    globals.ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    globals.ctx.fillRect(97, 125, 60, 60);
    globals.ctx.strokeStyle = "rgb(222 249 219)";
    globals.ctx.strokeRect(97, 125, 60, 60);
    
    // |||||||||||| "STORY" BUTTON
    globals.ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    globals.ctx.fillRect(97, 231, 60, 60);
    globals.ctx.strokeStyle = "rgb(222 249 219)";
    globals.ctx.strokeRect(97, 231, 60, 60);
    
    // |||||||||||| "HIGH SCORES" BUTTON
    globals.ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    globals.ctx.fillRect(291.5, 125, 60, 60);
    globals.ctx.strokeStyle = "rgb(222 249 219)";
    globals.ctx.strokeRect(291.5, 125, 60, 60);
    
    // |||||||||||| "CONTROLS" BUTTON
    globals.ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    globals.ctx.fillRect(291.5, 231, 60, 60);
    globals.ctx.strokeStyle = "rgb(222 249 219)";
    globals.ctx.strokeRect(291.5, 231, 60, 60);
}

function renderMainMenuSprite(sprite) {
    // |||||||||||| CALCULATE POSITION OF THE SPRITE IN THE SPRITESHEET
    const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
    const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| DRAW THE SPRITE'S (NEW) FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                 // THE IMAGE FILE
        xTile, yTile,                                                       // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,                       // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                         // THE DESTINATION X & Y POSITION
        sprite.imageSet.xDestinationSize, sprite.imageSet.xDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderMainMenuSprites() {
    for (let i = 0; i < globals.mainMenuSprites.length; i++) {
        const sprite = globals.mainMenuSprites[i];

        renderMainMenuSprite(sprite);
    }
}

function drawGame() {
    // |||||||||||| CLEAR SCREEN & HUD
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderScreenBackgroundImg();
    renderMap();
    renderHUD();
    renderScreenSprites();
}

// |||||||||||| DRAWS THE SCREEN BACKGROUND IMAGE
function renderScreenBackgroundImg() {
    const screenBackgroundImg = globals.screenBackgroundImgsSprites[0];

    const xTile = screenBackgroundImg.imageSet.xInit + screenBackgroundImg.frames.frameCounter * screenBackgroundImg.imageSet.xGridSize + screenBackgroundImg.imageSet.xOffset;
    const yTile = screenBackgroundImg.imageSet.yInit + screenBackgroundImg.state * screenBackgroundImg.imageSet.yGridSize + screenBackgroundImg.imageSet.yOffset;

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                       // THE IMAGE FILE
        xTile, yTile,                                                             // THE SOURCE X & Y POSITION
        screenBackgroundImg.imageSet.xSize, screenBackgroundImg.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        0, 0,                                                                     // THE DESTINATION X & Y POSITION
        screenBackgroundImg.imageSet.xSize, screenBackgroundImg.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
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

function renderHUDSprites() {
    for (let i = 0; i < globals.HUDSprites.length; i++) {
        const sprite = globals.HUDSprites[i];

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
    globals.ctxHUD.fillText("SCORE", 13, 39.5);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(score, 13, 54.5);
    
    // |||||||||||| DRAW HIGH SCORE
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("HIGH SCORE", 81.5, 39.5);
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(highScore, 81.5, 54.5);
    
    // |||||||||||| DRAW RAGE BAR'S SYMBOL
    globals.ctxHUD.font = "20px emulogic";
    globals.ctxHUD.fillText("💢", 282.5, 49.5);

    // |||||||||||| RENDER THE ERUDITE'S FACE & HIS RAGE BAR
    renderHUDSprites();
}

function drawSpriteRectangle(sprite, destinationWidth, destinationHeight) {
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, destinationWidth, destinationHeight);
}

function renderScreenSprite(sprite) {
    // |||||||||||| CALCULATE POSITION OF THE SPRITE IN THE SPRITESHEET
    const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
    const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| TEST
    drawSpriteRectangle(sprite, sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize);

    // |||||||||||| DRAW THE SPRITE'S (NEW) FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                 // THE IMAGE FILE
        xTile, yTile,                                                       // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,                       // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                         // THE DESTINATION X & Y POSITION
        sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderScreenSprites() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        renderScreenSprite(sprite);
    }
}