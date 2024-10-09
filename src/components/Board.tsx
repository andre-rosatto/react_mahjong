import { CSSProperties, useEffect, useRef, useState } from "react";
import { TileData, TilePosition } from "../typings/types";
import Tile, { TileStatus } from "./Tile";

export interface BoardProps {
	tileset: string;
	level: Array<TilePosition>;
}

export default function Board({tileset, level}: BoardProps) {
	const [tiles, setTiles] = useState<Array<TileData>>([]);
  const [selectedId, setSelectedId] = useState<null | number>(null);
	const board = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setTiles(level.map((pos, idx) => {
			return {
				gridX: pos.gridX,
				gridY: pos.gridY,
				layer: pos.layer,
				id: idx,
				code: 0,
				matched: false
			}
		}));
  }, [level]);

	useEffect(() => {
		const resize = () => {
			console.log('resize');
		}
		board.current?.addEventListener('resize', resize);
		return () => board.current?.removeEventListener('resize', resize);
	}, [board]);

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
		return true;
		// const WIDTH = board.current ? board.current.offsetWidth / 15 : window.screen.width / 15;
		// console.log(WIDTH);
		
		// const tileHeight = WIDTH * 1.25;
    // // check on top
    // if (tiles.some(t => t.layer - tile.layer >= 1 && Math.abs(t.x - tile.x) < WIDTH && Math.abs(t.y - tile.y) < tileHeight)) {
    //   return false;
    // }
    // // chech side
    // return !(
    //   tiles.some(t => t.layer === tile.layer && t.x < tile.x && tile.x - t.x <= WIDTH && Math.abs(t.y - tile.y) < tileHeight)
		// 	&& tiles.some(t => t.layer === tile.layer && t.x > tile.x && t.x - tile.x <= WIDTH && Math.abs(t.y - tile.y) < tileHeight)
		// );
  };

  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matched) return 'matched';
    if (tile.id === selectedId) return 'selected';
    return isTileFree(tile) ? 'free' : 'blocked';
  };

	const style: CSSProperties = {
		aspectRatio: '1',
		position: 'relative',
		maxWidth: '900px',
		margin: 'auto'
	}

	return (
		<div style={style} ref={board}>
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
	);
}