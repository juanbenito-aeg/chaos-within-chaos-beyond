import globals from "./globals.js";
import { Block, SpriteID, State } from "./constants.js";

export default function detectCollisions() {
    const player = globals.screenSprites[0];

    // |||||||||||| RESET COLLISION STATE
    player.collisions.isCollidingWithAcid = false;
    player.collisions.isCollidingWithArrow = false;
    player.collisions.isCollidingWithGreenPotion = false;
    player.collisions.isCollidingWithBluePotion = false;

    // |||||||||||| CALCULATE PLAYER'S & HIS MAGICAL ORBS' COLLISION WITH THE OTHER SPRITES
    for (let i = 1; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];
        
        detectCollisionBetweenPlayerAndSprite(sprite);

        if (sprite.id !== SpriteID.MAGICAL_ORB) {
            detectCollisionBetweenMagicalOrbAndSprite(sprite);
        }
    }

    // |||||||||||| CALCULATE PLAYER'S COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenPlayerAndMapObstacles();
    
    // |||||||||||| CALCULATE MAGICAL ORBS' COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenMagicalOrbAndMapObstacles();

    // |||||||||||| CALCULATE CHAOTIC HUMANS' (BOW) COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenChaoticHumanBowAndMapObstacles();
    
    // |||||||||||| CALCULATE ARROWS' COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenArrowAndMapObstacles();

    // |||||||||||| CALCULATE CHAOTIC HUMANS' (SWORD) COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenChaoticHumanSwordAndMapObstacles();

    // |||||||||||| CALCULATE FAST WORMS' COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenFastWormAndMapObstacles();
    
    // |||||||||||| CALCULATE ACID DROPS' COLLISION WITH THE MAP'S OBSTACLES
    detectCollisionBetweenAcidAndMapObstacles();

    // |||||||||||| CALCULATE HELL BATS' (HAND TO HAND) COLLISION WITH THE CANVAS' BOUNDARIES
    detectCollisionBetweenHellBatHandToHandAndCanvasBoundaries();
}

function detectCollisionBetweenPlayerAndSprite(sprite) {
    const player = globals.screenSprites[0];
    
    // |||||||||||| RESET COLLISION STATE
    sprite.collisions.isCollidingWithPlayer = false;

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

        if (sprite.id === SpriteID.ACID) {
            player.collisions.isCollidingWithAcid = true;
        }
        
        if (sprite.id === SpriteID.ARROW) {
            player.collisions.isCollidingWithArrow = true;
        }
        
        if (sprite.id === SpriteID.POTION_GREEN) {
            player.collisions.isCollidingWithGreenPotion = true;
        }
        
        if (sprite.id === SpriteID.POTION_BLUE) {
            player.collisions.isCollidingWithBluePotion = true;
        }
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
        
            if (isOverlap && (sprite1.id !== SpriteID.POTION_GREEN) && (sprite1.id !== SpriteID.POTION_BLUE)) {
                sprite1.collisions.isCollidingWithMagicalOrb = true;
                magicalOrb.collisions.isCollidingWithEnemy = true;
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
    let isCollidingOnPos7;
    let isCollidingOnPos8;

    const brickSize = globals.level.imageSet.xGridSize;

    // |||||||||||| OBSTACLES' IDS
    const obstaclesIDs = [
        Block.DARK_BROWN_BLOCK,
        // Block.DARK_BROWN_SLOPE_UPWARDS_1,
        // Block.DARK_BROWN_SLOPE_UPWARDS_2,
        // Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
        // Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
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
        Block.DARK_BROWN_SLOPE_UPWARDS,
        Block.DARK_BROWN_SLOPE_DOWNWARDS,
    ];

    // |||||||||||| RESET COLLISION STATE
    player.collisions.isCollidingWithObstacleOnTheTop    = false;
    player.collisions.isCollidingWithObstacleOnTheLeft   = false;
    player.collisions.isCollidingWithObstacleOnTheBottom = false;
    player.collisions.isCollidingWithObstacleOnTheRight  = false;
    player.collisions.isCollidingWithSpikes              = false;
    player.collisions.isCollidingWithLava                = false;
    player.collisions.isCollidingWithSlope               = false;

    // |||||||||||| COLLISIONS (8 POSSIBLE SPOTS)
    // 6--------------------1
    // ----------------------
    // ----------------------
    // 5--------------------2
    // ----------------------
    // ----------------------
    // 8--------------------7
    // ----------------------
    // ----------------------
    // 4--------------------3

    let overlapX;
    let overlapY;

    // |||||||||||| CHECK IF THE SPRITE IS COLLIDING WITH A SLOPE

    // |||||||| SPOT 4
    xPos = player.xPos + player.hitBox.xOffset;
    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
    if (getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
        player.collisions.isCollidingWithSlope = true;
    }

    // |||||||| SPOT 3
    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
    if (getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS) {
        player.collisions.isCollidingWithSlope = true;
    }

    // |||||||||||| CALCULATE COLLISIONS ON THE 8 SPOTS
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
                player.collisions.isCollidingWithObstacleOnTheTop = true;
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

                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = brickSize - (Math.floor(xPos) % brickSize);
                overlapY = (Math.floor(yPos) % brickSize) + 1;

                if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                    let overlapYToStopFalling = (Math.floor(xPos) % brickSize) + 1;
                    
                    if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                        // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                        overlapY = brickSize - (Math.floor(yPos) % brickSize);
                        
                        player.yPos += overlapY;
                        
                        // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                        overlapY = overlapX - 1;
    
                        // |||| COLLISION ON Y AXIS
                        player.collisions.isCollidingWithObstacleOnTheBottom = true;
                        player.yPos -= overlapY;
                        player.physics.vy = 0;
                    }
                } else if (!player.collisions.isCollidingWithSlope) {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheBottom = true;
                    player.yPos -= overlapY;
                    player.physics.vy = 0;
                }
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

                if (!player.collisions.isCollidingWithSlope) {
                    // |||| CALCULATE OVERLAP ON X
                    overlapX = (Math.floor(xPos) % brickSize) + 1;
        
                    // |||| COLLISION ON X AXIS
                    player.collisions.isCollidingWithObstacleOnTheRight = true;
                    player.xPos -= overlapX;
                    player.physics.vx = 0;
                }
            }
        }
        
        // |||||||| SPOT 7
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + (brickSize * 1.5);
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos7 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos7) {
                    if (obstaclesIDs[i] === Block.SPIKES_LEFTWARDS) {
                        player.collisions.isCollidingWithSpikes = true;
                    }
    
                    if (!player.collisions.isCollidingWithSlope) {
                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
            
                        // |||| COLLISION ON X AXIS
                        player.collisions.isCollidingWithObstacleOnTheRight = true;
                        player.xPos -= overlapX;
                        player.physics.vx = 0;
                    }
                }
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
                    player.collisions.isCollidingWithObstacleOnTheRight = true;
                    player.xPos -= overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheTop = true;
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
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
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
    
                    if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                        let overlapYToStopFalling = brickSize - (Math.floor(xPos) % brickSize);
                        
                        if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            player.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX - 1;
        
                            // |||| COLLISION ON Y AXIS
                            player.collisions.isCollidingWithObstacleOnTheBottom = true;
                            player.yPos -= overlapY;
                            player.physics.vy = 0;
                        }
                    } else if (!player.collisions.isCollidingWithSlope) {
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            player.collisions.isCollidingWithObstacleOnTheRight = true;
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
                player.collisions.isCollidingWithObstacleOnTheTop = true;
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

                // |||| CALCULATE OVERLAP ON X & Y
                overlapX = (Math.floor(xPos) % brickSize) + 1;
                overlapY = (Math.floor(yPos) % brickSize) + 1;

                if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                    let overlapYToStopFalling = brickSize - (Math.floor(xPos) % brickSize);
                    
                    if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                        // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                        overlapY = brickSize - (Math.floor(yPos) % brickSize);
                        
                        player.yPos += overlapY;
                        
                        // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                        overlapY = overlapX - 1;
    
                        // |||| COLLISION ON Y AXIS
                        player.collisions.isCollidingWithObstacleOnTheBottom = true;
                        player.yPos -= overlapY;
                        player.physics.vy = 0;
                    }
                } else if (!player.collisions.isCollidingWithSlope) {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheBottom = true;
                    player.yPos -= overlapY;
                    player.physics.vy = 0;
                }
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

                if (!player.collisions.isCollidingWithSlope) {
                    // |||| CALCULATE OVERLAP ON X
                    overlapX = brickSize - (Math.floor(xPos) % brickSize);
        
                    // |||| COLLISION ON X AXIS
                    player.collisions.isCollidingWithObstacleOnTheLeft = true;
                    player.xPos += overlapX;
                    player.physics.vx = 0;
                }
            }
        }
        
        // |||||||| SPOT 8
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + (brickSize * 1.5);
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos8 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos8) {
                    if (obstaclesIDs[i] === Block.SPIKES_RIGHTWARDS) {
                        player.collisions.isCollidingWithSpikes = true;
                    }
    
                    if (!player.collisions.isCollidingWithSlope) {
                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        player.collisions.isCollidingWithObstacleOnTheLeft = true;
                        player.xPos += overlapX;
                        player.physics.vx = 0;
                    }
                }
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
                    player.collisions.isCollidingWithObstacleOnTheLeft = true;
                    player.xPos += overlapX;
                    player.physics.vx = 0;
                } else {
                    // |||| COLLISION ON Y AXIS
                    player.collisions.isCollidingWithObstacleOnTheTop = true;
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
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
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
    
                    if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                        let overlapYToStopFalling = (Math.floor(xPos) % brickSize) + 1;
                        
                        if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            player.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX - 1;
        
                            // |||| COLLISION ON Y AXIS
                            player.collisions.isCollidingWithObstacleOnTheBottom = true;
                            player.yPos -= overlapY;
                            player.physics.vy = 0;
                        }
                    } else if (!player.collisions.isCollidingWithSlope) {
                        if (overlapX <= overlapY) {
                            // |||| COLLISION ON X AXIS
                            player.collisions.isCollidingWithObstacleOnTheLeft = true;
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
                player.collisions.isCollidingWithObstacleOnTheTop = true;
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 4 ("xPos" IS CALCULATED USING HARD-CODED DATA TO AVOID X.G'S SPRITE'S WEIRD MOVEMENTS WHEN ATTACKING HAND TO HAND)
        xPos = player.xPos + 16;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos4) {
                    if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                        player.collisions.isCollidingWithSpikes = true;
                    } else if (obstaclesIDs[i] === Block.LAVA) {
                        player.collisions.isCollidingWithLava = true;
                    }
    
                    // |||| CALCULATE OVERLAP ON X & Y
                    overlapX = brickSize - (Math.floor(xPos) % brickSize);
                    overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                    if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                        let overlapYToStopFalling = (Math.floor(xPos) % brickSize) + 1;
                        
                        if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            player.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX - 1;
        
                            // |||| COLLISION ON Y AXIS
                            player.collisions.isCollidingWithObstacleOnTheBottom = true;
                            player.yPos -= overlapY;
                            player.physics.vy = 0;
                        }
                    } else if (!player.collisions.isCollidingWithSlope || (player.state !== State.LEFT_ATTACK_HAND_TO_HAND) || (player.state !== State.RIGHT_ATTACK_HAND_TO_HAND)) {
                        // |||| COLLISION ON Y AXIS
                        player.collisions.isCollidingWithObstacleOnTheBottom = true;
                        player.yPos -= overlapY;
                        player.physics.vy = 0;
                    }
                }
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
                player.collisions.isCollidingWithObstacleOnTheTop = true;
                player.yPos += overlapY;
                player.physics.vy = 0;
            }
        }

        // |||||||| SPOT 3 ("xPos" IS CALCULATED USING HARD-CODED DATA TO AVOID X.G'S SPRITE'S WEIRD MOVEMENTS WHEN ATTACKING HAND TO HAND)
        xPos = player.xPos + 16 + 12 - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos3) {
                    if (obstaclesIDs[i] === Block.SPIKES_FLOOR) {
                        player.collisions.isCollidingWithSpikes = true;
                    } else if (obstaclesIDs[i] === Block.LAVA) {
                        player.collisions.isCollidingWithLava = true;
                    }
    
                    // |||| CALCULATE OVERLAP ON X & Y
                    overlapX = (Math.floor(xPos) % brickSize) + 1;
                    overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                    if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                        let overlapYToStopFalling = brickSize - (Math.floor(xPos) % brickSize);
                        
                        if ((!player.physics.isOnGround && (player.physics.vy > 0) && (overlapY >= overlapYToStopFalling)) || player.physics.isOnGround) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            player.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX - 1;
        
                            // |||| COLLISION ON Y AXIS
                            player.collisions.isCollidingWithObstacleOnTheBottom = true;
                            player.yPos -= overlapY;
                            player.physics.vy = 0;
                        }
                    } else if (!player.collisions.isCollidingWithSlope || (player.state !== State.LEFT_ATTACK_HAND_TO_HAND) || (player.state !== State.RIGHT_ATTACK_HAND_TO_HAND)) {
                        // |||| COLLISION ON Y AXIS
                        player.collisions.isCollidingWithObstacleOnTheBottom = true;
                        player.yPos -= overlapY;
                        player.physics.vy = 0;
                    }
                }
            }
        }
    }
}

function detectCollisionBetweenMagicalOrbAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.MAGICAL_ORB) {
            const magicalOrb = globals.screenSprites[i];

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
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
                Block.SPIKES_FLOOR,
                Block.SPIKES_CEILING,        
                Block.SPIKES_LEFTWARDS,
                Block.SPIKES_RIGHTWARDS,
                Block.GRAY_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS,
                Block.DARK_BROWN_SLOPE_DOWNWARDS,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            magicalOrb.collisions.isCollidingWithObstacleOnTheLeft   = false;
            magicalOrb.collisions.isCollidingWithObstacleOnTheRight  = false;
        
            // |||||||||||| COLLISIONS (6 POSSIBLE SPOTS)
            // 6--------------------1
            // ----------------------
            // ----------------------
            // ----------------------
            // 5--------------------2
            // ----------------------
            // ----------------------
            // 4--------------------3

            // |||||||||||| CALCULATE COLLISIONS ON THE 6 SPOTS
            if (magicalOrb.physics.vx > 0) { // RIGHTWARDS MOVEMENT
                // |||||||| SPOT 2
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset + magicalOrb.hitBox.xSize - 1;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos2) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheRight = true;
                    }
                }
        
                // |||||||| SPOT 1
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset + magicalOrb.hitBox.xSize - 1;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos1) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheRight = true;
                    }
                }

                // |||||||| SPOT 3
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset + magicalOrb.hitBox.xSize - 1;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset + magicalOrb.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheRight = true;
                    }
                }
            } else if (magicalOrb.physics.vx < 0) { // LEFTWARDS MOVEMENT
                // |||||||| SPOT 5
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset + brickSize;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos5) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheLeft = true;
                    }
                }
        
                // |||||||| SPOT 6
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos6) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheLeft = true;
                    }
                }

                // |||||||| SPOT 4
                xPos = magicalOrb.xPos + magicalOrb.hitBox.xOffset;
                yPos = magicalOrb.yPos + magicalOrb.hitBox.yOffset + magicalOrb.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        magicalOrb.collisions.isCollidingWithObstacleOnTheLeft = true;
                    }
                }
            }
            
            break;
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
                // Block.DARK_BROWN_SLOPE_UPWARDS_1,
                // Block.DARK_BROWN_SLOPE_UPWARDS_2,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
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
                    chaoticHumanBow.collisions.isCollidingWithObstacleOnTheBottom = true;
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
                    chaoticHumanBow.collisions.isCollidingWithObstacleOnTheBottom = true;
                    chaoticHumanBow.yPos -= overlapY;
                    chaoticHumanBow.physics.vy = 0;
                }
            }
        }
    }
}

function detectCollisionBetweenArrowAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.ARROW) {
            const arrow = globals.screenSprites[i];

            let xPos;
            let yPos;
            let isCollidingOnPos1;
            let isCollidingOnPos2;
            let isCollidingOnPos3;
            let isCollidingOnPos4;
        
            // |||||||||||| OBSTACLES' IDS
            const obstaclesIDs = [
                Block.DARK_BROWN_BLOCK,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
                Block.SPIKES_FLOOR,
                Block.SPIKES_CEILING,        
                Block.SPIKES_LEFTWARDS,
                Block.SPIKES_RIGHTWARDS,
                Block.GRAY_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS,
                Block.DARK_BROWN_SLOPE_DOWNWARDS,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            arrow.collisions.isCollidingWithObstacleOnTheLeft   = false;
            arrow.collisions.isCollidingWithObstacleOnTheRight  = false;
        
            // |||||||||||| COLLISIONS (4 POSSIBLE SPOTS)
            // 4--------------------1
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // 3--------------------2

            // |||||||||||| CALCULATE COLLISIONS ON THE 4 SPOTS
            if (arrow.physics.vx > 0) { // RIGHTWARDS MOVEMENT
                // |||||||| SPOT 1
                xPos = arrow.xPos + arrow.hitBox.xOffset + arrow.hitBox.xSize - 1;
                yPos = arrow.yPos + arrow.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos1) {
                        arrow.collisions.isCollidingWithObstacleOnTheRight = true;
                    }
                }

                // |||||||| SPOT 2
                xPos = arrow.xPos + arrow.hitBox.xOffset + arrow.hitBox.xSize - 1;
                yPos = arrow.yPos + arrow.hitBox.yOffset + arrow.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos2) {
                        arrow.collisions.isCollidingWithObstacleOnTheRight = true;
                    }
                }
            } else if (arrow.physics.vx < 0) { // LEFTWARDS MOVEMENT
                // |||||||| SPOT 4
                xPos = arrow.xPos + arrow.hitBox.xOffset;
                yPos = arrow.yPos + arrow.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        arrow.collisions.isCollidingWithObstacleOnTheLeft = true;
                    }
                }

                // |||||||| SPOT 3
                xPos = arrow.xPos + arrow.hitBox.xOffset;
                yPos = arrow.yPos + arrow.hitBox.yOffset + arrow.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos3) {
                        arrow.collisions.isCollidingWithObstacleOnTheLeft = true;
                    }
                }
            }
            
            break;
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
                // Block.DARK_BROWN_SLOPE_UPWARDS_1,
                // Block.DARK_BROWN_SLOPE_UPWARDS_2,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
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
                        if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheBottom = true;
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
                        if (obstaclesIDs[i] === Block.LAVA) {
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
                            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheBottom = true;
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
                        if (obstaclesIDs[i] === Block.LAVA) {
                            chaoticHumanSword.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON Y
                        overlapY = (Math.floor(yPos) % brickSize) + 1;
            
                        // |||| COLLISION ON Y AXIS
                        chaoticHumanSword.collisions.isCollidingWithObstacleOnTheBottom = true;
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
                        if (obstaclesIDs[i] === Block.LAVA) {
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
                            chaoticHumanSword.collisions.isCollidingWithObstacleOnTheBottom = true;
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
                // Block.DARK_BROWN_SLOPE_UPWARDS_1,
                // Block.DARK_BROWN_SLOPE_UPWARDS_2,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_1,
                // Block.DARK_BROWN_SLOPE_DOWNWARDS_2,
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
                Block.DARK_BROWN_SLOPE_UPWARDS,
                Block.DARK_BROWN_SLOPE_DOWNWARDS,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            fastWorm.collisions.isCollidingWithObstacleOnTheTop    = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheLeft   = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = false;
            fastWorm.collisions.isCollidingWithObstacleOnTheRight  = false;
            fastWorm.collisions.isCollidingWithLava                = false;
            fastWorm.collisions.isCollidingWithSlope               = false;
        
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
        
            // |||||||||||| CHECK IF THE SPRITE IS COLLIDING WITH A SLOPE

            // |||||||| SPOT 4
            xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
            yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
            if (getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                fastWorm.collisions.isCollidingWithSlope = true;
            }

            // |||||||| SPOT 3
            xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
            yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
            if (getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS) {
                fastWorm.collisions.isCollidingWithSlope = true;
            }

            // |||||||||||| CALCULATE COLLISIONS ON THE 6 SPOTS
            if (fastWorm.physics.vx > 0) { // RIGHTWARDS MOVEMENT
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos4) {
                        if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
                        overlapY = (Math.floor(yPos) % brickSize) + 1;

                        if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            fastWorm.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX;
        
                            // |||| COLLISION ON Y AXIS
                            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                            fastWorm.yPos -= overlapY;
                            fastWorm.physics.vy = 0;
                        } else if (!fastWorm.collisions.isCollidingWithSlope) {
                            // |||| COLLISION ON Y AXIS
                            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                            fastWorm.yPos -= overlapY;
                            fastWorm.physics.vy = 0;
                        }
                    }
                }
        
                // |||||||| SPOT 2
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + brickSize;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos2) {
                            if (!fastWorm.collisions.isCollidingWithSlope) {
                                // |||| CALCULATE OVERLAP ON X
                                overlapX = (Math.floor(xPos) % brickSize) + 1;
                    
                                // |||| COLLISION ON X AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheRight = true;
                                fastWorm.xPos -= overlapX;
                                fastWorm.physics.vx = 0;
                            }
                        }
                    }
                }
        
                // |||||||| SPOT 1
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos1) {
                        // |||| CALCULATE OVERLAP ON X
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
                        
                        // |||| COLLISION ON X AXIS
                        fastWorm.collisions.isCollidingWithObstacleOnTheRight = true;
                        fastWorm.xPos -= overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 3
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos3) {
                            if (obstaclesIDs[i] === Block.LAVA) {
                                fastWorm.collisions.isCollidingWithLava = true;
                            }
    
                            // |||| CALCULATE OVERLAP ON X & Y
                            overlapX = (Math.floor(xPos) % brickSize) + 1;
                            overlapY = (Math.floor(yPos) % brickSize) + 1;
                
                            if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                                // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                                overlapY = brickSize - (Math.floor(yPos) % brickSize);
                                
                                fastWorm.yPos += overlapY;
                                
                                // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                                overlapY = overlapX - 1;
            
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            } else if (!fastWorm.collisions.isCollidingWithSlope) {
                                if (overlapX <= overlapY) {
                                    // |||| COLLISION ON X AXIS
                                    fastWorm.collisions.isCollidingWithObstacleOnTheRight = true;
                                    fastWorm.xPos -= overlapX;
                                    fastWorm.physics.vx = 0;
                                } else {
                                    // |||| COLLISION ON Y AXIS
                                    fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                    fastWorm.yPos -= overlapY;
                                    fastWorm.physics.vy = 0;
                                }
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
                        if (obstaclesIDs[i] === Block.LAVA) {
                            fastWorm.collisions.isCollidingWithLava = true;
                        }

                        // |||| CALCULATE OVERLAP ON X & Y
                        overlapX = (Math.floor(xPos) % brickSize) + 1;
                        overlapY = (Math.floor(yPos) % brickSize) + 1;

                        if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                            // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                            overlapY = brickSize - (Math.floor(yPos) % brickSize);
                            
                            fastWorm.yPos += overlapY;
                            
                            // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                            overlapY = overlapX;
        
                            // |||| COLLISION ON Y AXIS
                            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                            fastWorm.yPos -= overlapY;
                            fastWorm.physics.vy = 0;
                        } else if (!fastWorm.collisions.isCollidingWithSlope) {
                            // |||| COLLISION ON Y AXIS
                            fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                            fastWorm.yPos -= overlapY;
                            fastWorm.physics.vy = 0;
                        }
                    }
                }
        
                // |||||||| SPOT 5
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + brickSize;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos5 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos5) {
                            if (!fastWorm.collisions.isCollidingWithSlope) {
                                // |||| CALCULATE OVERLAP ON X
                                overlapX = brickSize - (Math.floor(xPos) % brickSize);
                    
                                // |||| COLLISION ON X AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheLeft = true;
                                fastWorm.xPos += overlapX;
                                fastWorm.physics.vx = 0;
                            }
                        }
                    }
                }
        
                // |||||||| SPOT 6
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset;
                for (let i = 0; i < obstaclesIDs.length; i++) {
                    isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                    
                    if (isCollidingOnPos6) {
                        // |||| CALCULATE OVERLAP ON X
                        overlapX = brickSize - (Math.floor(xPos) % brickSize);
            
                        // |||| COLLISION ON X AXIS
                        fastWorm.collisions.isCollidingWithObstacleOnTheLeft = true;
                        fastWorm.xPos += overlapX;
                        fastWorm.physics.vx = 0;
                    }
                }
        
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos4) {
                            if (obstaclesIDs[i] === Block.LAVA) {
                                fastWorm.collisions.isCollidingWithLava = true;
                            }
    
                            // |||| CALCULATE OVERLAP ON X & Y
                            overlapX = brickSize - (Math.floor(xPos) % brickSize);
                            overlapY = (Math.floor(yPos) % brickSize) + 1;
                
                            if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                                // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                                overlapY = brickSize - (Math.floor(yPos) % brickSize);
                                
                                fastWorm.yPos += overlapY;
                                
                                // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                                overlapY = overlapX - 1;
            
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            } else if (!fastWorm.collisions.isCollidingWithSlope) {
                                if (overlapX <= overlapY) {
                                    // |||| COLLISION ON X AXIS
                                    fastWorm.collisions.isCollidingWithObstacleOnTheLeft = true;
                                    fastWorm.xPos += overlapX;
                                    fastWorm.physics.vx = 0;
                                } else {
                                    // |||| COLLISION ON Y AXIS
                                    fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                    fastWorm.yPos -= overlapY;
                                    fastWorm.physics.vy = 0;
                                }
                            }
                        }
                    }
                }
            } else { // STATIC
                // |||||||| SPOT 4
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_UPWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos4) {
                            if (obstaclesIDs[i] === Block.LAVA) {
                                fastWorm.collisions.isCollidingWithLava = true;
                            }
    
                            // |||| CALCULATE OVERLAP ON X & Y
                            overlapX = brickSize - (Math.floor(xPos) % brickSize);
                            overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                            if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_DOWNWARDS) {
                                // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                                overlapY = brickSize - (Math.floor(yPos) % brickSize);
                                
                                fastWorm.yPos += overlapY;
                                
                                // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                                overlapY = overlapX - 1;
            
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            } else if (!fastWorm.collisions.isCollidingWithSlope) {
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            }
                        }
                    }
                }
        
                // |||||||| SPOT 3
                xPos = fastWorm.xPos + fastWorm.hitBox.xOffset + fastWorm.hitBox.xSize - 1;
                yPos = fastWorm.yPos + fastWorm.hitBox.yOffset + fastWorm.hitBox.ySize - 1;
                if (!(getMapTileID(xPos, yPos) === Block.DARK_BROWN_SLOPE_DOWNWARDS)) {
                    for (let i = 0; i < obstaclesIDs.length; i++) {
                        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                        
                        if (isCollidingOnPos3) {
                            if (obstaclesIDs[i] === Block.LAVA) {
                                fastWorm.collisions.isCollidingWithLava = true;
                            }
    
                            // |||| CALCULATE OVERLAP ON X & Y
                            overlapX = (Math.floor(xPos) % brickSize) + 1;
                            overlapY = (Math.floor(yPos) % brickSize) + 1;
    
                            if (obstaclesIDs[i] === Block.DARK_BROWN_SLOPE_UPWARDS) {
                                // |||| CALCULATE OVERLAP ON Y (1 - USED TO PUT THE SPRITE AGAINST THE BOTTOM SIDE OF THE SLOPE TILE)
                                overlapY = brickSize - (Math.floor(yPos) % brickSize);
                                
                                fastWorm.yPos += overlapY;
                                
                                // |||| CALCULATE OVERLAP ON Y (2 - USED TO ADEQUATELY POSITION THE SPRITE ON THE SLOPE TILE)
                                overlapY = overlapX - 1;
            
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            } else if (!fastWorm.collisions.isCollidingWithSlope) {
                                // |||| COLLISION ON Y AXIS
                                fastWorm.collisions.isCollidingWithObstacleOnTheBottom = true;
                                fastWorm.yPos -= overlapY;
                                fastWorm.physics.vy = 0;
                            }
                        }
                    }
                }
            }
            
            break;
        }
    }
}

function detectCollisionBetweenAcidAndMapObstacles() {
    for (let i = 1; i < globals.screenSprites.length; i++) {
        if (globals.screenSprites[i].id === SpriteID.ACID) {
            const acid = globals.screenSprites[i];

            let xPos;
            let yPos;
            let isCollidingOnPos1;
            let isCollidingOnPos2;
        
            // |||||||||||| OBSTACLES' IDS
            const obstaclesIDs = [
                Block.DARK_BROWN_BLOCK,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_DOWNWARDS_REVERSED_2,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_1,
                Block.DARK_BROWN_SLOPE_UPWARDS_REVERSED_2,
                Block.SPIKES_FLOOR,
                Block.SPIKES_CEILING,        
                Block.SPIKES_LEFTWARDS,
                Block.SPIKES_RIGHTWARDS,
                Block.GRAY_BLOCK,
                Block.DARK_BROWN_SLOPE_UPWARDS,
                Block.DARK_BROWN_SLOPE_DOWNWARDS,
            ];
        
            // |||||||||||| RESET COLLISION STATE
            acid.collisions.isCollidingWithObstacleOnTheBottom = false;
        
            // |||||||||||| COLLISIONS (2 POSSIBLE SPOTS)
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // ----------------------
            // 2--------------------1

            // |||||||||||| CALCULATE COLLISIONS ON THE 2 SPOTS

            // |||||||| SPOT 1
            xPos = acid.xPos + acid.hitBox.xOffset + acid.hitBox.xSize - 1;
            yPos = acid.yPos + acid.hitBox.yOffset + acid.hitBox.ySize - 1;
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos1) {
                    acid.collisions.isCollidingWithObstacleOnTheBottom = true;
                }
            }

            // |||||||| SPOT 2
            xPos = acid.xPos + acid.hitBox.xOffset;
            yPos = acid.yPos + acid.hitBox.yOffset + acid.hitBox.ySize - 1;
            for (let i = 0; i < obstaclesIDs.length; i++) {
                isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstaclesIDs[i]);
                
                if (isCollidingOnPos2) {
                    acid.collisions.isCollidingWithObstacleOnTheBottom = true;
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
            
            // |||||||||||| RESET COLLISION STATE
            hellBatHandToHand.collisions.isCollidingWithObstacleOnTheLeft   = false;
            hellBatHandToHand.collisions.isCollidingWithObstacleOnTheRight  = false;

            if ((hellBatHandToHand.xPos + hellBatHandToHand.imageSet.xDestinationSize) > globals.canvas.width) {
                hellBatHandToHand.physics.vx = -hellBatHandToHand.physics.vLimit;
                hellBatHandToHand.collisions.isCollidingWithObstacleOnTheRight = true;
            } else if (hellBatHandToHand.xPos < 0) {
                hellBatHandToHand.physics.vx = hellBatHandToHand.physics.vLimit;
                hellBatHandToHand.collisions.isCollidingWithObstacleOnTheLeft = true;
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