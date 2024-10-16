import type { APIRoute } from "astro";
export const preload = false;

export const POST: APIRoute = async ({ request }) => {
    const shortToken: string = await request.json();

    const url = new URL("https://graph.instagram.com/access_token");
    const params = new URLSearchParams({
        grant_type: "ig_exchange_token",
        client_secret: import.meta.env.VITE_INSTAGRAM_APP_SECRET,
        access_token: shortToken,
    });

    url.search = params.toString();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
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
