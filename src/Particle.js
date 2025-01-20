class Particle {
    constructor(id, state, xPos, yPos, physics, alpha) {
        this.id         = id;
        this.state      = state;
        this.xPos       = xPos;
        this.yPos       = yPos;
        this.physics    = physics;
        this.alpha      = alpha;
    }
}

class RageSymbolParticle extends Particle {
    constructor(id, state, xPos, yPos, physics, alpha, spikes, outerRadius, innerRadius, timeToFade) {
        super(id, state, xPos, yPos, physics, alpha);

        this.spikes         = spikes;
        this.outerRadius    = outerRadius;
        this.innerRadius    = innerRadius;
        this.fadeCounter    = 0;
        this.timeToFade     = timeToFade;
    }
}

class ControlsMenuSparkleParticle extends Particle {
    constructor(id, state, xPos, yPos, physics, alpha, radius, color) {
        super(id, state, xPos, yPos, physics, alpha);

        this.radius = radius;
        this.color  = color;
    }
}

export {
    RageSymbolParticle,
    ControlsMenuSparkleParticle,
};