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
}

// |||||||||||| SPRITE STATE IDENTIFIER (DIRECTION)
const State = {
    // |||||||| PLAYER
    LEFT: 0,
    RIGHT: 1,

    // |||||||| CHAOTIC HUMAN (BOW)
    LEFT_2: 0,
    RIGHT_2: 1,
    
    // |||||||| CHAOTIC HUMAN (SWORD)
    LEFT_3: 0,
    RIGHT_3: 1,

    // TODO: CONTINUE WITH THE OTHER SPRITES
}

// |||||||||||| EXPORTS
export { Game, FPS, SpriteID, State };