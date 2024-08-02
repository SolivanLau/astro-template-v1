import qs from "qs";
// Interfaces
export interface queryParameters {
    populate: string | object;
    fields: Array<string>;
    filters: object;
    locale: string | Array<string>;
    publicationState: string;
    sort: string | Array<string>;
    pagination: object;
}

const createQueryUrl = (endpoint: string, queryParameters: queryParameters) => {
    // sanitize endpoint with not additional /
    endpoint.startsWith("/") && endpoint.slice(1);

    let urlBase = import.meta.env.PROD ? import.meta.env.CMS_URL : "http://localhost:1337";

    // generic endpoint with no parameter specifications
    if (!queryParameters) {
        const url = new URL(`${urlBase}/api/${endpoint}`);
        return url;
    }

    // qs library
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
};

export default createQueryUrl;
