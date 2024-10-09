import { useEffect, useState } from 'react';
import Tile, { TileStatus } from './components/Tile';
import { TileData } from './typings/types.d';
import tileset from './assets/tiles.webp';
import useRandom from './hooks/useRandom';

const TILE_WIDTH = 80;
const TILE_HEIGHT = 100;
const TILE_DEPTH = 15;

const level = [
  { gridX: 0, gridY: 0, layer: 0 },
  { gridX: 0, gridY: 1, layer: 0 },
  { gridX: 1, gridY: 0.5, layer: 0 },
  { gridX: 2, gridY: 0, layer: 0 },
  { gridX: 2, gridY: 1, layer: 0 },
  { gridX: 3, gridY: 2, layer: 0 },
  { gridX: 1, gridY: 2, layer: 0 },
  { gridX: 0, gridY: 0.5, layer: 1 },
  { gridX: 0, gridY: 3, layer: 0 },
  { gridX: 3, gridY: 0.5, layer: 0 },
];
function App() {
  const [tiles, setTiles] = useState<Array<TileData>>([]);
  const [selectedId, setSelectedId] = useState<null | number>(null);
	const {setSeed, getRandom} = useRandom(new Date().getDate() + new Date().getMonth() / 100 + new Date().getFullYear() / 1000000);

  useEffect(() => {
    const newTiles: Array<TileData> = [];
    level.forEach((item, idx) => {
      newTiles.push({
        x: item.gridX * TILE_WIDTH,
        y: item.gridY * TILE_HEIGHT,
        layer: item.layer,
        id: idx,
        code: 24,
        matched: false,
      });
    });
    setTiles(newTiles);
  }, []);

  const handleTileClick = (id: number): void => {
    if (id === selectedId) {
      // deselect current tile
      setSelectedId(null);
    } else {
      if (selectedId) {
        // check match
        const selectedTiles = tiles.filter(t => t.id === id || t.id === selectedId);
        if (selectedTiles.length === 2 && selectedTiles[0].code === selectedTiles[1].code) {
          // tiles match
          selectedTiles[0].matched = true;
          selectedTiles[1].matched = true;
          setSelectedId(null);
        } else {
          // tiles don't match
          setSelectedId(id);
        }
      } else {
        // select first tile
        setSelectedId(id);
      }
    }
  };

  const isTileFree = (tile: TileData): boolean => {
    // check on top
    if (tiles.some(t => t.layer - tile.layer >= 1 && Math.abs(t.x - tile.x) < TILE_WIDTH && Math.abs(t.y - tile.y) < TILE_HEIGHT)) {
      return false;
    }
    // chech side
    return !(
      tiles.some(t => t.layer === tile.layer && t.x < tile.x && tile.x - t.x <= TILE_WIDTH && Math.abs(t.y - tile.y) < TILE_HEIGHT)
			&& tiles.some(t => t.layer === tile.layer && t.x > tile.x && t.x - tile.x <= TILE_WIDTH && Math.abs(t.y - tile.y) < TILE_HEIGHT)
		);
  };

  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matched) return 'matched';
    if (tile.id === selectedId) return 'selected';
    return isTileFree(tile) ? 'free' : 'blocked';
  };

  return (
    <div>
      {/* board */}
      <div className='relative m-8'>
        {tiles.map(tile => (
          <Tile
            key={tile.id}
            x={tile.x}
            y={tile.y}
            layer={tile.layer}
            width={TILE_WIDTH}
            height={TILE_HEIGHT}
						depth={TILE_DEPTH}
            code={tile.code}
            id={tile.id}
            status={getTileStatus(tile)}
            tileset={tileset}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
