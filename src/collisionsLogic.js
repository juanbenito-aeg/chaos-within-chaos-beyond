import globals from "./globals.js";
import { Block, SpriteID, State } from "./constants.js";

export default function detectCollisions() {
    // |||||||||||| CALCULATE PLAYER'S & HIS MAGICAL ORBS' COLLISION WITH THE OTHER SPRITES
    for (let i = 1; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];
        
        detectCollisionBetweenPlayerAndSprite(sprite);
        detectCollisionBetweenMagicalOrbAndSprite(sprite);
    }

    // |||||||||||| CALCULATE PLAYER'S COLLISION WITH THE MAP'S BOUNDARIES & OBSTACLES
    detectCollisionBetweenPlayerAndMapBoundaries();
    detectCollisionBetweenPlayerAndMapObstacles();

    // |||||||||||| CALCULATE CHAOTIC HUMANS' (BOW) COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenChaoticHumanBowAndMapObstacles();
    
    // |||||||||||| CALCULATE CHAOTIC HUMANS' (SWORD) COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenChaoticHumanSwordAndMapObstacles();

    // |||||||||||| CALCULATE FAST WORMS' COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenFastWormAndMapObstacles();
    
    // |||||||||||| CALCULATE HELL BATS' (HAND TO HAND) COLLISION WITH THE CANVAS' BOUNDARIES
    detectCollisionBetweenHellBatHandToHandAndCanvasBoundaries();
}

function detectCollisionBetweenPlayerAndSprite(sprite) {
    // |||||||||||| RESET COLLISION STATE
    sprite.collisions.isCollidingWithPlayer = false;

    const player = globals.screenSprites[0];

    // |||||||||||| PLAYER'S DATA
    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;
    
    // |||||||||||| THE OTHER SPRITE'S DATA
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);

    if (isOverlap) {
        sprite.collisions.isCollidingWithPlayer = true;
    }
}

function detectCollisionBetweenMagicalOrbAndSprite(sprite1) {
    // |||||||||||| RESET COLLISION STATE
    sprite1.collisions.isCollidingWithMagicalOrb = false;

    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.MAGICAL_ORB) {
            const magicalOrb = globals.screenSprites[i];
            
            // |||||||||||| THE MAGICAL ORB'S DATA
            const x1 = magicalOrb.xPos + magicalOrb.hitBox.xOffset;
            const y1 = magicalOrb.yPos + magicalOrb.hitBox.yOffset;
            const w1 = magicalOrb.hitBox.xSize;
            const h1 = magicalOrb.hitBox.ySize;
            
            // |||||||||||| THE OTHER SPRITE'S DATA
            const x2 = sprite1.xPos + sprite1.hitBox.xOffset;
            const y2 = sprite1.yPos + sprite1.hitBox.yOffset;
            const w2 = sprite1.hitBox.xSize;
            const h2 = sprite1.hitBox.ySize;
        
            const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
        
            if (isOverlap) {
                sprite1.collisions.isCollidingWithMagicalOrb = true;
            }

            break;
        }
    }
}

// |||||||||||| CALCULATES WHETHER TWO RECTANGLES INTERSECT
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    let isOverlap;

    // |||||||| CHECK X & Y FOR OVERLAP
    if ((x2 > (x1 + w1)) || (x1 > (x2 + w2)) || (y2 > (y1 + h1)) || (y1 > (y2 + h2))) {
        isOverlap = false;
    } else {
        isOverlap = true;
    }

    return isOverlap;
}

function detectCollisionBetweenPlayerAndMapBoundaries() {
    const player = globals.screenSprites[0];
    
    if ((player.xPos + player.hitBox.xOffset + player.hitBox.xSize) > globals.canvas.width) {
        player.xPos = globals.canvas.width - player.hitBox.xOffset - player.hitBox.xSize;
    } else if ((player.xPos + player.hitBox.xOffset) < 0) {
        player.xPos = -player.hitBox.xOffset;
    }
}

function detectCollisionBetweenPlayerAndMapObstacles() {
    const player = globals.screenSprites[0];

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingOnPos5;
    let isCollidingOnPos6;

    const brickSize = globals.level.imageSet.xGridSize;

    // |||||||||||| OBSTACLES' IDS
    const obstaclesIDs = [
        Block.DARK_BROWN_BLOCK,
        Block.DARK_BROWN_SLOPE_UPWARDS_1,
        Block.DARK_BROWN_SLOPE_UPWARDS_2,
        Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
        Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
        Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
        Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
        Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
        Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
        Block.SPIKES_FLOOR,
        Block.SPIKES_CEILING,        
        Block.SPIKES_LEFTWARDS,
        Block.SPIKES_RIGHTWARDS,
        Block.GRAY_BLOCK,
        Block.LAVA,
    ];

    // |||||||||||| RESET COLLISION STATE
    player.collisions.isCollidingWithObstacleOnTheTop    = false;
    player.collisions.isCollidingWithObstacleOnTheLeft   = false;
    player.collisions.isCollidingWithObstacleOnTheBottom = false;
    player.collisions.isCollidingWithObstacleOnTheRight  = false;
    player.collisions.isCollidingWithSpikes              = false;
    player.collisions.isCollidingWithLava                = false;

    // |||||||||||| COLLISIONS (6 POSSIBLE SPOTS)
    // 6--------------------1
    // ----------------------
    // ----------------------
    // ----------------------
    // 5--------------------2
    // ----------------------
    // ----------------------
    // 4--------------------3

    let overlapX;
    let overlapY;

    // |||||||||||| CALCULATE COLLISIONS ON THE 6 SPOTS
    if (player.physics.vx > 0) { // RIGHTWARDS MOVEMENT
        // |||||||| SPOT 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos6) {
                if (obstaclesIDs[i] === Block.SPIKES_CEILING) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                // |||| COLLISION ON Y AXIS
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 4
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos4) {
                if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                // |||| COLLISION ON Y AXIS
                player.collisions.isCollidingWithObstacleOnTheBottom = true;
                player.yPos -= overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 2
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos2) {
                if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON X
                overlapX = (Math.floor(xPos) % brickSize) + 1;
    
                // |||| COLLISION ON X AXIS
                player.xPos -= overlapX;
                player.physics.vx = 0;
            }
        }

        // |||||||| SPOT 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos1) {
                if ((obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) || (obstaclesIDs[i] === Block.SPIKES_CEILING)) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = (Math.floor(xPos) % brickSize) + 1;
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                if (overlapX <= overlapY) {
                    // |||| COLLISION ON X AXIS
                    player.xPos -= overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.yPos += overlapY;
                    if (player.physics.vy < 0) {                    
                        player.physics.vy = 0;
                    } 
                }
            }
        }

        // |||||||| SPOT 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos3) {
                if ((obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }

                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = (Math.floor(xPos) % brickSize) + 1;
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                if (overlapX <= overlapY) {
                    // |||| COLLISION ON X AXIS
                    player.xPos -= overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheBottom = true;
                    player.yPos -= overlapY;
                    if (player.physics.vy < 0) {                    
                        player.physics.vy = 0;
                    }
                }
            }
        }
    } else if (player.physics.vx < 0) { // LEFTWARDS MOVEMENT
        // |||||||| SPOT 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos1) {
                if (obstaclesIDs[i] === Block.SPIKES_CEILING) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                // |||| COLLISION ON Y AXIS
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos3) {
                if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }
                
                // |||| CALCULATE OVERLAP ON Y
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                // |||| COLLISION ON Y AXIS
                player.collisions.isCollidingWithObstacleOnTheBottom = true;
                player.yPos -= overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 5
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos5) {
                if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON X
                overlapX = brickSize - (Math.floor(xPos) % brickSize);
    
                // |||| COLLISION ON X AXIS
                player.xPos += overlapX;
                player.physics.vx = 0;
            }
        }

        // |||||||| SPOT 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos6) {
                if ((obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) || (obstaclesIDs[i] === Block.SPIKES_CEILING)) {
                    player.collisions.isCollidingWithSpikes = true;
                }
                
                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = brickSize - (Math.floor(xPos) % brickSize);
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                if (overlapX <= overlapY) {
                    // |||| COLLISION ON X AXIS
                    player.xPos += overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.yPos += overlapY;
                    if (player.physics.vy < 0) {                    
                        player.physics.vy = 0;
                    } 
                }
            }
        }

        // |||||||| SPOT 4
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos4) {
                if ((obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }

                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = brickSize - (Math.floor(xPos) % brickSize);
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                if (overlapX <= overlapY) {
                    // |||| COLLISION ON X AXIS
                    player.xPos += overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheBottom = true;
                    player.yPos -= overlapY;
                    if (player.physics.vy < 0) {                    
                        player.physics.vy = 0;
                    }
                }
            }
        }
    } else { // STATIC
        // |||||||| SPOT 6
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos6) {
                if (obstaclesIDs[i] === Block.SPIKES_CEILING) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                // |||| COLLISION ON Y AXIS
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 4
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos4) {
                if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                // |||| COLLISION ON Y AXIS
                player.collisions.isCollidingWithObstacleOnTheBottom = true;
                player.yPos -= overlapY;
                player.physics.vy = 0;
            }
        }
        
        // |||||||| SPOT 1
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos1) {
                if (obstaclesIDs[i] === Block.SPIKES_CEILING) {
                    player.collisions.isCollidingWithSpikes = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = brickSize - (Math.floor(yPos) % brickSize);
    
                // |||| COLLISION ON Y AXIS
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 3
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        for (let i = 0; i < obstaclesIDs.length; i++) {
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
            
            if (isCollidingOnPos3) {
                if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                    player.collisions.isCollidingWithSpikes = true;
                } else if (obstaclesIDs[i] === Block.LAVA) {
                    player.collisions.isCollidingWithLava = true;
                }

                // |||| CALCULATE OVERLAP ON Y
                overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                // |||| COLLISION ON Y AXIS
                player.collisions.isCollidingWithObstacleOnTheBottom = true;
                player.yPos -= overlapY;
                player.physics.vy = 0;
            }
        }
    }
}

function detectCollisionBetweenChaoticHumanBowAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.CHAOTIC_HUMAN_BOW) {
            const chaoticHumanBow = globals.screenSprites[i];

            let xPos;
            let yPos;
            let isCollidingOnPos1;
            let isCollidingOnPos2;

            const brickSize = globals.level.imageSet.xGridSize;
        
            // |||||||||||| OBSTACLES' IDS
            const obstaclesIDs = [
                Block.DARK_BROWN_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_2,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
                Block.GRAY_BLOCK,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            chaoticHumanBow.collisions.isCollidingWithObstacleOnTheBottom   = false;
        
            // |||||||||||| COLLISIONS (2 POSSIBLE SPOTS)
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // 1--------------------2
        
            let overlapY;

            // |||||||||||| CALCULATE COLLISIONS ON THE 2 SPOTS

            // |||||||| SPOT 1
            xPos = chaoticHumanBow.xPos + chaoticHumanBow.hitBox.xOffset;
            yPos = chaoticHumanBow.yPos + chaoticHumanBow.hitBox.yOffset + chaoticHumanBow.hitBox.ySize - 1;
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos1) {
                    // |||| CALCULATE OVERLAP ON Y
                    overlapY = (Math.floor(yPos) % brickSize) + 1;
        
                    // |||| COLLISION ON Y AXIS
                    chaoticHumanBow.yPos -= overlapY;
                    chaoticHumanBow.physics.vy = 0;
                }
            }

            // |||||||| SPOT 2
            xPos = chaoticHumanBow.xPos + chaoticHumanBow.hitBox.xOffset + chaoticHumanBow.hitBox.xSize - 1;
            yPos = chaoticHumanBow.yPos + chaoticHumanBow.hitBox.yOffset + chaoticHumanBow.hitBox.ySize - 1;
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos2) {
                    // |||| CALCULATE OVERLAP ON Y
                    overlapY = (Math.floor(yPos) % brickSize) + 1;
        
                    // |||| COLLISION ON Y AXIS
                    chaoticHumanBow.yPos -= overlapY;
                    chaoticHumanBow.physics.vy = 0;
                }
            }
        }
    }
}

function detectCollisionBetweenChaoticHumanSwordAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.CHAOTIC_HUMAN_SWORD) {
            const chaoticHumanSword = globals.screenSprites[i];

            let xPos;
            let yPos;
            let isCollidingOnPos1;
            let isCollidingOnPos2;
            let isCollidingOnPos3;
            let isCollidingOnPos4;
            let isCollidingOnPos5;
            let isCollidingOnPos6;

            const brickSize = globals.level.imageSet.xGridSize;
        
            // |||||||||||| OBSTACLES' IDS
            const obstaclesIDs = [
                Block.DARK_BROWN_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_2,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
                Block.SPIKES_FLOOR,
                Block.SPIKES_CEILING,        
                Block.SPIKES_LEFTWARDS,
                Block.SPIKES_RIGHTWARDS,
                Block.GRAY_BLOCK,
                Block.LAVA,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheLeft   = false;
            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheBottom = false;
            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheRight  = false;
            chaoticHumanSword.collisions.isCollidingWithSpikes              = false;
            chaoticHumanSword.collisions.isCollidingWithLava                = false;
        
            // |||||||||||| COLLISIONS (6 POSSIBLE SPOTS)
            // 6--------------------1
            // ----------------------
            // ----------------------
            // ----------------------
            // 5--------------------2
            // ----------------------
            // ----------------------
            // 4--------------------3
        
            let overlapX;
            let overlapY;

            // |||||||||||| CALCULATE COLLISIONS ON THE 6 SPOTS
            if (chaoticHumanSword.physics.vx > 0) { // RIGHTWARDS MOVEMENT
                // |||||||| SPOT 4
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + chaoticHumanSword.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        chaoticHumanSword.yPos -= overlapY;
                        chaoticHumanSword.physics.vy = 0;
                    }
                }
                
                // |||||||| SPOT 2
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset + chaoticHumanSword.hitBox.xSize - 1;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos2) {
                        if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
            
                        // |||| COLLISION ON X AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheRight = true;
                        chaoticHumanSword.xPos -= overlapX;
                        chaoticHumanSword.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 1
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset + chaoticHumanSword.hitBox.xSize - 1;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos1) {
                        if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
            
                        // |||| COLLISION ON X AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheRight = true;
                        chaoticHumanSword.xPos -= overlapX;
                        chaoticHumanSword.physics.vx = 0;
                    }
                }

                // |||||||| SPOT 3
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset + chaoticHumanSword.hitBox.xSize - 1;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + chaoticHumanSword.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        if ((obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheRight = true;
                            chaoticHumanSword.xPos -= overlapX;
                            chaoticHumanSword.physics.vx = 0;
                        } else {
                            // |||| COLLISION ON Y AXIS
                            chaoticHumanSword.yPos -= overlapY;
                            if (chaoticHumanSword.physics.vy < 0) {                    
                                chaoticHumanSword.physics.vy = 0;
                            }
                        }
                    }
                }
            } else if (chaoticHumanSword.physics.vx < 0) { // LEFTWARDS MOVEMENT
                // |||||||| SPOT 3
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset + chaoticHumanSword.hitBox.xSize - 1;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + chaoticHumanSword.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        chaoticHumanSword.yPos -= overlapY;
                        chaoticHumanSword.physics.vy = 0;
                    }
                }
                
                // |||||||| SPOT 5
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos5) {
                        if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheLeft = true;
                        chaoticHumanSword.xPos += overlapX;
                        chaoticHumanSword.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 6
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos6) {
                        if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheLeft = true;
                        chaoticHumanSword.xPos += overlapX;
                        chaoticHumanSword.physics.vx = 0;
                    }
                }

                // |||||||| SPOT 4
                xPos = chaoticHumanSword.xPos + chaoticHumanSword.hitBox.xOffset;
                yPos = chaoticHumanSword.yPos + chaoticHumanSword.hitBox.yOffset + chaoticHumanSword.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if ((obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                            chaoticHumanSword.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheLeft = true;
                            chaoticHumanSword.xPos += overlapX;
                            chaoticHumanSword.physics.vx = 0;
                        } else {
                            // |||| COLLISION ON Y AXIS
                            chaoticHumanSword.yPos -= overlapY;
                            if (chaoticHumanSword.physics.vy < 0) {                    
                                chaoticHumanSword.physics.vy = 0;
                            }
                        }
                    }
                }
            }
            
            break;
        }
    }
}

function detectCollisionBetweenFastWormAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.FAST_WORM) {
            const fastWorm = globals.screenSprites[i];
            
            let xPos;
            let yPos;
            let isCollidingOnPos1;
            let isCollidingOnPos2;
            let isCollidingOnPos3;
            let isCollidingOnPos4;
            let isCollidingOnPos5;
            let isCollidingOnPos6;
        
            const brickSize = globals.level.imageSet.xGridSize;
        
            // |||||||||||| OBSTACLES' IDS
            const obstaclesIDs = [
                Block.DARK_BROWN_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_2,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
                Block.SPIKES_FLOOR,
                Block.SPIKES_CEILING,        
                Block.SPIKES_LEFTWARDS,
                Block.SPIKES_RIGHTWARDS,
                Block.GRAY_BLOCK,
                Block.LAVA,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            fastWorm.collisions.isCollidingWithObstacleOnTheTop    = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheLeft   = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheRight  = false;
            fastWorm.collisions.isCollidingWithSpikes              = false;
            fastWorm.collisions.isCollidingWithLava                = false;
        
            // |||||||||||| COLLISIONS (6 POSSIBLE SPOTS)
            // 6--------------------1
            // ----------------------
            // ----------------------
            // ----------------------
            // 5--------------------2
            // ----------------------
            // ----------------------
            // 4--------------------3
        
            let overlapX;
            let overlapY;
        
            // |||||||||||| CALCULATE COLLISIONS ON THE 6 SPOTS
            if (fastWorm.physics.vx > 0) { // RIGHTWARDS MOVEMENT
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        fastWorm.yPos -= overlapY;
                        fastWorm.physics.vy = 0;
                    }
                }
        
                // |||||||| SPOT 2
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos2) {
                        if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
            
                        // |||| COLLISION ON X AXIS
                        fastWorm.xPos -= overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 1
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos1) {
                        if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
                        
                        // |||| COLLISION ON X AXIS
                        fastWorm.xPos -= overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 3
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        if ((obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            fastWorm.xPos -= overlapX;
                            fastWorm.physics.vx = 0;
                        } else {
                            // |||| COLLISION ON Y AXIS
                            fastWorm.yPos -= overlapY;
                            if (fastWorm.physics.vy < 0) {                    
                                fastWorm.physics.vy = 0;
                            }
                        }
                    }
                }
            } else if (fastWorm.physics.vx < 0) { // LEFTWARDS MOVEMENT
                // |||||||| SPOT 3
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        fastWorm.yPos -= overlapY;
                        fastWorm.physics.vy = 0;
                    }
                }
        
                // |||||||| SPOT 5
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos5) {
                        if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        fastWorm.xPos += overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 6
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos6) {
                        if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        }

                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        fastWorm.xPos += overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if ((obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) || (obstaclesIDs[i] === Block.SPIKES_FLOOR)) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            fastWorm.xPos += overlapX;
                            fastWorm.physics.vx = 0;
                        } else {
                            // |||| COLLISION ON Y AXIS
                            fastWorm.yPos -= overlapY;
                            if (fastWorm.physics.vy < 0) {                    
                                fastWorm.physics.vy = 0;
                            }
                        }
                    }
                }
            } else { // STATIC
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        fastWorm.yPos -= overlapY;
                        fastWorm.physics.vy = 0;
                    }
                }
        
                // |||||||| SPOT 3
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                            fastWorm.collisions.isCollidingWithSpikes = true;
                        } else if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        fastWorm.yPos -= overlapY;
                        fastWorm.physics.vy = 0;
                    }
                }
            }
            
            break;
        }
    }
}

function detectCollisionBetweenHellBatHandToHandAndCanvasBoundaries() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.HELL_BAT_HAND_TO_HAND) {
            const hellBatHandToHand = globals.screenSprites[i];
            
            if ((hellBatHandToHand.xPos + hellBatHandToHand.imageSet.xDestinationSize) > globals.canvas.width) {
                hellBatHandToHand.physics.vx = -hellBatHandToHand.physics.vLimit;
            } else if (hellBatHandToHand.xPos < 0) {
                hellBatHandToHand.physics.vx = hellBatHandToHand.physics.vLimit;
            }

            break;
        }
    }
}

function isCollidingWithObstacleAt(xPos, yPos, obstacleID) {
    let isColliding;

    const id = getMapTileID(xPos, yPos);

    if (id === obstacleID) {
        isColliding = true;
    } else {
        isColliding = false;
    }

    return isColliding;
}

function getMapTileID(xPos, yPos) {
    const brickSize = globals.level.imageSet.xGridSize;
    const levelData = globals.level.data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);

    return levelData[fil][col];
}