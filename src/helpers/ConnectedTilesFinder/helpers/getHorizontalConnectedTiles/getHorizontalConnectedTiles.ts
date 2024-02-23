import { BoardData, TileData, TilePosition } from "src/types";

export const getHorizontalConnectedTiles = (board: BoardData) => {
  const connectedTiles: TileData[] = [];

  for (let y = 0; y < board.sizeY; y++) {
    let lastType = "-1";
    let counter = 0;

    for (let x = 0; x < board.sizeX; x++) {
      const tile = board.tiles.find(
        (item) => item.posX === x && item.posY === y
      )!;
      if (lastType !== tile.type.id) {
        if (counter >= 3) {
          connectedTiles.push(...getTilesInRange(board, { x, y }, counter));
        }
        lastType = tile.type.id;
        counter = 1;
      } else {
        counter++;
      }
    }

    if (counter >= 3) {
      connectedTiles.push(
        ...getTilesInRange(board, { x: board.sizeX, y }, counter)
      );
    }
  }
  return connectedTiles;
};

const getTilesInRange = (
  board: BoardData,
  lastTile: TilePosition,
  range: number
) => {
  const connectedTiles: TileData[] = [];
  for (let i = range; i !== 0; i--) {
    connectedTiles.push(
      board.tiles.find(
        (item) => item.posX === lastTile.x - i && item.posY === lastTile.y
      )!
    );
  }

  return connectedTiles;
};
