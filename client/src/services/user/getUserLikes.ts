import { getCookie } from "@helpers/extractCookie";

export async function getUserLikesService(userID: string) {

    const URL = `/api/v1/users/${userID}/likes`;
    const token = getCookie("csrf_access_token");

    const headers = { "X-CSRF-TOKEN": token! };

    const response = await fetch(URL, {
        headers: headers
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`${error.message}`);
    }

    const data = await response.json();

    return data;
}