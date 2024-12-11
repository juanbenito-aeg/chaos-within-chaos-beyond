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
        
        case Game.STORY_MENU:
            drawStoryMenu();
            break;
        
        case Game.HIGH_SCORES_MENU:
            drawHighScoresMenu();
            break;

        case Game.CONTROLS_MENU:
            drawControlsMenu();
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        case Game.OVER:
            drawGameOver();
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
    globals.ctx.strokeStyle = "white";
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
    globals.ctx.strokeStyle = "white";
    globals.ctx.strokeRect(97, 125, 60, 60);
    
    // |||||||||||| "STORY" BUTTON
    globals.ctx.fillRect(97, 231, 60, 60);
    globals.ctx.strokeRect(97, 231, 60, 60);
    
    // |||||||||||| "HIGH SCORES" BUTTON
    globals.ctx.fillRect(291.5, 125, 60, 60);
    globals.ctx.strokeRect(291.5, 125, 60, 60);
    
    // |||||||||||| "CONTROLS" BUTTON
    globals.ctx.fillRect(291.5, 231, 60, 60);
    globals.ctx.strokeRect(291.5, 231, 60, 60);
}

function renderMainMenuSprites() {
    for (let i = 0; i < globals.mainMenuSprites.length; i++) {
        const sprite = globals.mainMenuSprites[i];

        renderMainMenuSprite(sprite);
    }
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
        sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
}

function drawStoryMenu() {
    enlargeCanvasForMenus();

    const storyMenuBackgroundImg = globals.menusBackgroundImgsSprites[1];
    renderNMenuBackgroundImg(storyMenuBackgroundImg);

    renderStoryMenuTxt();
}

function renderStoryMenuTxt() {
    const canvasWidthDividedBy2 = globals.canvas.width / 2;
    globals.ctx.textAlign = "center";
    
    // |||||||||||| "STORY" AND CHAPTER'S TITLE TEXTS
    globals.ctx.font = "22px emulogic";
    globals.ctx.strokeStyle = "white";
    globals.ctx.strokeText("STORY", canvasWidthDividedBy2, 35);
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("TRAPPED IN THE CAVE OF CHAOS", canvasWidthDividedBy2, 62);
    
    // |||||||||||| THE STORY
    globals.ctx.font = "6.25px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

    const storyDividedIntoLines = [
        "Now that the children were safe, X.G entered the family’s",
        "house, tired as never before, and after they all had a big",
        "feast, The Erudite fell asleep in just a matter of seconds.",
        "Several hours later, X.G woke up inside an eerie cave,",
        "surrounded by dirt, strange creatures and even other crazy",
        "chaotic humans that looked messy and rather aggressive towards",
        "everything and everyone that got in their way. What had",
        "unfortunately happened was that The Erudite had been poisoned",
        "by the woman, who turned out to be an evil witch dreaded by",
        "those who knew her from ancient Kaotika tales. She had created",
        "fake beings to make naive humans as X.G think they were saving",
        "her actual children, with the aim of later taking advantage of",
        "their weariness to easily drug and throw them into a place",
        "filled with never-before-seen dangers. The purpose of gathering",
        "all those beings was unknown, but at that moment all X.G had to",
        "care about was doing his best to escape that place safe and sound.",
    ];

    let storyLineYCoordinate = 82;

    for (let i = 0; i < storyDividedIntoLines.length; i++) {
        globals.ctx.fillText(storyDividedIntoLines[i], canvasWidthDividedBy2, storyLineYCoordinate);
        storyLineYCoordinate += 14;
    }

    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("PRESS ESCAPE (esc) TO RETURN TO THE MAIN MENU", canvasWidthDividedBy2, 324);
}

function drawHighScoresMenu() {
    enlargeCanvasForMenus();

    const highScoresMenuBackgroundImg = globals.menusBackgroundImgsSprites[2];
    renderNMenuBackgroundImg(highScoresMenuBackgroundImg);

    renderHighScoresMenuTxt();
    // renderMainMenuButtons();
    // renderMainMenuSprites();
}

function renderHighScoresMenuTxt() {
    const canvasWidthDividedBy2 = globals.canvas.width / 2;
    globals.ctx.textAlign = "center";
    
    globals.ctx.font = "22px emulogic";
    globals.ctx.strokeStyle = "white";
    globals.ctx.strokeText("HIGH SCORES", canvasWidthDividedBy2, 40);
    
    // |||||||||||| COLUMNS DRAWING
    globals.ctx.textAlign = "start";
    globals.ctx.fillStyle = "white";
    
    // |||||||| RANK
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillText("RANK", 80, 78);

    globals.ctx.direction = "rtl";
    globals.ctx.font = "8px emulogic";
    
    let rowYCoordinate = 106;

    for (let i = 1; i <= 10; i++) {
        let ordinalNumSuffix = "TH";

        switch (i) {
            case 1:
                ordinalNumSuffix = "ST";
                break;

            case 2:
                ordinalNumSuffix = "ND";
                break;
            
            case 3:
                ordinalNumSuffix = "RD";
                break;
        }

        globals.ctx.fillText(i + ordinalNumSuffix, 128, rowYCoordinate);

        rowYCoordinate += 20;
    }

    // |||||||| NAME
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillText("NAME", 220, 78);

    globals.ctx.font = "8px emulogic";

    const playersNames = [
        "AAA",
        "BBB",
        "CCC",
        "DDD",
        "EEE",
        "FFF",
        "GGG",
        "HHH",
        "III",
        "JJJ",
    ];

    rowYCoordinate = 106;

    for (let i = 0; i < playersNames.length; i++) {
        globals.ctx.fillText(playersNames[i], 220, rowYCoordinate);

        rowYCoordinate += 20;
    }
    
    // |||||||| SCORE
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillText("SCORE", 367, 78);

    globals.ctx.font = "8px emulogic";

    const scores = [
        1000000,
        900000,
        800000,
        700000,
        600000,
        500000,
        400000,
        300000,
        200000,
        100000,
    ];

    rowYCoordinate = 106;

    for (let i = 0; i < scores.length; i++) {
        globals.ctx.fillText(scores[i], 367, rowYCoordinate);

        rowYCoordinate += 20;
    }

    globals.ctx.textAlign = "center";
    globals.ctx.direction = "ltr";
    globals.ctx.fillText("PRESS ESCAPE (esc) TO RETURN TO THE MAIN MENU", canvasWidthDividedBy2, 321);
}

function drawControlsMenu() {
    enlargeCanvasForMenus();

    const controlsMenuBackgroundImg = globals.menusBackgroundImgsSprites[3];
    renderNMenuBackgroundImg(controlsMenuBackgroundImg);

    renderControlsMenuTxt();
    renderControlsMenuSprites();
}

function renderControlsMenuTxt() {
    const canvasWidthDividedBy2 = globals.canvas.width / 2;
    globals.ctx.textAlign = "center";
    
    // |||||||||||| "CONTROLS" TEXT
    globals.ctx.font = "22px emulogic";
    globals.ctx.strokeStyle = "white";
    globals.ctx.strokeText("CONTROLS", canvasWidthDividedBy2, 40);
    
    // |||||||||||| MOVEMENT CONTROLS
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("MOVEMENT", canvasWidthDividedBy2, 71);

    globals.ctx.textAlign = "start";
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

    const movementControlsDividedIntoLines = [
        "GO UP USING CHAIN",
        "GO DOWN USING CHAIN",
        "MOVE LEFTWARDS",
        "MOVE RIGHTWARDS",
        "JUMP",
    ];

    let movementControlsLineYCoordinate = 95;

    for (let i = 0; i < movementControlsDividedIntoLines.length; i++) {
        globals.ctx.fillText(movementControlsDividedIntoLines[i], 18, movementControlsLineYCoordinate);
        movementControlsLineYCoordinate += 25;
    }
    
    // |||||||||||| ATTACK CONTROLS
    globals.ctx.textAlign = "center";
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("ATTACK", canvasWidthDividedBy2, 225);

    globals.ctx.textAlign = "start";
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

    const attackControlsDividedIntoLines = [
        "USE THE HAMMER HAND TO HAND",
        "THROW MAGICAL ORB THROUGH THE HAMMER",
    ];

    let attackControlsLineYCoordinate = 249;

    for (let i = 0; i < attackControlsDividedIntoLines.length; i++) {
        globals.ctx.fillText(attackControlsDividedIntoLines[i], 18, attackControlsLineYCoordinate);
        attackControlsLineYCoordinate += 25;
    }

    globals.ctx.textAlign = "center";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("PRESS ESCAPE (esc) TO RETURN TO THE MAIN MENU", canvasWidthDividedBy2, 321);
}

function renderControlsMenuSprites() {
    for (let i = 0; i < globals.controlsMenuSprites.length; i++) {
        const sprite = globals.controlsMenuSprites[i];

        renderControlsMenuSprite(sprite);
    }
}

function renderControlsMenuSprite(sprite) {
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
        sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
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

    // |||||||||||| RENDER LIFE POINTS
    renderLifePoints();

    // |||||||||||| RENDER RAGE LEVEL
    renderRageLevel();
}

function renderLifePoints() {
    const theEruditeFace = globals.HUDSprites[0];

    const xTile = theEruditeFace.imageSet.xInit + (globals.lifePoints - 1) * theEruditeFace.imageSet.xGridSize + theEruditeFace.imageSet.xOffset;
    const yTile = theEruditeFace.imageSet.yInit + theEruditeFace.state * theEruditeFace.imageSet.yGridSize + theEruditeFace.imageSet.yOffset;

    const xPos = Math.floor(theEruditeFace.xPos);
    const yPos = Math.floor(theEruditeFace.yPos);

    globals.ctxHUD.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                             // THE IMAGE FILE
        xTile, yTile,                                                   // THE SOURCE X & Y POSITION
        theEruditeFace.imageSet.xSize, theEruditeFace.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                     // THE DESTINATION X & Y POSITION
        theEruditeFace.imageSet.xSize, theEruditeFace.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
    );
}

function renderRageLevel() {
    for (let i = 1; i < globals.HUDSprites.length; i++) {
        const sprite = globals.HUDSprites[i];

        const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
        const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

        const xPos = Math.floor(sprite.xPos);
        const yPos = Math.floor(sprite.yPos);

        let spriteSourceAndDestinationWidth;

        switch (sprite.id) {
            case SpriteID.RAGE_BAR_CONTAINER:
                spriteSourceAndDestinationWidth = sprite.imageSet.xSize;
                break;
            
            case SpriteID.RAGE_BAR_CONTENT:
                spriteSourceAndDestinationWidth = sprite.imageSet.xSize * (globals.rageLevel / 100);
                break;
        }

        globals.ctxHUD.drawImage(
            globals.tileSets[Tile.SIZE_OTHERS],                       // THE IMAGE FILE
            xTile, yTile,                                             // THE SOURCE X & Y POSITION
            spriteSourceAndDestinationWidth, sprite.imageSet.ySize,   // THE SOURCE WIDTH & HEIGHT
            xPos, yPos,                                               // THE DESTINATION X & Y POSITION
            spriteSourceAndDestinationWidth, sprite.imageSet.ySize    // THE DESTINATION WIDTH & HEIGHT
        );
    }
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

function drawGameOver() {
    enlargeCanvasForMenus();

    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect(0, 0, 597, 341);

    renderGameOverTxt();
    renderGameOverSprite();
}

function renderGameOverTxt() {
    const canvasWidthDividedBy2 = globals.canvas.width / 2;
    globals.ctx.textAlign = "center";
    
    globals.ctx.font = "30px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("GAME     OVER", canvasWidthDividedBy2, 95);
    
    globals.ctx.font = "13px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("WHAT DO YOU WANT TO DO NOW?", canvasWidthDividedBy2, 192);
    
    globals.ctx.font = "10px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";
    globals.ctx.fillText("CHECK HIGH SCORES TABLE", canvasWidthDividedBy2, 235);
    
    globals.ctx.fillStyle = "rgb(212 212 212 / 0.5)";
    globals.ctx.fillText("RETURN TO THE MAIN MENU", canvasWidthDividedBy2, 265);
}

function renderGameOverSprite() {
    const skull = globals.gameOverSprite;

    // |||||||||||| CALCULATE POSITION OF THE SPRITE IN THE SPRITESHEET
    const xTile = skull.imageSet.xInit + skull.frames.frameCounter * skull.imageSet.xGridSize + skull.imageSet.xOffset;
    const yTile = skull.imageSet.yInit + skull.state * skull.imageSet.yGridSize + skull.imageSet.yOffset;

    const xPos = Math.floor(skull.xPos);
    const yPos = Math.floor(skull.yPos);

    // |||||||||||| DRAW THE SPRITE'S (NEW) FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                               // THE IMAGE FILE
        xTile, yTile,                                                     // THE SOURCE X & Y POSITION
        skull.imageSet.xSize, skull.imageSet.ySize,                       // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                       // THE DESTINATION X & Y POSITION
        skull.imageSet.xDestinationSize, skull.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
}