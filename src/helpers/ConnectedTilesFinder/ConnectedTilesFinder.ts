import { BoardData, TileData } from "src/types";
import { deepCopy } from "src/helpers";
import {
  getHorizontalConnectedTiles,
  getVerticalConnectedTiles,
} from "./helpers";

export class ConnectedTilesFinder {
  private _board: BoardData;
  private _connectedTiles: TileData[] = [];

  constructor(board: BoardData) {
    this._board = deepCopy(board);
  }

  public getConnectedTiles() {
    const horizontalTiles = getHorizontalConnectedTiles(this._board);
    const verticalTiles = getVerticalConnectedTiles(this._board);

    this._connectedTiles.push(...horizontalTiles);

    for (const tile of verticalTiles) {
      const duplicateTile = this._connectedTiles.find(
        (item) => item.posX === tile.posX && item.posY === tile.posY
      );

      if (!duplicateTile) {
        this._connectedTiles.push(tile);
      }
    }

    return deepCopy(this._connectedTiles);
  }
}
