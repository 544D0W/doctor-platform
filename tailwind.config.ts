/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': '#FFE5E5',
  				'100': '#FFB8B8',
  				'200': '#FF8A8A',
  				'300': '#FF5C5C',
  				'400': '#FF2E2E',
  				'500': '#DC1414',
  				'600': '#B40000',
  				'700': '#8B0000',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#F0F4FF',
  				'100': '#D6E0FF',
  				'200': '#ADC4FF',
  				'300': '#84A9FF',
  				'400': '#5B8DFF',
  				'500': '#3A72FF',
  				'600': '#1E57E5',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				'50': '#FFF0F0',
  				'100': '#FFD1D1',
  				'200': '#FF9999',
  				'300': '#FF6060',
  				'400': '#FF2B2B',
  				'500': '#E31B1B',
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				'50': '#F9FAFB',
  				'100': '#F3F4F6',
  				'200': '#E5E7EB',
  				'300': '#D1D5DB',
  				'400': '#9CA3AF',
  				'500': '#6B7280',
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				'50': '#F0FFF4',
  				'100': '#C6F6D5',
  				'200': '#9AE6B4',
  				'300': '#68D391',
  				'400': '#48BB78',
  				'500': '#38A169',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			alert: {
  				'50': '#FFF3E0',
  				'100': '#FFE0B2',
  				'200': '#FFCC80',
  				'300': '#FFB74D',
  				'400': '#FFA726',
  				'500': '#F57C00',
  				DEFAULT: '#F57C00'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: 'calc(var(--radius) + 4px)',
  			'2xl': 'calc(var(--radius) + 8px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
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
  					height: 0
  				}
  			},
  			'emergency-pulse': {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.05)',
  					opacity: '0.8'
  				}
  			},
  			'critical-alert': {
  				'0%, 100%': {
  					backgroundColor: 'rgba(220, 20, 20, 0.1)'
  				},
  				'50%': {
  					backgroundColor: 'rgba(220, 20, 20, 0.3)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'emergency-pulse': 'emergency-pulse 1.5s infinite',
  			'critical-alert': 'critical-alert 1s infinite',
  			'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
  			'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		boxShadow: {
  			'emergency-light': '0 4px 6px -1px rgba(220, 20, 20, 0.1)',
  			'emergency-medium': '0 6px 8px -2px rgba(220, 20, 20, 0.2)',
  			'emergency-intense': '0 8px 10px -3px rgba(220, 20, 20, 0.3)',
  			'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};