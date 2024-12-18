export default class Physics {
    constructor(vLimit, aLimit = 0, friction = 1, jumpForce = 0, omega = 0, angle = 0, xRotCenter = 100, yRotCenter = 100) {
        this.vx          = 0;           // CURRENT VELOCITY IN THE X AXIS (PX/SECOND)
        this.vy          = 0;           // CURRENT VELOCITY IN THE Y AXIS (PX/SECOND)
        this.vLimit      = vLimit;      // MAXIMUM VELOCITY AT WHICH THE SPRITE CAN MOVE (PX/SECOND)
        this.ax          = 0;           // X AXIS ACCELERATION
        this.ay          = 0;           // Y AXIS ACCELERATION
        this.aLimit      = aLimit;      // LIMIT ACCELERATION
        this.friction    = friction;    // FRICTION FORCE (VALUE BETWEEN 0 & 1)
        this.isOnGround  = false;       // HOLDS "true" IF THE PLAYER IS ON THE GROUND
        this.jumpForce   = jumpForce;   // JUMP FORCE (IT MUST HOLD A NEGATIVE VALUE)
        this.omega       = omega;       // ANGULAR VELOCITY (RAD/S)
        this.angle       = angle;       // CURRENT ANGLE (RAD)
        this.xRotCenter  = xRotCenter;  // SPRITE'S CENTER OF ROTATION (X)
        this.yRotCenter  = yRotCenter;  // SPRITE'S CENTER OF ROTATION (Y)
    }
}