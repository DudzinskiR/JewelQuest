import { allTiles } from "src/assets/tile";
import { TileType } from "src/types";

export const getTilesTypes = (count?: number) => {
  if (!count) count = allTiles.length;

  if (count >= allTiles.length) {
    return allTiles.map<TileType>((item, index) => ({
      id: index.toString(),
      img: item,
    }));
  }

  const shuffled = allTiles.slice();
  let currentIndex = shuffled.length;
  const selected: TileType[] = [];
  while (currentIndex > 0 && selected.length < count) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const temp = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;

    selected.push({ id: `${currentIndex}`, img: shuffled[currentIndex] });
  }

  return selected;
};
