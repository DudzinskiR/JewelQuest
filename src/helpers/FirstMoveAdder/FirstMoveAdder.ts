import { BoardData, FirstMovePattern, TileData, TileType } from "src/types";
import { deepCopy } from "src/helpers";
import { firstMovePatterns } from "src/utils";

export class FirstMoveAdder {
  private _board: BoardData;
  private _tileTypes: TileType[];
  private _changedTiles: TileData[] = [];
  constructor(board: BoardData, tileTypes: TileType[]) {
    this._board = board;
    this._tileTypes = tileTypes;
  }

  public addFirstMovePatterns(number: number) {
    let isOk = false;
    const oldBoard = deepCopy(this._board);

    while (!isOk) {
      isOk = true;
      for (let i = 0; i < number; i++) {
        try {
          this._board = this.addFirstMovePattern();
        } catch (e) {
          this._board = oldBoard;
          this._changedTiles = [];
          isOk = false;
          break;
        }
      }
    }
    return this._board;
  }

  private addFirstMovePattern() {
    let newBoard = deepCopy(this._board);
    let isOk = false;
    let safetyBuffer = 0;
    while (!isOk) {
      isOk = true;
      safetyBuffer++;

      if (safetyBuffer > 1000) {
        throw new Error("Number of attempts exceeded");
      }

      const pattern =
        firstMovePatterns[Math.floor(Math.random() * firstMovePatterns.length)];

      const posX = Math.floor(Math.random() * newBoard.sizeX);
      const posY = Math.floor(Math.random() * newBoard.sizeY);
      if (!this.checkPatternFit(newBoard, pattern, posX, posY)) {
        isOk = false;
        continue;
      }
      if (this.checkBlockedPositions(pattern, posX, posY)) {
        isOk = false;
        continue;
      }
      newBoard = this.addPatternToBoard(newBoard, pattern, posX, posY);
    }

    return newBoard;
  }

  private addPatternToBoard(
    board: BoardData,
    pattern: FirstMovePattern,
    posX: number,
    posY: number
  ) {
    const newBoard = deepCopy(board);

    const tilesInPattern = this.generateTileWithPattern(pattern);

    for (const item of tilesInPattern) {
      const newTile: TileData = {
        posX: posX + item.posX,
        posY: posY + item.posY,
        id: newBoard.itemCount,
        type: item.type,
      };
      this._changedTiles.push(newTile);

      newBoard.tiles.push(newTile);
      newBoard.itemCount++;
    }

    return newBoard;
  }

  private checkPatternFit = (
    board: BoardData,
    pattern: FirstMovePattern,
    posX: number,
    posY: number
  ) => {
    if (
      posX + pattern.sizeX > board.sizeX ||
      posY + pattern.sizeY > board.sizeY
    ) {
      return false;
    }

    return true;
  };

  private checkBlockedPositions(
    pattern: FirstMovePattern,
    posX: number,
    posY: number
  ) {
    for (let x = 0; x < pattern.sizeX; x++) {
      for (let y = 0; y < pattern.sizeY; y++) {
        if (
          this._changedTiles.find(
            (item) => item.posX === x + posX && item.posY === y + posY
          )
        ) {
          return true;
        }
      }
    }

    return false;
  }

  private generateTileWithPattern(pattern: FirstMovePattern): TileData[] {
    const types = this.assignRandomTypesToPattern(pattern);
    const tiles: TileData[] = [];

    for (let x = 0; x < pattern.sizeX; x++) {
      for (let y = 0; y < pattern.sizeY; y++) {
        let type: TileType | undefined = undefined;

        if (pattern.pattern[y][x] < 0) {
          type = this.getRandomTypeWithoutPatternTypes(types);
        } else {
          type = types[pattern.pattern[y][x]];
        }

        const newTile: TileData = {
          posX: x,
          posY: y,
          id: 0,
          type: type,
        };

        tiles.push(newTile);
      }
    }

    return tiles;
  }

  private getRandomTypeWithoutPatternTypes(types: Record<number, TileType>) {
    let newType: TileType = this.getRandomType();
    while (Object.values(types).find((item) => item.id === newType.id)) {
      newType = this.getRandomType();
    }

    return newType;
  }

  private assignRandomTypesToPattern(pattern: FirstMovePattern) {
    const types: Record<number, TileType> = {};

    for (const type of pattern.types) {
      types[type] = this.getRandomType();
    }

    return types;
  }

  private getRandomType() {
    return this._tileTypes[Math.floor(Math.random() * this._tileTypes.length)];
  }
}
