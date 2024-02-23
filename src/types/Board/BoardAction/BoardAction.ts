import { BoardData } from "src/types";
import {
  BoardActionAdd,
  BoardActionDone,
  BoardActionFall,
  BoardActionGameOver,
  BoardActionHide,
  BoardActionNothing,
  BoardActionSwap,
} from "./actions";

export type BoardAction = { board: BoardData } & (
  | BoardActionSwap
  | BoardActionAdd
  | BoardActionHide
  | BoardActionNothing
  | BoardActionFall
  | BoardActionDone
  | BoardActionGameOver
);
