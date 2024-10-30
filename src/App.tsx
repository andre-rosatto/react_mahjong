import { GameStatus, TilePosition } from './typings/types.d';
import tileset from './assets/tiles.webp';
import useRandom from './hooks/useRandom';
import Game from './components/Game';
import { useRef, useState } from 'react';
import LEVELS from './utils/levels';
import Confetti from './components/Confetti';
import loseIcon from './assets/lose.svg';
import winIcon from './assets/win.svg';

export const SIZE_Y = 9;		// board height
export const DEPTH = 10;		// tile depth

// seed for the randomizer, based on the current date
const date = new Date().toLocaleString([], {day: '2-digit', month: '2-digit', year: 'numeric'});
const seed = parseInt(date.replace(/\D/g, ''));

/**
 * Checks if there are no tiles blocking a tile at position x, y, layer.
 * @param pos grid position of the tile;
 * @param level array containing all tiles.
 * @returns true if the tile is free.
*/	
export function isPositionFree(pos: TilePosition, level: Array<TilePosition>): boolean {
	const {x, y, layer} = pos;
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

export default function App() {
	const {getRandom} = useRandom(seed);
	const [status, setStatus] = useState<GameStatus>('');
	const level = useRef(shuffle());

	/**
	 * Shuffles the level in a way that it is always winnable.
	 * @returns The randomized TilePosition array
	 */
	function shuffle(): TilePosition[] {
		// shuffles the level
		const levelIdx = Math.floor(getRandom() * LEVELS.length);
		
		let nextLevel: Array<TilePosition> = [];
		let tempLevel = [...LEVELS[levelIdx]];

		// if there is an odd # of tiles, there's something wrong with the level and it should be corrected
		if (LEVELS[levelIdx].length % 2 !== 0) {
			console.log('odd # of tiles');
			return [];
		}

		const getEmptyPositions = (): Array<TilePosition> => tempLevel.filter(pos => isPositionFree(pos, tempLevel));
		let nextSizeX = 0;
		
		do {
			const emptyPositions = getEmptyPositions();
			// if there are no more tiles to match, start over and try again
			if (emptyPositions.length <= 1) {
				tempLevel = [...LEVELS[levelIdx]];
				nextLevel = [];
				continue;
			}
			// get two free positions and add them to the result
			let pos1 = emptyPositions.splice(Math.floor(getRandom() * emptyPositions.length), 1)[0];
			let pos2 = emptyPositions.splice(Math.floor(getRandom() * emptyPositions.length), 1)[0];
			tempLevel.splice(tempLevel.indexOf(pos1), 1);
			tempLevel.splice(tempLevel.indexOf(pos2), 1);
			nextLevel.push(pos1, pos2);
			nextSizeX = Math.max(nextSizeX, pos1.x, pos2.x);
		} while (tempLevel.length > 0);
		return nextLevel;
	}

	return (
    <div className='pt-8 bg-green-900 min-h-screen relative font-concert1 text-white'>
      {/* board */}
			<Game
				tileset={tileset}
				level={level.current}
				seed={seed}
				date={date}
				onGameEnd={status => setStatus(status)}
				onRestart={() => setStatus('')}
			/>

			{/* game over */}
			{status !== '' &&
				<div className='absolute w-full pt-24 top-0 flex flex-col items-center justify-center gap-4 overflow-hidden z-[9000]'>
					<p className='text-8xl animate-slide-right drop-shadow-ld opacity-0'>{status === 'win' ? 'You' : 'No'}</p>
					<img src={status === 'win' ? winIcon : loseIcon} alt="happy icon" className='w-40 animate-pop opacity-0' />
					<p className='text-8xl animate-slide-left drop-shadow-rd opacity-0'>{status === 'win' ? 'Win' : 'Moves'}</p>
				</div>
			}
			{status === 'win' && <Confetti />}
    </div>
  );
}
