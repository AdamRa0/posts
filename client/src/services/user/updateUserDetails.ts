import { getCookie } from "@/helpers/extractCookie";

export async function updateUserDetailsService(emailAddress?: string, handle?: string, username?: string): Promise<Response> {

    const token = getCookie("csrf_access_token");

    const URL = "/api/v1/users/profile/update";

    const headers = { "X-CSRF-TOKEN": token! };

    const form = new FormData();

    
    if (emailAddress) form.append("email_address", emailAddress);
    if (handle) form.append("handle", handle);
    if (username) form.append("username", username);

    const response = await fetch(URL, {
        headers: headers,
        method: "PATCH",
        body: form,
    })

    return response;
}