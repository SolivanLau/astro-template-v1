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

    // generic endpoint with no parameter specifications
    if (!queryParameters) {
        const url = new URL(`${import.meta.env.CMS_URL}/api/${endpoint}`);
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

    const url = new URL(`${import.meta.env.CMS_URL}/api/${endpoint}?${query}`);

    return url;
};

export default createQueryUrl;
