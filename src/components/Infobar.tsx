interface InfobarProps {
	tiles: number;
	moves: number;
}

export default function Inforbar({tiles, moves}: InfobarProps) {
	return (
		<div className="w-full px-4 fixed bottom-2">
			<div className="flex justify-between border border-white rounded-md p-4 bg-black/50">
				<button className="btn text-2xl rounded-md w-8 h-8 -translate-y-1 active:translate-y-0 bg-blue-700 shadow-btn-blue active:shadow-none">?</button>
				<p className="text-lg">Tiles: {tiles}</p>
				<p className="text-lg">Moves: {moves}</p>
				<button className="btn text-2xl rounded-md w-8 h-8 -translate-y-1 active:translate-y-0 bg-red-700 shadow-btn-red active:shadow-none flex items-center justify-center">
					<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
				</button>
			</div>
		</div>
	);
}