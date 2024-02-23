import { BoardData, TileData } from "src/types";
import { ConnectedTilesFinder, deepCopy } from "src/helpers";

export const checkGameOver = (board: BoardData) => {
  const newBoard = deepCopy(board);
  for (let x = 0; x < board.sizeX; x++) {
    for (let y = 0; y < board.sizeY; y++) {
      const tile = newBoard.tiles.find(
        (item) => item.posX === x && item.posY === y
      );
      if (!tile) {
        continue;
      }

      if (checkHorizontal(board, tile) > 0 || checkVertical(board, tile) > 0) {
        return false;
      }
    }
  }

  return true;
};

const checkHorizontal = (board: BoardData, tile: TileData) => {
  const tileB = board.tiles.find(
    (item) => item.posX === tile.posX + 1 && item.posY === tile.posY
  );

  if (!tileB) return 0;

  const boardWithSwapTileInX = swapTile(board, tile, tileB);

  const connectedTilesInX = new ConnectedTilesFinder(
    boardWithSwapTileInX
  ).getConnectedTiles();

  return connectedTilesInX.length;
};

const checkVertical = (board: BoardData, tile: TileData) => {
  const tileB = board.tiles.find(
    (item) => item.posX === tile.posX && item.posY === tile.posY + 1
  );

  if (!tileB) return 0;

  const boardWithSwapTileInY = swapTile(board, tile, tileB);

  const connectedTilesInY = new ConnectedTilesFinder(
    boardWithSwapTileInY
  ).getConnectedTiles();

  return connectedTilesInY.length;
};

const swapTile = (board: BoardData, tileA: TileData, tileB: TileData) => {
  const newBoard = deepCopy(board);

  const localTileA = newBoard.tiles.find(
    (item) => item.posX === tileA.posX && item.posY === tileA.posY
  );

  const localTileB = newBoard.tiles.find(
    (item) => item.posX === tileB.posX && item.posY === tileB.posY
  );

  if (!localTileA || !localTileB) {
    return newBoard;
  }

  localTileA.posX = tileB.posX;
  localTileA.posY = tileB.posY;

  localTileB.posX = tileA.posX;
  localTileB.posY = tileA.posY;

  return newBoard;
};
