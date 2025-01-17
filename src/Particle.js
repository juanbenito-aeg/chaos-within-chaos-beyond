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
    constructor(id, state, xPos, yPos, physics, alpha, spikes, outerRadius, innerRadius, timeToFade, angle) {
        super(id, state, xPos, yPos, physics, alpha);

        this.spikes         = spikes;
        this.outerRadius    = outerRadius;
        this.innerRadius    = innerRadius;
        this.fadeCounter    = 0;
        this.timeToFade     = timeToFade;
        this.angle          = angle;
    }
}

export { RageSymbolParticle };