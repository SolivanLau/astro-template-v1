/**
 * Middleware function verifying turnstile widget request any further API processing, such as newsletter or contact form.
 *
 * @param {FormData} data - The FormData object containing the "cf-turnstile-response" key and string value.
 *
 * @returns {Promise<Response>} - A Promise that resolves to a Response object with a JSON body containing a success key and a string value of "true" or "false".
 */

const turnstileVerify = async (data: FormData) => {
    const turnstileUrl: string = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const token = data.get("cf-turnstile-response");

    // VALIDATION: Turnstile Token
    if (!token) {
        console.log("Missing Turnstile Token");
        return new Response(
            JSON.stringify({
                success: false,
                message: "Please verify that you are human before signing up. Check the widget",
            }),
        );
    }

    // VALIDATION: Secret Key
    if (!process.env.TURNSTILE_SECRET_KEY) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Server Error with Turnstile key. Please try again later.",
            }),
            // { status: 500, statusText: "Server Error with Turnstile key. Please try again later." },
        );
    }

    // VERIFY REQUEST

    let requestBody = new FormData();
    requestBody.append("secret", process.env.TURNSTILE_SECRET_KEY);
    requestBody.append("response", token);

    try {
        const verify = await fetch(turnstileUrl, {
            method: "POST",
            body: requestBody,
        });

        // Network and CORS Errors
        if (!verify.ok) {
            return new Response(
                JSON.stringify({
                    success: false,
                    data: `Network or CORS Error:  ${verify.statusText}`,
                }),
                // { status: verify.status },
            );
        }

        // VERIFICATION RESPONSE
        const response = await verify.json();
        if (!response.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Could not verify you with Turnstile API. Please try again.",
                    data: response["error-codes"],
                }),
                // { status: 401 },
            );
        } else {
            console.log("Verified request via Turnstile API.");
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to process verification request.",
            }),
            // {
            //     status: (error as any).status || 500,
            //     statusText: (error as any).statusText || "Internal Server Error",
            // },
        );
    }
};

export default turnstileVerify;
