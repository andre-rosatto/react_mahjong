import { useEffect, useState } from "react";
import Tile from "./components/Tile";
import { TileData } from "./typings/types.d";

const TILE_WIDTH = 80;
const TILE_HEIGHT = 100;

const level = [
	{ gridX: 0, gridY: 0, layer: 0 },
	{ gridX: 0, gridY: 1, layer: 0 },
	{ gridX: 1, gridY: 0.5, layer: 0 },
	{ gridX: 2, gridY: 0, layer: 0 },
	{ gridX: 2, gridY: 1, layer: 0 },
	{ gridX: 3, gridY: 2, layer: 0 },
	{ gridX: 1, gridY: 2, layer: 0 },
	{ gridX: 0, gridY: 0.5, layer: 1 },
	{ gridX: 0, gridY: 3, layer: 1 },
	{ gridX: 3, gridY: 0.5, layer: 0 },
]

function App() {
	const [tiles, setTiles] = useState<Array<TileData>>([]);

	useEffect(() => {
		const newTiles: Array<TileData> = [];
		level.forEach(item => {
			newTiles.push({
				x: item.gridX * TILE_WIDTH,
				y: item.gridY * TILE_HEIGHT,
				layer: item.layer,
				code: 0
			});
		});
		setTiles(newTiles);
	}, []);

	const handleTileClick = (id: number): void => {
		//
	}

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
	}

  return (
    <div>

			{/* board */}
			<div className="relative m-8">
				{tiles.map((tile, idx) =>
					<Tile
						key={idx}
						x={tile.x}
						y={tile.y}
						layer={tile.layer}
						width={TILE_WIDTH}
						height={TILE_HEIGHT}
						code={tile.code}
						id={idx}
						free={isTileFree(tile)}
						selected={false}
						onClick={handleTileClick}
					/>)}
			</div>
    </div>
  );
}

export default App;
