import globals from "./globals.js";

export default function detectCollisions() {
    // |||||||||||| CALCULATE PLAYER'S COLLISION WITH EACH OF THE OTHER SPRITES
    for (let i = 1; i < globals.screenSprites.length; i++) {
        const sprite = globals.screenSprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite);
    }
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