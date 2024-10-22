import { TilePosition } from './typings/types.d';
import tileset from './assets/tiles.webp';
import useRandom from './hooks/useRandom';
import Game from './components/Game';
import { useState } from 'react';
import useGrid from './hooks/useGrid';
import LEVELS from './assets/levels';
import Confetti from './components/Confetti';
import loseIcon from './assets/lose.svg';


function App() {
	// const seed = 20240914;		// debug
	const seed = parseInt(
		new Date().getFullYear().toString() +
		new Date().getMonth().toString().padStart(2, '0') +
		new Date().getDate().toString().padStart(2, '0')
	);

	const {getRandom} = useRandom(seed);
	const {isPositionFree} = useGrid();
	const [level] = useState<Array<TilePosition>>(shuffle());
	const [status, setStatus] = useState<'' | 'win' | 'lose'>('');

	console.log('seed', seed);	// debug
	

	function shuffle(): Array<TilePosition> {
		const levelIdx = LEVELS.length - 1;		// debug
		// const levelIdx = Math.floor(getRandom() * LEVELS.length);
		console.log('levelIdx', levelIdx);

		// return LEVELS[levelIdx];		// debug
		
		let nextLevel: Array<TilePosition> = [];
		let tempLevel = [...LEVELS[levelIdx]];
		console.log(LEVELS[levelIdx].length);

		if (LEVELS[levelIdx].length % 2 !== 0) {
			console.log('odd # of tiles');
			return [];
		}

		const getEmptyPositions = (): Array<TilePosition> => tempLevel.filter(pos => isPositionFree(pos, tempLevel));
		
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
		} while (tempLevel.length > 0);

		// nextLevel.forEach(pos => console.log(pos.x, pos.y, pos.layer));	// debug
		
		return nextLevel;
	}

  return (
    <div className='pt-10 bg-green-900 min-h-screen relative font-concert1 text-white'>
      {/* board */}
			<Game
				tileset={tileset}
				level={level}
				seed={seed}
				onGameEnd={status => setStatus(status)}
				onRestart={() => setStatus('')}
			/>

			{status === 'win' && <Confetti />}

			{status === 'lose' &&
				<div className='absolute w-full pt-24 top-0 flex flex-col items-center justify-center gap-4 overflow-hidden z-[9000]'>
					<p className='text-8xl animate-slide-right drop-shadow-ld opacity-0'>No</p>
					<img src={loseIcon} alt="sad icon" className='w-40 animate-pop opacity-0' />
					<p className='text-8xl animate-slide-left drop-shadow-rd opacity-0'>Moves</p>
				</div>
			}
    </div>
  );
}

export default App;
