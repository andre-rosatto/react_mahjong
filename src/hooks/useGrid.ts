import { TilePosition } from "../typings/types";

interface IUseGrid {
	isPositionFree: (position: TilePosition, level: Array<TilePosition>) => boolean
}

export default function useGrid(): IUseGrid {
	const isPositionFree = ({x, y, layer}: TilePosition, level: Array<TilePosition>): boolean => {		
		// check on top
		if (level.some(t => t.layer - layer >= 1 && Math.abs(t.x - x) < 1 && Math.abs(t.y - y) < 1)) {
			return false;
		}
		// check sideways
		return !(
			level.some(t => t.layer === layer && t.x < x && x - t.x <= 1 && Math.abs(t.y - y) < 1)
			&& level.some(t => t.layer === layer && t.x > x && t.x - x <= 1 && Math.abs(t.y - y) < 1)
		);
  };

	return {isPositionFree}
}