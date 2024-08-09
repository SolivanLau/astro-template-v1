import qs from "qs";

const createQueryUrl = (endpoint, queryParameters) => {
    // sanitize endpoint with not additional /

    console.log("CREATING URL");

    endpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const isProduction = process.env.NODE_ENV === "production";

    const urlBase = isProduction ? process.env.CMS_URL : "http://localhost:1337";

    console.log(urlBase);

    // generic endpoint with no parameter specifications
    if (!queryParameters) {
        console.log("no query paramters given");
        const url = new URL(`${urlBase}/api/${endpoint}`);
        console.log(url);
        return url;
    }

    // qs library
    try {
        console.log(" query paramters given");

        const query = qs.stringify(
            {
                ...queryParameters,
            },
            {
                encodeValuesOnly: true,
            },
        );

        const url = new URL(`${urlBase}/api/${endpoint}?${query}`);

        return url;
    } catch (error) {
        console.error(`Error creating query URL: ${error.message}`);
        console.log(error);
    }
};

export default createQueryUrl;
