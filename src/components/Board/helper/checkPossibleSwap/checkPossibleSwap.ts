import { TileData } from "src/types";

export const checkPossibleSwap = (
  selectedTile: TileData | undefined,
  tileToSwap: TileData
) => {
  if (!selectedTile) return false;

  if (
    (Math.abs(tileToSwap.posX - selectedTile.posX) == 1 &&
      tileToSwap.posY === selectedTile.posY) ||
    (Math.abs(tileToSwap.posY - selectedTile.posY) == 1 &&
      tileToSwap.posX === selectedTile.posX)
  )
    return true;

  return false;
};
