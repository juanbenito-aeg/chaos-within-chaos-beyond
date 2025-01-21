import globals from "./globals.js";
import detectCollisions from "./collisionsLogic.js";
import { Game, SpriteID, State, ParticleID, ParticleState } from "./constants.js";
import { initMainMenu, initStoryMenu, initHighScoresMenu, initControlsMenu, initLevel1, initGameOver, initRageSymbolParticles, createControlsMenuSparkle } from "./initialize.js";
import { updateEvents } from "./events.js";

export default function update() {
    // |||||||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.LOADING_MAIN_MENU:
            initMainMenu();
            break;

        case Game.MAIN_MENU:
            updateMainMenu();
            break;
        
        case Game.LOADING_STORY_MENU:
            initStoryMenu();
            break;

        case Game.STORY_MENU:
            updateStoryMenu();
            break;
        
        case Game.LOADING_HIGH_SCORES_MENU:
            initHighScoresMenu();
            break;

        case Game.HIGH_SCORES_MENU:
            updateHighScoresMenu();
            break;
        
        case Game.LOADING_CONTROLS_MENU:
            initControlsMenu();
            break;

        case Game.CONTROLS_MENU:
            updateControlsMenu();
            break;

        case Game.LOADING_LEVEL_1:
            initLevel1();

        case Game.PLAYING_LEVEL_1:
            playLevel1();
            break;

        case Game.LOADING_GAME_OVER:
            initGameOver();
            break;
        
        case Game.OVER:
            updateGameOver();
            break;
    }
}

function updateMainMenu() {
    updateMainMenuSprites();    
    updateCurrentMainMenuSelection();
    updateCurrentScreenFromMainMenu();
}

function updateMainMenuSprites() {
    for (let i = 0; i < globals.mainMenuSprites.length; i++) {
        const sprite = globals.mainMenuSprites[i];

        updateMainMenuSprite(sprite);
    }
}

function updateMainMenuSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| SUN
        case SpriteID.SUN:
            updateSun(sprite);
            break;
    }
}

function updateSun(sprite) {
    if (sprite.nextAngleChangeDelay.value === 0) {
        sprite.angle += 45;
        sprite.nextAngleChangeDelay.value = 1;
    } else {
        sprite.nextAngleChangeDelay.timeChangeCounter += globals.deltaTime;

        if (sprite.nextAngleChangeDelay.timeChangeCounter >= sprite.nextAngleChangeDelay.timeChangeValue) {
            sprite.nextAngleChangeDelay.value -= 1;
            sprite.nextAngleChangeDelay.timeChangeCounter = 0;
        }
    }
}

function updateCurrentMainMenuSelection() {
    if (globals.action.moveLeft) {
        switch (globals.currentMainMenuSelection) {
            case "HIGH SCORES":
                globals.currentMainMenuSelection = "NEW GAME";
                break;

            case "CONTROLS":
                globals.currentMainMenuSelection = "STORY";
                break;
        }
    } else if (globals.action.moveRight) {
        switch (globals.currentMainMenuSelection) {
            case "NEW GAME":
                globals.currentMainMenuSelection = "HIGH SCORES";
                break;

            case "STORY":
                globals.currentMainMenuSelection = "CONTROLS";
                break;
        }
    } else if (globals.action.moveDown) {
        switch (globals.currentMainMenuSelection) {
            case "NEW GAME":
                globals.currentMainMenuSelection = "STORY";
                break;

            case "HIGH SCORES":
                globals.currentMainMenuSelection = "CONTROLS";
                break;
        }
    } else if (globals.action.moveUp) {
        switch (globals.currentMainMenuSelection) {
            case "STORY":
                globals.currentMainMenuSelection = "NEW GAME";
                break;

            case "CONTROLS":
                globals.currentMainMenuSelection = "HIGH SCORES";
                break;
        }
    }
}

function updateCurrentScreenFromMainMenu() {
    if (globals.action.confirmSelection) {
        switch (globals.currentMainMenuSelection) {
            case "NEW GAME":
                globals.gameState = Game.LOADING_LEVEL_1;
                break;
            
            case "STORY":
                globals.gameState = Game.LOADING_STORY_MENU;
                break;
            
            case "HIGH SCORES":
                globals.gameState = Game.LOADING_HIGH_SCORES_MENU;
                break;
            
            case "CONTROLS":
                globals.gameState = Game.LOADING_CONTROLS_MENU;
                break;
        }
    }
}

function returnToTheMainMenu() {
    if (globals.action.return) {
        globals.gameState = Game.LOADING_MAIN_MENU;
    }
}

function updateStoryMenu() {
    returnToTheMainMenu();
}

function updateHighScoresMenu() {
    returnToTheMainMenu();
}

function updateControlsMenu() {
    // updateControlsMenuSprites();
    updateControlsMenuParticles();
    returnToTheMainMenu();
}

// function updateControlsMenuSprites() {
//     for (let i = 0; i < globals.controlsMenuSprites.length; i++) {
//         const sprite = globals.controlsMenuSprites[i];

//         updateControlsMenuSprite(sprite);
//     }
// }

// function updateControlsMenuSprite(sprite) {
//     const type = sprite.id;

//     switch (type) {
//         // |||||||||||| "LEFT ARROW" KEY
//         case SpriteID.LEFT_ARROW_KEY:
//             updateLeftArrowKey(sprite);
//             break;

//         // |||||||||||| "RIGHT ARROW" KEY
//         case SpriteID.RIGHT_ARROW_KEY:
//             updateRightArrowKey(sprite);
//             break;

//         // |||||||||||| "SPACE" KEY
//         case SpriteID.SPACE_KEY:
//             updateSpaceKey(sprite);
//             break;

//         // |||||||||||| "A" LETTER KEY
//         case SpriteID.A_LETTER_KEY:
//             updateALetterKey(sprite);
//             break;

//         // |||||||||||| "S" LETTER KEY
//         case SpriteID.S_LETTER_KEY:
//             updateSLetterKey(sprite);
//             break;
//     }
// }

// function updateLeftArrowKey(sprite) {
//     sprite.frames.frameCounter = 0;
// }

// function updateRightArrowKey(sprite) {
//     sprite.frames.frameCounter = 0;
// }

// function updateSpaceKey(sprite) {
//     sprite.frames.frameCounter = 0;
// }

// function updateALetterKey(sprite) {
//     sprite.frames.frameCounter = 0;
// }

// function updateSLetterKey(sprite) {
//     sprite.frames.frameCounter = 0;
// }

function updateControlsMenuParticles() {
    for (let i = 0; i < globals.controlsMenuParticles.length; i++) {
        const particle = globals.controlsMenuParticles[i];
        
        if (particle.state === ParticleState.OFF) {
            globals.controlsMenuParticles.splice(i, 1);
            i--;
            createControlsMenuSparkle();
        } else {
            updateControlsMenuParticle(particle);
        }
    }
}

function updateControlsMenuParticle(particle) {
    const type = particle.id;

    switch (type) {
        case ParticleID.CONTROLS_MENU_SPARKLE:
            updateControlsMenuSparkle(particle);
            break;
    }
}

function updateControlsMenuSparkle(particle) {
    particle.alpha -= 0.01;
    if (particle.alpha <= 0) {
        particle.state = ParticleState.OFF;
    }
}

function playLevel1() {
    // |||||||||||| UPDATE PHYSICS
    updateLevel1SpritesPhysics();

    // |||||||||||| UPDATE PARTICLES
    updateLevelsParticles();
    
    // |||||||||||| DETECT COLLISIONS
    detectCollisions();
    
    // |||||||||||| UPDATE CAMERA
    updateCamera();
    
    // |||||||||||| UPDATE LOGIC
    updateLevel1SpritesLogic();

    // |||||||||||| UPDATE EVENTS
    updateEvents();

    updateHUDTimer();

    checkIfGameOver();
}

function updateLevel1SpritesPhysics() {
    for (let i = 0; i < globals.level1Sprites.length; i++) {
        const sprite = globals.level1Sprites[i];

        if (sprite.state === State.OFF) {
            globals.level1Sprites.splice(i, 1);
            i--;
        } else {
            sprite.updatePhysics();
        }
    }
}

function updateLevelsParticles() {
    for (let i = 0; i < globals.levelsParticles.length; i++) {
        const particle1 = globals.levelsParticles[i];
        updateLevelsParticle(particle1);

        if (globals.numOfRageSymbolParticlesOFF === 10) {
            for (let j = 0; j < globals.levelsParticles.length; j++) {
                const particle2 = globals.levelsParticles[j];
                
                if (particle2.id === ParticleID.RAGE_SYMBOL) {
                    globals.levelsParticles.splice(j, 1);
                    j--;
                }
            }
            
            initRageSymbolParticles();

            globals.numOfRageSymbolParticlesOFF = 0;
        }
    }
}

function updateLevelsParticle(particle) {
    const type = particle.id;

    switch (type) {
        case ParticleID.RAGE_SYMBOL:
            updateRageSymbolParticle(particle);
            break;
    }
}

function updateRageSymbolParticle(particle) {
    particle.fadeCounter += globals.deltaTime;

    switch (particle.state) {
        case ParticleState.ON:
            if (particle.fadeCounter >= particle.timeToFade) {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;                
            }
            break;

        case ParticleState.FADE:
            particle.alpha -= 0.05;
            if (particle.alpha <= 0) {
                particle.state = ParticleState.OFF;
            }
            break;

        case ParticleState.OFF:
            globals.numOfRageSymbolParticlesOFF++;
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;
}

function updateCamera() {
    // |||||||||||| FOCUS THE CAMERA ON THE PLAYER
    
    const player = globals.level1Sprites[0];
        
    const levelWidth = globals.level.data[0].length * 16;
    const levelHeight = globals.level.data.length * 16;
    
    const cameraX = Math.max(Math.floor(player.xPos) + Math.floor((player.imageSet.xDestinationSize - globals.canvas.width) / 2), 0);
    globals.camera.x = Math.min(cameraX, levelWidth - globals.canvas.width);

    const cameraY = Math.max(Math.floor(player.yPos) + Math.floor((player.imageSet.yDestinationSize - globals.canvas.height) / 2), 0);
    globals.camera.y = Math.min(cameraY, levelHeight - globals.canvas.height);
}

function updateLevel1SpritesLogic() {
    for (let i = 0; i < globals.level1Sprites.length; i++) {
        const sprite = globals.level1Sprites[i];
        sprite.updateLogic();
    }
}

function updateHUDTimer() {
    globals.demoTimer.timeChangeCounter += globals.deltaTime;

    if (globals.demoTimer.timeChangeCounter >= globals.demoTimer.timeChangeValue) {
        globals.demoTimer.value--;
        globals.demoTimer.timeChangeCounter = 0;
    }
}

function checkIfGameOver() {
    const player = globals.level1Sprites[0];

    if ((player.lifePoints <= 0) || (globals.demoTimer.value === 0)) {
        globals.gameState = Game.LOADING_GAME_OVER;
    }
}

function updateGameOver() {
    updateCurrentGameOverSelection();
    updateCurrentScreenFromGameOver();
}

function updateCurrentGameOverSelection() {
    if (globals.action.moveDown && (globals.currentGameOverSelection === "CHECK HIGH SCORES TABLE")) {
        globals.currentGameOverSelection = "RETURN TO THE MAIN MENU";
    } else if (globals.action.moveUp && (globals.currentGameOverSelection === "RETURN TO THE MAIN MENU")) {
        globals.currentGameOverSelection = "CHECK HIGH SCORES TABLE";
    }
}

function updateCurrentScreenFromGameOver() {
    if (globals.action.confirmSelection && (globals.currentGameOverSelection === "CHECK HIGH SCORES TABLE")) {
        globals.gameState = Game.LOADING_HIGH_SCORES_MENU;
    } else if (globals.action.confirmSelection && (globals.currentGameOverSelection === "RETURN TO THE MAIN MENU")) {
        globals.gameState = Game.LOADING_MAIN_MENU;

        // |||||||||||| AVOID STARTING NEW GAME JUST AFTER CONFIRMING THE CURRENT SELECTION
        globals.action.confirmSelection = false;
    }
}