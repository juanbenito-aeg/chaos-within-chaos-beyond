// |||||||||||| GAME STATES
const Game = {
    INVALID: -1,
    LOADING: 0,
    PLAYING: 1,
    OVER: 2,
}

// |||||||||||| FPS (FRAMES PER SECOND)
const FPS = 30;

// |||||||||||| SPRITE TYPE IDENTIFIER (ID)
const SpriteID = {
    PLAYER: 0,
    CHAOTIC_HUMAN_BOW: 1,
    CHAOTIC_HUMAN_SWORD: 2,
    FAST_WORM: 3,
    HELL_BAT_ACID: 4,
    HELL_BAT_HAND_TO_HAND: 5,
    POTION_GREEN: 6,
    POTION_BLUE: 7,
    BACKGROUND_IMG: 8,
}

// |||||||||||| SPRITE STATE IDENTIFIER (DIRECTION)
const State = {
    // |||||||| PLAYER
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,

    // |||||||| BACKGROUND IMAGE
    STILL: 0,

    // TODO: CONTINUE WITH THE OTHER SPRITES
}

// |||||||||||| EXPORTS
export { Game, FPS, SpriteID, State };