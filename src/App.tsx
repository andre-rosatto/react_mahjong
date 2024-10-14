import { TilePosition } from './typings/types.d';
import tileset from './assets/tiles.webp';
import useRandom from './hooks/useRandom';
import Board from './components/Board';
import { useState } from 'react';
import useGrid from './hooks/useGrid';

const LEVELS: Array<Array<TilePosition>> = [
	// classic
	[
		// layer 0
		{ x: 1, y: 0, layer: 0 },
		{ x: 2, y: 0, layer: 0 },
		{ x: 3, y: 0, layer: 0 },
		{ x: 4, y: 0, layer: 0 },
		{ x: 5, y: 0, layer: 0 },
		{ x: 6, y: 0, layer: 0 },
		{ x: 7, y: 0, layer: 0 },
		{ x: 8, y: 0, layer: 0 },
		{ x: 9, y: 0, layer: 0 },
		{ x: 10, y: 0, layer: 0 },
		{ x: 11, y: 0, layer: 0 },
		{ x: 12, y: 0, layer: 0 },

		{ x: 3, y: 1, layer: 0 },
		{ x: 4, y: 1, layer: 0 },
		{ x: 5, y: 1, layer: 0 },
		{ x: 6, y: 1, layer: 0 },
		{ x: 7, y: 1, layer: 0 },
		{ x: 8, y: 1, layer: 0 },
		{ x: 9, y: 1, layer: 0 },
		{ x: 10, y: 1, layer: 0 },

		{ x: 2, y: 2, layer: 0 },
		{ x: 3, y: 2, layer: 0 },
		{ x: 4, y: 2, layer: 0 },
		{ x: 5, y: 2, layer: 0 },
		{ x: 6, y: 2, layer: 0 },
		{ x: 7, y: 2, layer: 0 },
		{ x: 8, y: 2, layer: 0 },
		{ x: 9, y: 2, layer: 0 },
		{ x: 10, y: 2, layer: 0 },
		{ x: 11, y: 2, layer: 0 },

		{ x: 1, y: 3, layer: 0 },
		{ x: 2, y: 3, layer: 0 },
		{ x: 3, y: 3, layer: 0 },
		{ x: 4, y: 3, layer: 0 },
		{ x: 5, y: 3, layer: 0 },
		{ x: 6, y: 3, layer: 0 },
		{ x: 7, y: 3, layer: 0 },
		{ x: 8, y: 3, layer: 0 },
		{ x: 9, y: 3, layer: 0 },
		{ x: 10, y: 3, layer: 0 },
		{ x: 11, y: 3, layer: 0 },
		{ x: 12, y: 3, layer: 0 },

		{ x: 0, y: 3.5, layer: 0 },
		{ x: 13, y: 3.5, layer: 0 },
		{ x: 14, y: 3.5, layer: 0 },

		{ x: 1, y: 4, layer: 0 },
		{ x: 2, y: 4, layer: 0 },
		{ x: 3, y: 4, layer: 0 },
		{ x: 4, y: 4, layer: 0 },
		{ x: 5, y: 4, layer: 0 },
		{ x: 6, y: 4, layer: 0 },
		{ x: 7, y: 4, layer: 0 },
		{ x: 8, y: 4, layer: 0 },
		{ x: 9, y: 4, layer: 0 },
		{ x: 10, y: 4, layer: 0 },
		{ x: 11, y: 4, layer: 0 },
		{ x: 12, y: 4, layer: 0 },

		{ x: 2, y: 5, layer: 0 },
		{ x: 3, y: 5, layer: 0 },
		{ x: 4, y: 5, layer: 0 },
		{ x: 5, y: 5, layer: 0 },
		{ x: 6, y: 5, layer: 0 },
		{ x: 7, y: 5, layer: 0 },
		{ x: 8, y: 5, layer: 0 },
		{ x: 9, y: 5, layer: 0 },
		{ x: 10, y: 5, layer: 0 },
		{ x: 11, y: 5, layer: 0 },

		{ x: 3, y: 6, layer: 0 },
		{ x: 4, y: 6, layer: 0 },
		{ x: 5, y: 6, layer: 0 },
		{ x: 6, y: 6, layer: 0 },
		{ x: 7, y: 6, layer: 0 },
		{ x: 8, y: 6, layer: 0 },
		{ x: 9, y: 6, layer: 0 },
		{ x: 10, y: 6, layer: 0 },

		{ x: 1, y: 7, layer: 0 },
		{ x: 2, y: 7, layer: 0 },
		{ x: 3, y: 7, layer: 0 },
		{ x: 4, y: 7, layer: 0 },
		{ x: 5, y: 7, layer: 0 },
		{ x: 6, y: 7, layer: 0 },
		{ x: 7, y: 7, layer: 0 },
		{ x: 8, y: 7, layer: 0 },
		{ x: 9, y: 7, layer: 0 },
		{ x: 10, y: 7, layer: 0 },
		{ x: 11, y: 7, layer: 0 },
		{ x: 12, y: 7, layer: 0 },

		// layer 1
		{ x: 4, y: 1, layer: 1 },
		{ x: 5, y: 1, layer: 1 },
		{ x: 6, y: 1, layer: 1 },
		{ x: 7, y: 1, layer: 1 },
		{ x: 8, y: 1, layer: 1 },
		{ x: 9, y: 1, layer: 1 },

		{ x: 4, y: 2, layer: 1 },
		{ x: 5, y: 2, layer: 1 },
		{ x: 6, y: 2, layer: 1 },
		{ x: 7, y: 2, layer: 1 },
		{ x: 8, y: 2, layer: 1 },
		{ x: 9, y: 2, layer: 1 },

		{ x: 4, y: 3, layer: 1 },
		{ x: 5, y: 3, layer: 1 },
		{ x: 6, y: 3, layer: 1 },
		{ x: 7, y: 3, layer: 1 },
		{ x: 8, y: 3, layer: 1 },
		{ x: 9, y: 3, layer: 1 },

		{ x: 4, y: 4, layer: 1 },
		{ x: 5, y: 4, layer: 1 },
		{ x: 6, y: 4, layer: 1 },
		{ x: 7, y: 4, layer: 1 },
		{ x: 8, y: 4, layer: 1 },
		{ x: 9, y: 4, layer: 1 },

		{ x: 4, y: 5, layer: 1 },
		{ x: 5, y: 5, layer: 1 },
		{ x: 6, y: 5, layer: 1 },
		{ x: 7, y: 5, layer: 1 },
		{ x: 8, y: 5, layer: 1 },
		{ x: 9, y: 5, layer: 1 },

		{ x: 4, y: 6, layer: 1 },
		{ x: 5, y: 6, layer: 1 },
		{ x: 6, y: 6, layer: 1 },
		{ x: 7, y: 6, layer: 1 },
		{ x: 8, y: 6, layer: 1 },
		{ x: 9, y: 6, layer: 1 },

		// layer 2
		{ x: 5, y: 2, layer: 2 },
		{ x: 6, y: 2, layer: 2 },
		{ x: 7, y: 2, layer: 2 },
		{ x: 8, y: 2, layer: 2 },

		{ x: 5, y: 3, layer: 2 },
		{ x: 6, y: 3, layer: 2 },
		{ x: 7, y: 3, layer: 2 },
		{ x: 8, y: 3, layer: 2 },

		{ x: 5, y: 4, layer: 2 },
		{ x: 6, y: 4, layer: 2 },
		{ x: 7, y: 4, layer: 2 },
		{ x: 8, y: 4, layer: 2 },

		{ x: 5, y: 5, layer: 2 },
		{ x: 6, y: 5, layer: 2 },
		{ x: 7, y: 5, layer: 2 },
		{ x: 8, y: 5, layer: 2 },

		// layer 3
		{ x: 6, y: 3, layer: 3 },
		{ x: 7, y: 3, layer: 3 },

		{ x: 6, y: 4, layer: 3 },
		{ x: 7, y: 4, layer: 3 },
		
		// layer 4
		{ x: 6.5, y: 3.5, layer: 4 }
	]
];

function App() {
	const seed = parseInt(
		new Date().getFullYear().toString() +
		new Date().getMonth().toString().padStart(2, '0') +
		new Date().getDate().toString().padStart(2, '0')
	);

	const {getRandom} = useRandom(seed);
	const {isPositionFree} = useGrid();
	const [level] = useState<Array<TilePosition>>(shuffle());

	function shuffle(): Array<TilePosition> {
		const nextLevel: Array<TilePosition> = [];
		const tempLevel = [...LEVELS[Math.floor(getRandom()) * LEVELS.length]];
		do {
			const emptyPositions = tempLevel.filter(pos => isPositionFree(pos, tempLevel));
			let pos1 = emptyPositions.splice(Math.floor(getRandom() * emptyPositions.length), 1)[0];
			let pos2 = emptyPositions.splice(Math.floor(getRandom() * emptyPositions.length), 1)[0];
			tempLevel.splice(tempLevel.indexOf(pos1), 1);
			tempLevel.splice(tempLevel.indexOf(pos2), 1);
			nextLevel.push(pos1, pos2);
		} while (tempLevel.length > 0);
		return nextLevel;
	}

  return (
    <div className='p-2 bg-green-900 min-h-screen'>
      {/* board */}
			<Board tileset={tileset} level={level} seed={seed} />
    </div>
  );
}

export default App;
