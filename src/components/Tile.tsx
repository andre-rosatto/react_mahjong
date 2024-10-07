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

export default function Tile({x, y, layer, width, height, depth, code, id, status, tileset, onClick}: TileProps) {
  const style = {
    base: {
      left: `${x}px`,
      top: `${y - layer * depth}px`,
      width: `${width}px`,
      height: `${height + depth}px`,
			cursor: status === 'free' || status === 'selected' ? 'pointer' : 'default',
			boxShadow: status === 'selected' ? '0 0 10px white' : 'none'
    },
		bg: {
			aspectRatio: width / height
		},
    img: {
      backgroundImage: `url(${tileset})`,
      backgroundPosition: `${code % 6 * 100 / 5}% ${Math.floor(code / 6) * 100 / 5}%`,
			aspectRatio: width / (height + depth)
    },
		overlay: {
			backgroundColor: status === 'selected' ? 'rgba(255, 255, 255, .25)' : 'rgba(0, 0, 0, .6)'
		}
  };

  return (
    <div
      className={`absolute w-10 h-16 border border-black box-border rounded-md overflow-hidden`}
      style={style.base}
      onClick={() => {if (status === 'free' || status === 'selected') onClick(id)}}
    >
			{/* background */}
			<div className='absolute w-full bg-gradient-to-b from-orange-100 to-orange-200 shadow-tile-shadow' style={style.bg}></div>
      {/* image */}
      <div style={style.img} className='absolute w-full' />
			{/* overlay */}
			{(status === 'selected' || status === 'blocked') && <div className='absolute w-full h-full' style={style.overlay}></div>}
    </div>
  );
}
