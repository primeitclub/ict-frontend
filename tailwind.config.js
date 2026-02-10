import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        // background colors 
        'primary': '#020919',
        'primary-cyan':'#00d4ff',
        'primary-cyan-dark':'#0099cc',       
        'secondary': '#212121',     
        'accent-light': '#3B82F6',  
        'accent-dark': '#1D4ED8',  
        
        // button colors 
        'btn-primary': '#3571F0', 
        'btn-primary-hover':'#184EBF',
        'btn-secondary': '#02369E',
        'btn-secondary-hover':'#12306C',

        // glow effect 
        'glow-primary':'#0956F9',
        'glow-secondary':'#597DC4',
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
        'nav-hover': '#A3A3A3',    
        'nav-active': '#3B82F6',   
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
