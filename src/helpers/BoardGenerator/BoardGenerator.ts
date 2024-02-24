import { BoardData, TileData, TileType } from "src/types";
import {
  ConnectedTilesFinder,
  FirstMoveAdder,
  checkTileConnectionsValid,
  deepCopy,
} from "src/helpers";

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
    let connectedTiles: TileData[] = [];
    let board: BoardData | undefined = undefined;

    while (!board || connectedTiles.length > 0) {
      const newBoard: BoardData = {
        tiles: [],
        itemCount: 0,
        sizeX: this._sizeX,
        sizeY: this._sizeY,
      };

      const boardWithFirstMoves = new FirstMoveAdder(
        newBoard,
        this._tileTypes
      ).addFirstMovePatterns(firstMove);

      const filledBoard = this.fillBoardWithRandomTiles(boardWithFirstMoves);
      connectedTiles = new ConnectedTilesFinder(
        filledBoard
      ).getConnectedTiles();

      board = filledBoard;
    }

    return board;
  }

  private fillBoardWithRandomTiles(board: BoardData) {
    const newBoard = deepCopy(board);

    for (let x = 0; x < newBoard.sizeX; x++) {
      for (let y = 0; y < newBoard.sizeY; y++) {
        const tile = newBoard.tiles.find(
          (item) => item.posX === x && item.posY === y
        );

        if (tile) continue;

        let randomType = this.getRandomType();

        while (!checkTileConnectionsValid(newBoard, x, y, randomType.id)) {
          randomType = this.getRandomType();
        }

        newBoard.tiles.push({
          posX: x,
          posY: y,
          id: board.itemCount,
          type: randomType,
        });
        board.itemCount++;
      }
    }

    return newBoard;
  }

  private getRandomType() {
    return this._tileTypes[Math.floor(Math.random() * this._tileTypes.length)];
  }
}
