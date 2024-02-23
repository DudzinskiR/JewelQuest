import { TileData } from "src/types";

export type BoardActionHide = {
  type: "HIDE";
  tiles: TileData[];
};
