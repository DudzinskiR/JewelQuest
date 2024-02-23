import { BoardAction, BoardData, TileData, TileType } from "src/types";
import { ConnectedTilesFinder, checkGameOver, deepCopy } from "src/helpers";
import { fallTiles, fillTiles, swapTiles } from "./actions";

export class BoardActionGenerator {
  private _board: BoardData;
  private _tileTypes: TileType[];
  private _actions: BoardAction[] = [];

  constructor(board: BoardData, tileTypes: TileType[]) {
    this._tileTypes = deepCopy(tileTypes);
    this._board = deepCopy(board);
  }

  public get board() {
    return deepCopy(this._board);
  }

  public swapTile(tileA: TileData, tileB: TileData) {
    const swapAction = swapTiles(this._board, tileA, tileB);
    this._actions.push(swapAction);
    this._board = swapAction.board;

    const tilesToRemove = new ConnectedTilesFinder(
      this._board
    ).getConnectedTiles();

    if (tilesToRemove.length === 0) {
      const undoSwapAction = swapTiles(swapAction.board, tileA, tileB);
      this._actions.push(undoSwapAction);
      this._board = swapAction.board;
    }

    return this;
  }

  public generateActions() {
    let tilesToRemove = new ConnectedTilesFinder(
      this._board
    ).getConnectedTiles();

    while (tilesToRemove.length > 0) {
      //Hide tiles
      this._actions.push({
        type: "HIDE",
        board: deepCopy(this._board),
        tiles: tilesToRemove,
      });

      //Move tiles
      this._board = this.removeTiles(tilesToRemove);
      const fallAction = fallTiles(this._board);
      this._actions.push(fallAction);
      this._board = fallAction.board;

      //Add new tiles
      const fillAction = fillTiles(this._board, this._tileTypes);
      this._board = fillAction.board;
      this._actions.push(fillAction);

      tilesToRemove = new ConnectedTilesFinder(this._board).getConnectedTiles();
    }

    if (checkGameOver(this._board)) {
      this._actions.push({ type: "GAME_OVER", board: this._board });
    } else {
      this._actions.push({ type: "DONE", board: this._board });
    }

    return this._actions;
  }

  private removeTiles(tilesToRemove: TileData[]) {
    const newBoard = deepCopy(this._board);
    for (const tile of tilesToRemove) {
      newBoard.tiles = newBoard.tiles.filter(
        (item) => !(item.posX === tile.posX && item.posY === tile.posY)
      );
    }
    return newBoard;
  }
}
