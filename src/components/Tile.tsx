import '../css/Tile.css';

export type TileStatus = 'free' | 'selected' | 'blocked' | 'matched';

export interface TileProps {
  x: number;
  y: number;
  layer: number;
  width: number;
  height: number;
  code: number;
  id: number;
  status: TileStatus;
  onClick: (id: number) => void;
}

export default function Tile({
  x,
  y,
  layer,
  width,
  height,
  code,
  id,
  status,
  onClick,
}: TileProps) {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      className={`Tile absolute w-10 h-16 border border-black box-border rounded-md ${status}`}
      style={style}
      onClick={() => onClick(id)}
    ></div>
  );
}
