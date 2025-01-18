import globals from "./globals.js";
import detectCollisions from "./collisionsLogic.js";
import { Game, SpriteID, State, ParticleID, ParticleState } from "./constants.js";
import { initRageSymbolParticles } from "./initialize.js";
import { updateEvents } from "./events.js";

export default function update() {
    // |||||||||||| CHANGE WHAT THE GAME IS DOING BASED ON THE GAME STATE
    switch (globals.gameState) {
        case Game.LOADING:
            console.log("Loading assets...");
            break;
        
        case Game.MAIN_MENU:
            break;
        
        case Game.STORY_MENU:
            break;
        
        case Game.CONTROLS_MENU:
            updateControlsMenuSprites();
            break;
        
        case Game.PLAYING:
            playGame();
            break;
    }
}

function updateControlsMenuSprites() {
    for (let i = 0; i < globals.controlsMenuSprites.length; i++) {
        const sprite = globals.controlsMenuSprites[i];

        updateControlsMenuSprite(sprite);
    }
}

function updateControlsMenuSprite(sprite) {
    const type = sprite.id;

    switch (type) {
        // |||||||||||| "LEFT ARROW" KEY
        case SpriteID.LEFT_ARROW_KEY:
            updateLeftArrowKey(sprite);
            break;

        // |||||||||||| "RIGHT ARROW" KEY
        case SpriteID.RIGHT_ARROW_KEY:
            updateRightArrowKey(sprite);
            break;

        // |||||||||||| "SPACE" KEY
        case SpriteID.SPACE_KEY:
            updateSpaceKey(sprite);
            break;

        // |||||||||||| "A" LETTER KEY
        case SpriteID.A_LETTER_KEY:
            updateALetterKey(sprite);
            break;

        // |||||||||||| "S" LETTER KEY
        case SpriteID.S_LETTER_KEY:
            updateSLetterKey(sprite);
            break;
    }
}

function updateLeftArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateRightArrowKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSpaceKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateALetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function updateSLetterKey(sprite) {
    sprite.frames.frameCounter = 0;
}

function playGame() {
    // |||||||||||| UPDATE PHYSICS
    updateScreenSpritesPhysics();

    // |||||||||||| UPDATE PARTICLES
    updateParticles();
    
    // |||||||||||| DETECT COLLISIONS
    detectCollisions();
    
    // |||||||||||| UPDATE CAMERA
    updateCamera();
    
    // |||||||||||| UPDATE LOGIC
    updateScreenSpritesLogic();

    // |||||||||||| UPDATE EVENTS
    updateEvents();

    // |||||||||||| CHECK IF THE PLAYER HAS DIED (IS GAME OVER)
    checkIfGameOver();
}

function updateScreenSpritesPhysics() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];

        if (sprite.state === State.OFF) {
            const indexOfSpriteToDelete = globals.screenSprites.indexOf(sprite);
            globals.screenSprites.splice(indexOfSpriteToDelete, 1);
        } else {
            sprite.updatePhysics();
        }
    }
}

function updateParticles() {
    for (let i = 0; i < globals.particles.length; i++) {
        const particle = globals.particles[i];
        updateParticle(particle);
    }
}

function updateParticle(particle) {
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
            const player = globals.screenSprites[0];

            particle.state = ParticleState.ON;
            particle.xPos = 295.1;
            particle.yPos = 43.4;
            particle.alpha = 1.0;
            // particle.physics.vLimit = 5 + (player.rageLevel / 5);
            // particle.physics.vx = particle.physics.vLimit * Math.cos(particle.angle);
            // particle.physics.vy = particle.physics.vLimit * Math.sin(particle.angle);
            // particle.timeToFade = 0.75;
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;
}

function updateCamera() {
    // |||||||||||| FOCUS THE CAMERA ON THE PLAYER
    
    const player = globals.screenSprites[0];
        
    const level1Width = globals.level.data[0].length * 16;
    const level1Height = globals.level.data.length * 16;
    
    const cameraX = Math.max(Math.floor(player.xPos) + Math.floor((player.imageSet.xDestinationSize - globals.canvas.width) / 2), 0);
    globals.camera.x = Math.min(cameraX, level1Width - globals.canvas.width);

    const cameraY = Math.max(Math.floor(player.yPos) + Math.floor((player.imageSet.yDestinationSize - globals.canvas.height) / 2), 0);
    globals.camera.y = Math.min(cameraY, level1Height - globals.canvas.height);
}

function updateScreenSpritesLogic() {
    for (let i = 0; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];
        sprite.updateLogic();
    }
}

function checkIfGameOver() {
    const player = globals.screenSprites[0];

    if (player.lifePoints <= 0) {
        globals.gameState = Game.OVER;
    }
}