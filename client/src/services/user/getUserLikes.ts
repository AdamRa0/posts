import { getCookie } from "@helpers/extractCookie";

export async function getUserLikesService(userID: string): Promise<Response> {

    const URL = `/api/v1/users/${userID}/likes`;
    const token = getCookie("csrf_access_token");

    const headers = { "X-CSRF-TOKEN": token! };

    const response = await fetch(URL, {
        headers: headers
    })

    return response;
}