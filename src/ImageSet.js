// |||||||||||| MANAGES A SPRITE'S TILESET

export default class ImageSet {
    constructor(initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset) {
        this.initFil        = initFil;      // IMAGESET START ROW
        this.initCol        = initCol;      // IMAGESET START COLUMN
        this.xSize          = xSize;        // IMAGE'S SIZE IN PX (X)
        this.ySize          = ySize;        // IMAGE'S SIZE IN PX (Y)
        this.xOffset        = xOffset;      // OFFSET IN X OF THE BEGINNING OF THE CHARACTER'S DRAWING WITH RESPECT TO THE GRID
        this.yOffset        = yOffset;      // OFFSET IN Y OF THE BEGINNING OF THE CHARACTER'S DRAWING WITH RESPECT TO THE GRID
        this.gridSize       = gridSize;     // SIZE IN PX OF THE GRID CONTAINING THE IMAGE (X & Y)
    }
}