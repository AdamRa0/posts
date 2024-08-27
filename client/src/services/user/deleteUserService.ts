import { getCookie } from "@helpers/extractCookie";

export default async function deleteUserService() {
    const URL = "/api/v1/users/user/delete";

    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    const response = await fetch(URL, {
        headers: header,
        method: "DELETE"
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return;
}