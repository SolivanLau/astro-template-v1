import fs from "fs/promises";

export async function downloadImage(url: string, filepath: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filepath, buffer);
    } catch (error) {
        console.error(`Error downloading image from ${url} to ${filepath}: ${error.message}`);
        throw error;
    }
}
