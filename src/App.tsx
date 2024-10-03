import { useState } from "react";
import Tile, { TileStatus } from "./components/Tile";
import { TileData } from "./typings/types.d";

const GRID_SIZE_X = 75;
const GRID_SIZE_Y = 50;

function App() {
	const [tiles, setTiles] = useState<Array<TileData>>([
		{ layer: 0, gridX: 0, gridY: 0, code: 0},
		{ layer: 0, gridX: 0, gridY: 2, code: 0},
		{ layer: 0, gridX: 1, gridY: 1, code: 1},
		{ layer: 0, gridX: 2, gridY: 0, code: 1},
		{ layer: 0, gridX: 2, gridY: 2, code: 2},
	]);

	const handleTileClick = (id: number): void => {
	}

  return (
    <div>

			{/* board */}
			<div className="relative m-8">
				{tiles.map((tile, idx) =>
					<Tile
						key={idx}
						x={tile.gridX * GRID_SIZE_X}
						y={tile.gridY * GRID_SIZE_Y}
						width={GRID_SIZE_X}
						height={GRID_SIZE_Y * 2}
						code={tile.code}
						id={idx}
						status={TileStatus.free}
						selected={false}
						onClick={handleTileClick}
					/>)}
			</div>
    </div>
  );
}

export default App;
