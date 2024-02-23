import { TilePosition } from "src/types";

export const calcPosition = (
  posX: number,
  posY: number,
  tileSize: number,
  gap: number
) => {
  const tilePosition: TilePosition = {
    x: posX * tileSize + Math.max(0, posX + 1) * gap,
    y: posY * tileSize + Math.max(0, posY + 1) * gap,
  };

  return tilePosition;
};
