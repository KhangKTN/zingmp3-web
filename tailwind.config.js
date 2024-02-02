/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      screens: {
        'wide': '1600px'
      },
      backgroundColor:{
        'sidebar': '#dde4e4',
        'sidebar-hidden': '#cce0e0',
        'primary': '#ced9d9',
        'button': '#dce8e8',
        'player': '#c1d8d8',
        'active': '#e7ebeb',
        'slider-bar':  '#0f7070'
      },
      colors: {
        'active': '#0f7070'
      },
      accentColor: {
        'active':'#0f7070'
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px)',
            'transform': 'translateX(-500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            'transform': 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)'
          }
        },
        'slide-left-two': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            'transform': 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)'
          }
        },
        'tracking-in-contract': {
          '0%': {
            'letter-spacing': '1em',
            'opacity': '0'
          },
          '40%': {
            'opacity': '0.6'
          },
          '100%': {
            'letter-spacing': 'normal',
            'opacity': '1'
          }
        },
        'slide-in-elliptic-left-fwd': {
          '0%': {
            '-webkit-transform': 'translateX(-800px) rotateY(30deg) scale(0)',
                    'transform': 'translateX(-800px) rotateY(30deg) scale(0)',
            '-webkit-transform-origin': '-100% 50%',
                    'transform-origin': '-100% 50%',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateX(0) rotateY(0) scale(1)',
                    'transform': 'translateX(0) rotateY(0) scale(1)',
            '-webkit-transform-origin': '1800px 50%',
                    'transform-origin': '1800px 50%',
            'opacity': '1'
          }
        },
        'fade-in-bck': {
          '0%': {
            '-webkit-transform': 'translateZ(80px)',
                    'transform': 'translateZ(80px)',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateZ(0)',
                    'transform': 'translateZ(0)',
            'opacity': '1'
          }
        },
        'rotate-center': {
          '0%': {
            '-webkit-transform': 'rotate(0)',
                    'transform': 'rotate(0)',
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
                    'transform': 'rotate(360deg)',
          }
        },
        'rotate-pause': {
          '0%': {
            '-webkit-transform': 'rotate(0)',
                    'transform': 'rotate(0)',
                    'border-radius': '100%' 
          },
          '100%': {
            '-webkit-transform': 'rotate(-360deg)',
                    'transform': 'rotate(-360deg)',
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 1s cubic-bezier(.25,.46,.45,.94) both',
        'slide-left': 'slide-left 1s cubic-bezier(.25,.46,.45,.94) both',
        'slide-left-two': 'slide-left-two 1s cubic-bezier(.25,.46,.45,.94) both',
        'text-animate': 'tracking-in-contract .5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;',
        'slide-in-elliptic-left-fwd': 'slide-in-elliptic-left-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fade-in-bck': 'fade-in-bck 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'rotate-center': 'rotate-center 10s linear infinite both',
        'rotate-pause': 'rotate-pause .4s linear both'
      }
    },
  },
  plugins: [],
}

