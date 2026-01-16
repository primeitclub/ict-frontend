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
        'primary': '#171717',       
        'secondary': '#212121',     
        'accent-light': '#3B82F6',  
        'accent-dark': '#1D4ED8',  
        
        // button colors 
        'btn-primary': '#3571F0', // bg-
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
    },
  },
  plugins: [],
}
