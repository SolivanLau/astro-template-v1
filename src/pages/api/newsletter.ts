export const prerender = false;
import type { APIRoute, APIContext } from "astro";
import turnstileVerify from "src/assets/scripts/lib/turnstileVerify";
const apiKey = import.meta.env.VITE_NEWSLETTER_API_KEY;
const dataCenter = import.meta.env.VITE_NEWSLETTER_DATA_CENTER;
const listId = import.meta.env.VITE_NEWSLETTER_LIST_ID;

export const POST: APIRoute = async ({ request }: APIContext) => {
    const data = await request.formData();

    // Form Validation
    const firstName = data.get("first-name");
    const lastName = data.get("last-name");
    const email = data.get("email");

    if (!email) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Please submit a valid email to subscribe to our newsletter.",
            }),
        );
    }

    // Turnstile validation before processing request
    const verify = await turnstileVerify(data);

    const verifyResponse = await verify.json();
    if (!verifyResponse.success) {
        console.log(verifyResponse.message);

        return new Response(
            JSON.stringify({
                success: false,
                message: verifyResponse.message,
            }),
        );
    }

    // MAIL CHIMP API REQUEST
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
                    message: "Failed to subscribe",
                    data: `${subscribe.status}:${subscribe.statusText}`,
                }),
            );
        }

        const response = await subscribe.json();

        console.log("MAIL CHIMP Response:", response);

        // API Error Handling
        if (response.errors.length !== 0 || response.error_count !== 0) {
            const errorMessage = response.errors[0].error;

            return new Response(
                JSON.stringify({
                    success: false,
                    message: errorMessage,
                    data: { errorType: "mailchimp", errors: response.error_count },
                }),
            );
        }

        // Success Response
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to subscribe!\nPlease try again at a later time.",
                data: error,
            }),
        );
    }
};
