import { CSSProperties, useMemo, useState } from "react";
import { GameStatus, TileData, TilePosition } from "../typings/types";
import Tile, { TileStatus } from "./Tile";
import { isPositionFree } from "../App";
import Infobar from "./Infobar";
import { Modal } from "./Modal";
import { useRandom } from "../hooks/useRandom";

export interface BoardProps {
	tileset: string;
	level: Array<TilePosition>;
	seed: number;
	date: string;
	onGameEnd: (status: GameStatus) => void;
	onRestart: () => void;
}

type ModalType = null | 'confirm' | 'help';

/**
 * Game component.
 * Responsible for setting up the game and creating the tiles.
 * @param tileset The URL of the spritesheet to be used for the tile images;
 * @param level The array of TilePositions containing the positions for the tiles;
 * @param seed The seed to be used for the random number generator;
 * @param onGameEnd Callback function to be called when the game ends;
 * @param onRestart Callback function to be callled when the player restarts the level.
 */
export default function Game({tileset, level, seed, date, onGameEnd, onRestart}: BoardProps) {
	const { nextRandom, setSeed } = useRandom(seed);
  const [selectedId, setSelectedId] = useState<null | number>(null);
	const [tiles, setTiles] = useState<Array<TileData>>(getTiles());
	const [modal, setModal] = useState<ModalType>(null);
	const sizeX = useMemo<number>(() => Math.max(...tiles.map(tile => tile.pos.x)) + 1, [tiles]);

	/**
	 * Gets the tile collection in a way that is always possible to win.
	 * @returns The shuffled array of tiles.
	 */
	function getTiles(): Array<TileData> {
		const tempCodes: number[] = Array.from({length: Math.floor(level.length / 2)}, (_, idx) => idx % 36);
		const codes: number[] = [];
		do {
			codes.push(tempCodes.splice(Math.floor(nextRandom() * tempCodes.length), 1)[0]);
		} while (tempCodes.length > 0);

		const nextTiles = level.map((pos, idx) => {
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
		return nextTiles;
	}

	/**
	 * Handles player clicking on a tile
	 * @param id The id of the tile clicked
	 */
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
						selectedTiles[0].pos = { x: sizeX / 2 - 1, y: 4.5, layer: 10 };
						selectedTiles[1].pos = { x: sizeX / 2, y: 4.5, layer: 10 };
					} else {
						selectedTiles[0].pos = { x: sizeX / 2, y: 4.5, layer: 10 };
						selectedTiles[1].pos = { x: sizeX / 2 - 1, y: 4.5, layer: 10 };
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

	/**
	 * Returns the status of a tile.
	 * @param	tile The tile to be checked.
	 * @returns The status of the tile.
	 */
  const getTileStatus = (tile: TileData): TileStatus => {
    if (tile.matchIdx) return 'matched';
    if (tile.id === selectedId) return 'selected';
		return isPositionFree(tile.pos, tiles.filter(t => !t.matchIdx).map(t => t.pos)) ? 'free' : 'blocked';
  };

	/**
	 * Gets how many moves are possible currently.
	 * @returns The number of pairs of matching tiles.
	 */
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

	/**
	 * Handles the player clicking on restart, confirming the restart in case the game is not over.
	 */
	const handleRestart = (): void => {
		if (!tiles.some(tile => tile.matchIdx === 0) || getPairCount() === 0) {
			// game is over
			restartLevel();
		} else {
			// game isn't over, so confirm restart
			setModal('confirm');
		}
	}

	/**
	 * Restarts the level.
	 */
	const restartLevel = (): void => {
		setSelectedId(null);
		setSeed(seed);
		setTiles(getTiles());
		onRestart();
	}

	const style: CSSProperties = {
		width: `calc(${Math.min(sizeX * 80, window.innerWidth)}px - 1rem)`,
	}	

	return (
		<>
		{/* tiles */}
		<div
			className="m-auto max-w-[600px] relative origin-top"
			style={style}
		>
				{tiles.map(tile => (
					<Tile
						key={tile.id}
						pos={tile.pos}
						code={tile.code}
						id={tile.id}
						status={getTileStatus(tile)}
						tileset={tileset}
						onClick={handleTileClick}
						sizeX={sizeX}
					/>
				))}
		</div>

		{/* infobar */}
		<Infobar
			tiles={tiles.filter(tile => tile.matchIdx === 0).length}
			moves={getPairCount()}
			date={date}
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
					<p className="text-center">A new game every day!</p>

					<h3 className="text-2xl mb-1 mt-4">Goal</h3>
					<p className="pl-4">Your goal is clear the board by matching tiles with the same symbol.</p>

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