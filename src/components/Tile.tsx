import { CSSProperties } from "react";

export type TileStatus = 'free' | 'selected' | 'blocked' | 'matched';

export interface TileProps {
  gridX: number;
  gridY: number;
  layer: number;
  code: number;
  id: number;
  status: TileStatus;
  tileset: string;
  onClick: (id: number) => void;
}

export default function Tile({gridX, gridY, layer, code, id, status, tileset, onClick}: TileProps) {
  const style: {
		base: CSSProperties,
		bg: CSSProperties,
		shadow: CSSProperties,
		img: CSSProperties,
		overlay: CSSProperties
	} = {
    base: {
			position: 'absolute',
			boxSizing: 'border-box',
			border: `1px solid ${status === 'selected' ? 'red' : 'black'}`,
			borderRadius: '8%',
			overflow: 'hidden',
      left: `${gridX * 100 / 15}%`,
      top: `${gridY * 1.25 * 100 / 15 - layer * 1.25 * 100 / 15 / 6}%`,
      width: `${100 / 15}%`,
			aspectRatio: 80 / 115,
			cursor: status === 'free' || status === 'selected' ? 'pointer' : 'default'
    },
		bg: {
			aspectRatio: 0.8,
			position: 'absolute',
			width: '100%',
			background: 'linear-gradient(#ffedd5, #fed7aa)'
		},
		shadow: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: '#be7e29'
		},
    img: {
      backgroundImage: `url(${tileset})`,
      backgroundPosition: `${code % 6 * 100 / 5}% ${Math.floor(code / 6) * 100 / 5}%`,
			aspectRatio: 80 / 115,
			backgroundSize: '600% 700%'
    },
		overlay: {
			backgroundColor: status === 'selected' ? 'rgba(255, 0, 0, .1)' : 'rgba(0, 0, 0, .6)',
			position: 'absolute',
			width: '100%',
			height: '100%'
		}
  };

  return (
    <div
      style={style.base}
      onClick={() => {if (status === 'free' || status === 'selected') onClick(id)}}
    >
			{/* shadow */}
			<div style={style.shadow}></div>
			{/* background */}
			<div style={style.bg}></div>
      {/* image */}
      <div style={style.img} className='absolute w-full' />
			{/* overlay */}
			{(status === 'selected' || status === 'blocked') && <div style={style.overlay}></div>}
    </div>
  );
}
