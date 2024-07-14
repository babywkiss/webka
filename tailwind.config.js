import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	daisyui: {
		themes: [
			{
				rosepine: {
					primary: "#c4a7e7",
					secondary: "#ebbcba",
					accent: "#f6c177",
					neutral: "#191724",
					"base-100": "#191724",
					info: "#31748f",
					success: "#9ccfd8",
					warning: "#f6c177",
					error: "#eb6f92",
					"base-content": "#e0def4",
				},
				"rosepine-moon": {
					primary: "#c4a7e7",
					secondary: "#ea9a97",
					accent: "#c4a7e7",
					neutral: "#2a273f",
					"base-100": "#232136",
					info: "#3e8fb0",
					success: "#9ccfd8",
					warning: "#f6c177",
					error: "#eb6f92",
				},
				"rosepine-dawn": {
					primary: "#907aa9",
					secondary: "#d7827e",
					accent: "#907aa9",
					neutral: "#faf4ed",
					"base-100": "#fffaf3",
					info: "#286983",
					success: "#56949f",
					warning: "#ea9d34",
					error: "#b4637a",
				},
			},
		],
	},
	theme: {
		fontFamily: {
			sans: ['"Shantell Sans Variable"', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			animation: {
				pulsing: "pulsing 2s infinite",
			},
			keyframes: {
				pulsing: {
					"0%": { outlineWidth: "0.1rem", outlineStyle: "solid" },
					"50%": { outlineWidth: "0.5rem", outlineStyle: "solid" },
					"100%": { outlineWidth: "0.1rem", outlineStyle: "solid" },
				},
			},
		},
	},
	plugins: [daisyui],
};
