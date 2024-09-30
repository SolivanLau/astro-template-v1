import qs from "qs";

const createQueryUrl = (endpoint, queryParameters) => {
    // sanitize endpoint with not additional slash /
    endpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

    const isProduction = import.meta.env.PROD;

    const urlBase = isProduction ? process.env.CMS_URL : "http://localhost:1337";
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
