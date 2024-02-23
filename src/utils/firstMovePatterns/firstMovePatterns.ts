import { FirstMovePattern } from "src/types";

export const firstMovePatterns: FirstMovePattern[] = [
  {
    sizeX: 2,
    sizeY: 3,
    types: [1, 2],
    pattern: [
      [2, 1],
      [1, 2],
      [1, 2],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1, 2],
    pattern: [
      [2, 1],
      [2, 1],
      [1, 2],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1, 2],
    pattern: [
      [2, 1],
      [1, 2],
      [2, 1],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1],
    pattern: [
      [-1, 1],
      [1, -1],
      [1, -1],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1],
    pattern: [
      [1, -1],
      [1, -1],
      [-1, 1],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1],
    pattern: [
      [-1, 1],
      [1, -1],
      [-1, 1],
    ],
  },
  {
    sizeX: 2,
    sizeY: 3,
    types: [1],
    pattern: [
      [1, -1],
      [-1, 1],
      [1, -1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1, 2],
    pattern: [
      [2, 1, 1],
      [1, 2, 2],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1, 2],
    pattern: [
      [1, 2, 1],
      [2, 1, 2],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [-1, 1, -1],
      [1, -1, 1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [-1, 1, -1],
      [1, -1, 1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [1, -1, -1],
      [-1, 1, 1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [-1, 1, 1],
      [1, -1, -1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [1, 1, -1],
      [-1, -1, 1],
    ],
  },
  {
    sizeX: 3,
    sizeY: 2,
    types: [1],
    pattern: [
      [-1, -1, 1],
      [1, 1, -1],
    ],
  },
  {
    sizeX: 4,
    sizeY: 1,
    types: [1],
    pattern: [[1, -1, 1, 1]],
  },
  {
    sizeX: 4,
    sizeY: 1,
    types: [1],
    pattern: [[1, 1, -1, 1]],
  },
  {
    sizeX: 1,
    sizeY: 4,
    types: [1],
    pattern: [[1], [-1], [1], [1]],
  },
  {
    sizeX: 1,
    sizeY: 4,
    types: [1],
    pattern: [[1], [1], [-1], [1]],
  },
];
