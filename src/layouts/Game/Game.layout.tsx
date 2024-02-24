import { Board } from "src/components";
import { getTilesTypes } from "src/helpers";

export const GameLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Board
        sizeY={7}
        sizeX={7}
        tileSize={100}
        tileTypes={getTilesTypes(12)}
        firstMove={3}
      />
    </div>
  );
};
