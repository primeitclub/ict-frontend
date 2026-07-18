/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global accent (#3571F0) — sourced from --color-accent-dark-rgb in
        // src/index.css. Generates every color utility (text-accent,
        // bg-accent, border-accent, ring-accent, …) with opacity support
        // (e.g. border-accent/30).
        'accent': 'rgb(var(--color-accent-dark-rgb) / <alpha-value>)',
        // Lighter blue for dark surfaces (nav active, footer headings).
        'accent-secondary': 'rgb(var(--color-accent-light-rgb) / <alpha-value>)',
      },
      backgroundColor: {
        // background colors
        'primary': '#010005',
        'primary-cyan': 'rgb(var(--color-accent-dark-rgb) / <alpha-value>)', // alias of accent
        'primary-cyan-dark':'#0099cc',
        'secondary': '#212121',
        'admin-primary': '#01060A',
        'admin-secondary': '#39BFF2',
        'accent-light': '#3B82F6',
        'accent-dark': '#1D4ED8',

        // button colors
        'btn-primary': 'rgb(var(--color-accent-dark-rgb) / <alpha-value>)', // alias of accent
        'btn-primary-hover':'#184EBF',
        'btn-secondary': '#02369E',
        'btn-secondary-hover':'#12306C',

        // glow effect 
        'glow-primary':'#0956F9',
        'glow-secondary':'#DBF5FF',
        'glow-tertiary':'#02369B',
      },
      fontFamily:{
        sans: ['"Mona Sans"', 'sans-serif'],
        hubot: ['"Hubot Sans"', 'sans-serif'],
      },
      textColor: {
        'success':'#10B981', 
        'error':'#EF4444', 
        'warning':'#D19A66', 
        'info':'#3B82F6', 
        'primary': '#F5F5F5',      
        'secondary': '#D4D4D4',    
        'tertiary': '#A3A3A3',     
        'nav-default': '#F5F5F5',
        'nav-hover': '#60A5FA',    // secondary accent — hover state
        'nav-active': 'rgb(var(--color-accent-light-rgb) / <alpha-value>)', // light accent — active state (dark surfaces)
      },
      spacing: {
        'page-margin': '2rem',
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      animation:{
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 8s ease-in-out infinite',
        
      },
      keyframes:{
        float:{
          '0%, 100%':{transform:'translateY(0)'},
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%, 100%': { transform: 'translateX(-100%) skewX(12deg)' },
          '50%, 100%': { transform: 'translateX(200%) skewX(12deg)' },
        }
      }
    },
  },
  plugins: [],
}
