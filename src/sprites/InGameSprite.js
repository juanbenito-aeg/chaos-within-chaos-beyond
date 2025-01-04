import Sprite from "./Sprite.js";
import { State } from "../constants.js";

export default class InGameSprite extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions) {
        super(id, state, xPos, yPos, imageSet, frames);

        this.physics    = physics;    // PHYSICS DATA
        this.hitBox     = hitBox;     // HITBOX DATA
        this.collisions = collisions; // COLLISIONS DATA
    }

    updateAnimationFrame() {
        switch (this.state) {
            case State.UP_STILL:
            case State.LEFT_STILL:
            case State.DOWN_STILL:
            case State.RIGHT_STILL:
            case State.LEFT_JUMP:
            case State.RIGHT_JUMP:
                this.frames.frameCounter = 0;
                this.frames.frameChangeCounter = 0;
                break;
    
            case State.UP_ATTACK_HAND_TO_HAND:
            case State.LEFT_ATTACK_HAND_TO_HAND:
            case State.DOWN_ATTACK_HAND_TO_HAND:
            case State.RIGHT_ATTACK_HAND_TO_HAND:
                this.frames.frameChangeCounter++;
            
                if (this.frames.frameChangeCounter === this.frames.speed) {
                    this.frames.frameCounter++;
                    this.frames.frameChangeCounter = 0;
                }
            
                if (this.frames.frameCounter === 5) {
                    this.frames.frameCounter = 0;
    
                    switch (this.state) {
                        case State.LEFT_ATTACK_HAND_TO_HAND:
                            this.state = State.LEFT_STILL;
                            break;
                        
                        case State.RIGHT_ATTACK_HAND_TO_HAND:
                            this.state = State.RIGHT_STILL;
                            break;
                    }
                }
    
                break;
            
            case State.LEFT_ATTACK_MAGICAL_ORB:
            case State.RIGHT_ATTACK_MAGICAL_ORB:
                this.frames.frameChangeCounter++;
            
                if (this.frames.frameChangeCounter === this.frames.speed) {
                    this.frames.frameCounter++;
                    this.frames.frameChangeCounter = 0;
                }
            
                if (this.frames.frameCounter === 4) {
                    this.frames.frameCounter = 0;
    
                    switch (this.state) {
                        case State.LEFT_ATTACK_MAGICAL_ORB:
                            this.state = State.LEFT_STILL;
                            break;
                        
                        case State.RIGHT_ATTACK_MAGICAL_ORB:
                            this.state = State.RIGHT_STILL;
                            break;
                    }
                }
    
                break;
    
            case State.LEFT_ATTACK_2:
            case State.RIGHT_ATTACK_2:
                this.frames.frameChangeCounter++;
            
                if (this.frames.frameChangeCounter === this.frames.speed) {
                    this.frames.frameCounter++;
                    this.frames.frameChangeCounter = 0;
                }
            
                if (this.frames.frameCounter === this.frames.framesPerState) {
                    this.frames.frameCounter = 0;
                }
    
                break;
    
            default:
                this.frames.frameChangeCounter++;
            
                // |||||||||||| CHANGE FRAME WHEN THE ANIMATION LAG REACHES "speed"
                if (this.frames.frameChangeCounter === this.frames.speed) {
                    // |||||||| CHANGE FRAME & RESET THE FRAME CHANGE COUNTER
                    this.frames.frameCounter++;
                    this.frames.frameChangeCounter = 0;
                }
            
                // |||||||||||| IF THE LAST FRAME HAS BEEN REACHED, RESTART COUNTER (CYCLIC ANIMATION)
                if (this.frames.frameCounter === this.frames.framesPerState) {
                    this.frames.frameCounter = 0;
                }
    
                break;
        }
    }

    update() {}
}