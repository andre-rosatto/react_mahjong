import { CSSProperties, useState } from "react";
import { TileData, TilePosition } from "../typings/types";
import Tile, { TileStatus } from "./Tile";
import useGrid from "../hooks/useGrid";
import useRandom from "../hooks/useRandom";

export interface BoardProps {
	tileset: string;
	level: Array<TilePosition>;
	seed: number;
}

export default function Board({tileset, level, seed}: BoardProps) {
	const {getRandom} = useRandom(seed);
  const [selectedId, setSelectedId] = useState<null | number>(null);
	const {isPositionFree} = useGrid();
	const [tiles] = useState<Array<TileData>>(getTiles());

	function getTiles(): Array<TileData> {
		const tempCodes: number[] = Array.from({length: Math.floor(level.length / 2)}, (_, idx) => idx % 36);
		const codes: number[] = [];
		do {
			codes.push(tempCodes.splice(Math.floor(getRandom() * tempCodes.length), 1)[0]);
		} while (tempCodes.length > 0);
		
		const newTiles = level.map((pos, idx) => {
			return {
				pos: {
					x: pos.x,
					y: pos.y,
					layer: pos.layer,
				},
				id: idx,
				code: codes[Math.floor(idx / 2)],
				matched: false
			}
		});
		return newTiles;
	}

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

  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matched) return 'matched';
    if (tile.id === selectedId) return 'selected';
		return isPositionFree(tile.pos, tiles.filter(t => !t.matched).map(t => t.pos)) ? 'free' : 'blocked';
  };

	const getPairCount = (): number => {
		const freeTiles = tiles.filter(tile => !tile.matched && isPositionFree(tile.pos, tiles.filter(t => !t.matched).map(t => t.pos)));
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
					pos={tile.pos}
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