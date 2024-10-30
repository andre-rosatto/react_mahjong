interface IUseRandom {
	setSeed: (seed: number) => void;
	getRandom: () => number;
}

/**
 * Hook for using the Mulberry32 random number generator.
 * The numbers are generated based on a seed.
 * Therefore, using the same seed will always generate the same sequence of numbers.
 * @param seed A initial number to be used for the random number generator.
 * @returns An object containing two functions: ```getRandom() => number```: gets the next random number; ```setRandom(seed) => void```: resets the random number generator with a new seed.
 */
export default function useRandom(seed: number): IUseRandom {
	const generator = Mulberry32();
	
	/**
	 * Resets the seed for the random number generator.
	 * @param newSeed The new seed to be used for the generator.
	 */
	const setSeed = (newSeed: number) => {
		seed = newSeed;
	}

	function Mulberry32(): () => number {		
		return () => {
			let for_bit32_mul = seed += 0x6D2B79F5;
			let cast32_one = (for_bit32_mul) ^ (for_bit32_mul >>> 15);
			let cast32_two = for_bit32_mul | 1;
			for_bit32_mul = Math.imul(cast32_one, cast32_two);
			for_bit32_mul ^= for_bit32_mul + Math.imul(for_bit32_mul ^ (for_bit32_mul >>> 7), for_bit32_mul | 61);
			return ((for_bit32_mul ^ (for_bit32_mul >>> 14)) >>> 0) / 4294967296;
		}
	}

	/**
	 * Gets the next random number.
	 * @returns A random number between 0 and 1.
	 */
	const getRandom = (): number => {
		return generator();
	}

	return { setSeed, getRandom }
}