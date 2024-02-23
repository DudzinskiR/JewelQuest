import { useEffect, useState } from "react";
import { BoardData, TileData, TileType } from "src/types";
import { checkPossibleSwap, checkShouldBeHighlighted } from "./helper";
import { Tile } from "src/components";
import { useTimers } from "src/hooks/timers";
import { BoardActionGenerator, BoardGenerator } from "src/helpers";

interface BoardProps {
  sizeY: number;
  sizeX: number;
  tileSize: number;
  tileTypes: TileType[];
  gap?: number;
  firstMove: number;
}

export const Board = ({
  sizeY,
  sizeX,
  tileSize,
  tileTypes,
  gap = 5,
  firstMove = 2,
}: BoardProps) => {
  const [board, setBoard] = useState<BoardData | undefined>(undefined);
  const [selectedTile, setSelectedTile] = useState<TileData>();
  const { newTimer } = useTimers();
  const [tilesToHide, setTilesToHide] = useState<TileData[]>([]);
  const [isLocked, setLocked] = useState(false);
  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    setBoard(new BoardGenerator(sizeX, sizeY, tileTypes).generate(firstMove));
    setTilesToHide([]);
    setSelectedTile(undefined);
  }, [firstMove, sizeX, sizeY, tileTypes]);

  const onTileClick = (tile: TileData) => {
    if (isLocked) return;

    if (!selectedTile) {
      setSelectedTile(tile);
      return;
    }

    if (selectedTile.posX === tile.posX && selectedTile.posY === tile.posY) {
      setSelectedTile(undefined);
      return;
    }

    if (checkPossibleSwap(selectedTile, tile)) {
      const actions = new BoardActionGenerator(board!, tileTypes)
        .swapTile(selectedTile, tile)
        .generateActions();

      setSelectedTile(undefined);
      setLocked(true);

      for (let i = 0; i < actions.length; i++) {
        newTimer(() => {
          const action = actions[i];
          if (action.type === "HIDE") {
            setTilesToHide(action.tiles);
          }

          if (action.type === "DONE") {
            setLocked(false);
          }

          if (action.type === "GAME_OVER") {
            setGameOver(true);
          }
          setBoard(actions[i].board);
        }, 500 * i);
      }

      return;
    }

    setSelectedTile(tile);
  };

  return (
    <div className="flex flex-col duration-150">
      {isGameOver && (
        <div className="mb-5">
          <div className="text-5xl w-full text-center mb-2">Game over</div>
          <div className="text-3xl w-full text-center">
            Refresh page to play again
          </div>
        </div>
      )}
      <div
        className="relative bg-black overflow-hidden"
        style={{
          height: `${sizeY * tileSize + (sizeY + 1) * gap}px`,
          width: `${sizeX * tileSize + (sizeX + 1) * gap}px`,
        }}
      >
        {board &&
          board.tiles.map((tile) => (
            <Tile
              key={tile.id}
              tileData={tile}
              onClick={() => onTileClick(tile)}
              boardSizeY={sizeY}
              gap={gap}
              tileSize={tileSize}
              isHighlighted={checkShouldBeHighlighted(selectedTile, tile)}
              isHide={!!tilesToHide.find((item) => item.id === tile.id)}
            />
          ))}
      </div>
    </div>
  );
};
