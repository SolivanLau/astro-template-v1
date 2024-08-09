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
    adapter: netlify(),
    site: "https://astro-template-v1.netlify.app",
    // vite: {
    //     resolve: {
    //         alias: {
    //             "@components": resolve(__dirname, "src/components"),
    //             "@layouts": resolve(__dirname, "src/layouts"),
    //             "@pages": resolve(__dirname, "src/pages"),
    //             "@assets": resolve(__dirname, "src/assets"),
    //             "@icons": resolve(__dirname, "src/assets/icons"),
    //             "@images": resolve(__dirname, "src/assets/images"),
    //             "@styles": resolve(__dirname, "src/assets/styles"),
    //             "@scripts": resolve(__dirname, "src/assets/scripts"),
    //         },
    //     },
    // },
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
            iconDir: "@icons",
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
