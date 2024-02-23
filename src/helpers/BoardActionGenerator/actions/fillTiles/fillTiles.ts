import { deepCopy } from "src/helpers";
import { BoardAction, BoardData, TileType } from "src/types";

export const fillTiles = (
  board: BoardData,
  tileTypes: TileType[]
): BoardAction => {
  const newBoard = deepCopy(board);
  for (let x = 0; x < newBoard.sizeX; x++) {
    for (let y = 0; y < newBoard.sizeY; y++) {
      const isTileExist = !!newBoard.tiles.find(
        (item) => item.posX === x && item.posY === y
      );

      if (!isTileExist) {
        newBoard.tiles.push({
          posX: x,
          posY: y,
          id: newBoard.itemCount + 1,
          type: tileTypes[Math.floor(Math.random() * tileTypes.length)],
        });

        newBoard.itemCount++;
      }
    }
  }

  return { type: "ADD", board: newBoard };
};
