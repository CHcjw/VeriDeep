/** @type {import('tailwindcss').Config} */

// VeriDeep 深色情报中枢设计 token
const palette = {
  primary: '#00D5FF',
  'primary-soft': '#35F2D0',
  'primary-tint': '#102D38',
  'primary-deep': '#8BE9FF',
  sun: '#FFB84D',
  'sun-soft': '#372915',
  ink: '#EAF4F8',
  'ink-2': '#A8BCC7',
  'ink-3': '#6F8390',
  line: '#203542',
  bg: '#07111A',
  card: '#0D1B26',
  paper: '#101F2B',
  ok: '#48D597',
  warn: '#FFB84D',
  risk: '#FF6B7A',
  info: '#7AA7FF',
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...palette,
        verideep: palette,
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 12px 34px rgba(0,0,0,0.22)',
        float: '0 18px 60px rgba(0,213,255,0.18)',
        glow: '0 0 0 4px rgba(0,213,255,0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        h2: ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.7' }],
        aux: ['13px', { lineHeight: '1.6' }],
        tag: ['11px', { lineHeight: '1.4' }],
      },
      spacing: {
        4.5: '18px',
      },
      maxWidth: {
        content: '1440px',
        read: '760px',
      },
      transitionTimingFunction: {
        verideep: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        breath: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.55' } },
        floatUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,213,255,.34)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0,213,255,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        breath: 'breath 2s ease-in-out infinite',
        floatUp: 'floatUp .4s cubic-bezier(.4,0,.2,1) both',
        glow: 'glow 1.8s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
