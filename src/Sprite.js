// |||||||||||| MANAGES SPRITES
class Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        this.id                     = id;                   // SPRITE TYPE
        this.state                  = state;                // SPRITE'S ANIMATION STATE
        this.xPos                   = xPos;                 // X POSITION IN CANVAS
        this.yPos                   = yPos;                 // Y POSITION IN CANVAS
        this.imageSet               = imageSet;             // SPRITE'S IMAGES DATA
        this.frames                 = frames;               // ANIMATION FRAMES DATA
        this.physics                = physics;              // PHYSICS DATA
        this.hitBox                 = hitBox;               // HITBOX DATA
        this.collisions             = collisions;           // COLLISIONS DATA
        this.lifePoints             = lifePoints;           // LIFE POINTS
        this.afterAttackLeeway      = afterAttackLeeway;    // TIMING OF THE LEEWAY GIVEN TO THE SPRITE WHEN THEY ARE ATTACKED (IN ORDER TO AVOID THEM BEING INSTANTLY KILLED EVEN IF THEY HAVE MORE THAN ONE LIFE POINT)
    }
}

// |||||||||||| CHAOTIC HUMAN (SWORD) CLASS
class ChaoticHumanSword extends Sprite {
    constructor (id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);

        this.directionChangeCounter   = 0;                          // COUNTER FOR DIRECTION CHANGE (SECONDS)
        this.maxTimeToChangeDirection = maxTimeToChangeDirection;   // MAXIMUM TIME FOR DIRECTION CHANGE (SECONDS)
    }
}

export { Sprite as default, ChaoticHumanSword };