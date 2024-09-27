/**
 * Returns a link to Google Maps search results for a given location. Based off a custom Strapi component for event pages.
 *
 * @param {{addressLineOne: string, addressLineTwo: string, city: string, stateOrProvince: string, postalCode: string}} location
 * The location to search for.
 *
 * @returns {string} The link to Google Maps search results.
 */
export const generateGoogleMapsLink = (location: {
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
}): string => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";

    // Concatenate address parts into single query string

    const addressComponents = [
        location.addressLineOne,
        location.addressLineTwo,
        location.city,
        location.stateOrProvince,
        location.postalCode,
    ].filter((component) => component != null);

    const queryString = addressComponents.join(" ");

    // Encode the full query string
    const encodedQueryString = encodeURIComponent(queryString);
    return `${baseUrl}${encodedQueryString}`;
};
