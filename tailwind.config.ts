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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Maintained HSL variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Enhanced Primary Colors
        primary: {
          DEFAULT: "#DC1414",
          50: '#FFE5E5',
          100: '#FFB8B8',
          200: '#FF8A8A',
          300: '#FF5C5C',
          400: '#FF2E2E',
          500: '#DC1414',
          600: '#B40000',
          700: '#8B0000',
        },

        // Enhanced Secondary Colors
        secondary: {
          DEFAULT: "#3A72FF",
          50: '#F0F4FF',
          100: '#D6E0FF',
          200: '#ADC4FF',
          300: '#84A9FF',
          400: '#5B8DFF',
          500: '#3A72FF',
          600: '#1E57E5',
        },

        // Enhanced Destructive Colors
        destructive: {
          DEFAULT: "#E31B1B",
          50: '#FFF0F0',
          100: '#FFD1D1',
          200: '#FF9999',
          300: '#FF6060',
          400: '#FF2B2B',
          500: '#E31B1B',
        },

        // Enhanced Muted Colors
        muted: {
          DEFAULT: "#6B7280",
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
        },

        // Enhanced Accent Colors
        accent: {
          DEFAULT: "#38A169",
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#38A169',
        },

        // Additional Semantic Colors
        alert: {
          DEFAULT: "#F57C00",
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#F57C00',
        },

        // Popover and Card colors remain as HSL variables
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Enhanced Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        '2xl': "calc(var(--radius) + 8px)",
      },

      // Enhanced Keyframes and Animations
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "emergency-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        "critical-alert": {
          "0%, 100%": { backgroundColor: "rgba(220, 20, 20, 0.1)" },
          "50%": { backgroundColor: "rgba(220, 20, 20, 0.3)" },
        },
      },

      // Enhanced Animation Utilities
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "emergency-pulse": "emergency-pulse 1.5s infinite",
        "critical-alert": "critical-alert 1s infinite",

        // Existing animations
        "ping": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      // Enhanced Box Shadows
      boxShadow: {
        "emergency-light": "0 4px 6px -1px rgba(220, 20, 20, 0.1)",
        "emergency-medium": "0 6px 8px -2px rgba(220, 20, 20, 0.2)",
        "emergency-intense": "0 8px 10px -3px rgba(220, 20, 20, 0.3)",

        // Maintained existing shadows
        "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },

      // Optional: Additional Transition Utilities
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};