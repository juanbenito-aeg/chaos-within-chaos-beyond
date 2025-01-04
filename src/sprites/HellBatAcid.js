import Character from "./Character.js";
import globals from "../globals.js";
import { initAcid } from "../initialize.js";

export default class HellBatAcid extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    setPosition() {
        // |||||||||||| SEMI-MAJOR AXIS OF THE ELLIPSE
        const aRadius = 60;
        
        // |||||||||||| SEMI-MINOR AXIS OF THE ELLIPSE
        const bRadius = 20;

        this.xPos = this.physics.xRotCenter + aRadius * Math.cos(this.physics.angle);
        this.yPos = this.physics.yRotCenter + bRadius * Math.sin(this.physics.angle);
    }

    update() {
        // |||||||||||| UPDATE TURNING ANGLE
        this.physics.angle += this.physics.omega * globals.deltaTime;

        // |||||||||||| CALCULATE NEW POSITION
        this.setPosition();

        this.updateAnimationFrame();

        if (globals.nextAcidDropDelay.value <= 0) {
            initAcid();
            globals.nextAcidDropDelay.timeChangeCounter = 0;   
            globals.nextAcidDropDelay.value = 5;   
        } else {
            globals.nextAcidDropDelay.timeChangeCounter += globals.deltaTime;
        
            if (globals.nextAcidDropDelay.timeChangeCounter > globals.nextAcidDropDelay.timeChangeValue) {
                globals.nextAcidDropDelay.value--;
        
                globals.nextAcidDropDelay.timeChangeCounter = 0;
            }
        }
    }
}