import cmsFetch from "../cms/cmsFetch";
import { downloadImage } from "../lib/downloadImage";
import path from "path";

const queryParameters = {
    populate: {
        favicon: {
            populate: "*",
        },
    },
};

const fetchFavicons = async () => {
    const faviconQuery = await cmsFetch("site-information", queryParameters);
    const favicons = faviconQuery?.attributes?.favicon ?? [];

    // PRODUCTION: Download fetched images for local use of Favicons
    if (favicons || favicons.length > 0) {
        const fileDest = path.resolve(process.cwd(), "public");

        for (const icon of favicons) {
            const { type, size } = icon;
            const { ext, url } = icon.imageMedia.data.attributes;
            // File Path
            const fileName = `favicon-${type}-${size}x${size}${ext}`;
            const filePath = path.resolve(fileDest, fileName);
            try {
                await downloadImage(url, filePath);
                console.log(`Downloaded ${fileName} to ${filePath}`);
            } catch (error) {
                console.error(`Failed to download ${fileName}:`, error);
            }
        }
    }
};

export default fetchFavicons;
