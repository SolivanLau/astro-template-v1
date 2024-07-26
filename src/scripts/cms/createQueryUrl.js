import qs from "qs";

const createQueryUrl = (endpoint, queryParameters) => {
    if (!queryParameters) {
        const url = new URL(`${import.meta.env.CMS_URL}/api/${endpoint}`);
        return url;
    }

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
