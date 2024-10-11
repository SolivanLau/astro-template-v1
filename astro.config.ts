import { defineConfig } from "astro/config";
import fetchFavicons from "./src/assets/scripts/prebuild/fetchFavicons";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

export default defineConfig({
    output: "hybrid",
    adapter: netlify({
        imageCDN: false,
    }),
    site: "https://torontowindcollective.com",
    build: {
        inlineStylesheets: "never",
    },
    image: {
        domains: ["astro.build"],
        remotePatterns: [{ protocol: "https" }],
    },
    integrations: [
        icon({
            iconDir: "src/assets/icons",
        }),
        {
            name: "prebuild",
            hooks: {
                "astro:build:start": async (options) => {
                    console.log("PREBUILD SCRIPTS");
                    console.log("ENVIRONMENT VARIABLES loaded via import.meta.env:");
                    console.log(JSON.stringify(import.meta.env, null, 2));
                    console.log("Fetching Favicons");
                    await fetchFavicons();
                },
            },
        },
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                },
            },
        },
    },
});
