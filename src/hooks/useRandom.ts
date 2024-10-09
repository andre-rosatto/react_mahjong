import { useRef } from "react";

interface IUseRandom {
	setSeed: (seed: number) => void;
	getRandom: () => number;
}

export default function useRandom(seed: number): IUseRandom {
	const seedRef = useRef<number>(seed);
	const generator = useRef<() => number>(SimpleFastCounter32());
	
	// console.log('render');

	const setSeed = (seed: number) => {
		seedRef.current = seed;
	}

	function SimpleFastCounter32(): () => number {
		// console.log('seed', seedRef.current);
		
		return () => {
			let for_bit32_mul = seedRef.current += 0x6D2B79F5;
			let cast32_one = for_bit32_mul ^ for_bit32_mul >>> 15;
			let cast32_two = for_bit32_mul | 1;
			for_bit32_mul = Math.imul(cast32_one, cast32_two);
			for_bit32_mul ^= for_bit32_mul +
					Math.imul(for_bit32_mul ^ for_bit32_mul >>> 7, for_bit32_mul | 61);
			return ((for_bit32_mul ^ for_bit32_mul >>> 14) >>> 0) / 4294967296;
		}
	}

	const getRandom = (): number => {
		return generator.current();
	}

	return { setSeed, getRandom }
}