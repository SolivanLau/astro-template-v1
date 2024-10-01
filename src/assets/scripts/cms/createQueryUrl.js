import qs from "qs";

/**
 * Creates a query URL for the Strapi CMS. Will generate a URL with parameters
 * based on the passed queryParameters object. If the queryParameters object is
 * null or undefined, it will return the base URL for the passed endpoint.
 *
 * @param {string} endpoint The endpoint to query, e.g. "events" or "about".
 * @param {object} queryParameters An object containing query parameters, e.g.
 * {populate: {title: "*", poster: "*"}}.
 *
 * @return {URL} A URL object that can be used to query the Strapi CMS.
 */
const createQueryUrl = (endpoint, queryParameters) => {
    // sanitize endpoint with not additional slash /
    endpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

    const isProduction = import.meta.env.PROD;

    const urlBase = isProduction ? import.meta.env.CMS_URL : "http://localhost:1337";
    console.log(
        `Creating cms query url for: ${endpoint.toUpperCase()}. ${isProduction ? "Production CMS" : "Localhost CMS"}`,
    );

    // Strapi CMS preview mode: retrieve only draft entries
    const previewMode =
        process.env.IS_PREVIEW_MODE === "true"
            ? {
                  publicationState: "preview",
              }
            : null;

    // generic endpoint with no parameter specifications
    if (!queryParameters) {
        const url = new URL(`${urlBase}/api/${endpoint}`);
        return url;
    }

    // qs library
    try {
        const query = qs.stringify(
            {
                ...queryParameters,
                ...previewMode,
            },
            {
                encodeValuesOnly: true,
            },
        );

        const url = new URL(`${urlBase}/api/${endpoint}?${query}`);
        return url;
    } catch (error) {
        console.error(`Error creating query URL: ${error.message}`, error);
    }
};

export default createQueryUrl;
