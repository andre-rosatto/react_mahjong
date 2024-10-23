/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
			fontFamily: {
        concert1: ['Concert One', 'sans-serif']
      },
			keyframes: {
				'slide-right': {
					'0%': { opacity: 0, transform: 'translateX(-5rem) scale(.9)' },
					'5%': { opacity: 1, transform: 'translateX(-1rem) scale(1)' },
					'95%': { opacity: 1, transform: 'translateX(1rem) scale(1)' },
					'100%': { opacity: 0, transform: 'translateX(5rem) scale(.9)' }
				},
				'pop': {
					'0%': { opacity: 0, transform: 'scale(0) rotate(-25deg)' },
					'10%': { opacity: 1, transform: 'scale(1.1) rotate(-20deg)' },
					'20%': { opacity: 1, transform: 'scale(1) rotate(-15deg)' },
					'80%': { opacity: 1, transform: 'scale(1) rotate(15deg)' },
					'90%': { opacity: 1, transform: 'scale(1.1) rotate(20deg)' },
					'100%': { opacity: 1, transform: 'scale(0) rotate(25deg)' },
				}
			},
			animation: {
				'slide-right': 'slide-right 2s linear forwards 1s',
				'slide-left': 'slide-right 2s linear forwards reverse 1s',
				'pop': 'pop 2s linear forwards 1s'
			},
			dropShadow: {
				'rd': '.2rem .4rem 0 rgba(0, 0, 0, .5)',
				'ld': '-.2rem .4rem 0 rgba(0, 0, 0, .5)',
			},
			boxShadow: {
				'btn-blue': '0 .25rem 0 #052399',
				'btn-red': '0 .25rem 0 #6a0404',
			}
		},
  },
  plugins: [],
}

