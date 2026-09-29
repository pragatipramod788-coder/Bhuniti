import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        navy: '#1F3A93',
        'deep-navy': '#0A2A5E',
        saffron: '#FF9933',
        green: '#138808',
        'light-bg': '#F5F7FA',
        white: '#FFFFFF',
        text: '#212529',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
      }
    }
  },
  plugins: []
};

export default config;
