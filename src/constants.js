// |||||||||||| GAME STATES
const Game = {
    INVALID: -1,
    LOADING: 0,
    PLAYING: 1,
    OVER: 2,
};

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
    THE_ERUDITE_HUD: 9,
    RAGE_BAR_CONTAINER: 10,
    RAGE_BAR_CONTENT: 11,
};

// |||||||||||| SPRITE STATE IDENTIFIER (DIRECTION)
const State = {
    // |||||||| PLAYER
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    UP_ATTACK: 4,
    LEFT_ATTACK: 5,
    DOWN_ATTACK: 6,
    RIGHT_ATTACK: 7,
    AWAKENING: 8,

    // |||||||| BACKGROUND IMAGE, THE ERUDITE (HUD), RAGE BAR (CONTAINER & CONTENT)
    STILL: 0,
};

// |||||||||||| DIFFERENT TILESETS
const Tile = {
    SIZE_OTHERS: 0,     // SPRITES (64 x 64, ETC.)
    SIZE_16:     1,     // MAP TILES (16 x 16)
};

// |||||||||||| MAP BLOCK IDENTIFIER
const Block = {
    EMPTY: 0,
    DARK_BROWN_BLOCK: 64,
    DARK_BROWN_SLOPE_UPWARDS_1: 66,
    DARK_BROWN_SLOPE_UPWARDS_2: 67,
    SPIKES_FLOOR: 86,
    SPIKES_CEILING: 87,
    GRAY_BLOCK: 95,
};

// |||||||||||| EXPORTS
export { Game, FPS, SpriteID, State, Tile, Block };