// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./formkit.theme.ts", // <-- add your theme file
    ],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [],
};
