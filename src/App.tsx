import { TilePosition } from './typings/types.d';
import tileset from './assets/tiles.webp';
import useRandom from './hooks/useRandom';
import Board from './components/Board';
import { useState } from 'react';
import useGrid from './hooks/useGrid';
import LEVELS from './assets/levels';


function App() {
	const seed = 20240914;		// debug
	// const seed = parseInt(
	// 	new Date().getFullYear().toString() +
	// 	new Date().getMonth().toString().padStart(2, '0') +
	// 	new Date().getDate().toString().padStart(2, '0')
	// );

	const {getRandom} = useRandom(seed);
	const {isPositionFree} = useGrid();
	const [level] = useState<Array<TilePosition>>(shuffle());

	function shuffle(): Array<TilePosition> {
		const levelIdx = LEVELS.length - 1;		// debug
		// const levelIdx = 2;		// debug
		// const levelIdx = Math.floor(getRandom() * LEVELS.length);
		console.log('levelIdx', levelIdx);
		
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
		return nextLevel;
	}

  return (
    <div className='pt-10 bg-green-900 min-h-screen'>
      {/* board */}
			<Board tileset={tileset} level={level} seed={seed} />
    </div>
  );
}

export default App;
