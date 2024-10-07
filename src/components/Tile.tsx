import '../css/Tile.css';

export type TileStatus = 'free' | 'selected' | 'blocked' | 'matched';

export interface TileProps {
  x: number;
  y: number;
  layer: number;
  width: number;
  height: number;
	depth: number;
  code: number;
  id: number;
  status: TileStatus;
  tileset: string;
  onClick: (id: number) => void;
}

export default function Tile({
  x,
  y,
  layer,
  width,
  height,
	depth,
  code,
  id,
  status,
  tileset,
  onClick,
}: TileProps) {
  const style = {
    base: {
      left: `${x}px`,
      top: `${y - layer * depth}px`,
      width: `${width}px`,
      height: `${height + depth}px`,
    },
		bg: {
			aspectRatio: width / height
		},
    img: {
      backgroundImage: `url(${tileset})`,
      backgroundPosition: `${code % 6 * 100 / 5}% ${Math.floor(code / 6) * 100 / 5}%`,
			aspectRatio: width / (height + depth)
    },
  };

  return (
    <div
      className={`Tile absolute w-10 h-16 border border-black box-border rounded-md overflow-hidden bg-white ${status}`}
      style={style.base}
      onClick={() => onClick(id)}
    >
			{/* background */}
			<div
				className='absolute w-full background'
				style={style.bg}
			></div>
      {/* image */}
      <div style={style.img} className='absolute w-full' />
			<div className='absolute w-full h-full opacity-50 overlay'></div>
    </div>
  );
}
