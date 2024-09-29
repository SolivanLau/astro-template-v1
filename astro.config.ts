import { defineConfig } from "astro/config";
import fetchFavicons from "./src/assets/scripts/prebuild/fetchFavicons";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    adapter: netlify({
        imageCDN: false,
    }),
    redirects: {
        "/admin": "https://strapi-production-2381.up.railway.app/admin",
    },
    site: "https://astro-template-v1.netlify.app",
    build: {
        inlineStylesheets: "never",
    },
    image: {
        domains: ["astro.build"],
        remotePatterns: [{ protocol: "https" }],
    },
    integrations: [
        partytown(),
        icon({
            iconDir: "src/assets/icons",
        }),
        {
            name: "prebuild",
            hooks: {
                "astro:build:start": async (options) => {
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
