/**
 * Regex to extract YouTube video ID from standard YouTube URLs.
 *
 * Supports:
 * - `https://www.youtube.com/watch?v=VIDEO_ID`
 * - `https://youtu.be/VIDEO_ID`
 * - `https://www.youtube.com/embed/VIDEO_ID`
 * - `https://www.youtube.com/v/VIDEO_ID`
 *
 * Regex breakdown:
 * - `https?:\/\/`: Matches "http" or "https" (optional).
 * - `(?:www\.)?`: Matches "www." if present (optional).
 * - `(?:youtube\.com\/|youtu\.be\/)`: Matches both YouTube domain and shortened URL.
 * - Handles URL variations like `/watch?v=`, `/embed/`, `/v/`, and query parameters.
 * - `([a-zA-Z0-9_-]{11})`: Captures the 11-character YouTube video ID.
 */
const constructYoutubeUrl = (
    url: string,
): { embedUrl: string; imageUrl: string; watchUrl: string } | null => {
    const urlRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(urlRegex);
    if (match) {
        const watchUrl = `https://www.youtube.com/watch?v=${match[1]}`;
        const imageUrl = `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
        const embedUrl = `https://www.youtube.com/embed/${match[1]}`;
        return { embedUrl, imageUrl, watchUrl };
    } else {
        return null;
    }
};

export default constructYoutubeUrl;
