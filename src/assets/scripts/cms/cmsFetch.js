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
                    throw new Error(
                        `404, could not find resource!  ${response.statusText}`,
                        response,
                    );
                case 500:
                    throw new Error(`500, internal server error: ${response.statusText}`, response);
                default:
                    throw new Error(
                        `HTTP Error: ${response.status}: ${response.statusText}`,
                        response,
                    );
            }
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
};

export default cmsFetch;
