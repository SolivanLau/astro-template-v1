/** @type {import("prettier").Config} */
export default {
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    printWidth: 100,
};
