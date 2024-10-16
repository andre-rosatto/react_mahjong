import { CSSProperties, useState } from "react";
import { TileData, TilePosition } from "../typings/types";
import Tile, { TileStatus } from "./Tile";
import useGrid from "../hooks/useGrid";
import useRandom from "../hooks/useRandom";
import Infobar from "./Infobar";
import { Modal } from "./Modal";

export interface BoardProps {
	tileset: string;
	level: Array<TilePosition>;
	seed: number;
	onGameEnd: (status: 'win' | 'lose') => void;
	onRestart: () => void;
}

type Modal = null | 'confirm' | 'help';

export default function Game({tileset, level, seed, onGameEnd, onRestart}: BoardProps) {
	const {setSeed, getRandom} = useRandom(seed);
  const [selectedId, setSelectedId] = useState<null | number>(null);
	const {isPositionFree} = useGrid();
	const [tiles, setTiles] = useState<Array<TileData>>(getTiles());
	const [modal, setModal] = useState<Modal>(null);

	function getTiles(): Array<TileData> {
		const tempCodes: number[] = Array.from({length: Math.floor(level.length / 2)}, (_, idx) => idx % 36);
		const codes: number[] = [];
		do {
			codes.push(tempCodes.splice(Math.floor(getRandom() * tempCodes.length), 1)[0]);
		} while (tempCodes.length > 0);
		
		const newTiles = level.map((pos, idx) => {
			return {
				pos: {
					x: pos.x,
					y: pos.y,
					layer: pos.layer,
				},
				id: idx,
				code: codes[Math.floor(idx / 2)],
				matchIdx: 0
			}
		});
		return newTiles;
	}

	const handleTileClick = (id: number): void => {
    if (id === selectedId) {
      // deselect current tile
      setSelectedId(null);
    } else {
      if (selectedId !== null) {
        // check match
        const selectedTiles = tiles.filter(t => t.id === id || t.id === selectedId);
        if (selectedTiles.length === 2 && selectedTiles[0].code === selectedTiles[1].code) {
          // tiles match
          selectedTiles[0].matchIdx = 1;
          selectedTiles[1].matchIdx = 2;
					// move tiles to match position based on their x position
					if (selectedTiles[0].pos.x < selectedTiles[1].pos.x) {
						selectedTiles[0].pos = { x: 6.5, y: 4.5, layer: 10 };
						selectedTiles[1].pos = { x: 7.5, y: 4.5, layer: 10 };
					} else {
						selectedTiles[0].pos = { x: 7.5, y: 4.5, layer: 10 };
						selectedTiles[1].pos = { x: 6.5, y: 4.5, layer: 10 };
					}
          setSelectedId(null);

					// check end game
					if (!tiles.some(tile => tile.matchIdx === 0)) {
						// game win
						onGameEnd('win');
					} else if (getPairCount() === 0) {
						onGameEnd('lose');
					}
        } else {
          // tiles don't match
          setSelectedId(id);
        }
      } else {
        // select first tile
        setSelectedId(id);
      }
    }
  };

  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matchIdx) return 'matched';
    if (tile.id === selectedId) return 'selected';
		return isPositionFree(tile.pos, tiles.filter(t => !t.matchIdx).map(t => t.pos)) ? 'free' : 'blocked';
  };

	const getPairCount = (): number => {
		const freeTiles = tiles.filter(tile => !tile.matchIdx && isPositionFree(tile.pos, tiles.filter(t => !t.matchIdx).map(t => t.pos)));
		let result = 0;
		freeTiles.forEach(tile => {
			if (freeTiles.some(t => t !== tile && t.code === tile.code)) {
				result++;
			}
		});
		return Math.floor(result / 2);
	}

	const handleRestart = () => {
		if (!tiles.some(tile => tile.matchIdx === 0) || getPairCount() === 0) {
			// game is over
			restartLevel();
		} else {
			// game isn't over, so confirm restart
			setModal('confirm');
		}
	}

	const restartLevel = () => {
		setSelectedId(null);
		setSeed(seed);
		setTiles(getTiles());
		onRestart();
	}

	const style: CSSProperties = {
		aspectRatio: 1200 / 915,
		position: 'relative',
		maxWidth: '900px',
		margin: 'auto'
	}

	return (
		<>
		{/* tiles */}
		<div style={style}>
			{tiles.map(tile => (
				<Tile
					key={tile.id}
					pos={tile.pos}
					code={tile.code}
					id={tile.id}
					status={getTileStatus(tile)}
					tileset={tileset}
					onClick={handleTileClick}
				/>
			))}
		</div>

		{/* infobar */}
		<Infobar
			tiles={tiles.filter(tile => tile.matchIdx === 0).length}
			moves={getPairCount()}
			onHelp={() => setModal('help')}
			onRestart={handleRestart}
		/>

		{/* level restart confirmation modal */}
		{modal === 'confirm' &&
			<Modal onClose={() => setModal(null)}>
				<div className="border border-white rounded-md bg-black flex flex-col py-5 px-10 mt-8 h-fit">
				
				<h2 className="text-4xl text-center mb-5">Confirm restart?</h2>
				<p className="text-center text-lg">The game is not over yet.</p>
				<p className="text-center text-lg">Are you sure you want to restart?</p>
				
				<div className="flex justify-between mt-8">
					<button
						className="text-2xl rounded-md px-2 -translate-y-1 active:translate-y-0 bg-red-700 shadow-btn-red active:shadow-none"
						onClick={restartLevel}
					>Restart</button>
					<button
						className="text-2xl rounded-md px-2 -translate-y-1 active:translate-y-0 bg-blue-700 shadow-btn-blue active:shadow-none"
					>Cancel</button>
				</div>

			</div>
			</Modal>
		}

		{/* how-to-play modal */}
		{modal === 'help' &&
			<Modal onClose={() => setModal(null)}>
				<div className="border border-white rounded-md bg-black flex flex-col py-5 px-4 mt-4 h-fit w-11/12 md:w-9/12">
					<h2 className="text-4xl text-center">How to play</h2>

					<h3 className="text-2xl mb-1 mt-4">Goal</h3>
					<p className="pl-4">Your goal is to remove all the tiles from the board by matching tiles with the same symbol.</p>

					<h3 className="text-2xl mb-1 mt-4">Rules</h3>
					<p className="pl-4">Only free tiles can be removed. A tile is free when:</p>
					<ul className="pl-4">
						<li className="pl-4 list-disc list-inside"><span className="relative -left-2">There are no tiles on top of it.</span></li>
						<li className="pl-4 list-disc list-inside"><span className="relative -left-2">It is free on at least one side.</span></li>
					</ul>

					<h3 className="text-2xl mb-1 mt-4">Winning / Losing</h3>
					<p className="pl-4">You win when all tiles have been removed. You lose when there are no more possible moves.</p>
					<p className="pl-4">All game are winnable. If you lose, just try again!</p>

					<button
						className="text-2xl rounded-md px-8 mt-5 -translate-y-1 active:translate-y-0 bg-blue-700 shadow-btn-blue active:shadow-none w-fit m-auto"
					>OK</button>
				</div>
			</Modal>
		}
		</>
	);
}