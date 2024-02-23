import { deepCopy } from "src/helpers";
import { BoardAction, BoardData } from "src/types";

export const fallTiles = (board: BoardData): BoardAction => {
  const newBoard = deepCopy(board);
  for (let x = 0; x < newBoard.sizeX; x++) {
    for (let y = newBoard.sizeY - 2; y >= 0; y--) {
      const tile = newBoard.tiles.find(
        (item) => item.posX === x && item.posY === y
      );

      if (!tile) continue;
      let tileLower = newBoard.tiles.find(
        (item) => item.posX === tile.posX && item.posY === tile.posY + 1
      );

      while (!tileLower && tile.posY < board.sizeY) {
        tile.posY++;
        tileLower = newBoard.tiles.find(
          (item) => item.posX === tile.posX && item.posY === tile.posY + 1
        );
      }
    }
  }
  return { type: "FALL", board: newBoard };
};
