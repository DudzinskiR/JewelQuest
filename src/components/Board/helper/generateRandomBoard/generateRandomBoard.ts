import { BoardData, TileData, TilePosition, TileType } from "src/types";
import { checkTileConnectionsValid } from "../checkTileConnections";
import { checkGameOver, deepCopy } from "src/helpers";
import { firstMovePatterns } from "src/utils";

export const generateRandomBoard = (
  sizeX: number,
  sizeY: number,
  tileTypes: TileType[]
) => {
  const board = generateLossBoard(sizeX, sizeY, tileTypes);
  addFirstMovePatterns(board, tileTypes, 3);
  return board;
};

const generateLossBoard = (
  sizeX: number,
  sizeY: number,
  tileTypes: TileType[]
) => {
  let board: BoardData | undefined = undefined;
  let correctBoard = false;

  while (!correctBoard) {
    const { tiles, lastIndex } = initializeGrid(sizeX, sizeY);
    const newBoard: BoardData = {
      tiles: tiles,
      itemCount: lastIndex,
      sizeX: sizeX,
      sizeY: sizeY,
    };

    for (const item of tiles) {
      let randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
      while (
        !checkTileConnectionsValid(
          newBoard,
          item.posX,
          item.posY,
          randomType.id,
          3
        )
      ) {
        randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
      }

      item.type = randomType;
    }

    if (checkGameOver(newBoard)) {
      board = newBoard;
      correctBoard = true;
    }
  }

  return board!;
};

const addFirstMovePatterns = (
  board: BoardData,
  tileTypes: TileType[],
  numberFirstMoves: number
) => {
  const newBoard = deepCopy(board);
  const changedTiles: TilePosition[] = [];

  const pattern =
    firstMovePatterns[Math.floor(Math.random() * firstMovePatterns.length)];

  const posX = Math.floor(Math.random() * newBoard.sizeX);
  const posY = Math.floor(Math.random() * newBoard.sizeY);

  if (
    posX + pattern.sizeX > board.sizeX ||
    posY + pattern.sizeY > board.sizeY
  ) {
    console.log(`Wyszło za daleko!!!`);
  }

  for (let x = 0; x < pattern.sizeX; x++) {
    for (let y = 0; y < pattern.sizeY; y++) {
      if (changedTiles.find((item) => item.x === x && item.y === y)) {
        console.log(`Zajęte!!!`);
      }
    }
  }
};

const initializeGrid = (sizeX: number, sizeY: number) => {
  const tiles: TileData[] = [];
  let lastIndex: number = 0;

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      tiles.push({
        posX: x,
        posY: y,
        id: lastIndex,
        type: { id: "-1", img: "" },
      });

      lastIndex++;
    }
  }

  return { tiles, lastIndex };
};
