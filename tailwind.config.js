/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
			boxShadow: {
				'tile-shadow': '0 15px 0 #be7e29'
			}
		},
  },
  plugins: [],
}

