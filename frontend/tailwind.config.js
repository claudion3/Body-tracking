import react from '@vitejs/plugin-react'

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [react()],
};