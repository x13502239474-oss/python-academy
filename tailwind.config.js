/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070d1a',
          900: '#0a1428',
          850: '#0e1b33',
          800: '#12213f',
          700: '#1b2c4f',
          600: '#26395f',
        },
        pyblue: { DEFAULT: '#3776ab', light: '#4b9fe1', dark: '#2b5a82' },
        pyyellow: { DEFAULT: '#ffd43b', light: '#ffe884', dark: '#c9a413' },
        ok: { DEFAULT: '#4fb286', dark: '#2f7a5a' },
        danger: { DEFAULT: '#e5685f', dark: '#a83f38' },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"PingFang SC"', '"Microsoft YaHei"', 'Inter', 'sans-serif'],
        mono: ['"SF Mono"', '"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,.12), 0 18px 40px -12px rgba(0,0,0,.6)',
        card: '0 8px 24px -10px rgba(0,0,0,.5)',
      },
    },
  },
  plugins: [],
}
