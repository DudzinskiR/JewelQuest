import { Board } from "src/components";
import { getTilesTypes } from "src/helpers";

export const GameLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Board
        sizeY={6}
        sizeX={6}
        tileSize={100}
        tileTypes={getTilesTypes(8)}
        firstMove={2}
      />
    </div>
  );
};
