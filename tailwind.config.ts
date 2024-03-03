import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                lanhHeader: "url('/bgHeader.png')",
                lanhFooter: "url('/bgFooter.png')",
                lanhBanner: "url('/Banner.png')",
                lanhBackground: "url('/background.png')",
            },
            colors: {
                lanh_green: "#97ba79",
            },
        },
    },
    plugins: [],
};
export default config;
