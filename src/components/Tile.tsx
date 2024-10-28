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

export default function Tile({pos, code, id, status, tileset, sizeX, onClick}: TileProps) {
  const style: {
		base: CSSProperties,
		bg: CSSProperties,
		img: CSSProperties,
		overlay: CSSProperties
	} = {
    base: {
			position: 'absolute',
			boxSizing: 'border-box',
			border: `1px solid ${status === 'selected' ? 'red' : 'black'}`,
			borderRadius: '8%',
			overflow: 'hidden',
			transition: status === 'matched' ? 'transform .5s, opacity .5s .75s' : 'none',
			transform: `
				translate(${pos.x * 100}%, ${pos.y * (100 - DEPTH) - pos.layer * DEPTH}%)
				scale(${status === 'matched' ? '1.25' : '1'})
			`,
			transformOrigin: pos.x < sizeX / 2 ? 'top right' : 'top left',
      width: `${100 / sizeX}%`,
			aspectRatio: 80 / (100 + DEPTH),
			cursor: status === 'free' || status === 'selected' ? 'pointer' : 'default',
			zIndex: (pos.y * 2 + pos.x * 2 + pos.layer * (sizeX * 2 + SIZE_Y * 2)) * 10,
			boxShadow: '0.5rem 0 2px rgba(0, 0, 0, .25)',
			opacity: status === 'matched' ? 0 : 1,
			pointerEvents: status === 'free' || status === 'selected' ? 'auto' : 'none',
    },
		bg: {
			aspectRatio: 0.8,
			position: 'absolute',
			width: '100%',
			background: 'linear-gradient(#ffedd5, #fed7aa)',
			borderRadius: '8%',
			boxShadow: `0 ${DEPTH}px 0 #be7e29`
		},
    img: {
      backgroundImage: `url(${tileset})`,
      backgroundPosition: `${code % 6 * 100 / 5}% ${Math.floor(code / 6) * 100 / 5}%`,
			aspectRatio: 80 / 115,
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
			{/* background */}
			<div style={style.bg}></div>

      {/* image */}
      <div style={style.img} className='absolute w-full' />

			{/* overlay */}
			{(status === 'selected' || status === 'blocked') && <div style={style.overlay}></div>}
    </div>
  );
}
