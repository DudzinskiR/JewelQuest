import { BoardData, TileData, TileType } from "src/types";
import { checkGameOver, checkTileConnectionsValid } from "src/helpers";
import { FirstMoveAdder } from "../FirstMoveAdder/FirstMoveAdder";

export class BoardGenerator {
  private _sizeX: number;
  private _sizeY: number;
  private _tileTypes: TileType[];

  constructor(sizeX: number, sizeY: number, tileTypes: TileType[]) {
    this._sizeX = sizeX;
    this._sizeY = sizeY;
    this._tileTypes = tileTypes;
  }

  public generate(firstMove: number) {
    const board = this.generateLossBoard();
    const boardWithFirstMoves = new FirstMoveAdder(
      board,
      this._tileTypes
    ).addFirstMovePatterns(firstMove);

    return boardWithFirstMoves;
  }

  private generateLossBoard() {
    let board: BoardData | undefined = undefined;
    let correctBoard = false;

    while (!correctBoard) {
      const { tiles, lastIndex } = this.initializeGrid();
      const newBoard: BoardData = {
        tiles: tiles,
        itemCount: lastIndex,
        sizeX: this._sizeX,
        sizeY: this._sizeY,
      };

      for (const item of tiles) {
        let randomType =
          this._tileTypes[Math.floor(Math.random() * this._tileTypes.length)];
        while (
          !checkTileConnectionsValid(
            newBoard,
            item.posX,
            item.posY,
            randomType.id,
            3
          )
        ) {
          randomType =
            this._tileTypes[Math.floor(Math.random() * this._tileTypes.length)];
        }

        item.type = randomType;
      }

      if (checkGameOver(newBoard)) {
        board = newBoard;
        correctBoard = true;
      }
    }

    return board!;
  }

  // private addFirstMovePatterns(board: BoardData, firstMoveNumber: number) {
  //   const newBoard = deepCopy(board);
  //   const changedTiles: TilePosition[] = [];

  //   const pattern =
  //     firstMovePatterns[Math.floor(Math.random() * firstMovePatterns.length)];

  //   const posX = Math.floor(Math.random() * newBoard.sizeX);
  //   const posY = Math.floor(Math.random() * newBoard.sizeY);

  //   if (
  //     posX + pattern.sizeX > board.sizeX ||
  //     posY + pattern.sizeY > board.sizeY
  //   ) {
  //     console.log(`Wyszło za daleko!!!`);
  //   }

  //   for (let x = 0; x < pattern.sizeX; x++) {
  //     for (let y = 0; y < pattern.sizeY; y++) {
  //       if (changedTiles.find((item) => item.x === x && item.y === y)) {
  //         console.log(`Zajęte!!!`);
  //       }
  //     }
  //   }

  //   return newBoard;
  // }

  private initializeGrid() {
    const tiles: TileData[] = [];
    let lastIndex: number = 0;

    for (let x = 0; x < this._sizeX; x++) {
      for (let y = 0; y < this._sizeY; y++) {
        tiles.push({
          posX: x,
          posY: y,
          id: lastIndex,
          type: { id: "-1", img: "" },
        });

        lastIndex++;
      }
    }

    return { tiles, lastIndex };
  }
}
