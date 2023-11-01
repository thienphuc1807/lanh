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
                lanhHeader: "url(/images/banner/Header.png)",
                lanhFooter: "url(/images/banner/Footer.png)",
                lanhBanner: "url(/images/banner/Banner.png)",
            },
            colors: {
                lanh_green: "#97ba79",
            },
        },
    },
    plugins: [],
};
export default config;
