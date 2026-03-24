/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--surface)',
          container_lowest: 'var(--surface-container-lowest)',
          container: 'var(--surface-container)',
          bright: 'var(--surface-bright)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          container: 'var(--primary)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          container: 'var(--secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          container: 'var(--tertiary)',
        },
        on_surface: {
          DEFAULT: 'var(--on-surface)',
          variant: 'var(--on-surface-variant)',
          muted: 'var(--on-surface-muted)',
        },
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'rgba(59, 75, 55, 0.15)',
        },
        midnight: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        cyan: {
          50: '#e0fcff',
          100: '#bef8fd',
          200: '#87eaf2',
          300: '#54d1db',
          400: '#38bec9',
          500: '#2cb1bc',
          600: '#14919b',
          700: '#0e7c86',
          800: '#0a6c74',
          900: '#044e54',
          950: '#022c30',
        },
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#f7936b',
          500: '#f56e3a',
          600: '#e2571a',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'headline-md': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title-md': ['1.125rem', { lineHeight: '1.4' }],
        'body-md': ['0.875rem', { lineHeight: '1.6' }],
        'body-sm': ['0.75rem', { lineHeight: '1.5' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'terminal-blink': 'blink 1s step-end infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          'from': { clipPath: 'inset(0 100% 0 0)' },
          'to': { clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [],
};
