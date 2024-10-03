import { useState } from "react";
import Tile, { TileProps, TileStatus } from "./components/Tile";

function App() {
	const [tiles, setTiles] = useState<Array<Omit<TileProps, 'onClick'>>>([
		{ layer: 0, gridX: 0, gridY: 0, code: 0, id: 0, selected: false, status: TileStatus.free},
		{ layer: 0, gridX: 0, gridY: 2, code: 0, id: 1, selected: false, status: TileStatus.free},
		{ layer: 0, gridX: 1, gridY: 1, code: 1, id: 2, selected: false, status: TileStatus.blocked},
		{ layer: 0, gridX: 2, gridY: 0, code: 1, id: 3, selected: false, status: TileStatus.free},
		{ layer: 0, gridX: 2, gridY: 2, code: 2, id: 4, selected: false, status: TileStatus.free},
	]);

	const handleTileClick = (id: number): void => {
	}

  return (
    <div>

			{/* board */}
			<div className="relative m-8">
				{tiles.map(tile =>
					<Tile
						key={tile.id}
						layer={tile.layer}
						gridX={tile.gridX}
						gridY={tile.gridY}
						code={tile.code}
						id={tile.id}
						status={tile.status}
						selected={tile.selected}
						onClick={handleTileClick}
					/>)}
			</div>
    </div>
  );
}

export default App;
