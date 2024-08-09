import type { APIRoute } from "astro";

export const prerender = false;

const apiKey = import.meta.env.NEWSLETTER_API_KEY;
const dataCenter = import.meta.env.NEWSLETTER_DATA_CENTER;
const listId = import.meta.env.NEWSLETTER_LIST_ID;

export const POST: APIRoute = async ({ request }) => {
    const { email, firstName, lastName } = await request.json();

    try {
        const subscribe = await fetch(
            `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    members: [
                        {
                            email_address: email,
                            status: "subscribed",
                            merge_fields: {
                                FNAME: firstName,
                                LNAME: lastName,
                            },
                        },
                    ],
                    update_existing: true,
                }),
            },
        );

        // Network and CORS Errors
        if (!subscribe.ok) {
            console.log(subscribe);
            return new Response(
                JSON.stringify({
                    success: false,
                    data: `Error ${subscribe.status}:${subscribe.statusText} `,
                }),
            );
        }
        const response = await subscribe.json();

        // API Error Handling
        if (response.errors.length !== 0 || response.error_count !== 0) {
            const errorMessage = response.errors[0].error;

            return new Response(
                JSON.stringify({
                    success: false,
                    data: { errors: response.error_count, message: errorMessage },
                }),
            );
        }

        // Success Response
        const members = [...response.new_members, ...response.updated_members];
        return new Response(JSON.stringify({ success: true, data: { members } }));
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Failed to read request body" }), {
            status: error.status || 500,
            statusText: error.statusText,
        });
    }
};
