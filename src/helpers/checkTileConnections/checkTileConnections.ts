import { BoardData } from "src/types";

export const checkTileConnectionsValid = (
  board: BoardData,
  x: number,
  y: number,
  checkedTypeID: string,
  maxSameTileTypeInLine: number = 3
) => {
  const horizontalResult = checkHorizontalConnections(
    board,
    x,
    y,
    checkedTypeID,
    maxSameTileTypeInLine
  );

  const verticalResult = checkVerticalConnections(
    board,
    x,
    y,
    checkedTypeID,
    maxSameTileTypeInLine
  );

  return horizontalResult && verticalResult;
};

const checkHorizontalConnections = (
  board: BoardData,
  x: number,
  y: number,
  checkedTypeID: string,
  maxSameTileTypeInLine: number
) => {
  const startX = Math.max(0, x - maxSameTileTypeInLine);
  const endX = Math.min(board.sizeX - 1, x - 1);

  if (startX === endX) {
    return true;
  }
  let countX = 1;

  for (let i = startX; i <= endX; i++) {
    if (
      board.tiles.find((item) => item.posX === i && item.posY === y)?.type
        .id === checkedTypeID
    ) {
      countX++;
    }
  }
  if (countX >= maxSameTileTypeInLine) {
    return false;
  }

  return true;
};

const checkVerticalConnections = (
  board: BoardData,
  x: number,
  y: number,
  checkedTypeID: string,
  maxSameTileTypeInLine: number
) => {
  const startY = Math.max(0, y - maxSameTileTypeInLine);
  const endY = Math.min(board.sizeY - 1, y - 1);

  if (startY === endY) {
    return true;
  }
  let countX = 1;

  for (let i = startY; i <= endY; i++) {
    if (
      board.tiles.find((item) => item.posY === i && item.posX === x)?.type
        .id === checkedTypeID
    ) {
      countX++;
    }
  }
  if (countX >= maxSameTileTypeInLine) {
    return false;
  }

  return true;
};
