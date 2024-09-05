import createQueryUrl from "./createQueryUrl";

const cmsFetch = async (endpoint, options) => {
    const url = createQueryUrl(endpoint, options);

    // network or cors errors
    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CMS_TOKEN}`,
            },
        });

        // server errors
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    console.error(
                        `404, could not find resource for ${endpoint}!  ${response.statusText}`,
                        response,
                    );
                    return null;
                case 500:
                    console.error(
                        `500, internal server error when querying for ${endpoint}: ${response.statusText}`,
                        response,
                    );
                    return null;
                default:
                    console.error(
                        `HTTP Error: ${response.status}: ${response.statusText}`,
                        response,
                    );
                    return null;
            }
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching CMS data from ${endpoint}: ${error}`);
    }
};

export default cmsFetch;
