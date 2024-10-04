export interface TileProps {
	x: number;
	y: number;
	layer: number;
	width: number;
	height: number;
	code: number;
	id: number;
	free: boolean;
	selected: boolean;
	onClick: (id: number) => void;
}

export default function Tile({x, y, layer, width, height, code, id, free, onClick}: TileProps) {
	const getClasses = (): string => {
		if (free) {
			return 'bg-red-600 cursor-pointer';
		} else {
			return 'bg-red-900 cursor-default';
		}
	}

	const style = {
		left: `${x}px`,
		top: `${y}px`,
		width: `${width}px`,
		height: `${height}px`
	}

	return (
		<div
			className={`absolute w-10 h-16 border border-black box-border rounded-md ${getClasses()}`}
			style={style}
			onClick={() => onClick(id)}
		>

		</div>
	)
}