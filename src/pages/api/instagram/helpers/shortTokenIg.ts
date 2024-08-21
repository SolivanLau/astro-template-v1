import type { APIRoute } from "astro";
export const preload = false;

// Generate short lived access token via authenticated test users access code
export const GET: APIRoute = async () => {
    const url = "https://api.instagram.com/oauth/access_token";

    const params = new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID,
        client_secret: process.env.INSTAGRAM_APP_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_URI,
        code: "AQAGbSx5DwcEf3A270bw8ZHRYTnFEWwDAMoVIGXyrvyKd1hB3Ro6LJwa3tssbm3TBY3XHEofA2je-bUPXSWPa6zg2bXCQIQYK5BYYsRlp8rVuy0FoNgrfbUb52KOjtRdjp7MPUaPqNrc_BqdDfIQl1ztLk52qvzjZ7NFV-GgAYMPUhXWM3LqqrVPzu96oi3dkdtjul4tR3cbTTf9fevcN28ji2RYDeByoouvjhDCrE2w1g",
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            body: params.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

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
