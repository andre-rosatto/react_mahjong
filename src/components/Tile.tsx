export enum TileStatus {
	blocked,
	free,
	matched
}

export interface TileProps {
	layer: number;
	gridX: number;
	gridY: number;
	code: number;
	id: number;
	status: TileStatus;
	selected: boolean;
	onClick: (id: number) => void;
}

export default function Tile({layer, gridX, gridY, code, id, status, onClick}: TileProps) {
	const getClasses = (): string => {
		switch (status) {
			case TileStatus.blocked:
				return 'bg-red-900 cursor-default';
			case TileStatus.free:
				return 'bg-red-600 cursor-pointer';
			default:
				return 'bg-red-600 cursor-default';
		}
	}

	const style = {
		left: `${2.5 * gridX}rem`,
		top: `${2 * gridY}rem`
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