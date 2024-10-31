import { CSSProperties } from "react";
import { TilePosition } from "../typings/types";
import { DEPTH, SIZE_Y } from "../App";

export type TileStatus = 'free' | 'selected' | 'blocked' | 'matched';

export interface TileProps {
	pos: TilePosition;
  code: number;
  id: number;
  status: TileStatus;
  tileset: string;
	sizeX: number;
  onClick: (id: number) => void;
}

/**
 * Tile component
 * @param pos Grid position of the tile as TilePosition;
 * @param code Number from 0 to 35 indexing a tile image;
 * @param id The tile's unique ID;
 * @param status The tile status as TileStatus;
 * @param tileset The URL of the spritesheet to be used for the tile image;
 * @param sizeX The total width of the board in grid units;
 * @param onClick Callback function called when the tile is clicked.
 * @returns 
 */
export default function Tile({pos, code, id, status, tileset, sizeX, onClick}: TileProps) {
  const style: {
		base: CSSProperties,
		overlay: CSSProperties
	} = {
    base: {
			position: 'absolute',
			overflow: 'hidden',
			transition: status === 'matched' ? 'transform .5s, opacity .5s .75s' : 'none',
			transform: `
				translate(${pos.x * 100}%, ${pos.y * (100 - DEPTH) - pos.layer * DEPTH}%)
				scale(${status === 'matched' ? '1.25' : '1'})
			`,
			transformOrigin: pos.x < sizeX / 2 ? 'top right' : 'top left',
      width: `calc(${100 / sizeX}% - 1.5px)`,
			aspectRatio: 80 / 115,
			cursor: status === 'free' || status === 'selected' ? 'pointer' : 'default',
			zIndex: (pos.y * 2 + pos.x * 2 + pos.layer * (sizeX * 2 + SIZE_Y * 2)) * 10,
			boxShadow: '0.5rem 0 2px rgba(0, 0, 0, .25)',
			opacity: status === 'matched' ? 0 : 1,
			pointerEvents: status === 'free' || status === 'selected' ? 'auto' : 'none',
			backgroundImage: `url(${tileset})`,
      backgroundPosition: `${code % 6 * 100 / 5}% ${Math.floor(code / 6) * 100 / 5}%`,
			backgroundSize: '600%'
    },
		overlay: {
			backgroundColor: status === 'selected' ? 'rgba(255, 0, 0, .1)' : 'rgba(0, 0, 0, .6)',
			position: 'absolute',
			width: '100%',
			height: '100%',
		}
  };

  return (
    <div
      style={style.base}
      onClick={() => {if (status === 'free' || status === 'selected') onClick(id)}}
    >
			{/* overlay */}
			{(status === 'selected' || status === 'blocked') && <div style={style.overlay}></div>}
    </div>
  );
}
