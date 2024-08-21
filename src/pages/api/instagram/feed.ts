import type { APIRoute } from "astro";
export const preload = false;

export const GET: APIRoute = async () => {
    const url = new URL("https://graph.instagram.com/me/media");

    const params = new URLSearchParams({
        fields: "id,caption,media_type,media_url,thumbnail_url,permalink",
        access_token: process.env.INSTAGRAM_APP_ACCESS_TOKEN,
        limit: "8",
    });

    url.search = params.toString();
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error. Status: ${response.status}. Response: ${errorText}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};
