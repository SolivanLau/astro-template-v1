import { defineConfig } from "astro/config";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fetchFavicons from "./src/assets/scripts/prebuild/fetchFavicons";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    adapter: netlify({
        imageCDN: false,
    }),
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
});
