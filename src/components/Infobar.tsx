import { CSSProperties, useEffect, useState } from "react";

interface InfobarProps {
	tiles: number;
	moves: number;
	date: string;
	onRestart: () => void;
	onHelp: () => void;
}

export default function Infobar({tiles, moves, date, onRestart, onHelp}: InfobarProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);

	useEffect(() => {
		const handleClick = () => {
			setMenuVisible(false);
		}
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	const style: {
		menuBtn: CSSProperties,
		menu: CSSProperties
	} = {
		menuBtn: {
			boxShadow: menuVisible ? 'none' : '0 .25rem 0 #052399',
			transform: menuVisible ? 'translateY(0)' : 'translateY(-0.25rem)'
		},
		menu: {
			transform: menuVisible ? 'scale(1)' : 'scale(0)'
		}
	}

	return (
		<div className="w-full px-2 fixed bottom-2 z-[8000] flex justify-between">

			{/* game info */}
			{/* date */}
			<p
				className="text-sm md:text-lg flex items-center gap-2"
				title="Date"
			>
				<svg className="h-4 md:h-6" fill="none" viewBox="0 0 22 24" strokeWidth="1.5" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
				</svg>
				{date}
			</p>

			{/* tiles left */}
			<p
				className="text-sm md:text-lg flex items-center gap-1"
				title="Tiles left"
			>
				<svg className="h-4 md:h-6" fill="none" viewBox="0 0 22 24" strokeWidth="1.5" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M 2.7253148,23.187335 H 17.149356 a 2.0379794,1.988923 0 0 0 2.03798,-1.988923 V 2.6762583 A 2.0379794,1.988923 0 0 0 17.149356,0.68733537 H 2.7253148 A 2.0379794,1.988923 0 0 0 0.68733537,2.6762583 V 21.198412 a 2.0379794,1.988923 0 0 0 2.03797943,1.988923 z" />
					<path strokeLinecap="round" strokeLinejoin="round" d="M 0.68733537,19.75 H 18.842573" />
					<path strokeLinecap="round" strokeLinejoin="round" d="M 6.0735611,6.825 13.801096,6.1875 13.384642,10.125 H 7.045287 Z" />
					<path strokeLinecap="round" strokeLinejoin="round" d="M 9.9373354,3.75 V 16.1875" />
				</svg>
				{tiles}
			</p>

			{/* moves left */}
			<p
				className="text-sm md:text-lg flex items-center gap-1"
				title="Possible moves"
			>
				<svg className="h-4 md:h-6" fill="none" viewBox="0 0 42 24" strokeWidth="1.5" stroke="currentColor">
					<path d="M 2.7253148,23.187335 H 17.149356 a 2.0379794,1.988923 0 0 0 2.03798,-1.988923 V 2.6762583 A 2.0379794,1.988923 0 0 0 17.149356,0.68733537 H 2.7253148 A 2.0379794,1.988923 0 0 0 0.68733537,2.6762583 V 21.198412 a 2.0379794,1.988923 0 0 0 2.03797943,1.988923 z" />
    			<path d="M 0.68733537,19.75 H 39.187334" />
    			<path d="M 6.0735611,6.825 13.801096,6.1875 13.384642,10.125 H 7.045287 Z" />
    			<path d="M 9.9373354,3.75 V 16.1875" />
    			<path d="m 22.725314,23.187335 h 14.424041 a 2.0379794,1.988923 0 0 0 2.03798,-1.988923 V 2.6762583 A 2.0379794,1.988923 0 0 0 37.149355,0.68733537 H 22.725314 A 2.0379794,1.988923 0 0 0 20.687335,2.6762583 V 21.198412 a 2.0379794,1.988923 0 0 0 2.037979,1.988923 z" />
    			<path d="M 26.07356,6.825 33.801095,6.1875 33.384641,10.125 H 27.045286 Z" />
    			<path d="M 29.937335,3.75 V 16.1875" />
				</svg>
				{moves}
			</p>

			{/* button */}
			<button
				className="flex items-center justify-center rounded-md w-6 md:w-8 h-6 md:h-8 bg-blue-700"
				style={style.menuBtn}
				title="Menu"
				onClick={e => {
					e.stopPropagation();
					setMenuVisible(!menuVisible)
				}}
			>
				<svg className="size-4 md:size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>

			{/* menu */}
			<ul
				className="absolute right-2 bottom-6 md:bottom-8 bg-slate-800 rounded-md py-2 origin-bottom-right transition-all"
				style={style.menu}
			>
				<li
					className="py-2 px-6 cursor-pointer hover:bg-slate-700"
					onClick={onRestart}
				>Restart</li>
				<li
					className="py-2 px-6 cursor-pointer hover:bg-slate-700"
					onClick={onHelp}
				>Help</li>
			</ul>

		</div>
	);
}