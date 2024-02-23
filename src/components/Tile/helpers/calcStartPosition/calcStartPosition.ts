import { TilePosition } from "src/types";

export const calcStartPosition = (
  posX: number,
  tileSize: number,
  gap: number
) => {
  const tilePosition: TilePosition = {
    x: posX * tileSize + Math.max(0, posX + 1) * gap,
    y: -tileSize * 1.2,
  };

  return tilePosition;
};
