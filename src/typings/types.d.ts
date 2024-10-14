export interface TilePosition {
	x: number;
	y: number;
	layer: number;
}

export interface TileData {
	pos: TilePosition;
	id: number;
	code: number;
	matchIdx: number;
}