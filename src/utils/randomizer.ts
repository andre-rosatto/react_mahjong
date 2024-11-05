/**
 * Pseudorandom number generator class using the Mulberry32 algorithm.
 * @param seed The initial seed for the generator.
 */
export default class Randomizer {
	private _generator = this.Mulberry32();
	private _current;
	private _seed;

	constructor(seed: number) {
		this._seed = seed;
		this._current = seed;
	}

	private Mulberry32(): () => number {		
		return () => {
			let for_bit32_mul = this._current += 0x6D2B79F5;
			let cast32_one = (for_bit32_mul) ^ (for_bit32_mul >>> 15);
			let cast32_two = for_bit32_mul | 1;
			for_bit32_mul = Math.imul(cast32_one, cast32_two);
			for_bit32_mul ^= for_bit32_mul + Math.imul(for_bit32_mul ^ (for_bit32_mul >>> 7), for_bit32_mul | 61);
			return ((for_bit32_mul ^ (for_bit32_mul >>> 14)) >>> 0) / 4294967296;
		}
	}
	
	/**
	 * Sets a new seed for the generator.
	 * @param value The new seed.
	*/
	public set seed(value : number) {
		this._seed = value;
		this._current = value;
	}
	
	/**
	 * Gets the initial seed.
	 * @returns The initial seed.
	 */
	public get seed(): number {
		return this._seed;
	}

	/**
	 * Resets the generator with the current seed.
	 */
	public reset(): void {
		this._current = this._seed;
	}

	/**
	 * Gets the next random number in the sequence.
	 * @returns The next random number (between 0 and 1) in the sequence.
	 */
	public next (): number {
		return this._generator();
	}
}