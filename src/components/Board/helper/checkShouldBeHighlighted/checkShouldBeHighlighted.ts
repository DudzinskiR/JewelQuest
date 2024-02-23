import { TileData } from "src/types";
import { checkPossibleSwap } from "../";

export const checkShouldBeHighlighted = (
  selectedTile: TileData | undefined,
  tileToCheck: TileData
): boolean => {
  if (!selectedTile) return true;

  if (
    tileToCheck.posX === selectedTile.posX &&
    tileToCheck.posY === selectedTile.posY
  )
    return true;

  return checkPossibleSwap(selectedTile, tileToCheck);
};
