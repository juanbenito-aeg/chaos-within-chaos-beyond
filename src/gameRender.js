import Character from "./sprites/Character.js";
import globals from "./globals.js";
import { Game, Tile, SpriteID, ParticleID, ParticleState } from "./constants.js";

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
        
        case Game.PLAYING_LEVEL_1:
            drawLevel1();
            break;
        
        case Game.OVER:
            drawGameOver();
            break;
    }
}

function shrinkCanvasForPlayingGameState() {
    // |||||||||||| CLEAR SCREEN & HUD
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    const canvasOriginalHeight = 256;

    globals.canvasHUD.style.display = "block";
    globals.canvas.style.height = "640px";
    globals.canvas.height = canvasOriginalHeight;
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

function renderNBackgroundImg(nBackgroundImg) {
    const xTile = nBackgroundImg.imageSet.xInit + nBackgroundImg.frames.frameCounter * nBackgroundImg.imageSet.xGridSize + nBackgroundImg.imageSet.xOffset;
    const yTile = nBackgroundImg.imageSet.yInit + nBackgroundImg.state * nBackgroundImg.imageSet.yGridSize + nBackgroundImg.imageSet.yOffset;

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                               // THE IMAGE FILE
        xTile, yTile,                                                     // THE SOURCE X & Y POSITION
        nBackgroundImg.imageSet.xSize, nBackgroundImg.imageSet.ySize,     // THE SOURCE WIDTH & HEIGHT
        0, 0,                                                             // THE DESTINATION X & Y POSITION
        nBackgroundImg.imageSet.xSize, nBackgroundImg.imageSet.ySize      // THE DESTINATION WIDTH & HEIGHT
    );
}

function drawMainMenu() {
    enlargeCanvasForMenus();

    renderNBackgroundImg(globals.mainMenuBackgroundImg);

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
    globals.ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    globals.ctx.strokeStyle = "rgb(212 212 212 / 0.5)";

    // |||||||||||| "NEW GAME" BUTTON
    globals.ctx.fillRect(97, 120, 60, 60);
    globals.ctx.strokeRect(97, 120, 60, 60);
    
    // |||||||||||| "STORY" BUTTON
    globals.ctx.fillRect(97, 221, 60, 60);
    globals.ctx.strokeRect(97, 221, 60, 60);
    
    // |||||||||||| "HIGH SCORES" BUTTON
    globals.ctx.fillRect(291.5, 120, 60, 60);
    globals.ctx.strokeRect(291.5, 120, 60, 60);
    
    // |||||||||||| "CONTROLS" BUTTON
    globals.ctx.fillRect(291.5, 221, 60, 60);
    globals.ctx.strokeRect(291.5, 221, 60, 60);

    // |||||||||||| DEFINITION OF A "SIGN" TO RECOGNIZE THE CURRENT SELECTION

    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";
    globals.ctx.strokeStyle = "rgb(212 212 212)";

    switch (globals.currentMainMenuSelection) {
        case "NEW GAME":
            globals.ctx.strokeRect(97, 120, 60, 60);
            globals.ctx.fillText(globals.currentMainMenuSelection, 126.25, 197);
            break;
        
        case "STORY":
            globals.ctx.strokeRect(97, 221, 60, 60);
            globals.ctx.fillText(globals.currentMainMenuSelection, 126.25, 298);
            break;
        
        case "HIGH SCORES":
            globals.ctx.strokeRect(291.5, 120, 60, 60);
            globals.ctx.fillText(globals.currentMainMenuSelection, 321.5, 197);
            break;
        
        case "CONTROLS":
            globals.ctx.strokeRect(291.5, 221, 60, 60);
            globals.ctx.fillText(globals.currentMainMenuSelection, 321.5, 298);
            break;
    }
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

    // |||||||||||| SUN SPRITE ROTATION
    if (sprite.id === SpriteID.SUN) {
        // |||||||| MOVE TO THE CENTER OF THE SUN SPRITE
        globals.ctx.translate(xPos + (sprite.imageSet.xDestinationSize / 2), yPos + (sprite.imageSet.yDestinationSize / 2));

        // |||||||| ROTATE "N" DEGREES
        const angle_radians = sprite.angle * Math.PI / 180;

        globals.ctx.rotate(angle_radians);

        // |||||||| RETURN TO THE ORIGIN
        globals.ctx.translate(-(xPos + (sprite.imageSet.xDestinationSize / 2)), -(yPos + (sprite.imageSet.yDestinationSize / 2)));
    }

    // |||||||||||| DRAW THE SPRITE'S (NEW) FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                 // THE IMAGE FILE
        xTile, yTile,                                                       // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,                       // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                         // THE DESTINATION X & Y POSITION
        sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );

    // |||||||||||| RESTORE THE INITIAL CONTEXT
    if (sprite.id === SpriteID.SUN) {
        globals.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function drawStoryMenu() {
    enlargeCanvasForMenus();

    renderNBackgroundImg(globals.storyMenuBackgroundImg);

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

    renderNBackgroundImg(globals.highScoresMenuBackgroundImg);

    renderHighScoresMenuTxt();
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
    globals.ctx.fillStyle = "rgb(212 212 212)";
    
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
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("NAME", 241, 78);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

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
        globals.ctx.fillText(playersNames[i], 241, rowYCoordinate);

        rowYCoordinate += 20;
    }
    
    // |||||||| SCORE
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("SCORE", 367, 78);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

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
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("PRESS ESCAPE (esc) TO RETURN TO THE MAIN MENU", canvasWidthDividedBy2, 321);
}

function drawControlsMenu() {
    enlargeCanvasForMenus();

    renderNBackgroundImg(globals.controlsMenuBackgroundImg);

    renderControlsMenuTxt();
    renderControlsMenuSprites();
    renderControlsMenuParticles();
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
    globals.ctx.fillText("ATTACK", canvasWidthDividedBy2, 180);

    globals.ctx.textAlign = "start";
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "rgb(212 212 212)";

    const attackControlsDividedIntoLines = [
        "USE THE HAMMER HAND TO HAND",
        "THROW MAGICAL ORB THROUGH THE HAMMER",
    ];

    let attackControlsLineYCoordinate = 206;

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

function renderControlsMenuParticles() {
    for (let i = 0; i < globals.controlsMenuParticles.length; i++) {
        const particle = globals.controlsMenuParticles[i];
        renderControlsMenuParticle(particle);
    }
}

function renderControlsMenuParticle(particle) {
    const type = particle.id;

    switch (type) {
        case ParticleID.CONTROLS_MENU_SPARKLE:
            renderControlsMenuSparkle(particle);
            break;
    }
}

function renderControlsMenuSparkle(particle) {
    if (particle.state !== ParticleState.OFF) {
        globals.ctx.save();

        globals.ctx.globalAlpha = particle.alpha;

        globals.ctx.shadowColor = particle.color;
        globals.ctx.shadowBlur = 5;
        
        globals.ctx.roundRect(particle.xPos, particle.yPos, particle.width, particle.height, particle.radius);
        
        globals.ctx.strokeStyle = "transparent";

        for (let i = 0; i < 5; i++) {
            globals.ctx.shadowBlur += 0.85;
            
            globals.ctx.stroke();
        }

        globals.ctx.fillStyle = particle.color;
        globals.ctx.fill();

        globals.ctx.restore();
    }
}

function drawLevel1() {
    shrinkCanvasForPlayingGameState();

    renderNBackgroundImg(globals.level1BackgroundImg);

    moveCamera();
    renderMap();
    renderHUD();
    renderLevel1Sprites();
    renderLevelsParticles()
    restoreCamera();
}

function moveCamera() {
    const xTranslation = -globals.camera.x;
    const yTranslation = -globals.camera.y;
 
    globals.ctx.translate(xTranslation, yTranslation);
}

function restoreCamera() {
    globals.ctx.setTransform(1, 0, 0, 1, 0, 0);
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
    if (globals.score >= globals.highScore) {
        globals.highScore = globals.score;
    }

    // |||||||||||| DRAW SCORE

    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("SCORE", 29, 18.5);
    
    globals.ctxHUD.direction = "rtl";
    globals.ctxHUD.font = "7.5px emulogic";
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(globals.score, 69, 33.5);
    
    // |||||||||||| DRAW HIGH SCORE

    globals.ctxHUD.direction = "ltr";
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("HI-SCORE", 99, 18.5);

    globals.ctxHUD.direction = "rtl";
    globals.ctxHUD.font = "7.5px emulogic";
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(globals.highScore, 163, 33.5);
    
    // |||||||||||| RENDER DEMO TIMER

    globals.ctxHUD.direction = "ltr";
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "#d5dbc6";
    globals.ctxHUD.fillText("TIME", 131, 57.5);

    globals.ctxHUD.direction = "rtl";
    globals.ctxHUD.font = "7.5px emulogic";
    globals.ctxHUD.fillStyle = "#e7ebdd";
    globals.ctxHUD.fillText(globals.demoTimer.value, 163, 72.5);

    // |||||||||||| DRAW RAGE BAR'S SYMBOL
    globals.ctxHUD.direction = "ltr";
    globals.ctxHUD.font = "20px emulogic";
    globals.ctxHUD.fillText("💢", 282.5, 49.5);

    // |||||||||||| RENDER LIFE POINTS
    renderLifePoints();

    // |||||||||||| RENDER RAGE LEVEL
    renderRageLevel();
}

function renderLifePoints() {
    const theEruditeFace = globals.HUDSprites[0];

    const player = globals.level1Sprites[0];

    let tweakedLifePointsToRenderAdequateFrame = Math.ceil(player.lifePoints - 1);

    const xTile = theEruditeFace.imageSet.xInit + tweakedLifePointsToRenderAdequateFrame * theEruditeFace.imageSet.xGridSize + theEruditeFace.imageSet.xOffset;
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
                const player = globals.level1Sprites[0];
                spriteSourceAndDestinationWidth = sprite.imageSet.xSize * (player.rageLevel / 100);
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

function renderLevel1Sprites() {
    for (let i = 0; i < globals.level1Sprites.length; i++) {
        const sprite = globals.level1Sprites[i];

        if (sprite instanceof Character) {
            if (sprite.isDrawn) {
                renderScreenSprite(sprite);
            }
        } else {
            renderScreenSprite(sprite);
        }

        // |||||||||||| TEST: DRAWS THE HITBOX
        // drawHitBox(sprite);
    }
}

function renderScreenSprite(sprite) {
    // |||||||||||| CALCULATE POSITION OF THE SPRITE IN THE SPRITESHEET
    const xTile = sprite.imageSet.xInit + sprite.frames.frameCounter * sprite.imageSet.xGridSize + sprite.imageSet.xOffset;
    const yTile = sprite.imageSet.yInit + sprite.state * sprite.imageSet.yGridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    // |||||||||||| TEST
    // drawSpriteRectangle(sprite, sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize);

    // |||||||||||| DRAW THE SPRITE'S (NEW) FRAME IN THE DESIRED POSITION
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_OTHERS],                                 // THE IMAGE FILE
        xTile, yTile,                                                       // THE SOURCE X & Y POSITION
        sprite.imageSet.xSize, sprite.imageSet.ySize,                       // THE SOURCE WIDTH & HEIGHT
        xPos, yPos,                                                         // THE DESTINATION X & Y POSITION
        sprite.imageSet.xDestinationSize, sprite.imageSet.yDestinationSize  // THE DESTINATION WIDTH & HEIGHT
    );
}

function drawSpriteRectangle(sprite, destinationWidth, destinationHeight) {
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, destinationWidth, destinationHeight);
}

function drawHitBox(sprite) {
    let currentLevelSprites;
    if (globals.gameState === Game.PLAYING_LEVEL_1) {
        currentLevelSprites = globals.level1Sprites;
    }

    globals.ctx.strokeStyle = "white";
    
    let x1;
    let y1;
    let w1;
    let h1;
    
    let x2;
    let y2;
    let w2;
    let h2;

    if (sprite.id !== SpriteID.MAGICAL_ORB) {
        x1 = sprite.xPos + sprite.hitBox.xOffset;
        y1 = sprite.yPos + sprite.hitBox.yOffset;
        w1 = sprite.hitBox.xSize;
        h1 = sprite.hitBox.ySize;
    }

    if (sprite.collisions.isCollidingWithObstacleOnTheTop || sprite.collisions.isCollidingWithObstacleOnTheLeft || sprite.collisions.isCollidingWithObstacleOnTheBottom || sprite.collisions.isCollidingWithObstacleOnTheRight) {
        globals.ctx.strokeStyle = "yellow";
    }

    if (sprite.collisions.isCollidingWithPlayer && (sprite.id !== SpriteID.POTION_GREEN) && (sprite.id !== SpriteID.POTION_BLUE)) {
        const player = globals.level1Sprites[0];

        x2 = player.xPos + player.hitBox.xOffset;
        y2 = player.yPos + player.hitBox.yOffset;
        w2 = player.hitBox.xSize;
        h2 = player.hitBox.ySize;

        globals.ctx.strokeStyle = "red";

        globals.ctx.strokeRect(x2, y2, w2, h2);
    }
    
    if (sprite.collisions.isCollidingWithMagicalOrb && (sprite.id !== SpriteID.POTION_GREEN) && (sprite.id !== SpriteID.POTION_BLUE)) {
        for (let i = 1; i < currentLevelSprites.length; i++) {
            if (currentLevelSprites[i].id === SpriteID.MAGICAL_ORB) {
                const magicalOrb = currentLevelSprites[i];
                
                x2 = magicalOrb.xPos + magicalOrb.hitBox.xOffset;
                y2 = magicalOrb.yPos + magicalOrb.hitBox.yOffset;
                w2 = magicalOrb.hitBox.xSize;
                h2 = magicalOrb.hitBox.ySize;
    
                globals.ctx.strokeStyle = "blue";

                globals.ctx.strokeRect(x2, y2, w2, h2);
            }
        }
    }

    globals.ctx.strokeRect(x1, y1, w1, h1);
}

function renderLevelsParticles() {
    for (let i = 0; i < globals.levelsParticles.length; i++) {
        const particle = globals.levelsParticles[i];
        renderLevelsParticle(particle);
    }
}

function renderLevelsParticle(particle) {
    const type = particle.id;

    switch (type) {
        case ParticleID.RAGE_SYMBOL:
            renderRageSymbolParticle(particle);
            break;
        
        case ParticleID.CHECKPOINT:
            renderCheckpointParticle(particle);
            break;
        
        case ParticleID.LAVA:
            renderLavaParticle(particle);
            break;
    }
}

function renderNSpikesParticle(context, particle, colorOfParticle) {
    let x;
    let y;
    let rotation = (Math.PI / 2) * 3;
    const step = Math.PI / particle.spikes;
    
    context.beginPath();
    context.moveTo(particle.xPos, particle.yPos - particle.outerRadius);
    for (let i = 0; i < particle.spikes; i++) {
        x = particle.xPos + (Math.cos(rotation) * particle.outerRadius);
        y = particle.yPos + (Math.sin(rotation) * particle.outerRadius);
        context.lineTo(x, y);
        rotation += step;
        
        x = particle.xPos + (Math.cos(rotation) * particle.innerRadius);
        y = particle.yPos + (Math.sin(rotation) * particle.innerRadius);
        context.lineTo(x, y);
        rotation += step;
    }
    
    context.lineTo(particle.xPos, particle.yPos - particle.outerRadius);
    context.closePath();
    context.globalAlpha = particle.alpha;
    context.fillStyle = colorOfParticle;
    context.fill();
    context.globalAlpha = 1.0;
}

function renderRageSymbolParticle(particle) {
    if (particle.state !== ParticleState.OFF) {
        const redColor = "rgb(238 65 52 / 0.85)";
        
        renderNSpikesParticle(globals.ctxHUD, particle, redColor);
    }
}

function renderCheckpointParticle(particle) {
    if (particle.state !== ParticleState.OFF) {
        const whiteColor = "rgb(255 255 255 / 1.0)";

        renderNSpikesParticle(globals.ctx, particle, whiteColor);
    } 
}

function renderLavaParticle(particle) {
    if (particle.state !== ParticleState.OFF) {
        globals.ctx.save();

        globals.ctx.globalAlpha = particle.alpha;

        globals.ctx.fillStyle = "rgb(254 144 1)";
        globals.ctx.fillRect(particle.xPos, particle.yPos, particle.width, particle.height);

        globals.ctx.restore();
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
    globals.ctx.fillStyle = "white";
    
    globals.ctx.font = "30px emulogic";
    globals.ctx.fillText("GAME     OVER", canvasWidthDividedBy2, 95);
    
    globals.ctx.font = "13px emulogic";
    globals.ctx.fillText("WHAT DO YOU WANT TO DO NOW?", canvasWidthDividedBy2, 192);
    
    const menuActions = [
        "CHECK HIGH SCORES TABLE",
        "RETURN TO THE MAIN MENU",
    ];
    
    let rowYCoordinate = 235;
    
    globals.ctx.font = "10px emulogic";

    for (let i = 0; i < menuActions.length; i++) {
        globals.ctx.fillStyle = "rgb(212 212 212 / 0.5)";
        
        if (globals.currentGameOverSelection === menuActions[i]) {
            globals.ctx.fillStyle = "rgb(212 212 212)";    
        }

        globals.ctx.fillText(menuActions[i], canvasWidthDividedBy2, rowYCoordinate);

        rowYCoordinate += 30;
    }
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