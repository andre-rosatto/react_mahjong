import { TilePosition } from './typings/types.d';
import tileset from './assets/tiles.webp';
// import useRandom from './hooks/useRandom';
import Board from './components/Board';
import { useState } from 'react';

const LEVEL: Array<TilePosition> = [
	// layer 0
  { gridX: 1, gridY: 0, layer: 0 },
  { gridX: 2, gridY: 0, layer: 0 },
  { gridX: 3, gridY: 0, layer: 0 },
  { gridX: 4, gridY: 0, layer: 0 },
  { gridX: 5, gridY: 0, layer: 0 },
  { gridX: 6, gridY: 0, layer: 0 },
  { gridX: 7, gridY: 0, layer: 0 },
  { gridX: 8, gridY: 0, layer: 0 },
  { gridX: 9, gridY: 0, layer: 0 },
  { gridX: 10, gridY: 0, layer: 0 },
  { gridX: 11, gridY: 0, layer: 0 },
  { gridX: 12, gridY: 0, layer: 0 },

  { gridX: 3, gridY: 1, layer: 0 },
  { gridX: 4, gridY: 1, layer: 0 },
  { gridX: 5, gridY: 1, layer: 0 },
  { gridX: 6, gridY: 1, layer: 0 },
  { gridX: 7, gridY: 1, layer: 0 },
  { gridX: 8, gridY: 1, layer: 0 },
  { gridX: 9, gridY: 1, layer: 0 },
  { gridX: 10, gridY: 1, layer: 0 },

  { gridX: 2, gridY: 2, layer: 0 },
  { gridX: 3, gridY: 2, layer: 0 },
  { gridX: 4, gridY: 2, layer: 0 },
  { gridX: 5, gridY: 2, layer: 0 },
  { gridX: 6, gridY: 2, layer: 0 },
  { gridX: 7, gridY: 2, layer: 0 },
  { gridX: 8, gridY: 2, layer: 0 },
  { gridX: 9, gridY: 2, layer: 0 },
  { gridX: 10, gridY: 2, layer: 0 },
  { gridX: 11, gridY: 2, layer: 0 },

  { gridX: 1, gridY: 3, layer: 0 },
  { gridX: 2, gridY: 3, layer: 0 },
  { gridX: 3, gridY: 3, layer: 0 },
  { gridX: 4, gridY: 3, layer: 0 },
  { gridX: 5, gridY: 3, layer: 0 },
  { gridX: 6, gridY: 3, layer: 0 },
  { gridX: 7, gridY: 3, layer: 0 },
  { gridX: 8, gridY: 3, layer: 0 },
  { gridX: 9, gridY: 3, layer: 0 },
  { gridX: 10, gridY: 3, layer: 0 },
  { gridX: 11, gridY: 3, layer: 0 },
  { gridX: 12, gridY: 3, layer: 0 },

  { gridX: 0, gridY: 3.5, layer: 0 },
  { gridX: 13, gridY: 3.5, layer: 0 },
  { gridX: 14, gridY: 3.5, layer: 0 },

  { gridX: 1, gridY: 4, layer: 0 },
  { gridX: 2, gridY: 4, layer: 0 },
  { gridX: 3, gridY: 4, layer: 0 },
  { gridX: 4, gridY: 4, layer: 0 },
  { gridX: 5, gridY: 4, layer: 0 },
  { gridX: 6, gridY: 4, layer: 0 },
  { gridX: 7, gridY: 4, layer: 0 },
  { gridX: 8, gridY: 4, layer: 0 },
  { gridX: 9, gridY: 4, layer: 0 },
  { gridX: 10, gridY: 4, layer: 0 },
  { gridX: 11, gridY: 4, layer: 0 },
  { gridX: 12, gridY: 4, layer: 0 },

  { gridX: 2, gridY: 5, layer: 0 },
  { gridX: 3, gridY: 5, layer: 0 },
  { gridX: 4, gridY: 5, layer: 0 },
  { gridX: 5, gridY: 5, layer: 0 },
  { gridX: 6, gridY: 5, layer: 0 },
  { gridX: 7, gridY: 5, layer: 0 },
  { gridX: 8, gridY: 5, layer: 0 },
  { gridX: 9, gridY: 5, layer: 0 },
  { gridX: 10, gridY: 5, layer: 0 },
  { gridX: 11, gridY: 5, layer: 0 },

	{ gridX: 3, gridY: 6, layer: 0 },
  { gridX: 4, gridY: 6, layer: 0 },
  { gridX: 5, gridY: 6, layer: 0 },
  { gridX: 6, gridY: 6, layer: 0 },
  { gridX: 7, gridY: 6, layer: 0 },
  { gridX: 8, gridY: 6, layer: 0 },
  { gridX: 9, gridY: 6, layer: 0 },
  { gridX: 10, gridY: 6, layer: 0 },

	{ gridX: 1, gridY: 7, layer: 0 },
  { gridX: 2, gridY: 7, layer: 0 },
  { gridX: 3, gridY: 7, layer: 0 },
  { gridX: 4, gridY: 7, layer: 0 },
  { gridX: 5, gridY: 7, layer: 0 },
  { gridX: 6, gridY: 7, layer: 0 },
  { gridX: 7, gridY: 7, layer: 0 },
  { gridX: 8, gridY: 7, layer: 0 },
  { gridX: 9, gridY: 7, layer: 0 },
  { gridX: 10, gridY: 7, layer: 0 },
  { gridX: 11, gridY: 7, layer: 0 },
  { gridX: 12, gridY: 7, layer: 0 },

	// layer 1
  { gridX: 4, gridY: 1, layer: 1 },
  { gridX: 5, gridY: 1, layer: 1 },
  { gridX: 6, gridY: 1, layer: 1 },
  { gridX: 7, gridY: 1, layer: 1 },
  { gridX: 8, gridY: 1, layer: 1 },
  { gridX: 9, gridY: 1, layer: 1 },

  { gridX: 4, gridY: 2, layer: 1 },
  { gridX: 5, gridY: 2, layer: 1 },
  { gridX: 6, gridY: 2, layer: 1 },
  { gridX: 7, gridY: 2, layer: 1 },
  { gridX: 8, gridY: 2, layer: 1 },
  { gridX: 9, gridY: 2, layer: 1 },

  { gridX: 4, gridY: 3, layer: 1 },
  { gridX: 5, gridY: 3, layer: 1 },
  { gridX: 6, gridY: 3, layer: 1 },
  { gridX: 7, gridY: 3, layer: 1 },
  { gridX: 8, gridY: 3, layer: 1 },
  { gridX: 9, gridY: 3, layer: 1 },

  { gridX: 4, gridY: 4, layer: 1 },
  { gridX: 5, gridY: 4, layer: 1 },
  { gridX: 6, gridY: 4, layer: 1 },
  { gridX: 7, gridY: 4, layer: 1 },
  { gridX: 8, gridY: 4, layer: 1 },
  { gridX: 9, gridY: 4, layer: 1 },

  { gridX: 4, gridY: 5, layer: 1 },
  { gridX: 5, gridY: 5, layer: 1 },
  { gridX: 6, gridY: 5, layer: 1 },
  { gridX: 7, gridY: 5, layer: 1 },
  { gridX: 8, gridY: 5, layer: 1 },
  { gridX: 9, gridY: 5, layer: 1 },

  { gridX: 4, gridY: 6, layer: 1 },
  { gridX: 5, gridY: 6, layer: 1 },
  { gridX: 6, gridY: 6, layer: 1 },
  { gridX: 7, gridY: 6, layer: 1 },
  { gridX: 8, gridY: 6, layer: 1 },
  { gridX: 9, gridY: 6, layer: 1 },

	// layer 2
  { gridX: 5, gridY: 2, layer: 2 },
  { gridX: 6, gridY: 2, layer: 2 },
  { gridX: 7, gridY: 2, layer: 2 },
  { gridX: 8, gridY: 2, layer: 2 },

  { gridX: 5, gridY: 3, layer: 2 },
  { gridX: 6, gridY: 3, layer: 2 },
  { gridX: 7, gridY: 3, layer: 2 },
  { gridX: 8, gridY: 3, layer: 2 },

  { gridX: 5, gridY: 4, layer: 2 },
  { gridX: 6, gridY: 4, layer: 2 },
  { gridX: 7, gridY: 4, layer: 2 },
  { gridX: 8, gridY: 4, layer: 2 },

  { gridX: 5, gridY: 5, layer: 2 },
  { gridX: 6, gridY: 5, layer: 2 },
  { gridX: 7, gridY: 5, layer: 2 },
  { gridX: 8, gridY: 5, layer: 2 },

	// layer 3
  { gridX: 6, gridY: 3, layer: 3 },
  { gridX: 7, gridY: 3, layer: 3 },

  { gridX: 6, gridY: 4, layer: 3 },
  { gridX: 7, gridY: 4, layer: 3 },
	
	// layer 4
  { gridX: 6.5, gridY: 3.5, layer: 4 },
];
function App() {
	// const {setSeed, getRandom} = useRandom(new Date().getDate() + new Date().getMonth() / 100 + new Date().getFullYear() / 1000000);
	const [level, setLevel] = useState<Array<TilePosition>>(LEVEL);

  return (
    <div className='p-2'>
      {/* board */}
			<Board tileset={tileset} level={level} />
			<p
				className='absolute text-white bottom-0'
				onClick={() => {
					console.log('click');
					
					setLevel([
						{gridX: 5, gridY: 5, layer: 0}
					]);
				}}
			>click</p>
    </div>
  );
}

export default App;
