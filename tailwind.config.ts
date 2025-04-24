import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/tailwind-datepicker-react/dist/**/*.js",
	],
	prefix: "",
	theme: {
    	spacing: {
    		'0': '0',
    		'1': '0.25rem',
    		'2': '0.5rem',
    		'3': '0.75rem',
    		'4': '1rem',
    		'5': '1.25rem',
    		'6': '1.5rem',
    		'7': '1.75rem',
    		'8': '2rem',
    		'9': '2.25rem',
    		'10': '2.5rem',
    		'11': '2.75rem',
    		'12': '3rem',
    		'14': '3.5rem',
    		'16': '4rem',
    		'20': '5rem',
    		'24': '6rem',
    		'28': '7rem',
    		'32': '8rem',
    		'36': '9rem',
    		'40': '10rem',
    		'44': '11rem',
    		'48': '12rem',
    		'52': '13rem',
    		'56': '14rem',
    		'60': '15rem',
    		'64': '16rem',
    		'72': '18rem',
    		'80': '20rem',
    		'96': '24rem',
    		px: '1px',
    		'0.5': '0.125rem',
    		'1.5': '0.375rem',
    		'2.5': '0.625rem',
    		'3.5': '0.875rem'
    	},
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	colors: {
    		blue: '#1fb6ff',
    		purple: '#4E1157',
    		'secondary-purple': '#3E0A46',
    		'light-purple': '#631e6e',
    		darkPurple: '#631E6E',
    		pink: '#682626',
    		orange: '#ff7849',
    		green: '#13ce66',
    		yellow: '#FFBB00',
    		'gray-dark': '#273444',
    		gray: '#8492a6',
    		'gray-light': '#d3dce6',
    		white: '#fff',
    		'blue-700': '#FFBB00'
    	},
    	extend: {
			fontFamily: {
				satoshi: ["var(--font-satoshi)"],
			},
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		backgroundImage: {
    			'dream-gradient': 'linear-gradient(to bottom, #3E0A46 0%, #4E1157 25%, #631E6E 100%)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'spinner-leaf-fade': {
    				'0%, 100%': {
    					opacity: '0'
    				},
    				'50%': {
    					opacity: '1'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
