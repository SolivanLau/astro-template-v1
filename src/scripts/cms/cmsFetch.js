import createQueryUrl from "../cms/createQueryUrl";

const cmsFetch = async (endpoint, options) => {
	console.log("fetching");

	const url = createQueryUrl(endpoint, options);

	// network or cors errors
	try {
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.CMS_TOKEN}`,
			},
		});

		// server errors
		if (!response.ok) {
			switch (response.status) {
				case 404:
					throw new Error(
						"404, We could not find what you were looking for!",
					);
				case 500:
					throw new Error("500, internal server error");

				default:
					throw new Error(
						`HTTP Error: ${response.status}: ${response.statusText}`,
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
