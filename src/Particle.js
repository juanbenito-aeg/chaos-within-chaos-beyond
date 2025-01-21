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

class ControlsMenuSparkle extends Particle {
    constructor(id, state, xPos, yPos, physics, alpha, width, height, radius, color) {
        super(id, state, xPos, yPos, physics, alpha);

        this.width  = width;
        this.height = height;
        this.radius = radius;
        this.color  = color;
    }
}

class CheckpointParticle extends Particle {
    constructor(id, state, xPos, yPos, physics, alpha, spikes, outerRadius, innerRadius, timeToFade) {
        super(id, state, xPos, yPos, physics, alpha);

        this.spikes         = spikes;
        this.outerRadius    = outerRadius;
        this.innerRadius    = innerRadius;
        this.fadeCounter    = 0;
        this.timeToFade     = timeToFade;
    }
}

export {
    RageSymbolParticle,
    ControlsMenuSparkle,
    CheckpointParticle,
};