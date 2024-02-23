import { deepCopy } from "src/helpers";
import { BoardAction, BoardData, TileData } from "src/types";

export const swapTiles = (
  board: BoardData,
  tileA: TileData,
  tileB: TileData
): BoardAction => {
  const newBoard = deepCopy(board);

  const localTileA = newBoard.tiles.find(
    (item) => item.posX === tileA.posX && item.posY === tileA.posY
  );

  const localTileB = newBoard.tiles.find(
    (item) => item.posX === tileB.posX && item.posY === tileB.posY
  );

  if (!localTileA || !localTileB) {
    return { board: newBoard, type: "NOTHING" };
  }

  localTileA.posX = tileB.posX;
  localTileA.posY = tileB.posY;

  localTileB.posX = tileA.posX;
  localTileB.posY = tileA.posY;

  return { board: newBoard, type: "SWAP" };
};
