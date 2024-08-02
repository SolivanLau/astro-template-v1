import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    adapter: netlify(),
    site: "https://astro-template-v1.netlify.app",
    build: {
        inlineStylesheets: "never",
    },
    integrations: [partytown()],
    image: {
        domains: ["astro.build"],
        remotePatterns: [{ protocol: "https" }],
    },
});
