import { CSSProperties, useEffect, useState } from "react";
import { TileData, TilePosition } from "../typings/types";
import Tile, { TileStatus } from "./Tile";

export interface BoardProps {
	tileset: string;
	level: Array<TilePosition>;
}

export default function Board({tileset, level}: BoardProps) {
	const [tiles, setTiles] = useState<Array<TileData>>([]);
  const [selectedId, setSelectedId] = useState<null | number>(null);

	useEffect(() => {
		const newTiles = level.map((pos, idx) => {
			return {
				gridX: pos.gridX,
				gridY: pos.gridY,
				layer: pos.layer,
				id: idx,
				code: Math.floor(idx / 2) % 36,
				matched: false
			}
		});
		setTiles(newTiles);
  }, [level]);

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
		if (tiles.filter(t => !t.matched).some(t => t.layer - tile.layer >= 1 && Math.abs(t.gridX - tile.gridX) < 1 && Math.abs(t.gridY - tile.gridY) < 1)) {
			return false;
		}
		// check sideways
		return !(
			tiles.filter(t => !t.matched).some(t => t.layer === tile.layer && t.gridX < tile.gridX && tile.gridX - t.gridX <= 1 && Math.abs(t.gridY - tile.gridY) < 1)
			&& tiles.filter(t => !t.matched).some(t => t.layer === tile.layer && t.gridX > tile.gridX && t.gridX - tile.gridX <= 1 && Math.abs(t.gridY - tile.gridY) < 1)
		);
  };

  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matched) return 'matched';
    if (tile.id === selectedId) return 'selected';
    return isTileFree(tile) ? 'free' : 'blocked';
  };

	const getPairCount = (): number => {
		const freeTiles = tiles.filter(tile => !tile.matched && isTileFree(tile));
		let result = 0;
		freeTiles.forEach(tile => {
			if (freeTiles.some(t => t !== tile && t.code === tile.code)) {
				result++;
			}
		});
		return Math.floor(result / 2);
	}

	const style: CSSProperties = {
		aspectRatio: 1200 / 815,
		position: 'relative',
		maxWidth: '900px',
		margin: 'auto'
	}

	return (
		<>
		<div style={style}>
			{tiles.map(tile => (
				<Tile
					key={tile.id}
					gridX={tile.gridX}
					gridY={tile.gridY}
					layer={tile.layer}
					code={tile.code}
					id={tile.id}
					status={getTileStatus(tile)}
					tileset={tileset}
					onClick={handleTileClick}
				/>
			))}
		</div>
		<p className="text-white">free pairs: {getPairCount()}</p>
		</>
	);
}