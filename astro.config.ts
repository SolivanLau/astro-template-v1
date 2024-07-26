import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    adapter: netlify(),
    build: {
        inlineStylesheets: "never",
    },
    integrations: [partytown()],
});
