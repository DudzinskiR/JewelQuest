import { useEffect, useRef, useState } from "react";
import { TileData, TilePosition } from "src/types";
import { calcPosition, calcStartPosition } from "./helpers";
import { twMerge } from "tailwind-merge";

interface TileProps {
  tileData: TileData;
  boardSizeY: number;
  gap: number;
  tileSize: number;
  isHighlighted: boolean;
  isHide: boolean;
  onClick: () => void;
}

export const Tile = ({
  tileData,
  boardSizeY,
  gap,
  isHide,
  tileSize,
  isHighlighted,
  onClick,
}: TileProps) => {
  const [pos, setPos] = useState<TilePosition>(
    calcStartPosition(tileData.posX, tileSize, gap)
  );
  const firstRender = useRef(true);

  useEffect(() => {
    const newPos = calcPosition(tileData.posX, tileData.posY, tileSize, gap);
    let time = 0;

    if (firstRender.current) {
      time = (tileData.posX + 1) * (boardSizeY - tileData.posY + 1) * 20 + 500;
    }

    const timeout = setTimeout(() => {
      setPos(newPos);
      firstRender.current = false;
    }, time);

    return () => clearTimeout(timeout);
  }, [boardSizeY, gap, tileData.posX, tileData.posY, tileSize]);

  return (
    <>
      <div
        className="absolute w-full h-full bg-black pointer-events-none"
        style={{
          width: `${tileSize}px`,
          height: `${tileSize}px`,
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
      <img
        src={tileData.type.img}
        width={tileSize}
        height={tileSize}
        onClick={onClick}
        className={twMerge(
          "absolute hover:saturate-[1.5] duration-150 cursor-pointer select-none",
          isHighlighted ? "" : "opacity-50",
          isHide ? "scale-0" : ""
        )}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
};
