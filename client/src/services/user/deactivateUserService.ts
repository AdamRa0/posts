import { getCookie } from "@helpers/extractCookie";

export default async function deactivateUserService() {
    const URL = "/api/v1/users/deactivate-account";

    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    const response = await fetch(URL, {
        headers: header,
        method: "PATCH"
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}