/**
 * Converts a string representing a date (in any format that can be parsed by the
 * `Date` constructor) into a human-readable, localized string in the format
 * "Month Day, Year" (e.g. "January 1, 2022" for the input "2022-01-01T00:00:00Z").
 *
 * @param {string} data - The date string to be converted
 * @returns {string} The human-readable date string
 */
export const formatDate = (data: string, type: "long" | "short" = "long"): string => {
    const date = new Date(data);
    let options: Intl.DateTimeFormatOptions;

    switch (type) {
        case "long":
            options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            break;
        case "short":
            options = {
                year: "numeric",
                month: "short",
                day: "numeric",
            };
            break;
    }

    return date.toLocaleDateString("en-US", options);
};

/**
 * Converts a time string in the format "HH:MM" into a human-readable, lowercase
 * string in 12-hour format (e.g. "12:00 PM").
 *
 * @param {string} timeString - The time string in the format "HH:MM"
 * @returns {string} A human-readable time string
 */
export const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date(2000, 0, 1, parseInt(hours), parseInt(minutes));
    return date
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .toLowerCase()
        .replace(/ +/g, "");
};

/**
 * Returns an object with the current season's start and end dates, as well as
 * the start and end years of the season, given the current date.
 *
 * The Toronto Wind Collective's seasons are defined as running from September
 * to June of the following year. This function takes a Date object as input and
 * returns the start and end dates of the current season, as well as the start and
 * end years of the season.
 *
 * @param {Date} currentDate - The current date
 * @returns {Object} An object with the following properties:
 *  - `seasonStartYear`: The year that the season starts in
 *  - `seasonEndYear`: The year that the season ends in
 *  - `seasonStart`: The date of the first day of the season
 *  - `seasonEnd`: The date of the last day of the season
 */
export const getCurrentSeason = (currentDate: Date) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // accounting for 0 based index for months

    let seasonStartYear: number, seasonEndYear: number;

    if (currentMonth >= 9) {
        // If it's September or later
        seasonStartYear = currentYear;
        seasonEndYear = currentYear + 1;
    } else {
        seasonStartYear = currentYear - 1;
        seasonEndYear = currentYear;
    }
    const seasonStart = new Date(`${seasonStartYear}-09-01`);
    const seasonEnd = new Date(`${seasonEndYear}-06-30`);

    return { seasonStartYear, seasonEndYear, seasonStart, seasonEnd };
};

/**
 * Converts a string representing a date (in any format that can be parsed by the
 * `Date` constructor) into a Date object.
 *
 * @param {string} date - The date string to be converted
 * @returns {Date} The parsed Date object
 */
export const parseDate = (date: string) => {
    return new Date(date);
};
