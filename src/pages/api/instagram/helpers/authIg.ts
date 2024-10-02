import type { APIRoute } from "astro";
export const preload = false;

// Initially authenticate Test User
export const GET: APIRoute = async () => {
    const url = `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_INSTAGRAM_APP_ID}&redirect_uri=${import.meta.env.VITE_INSTAGRAM_URI}&scope=user_profile,user_media&response_type=code`;

    console.log(url);

    return new Response(
        JSON.stringify({
            success: true,
            message:
                "url created. Authorize and use the access code in the redirected link. exclude the #_ .",
            data: url,
        }),
    );
};
