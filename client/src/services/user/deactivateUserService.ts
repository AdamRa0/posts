import { getCookie } from "@helpers/extractCookie";

export default function deactivateUserService() {
    const URL = "/api/v1/users/deactivate-account";

    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    fetch(URL, {
        headers: header,
        method: "PATCH"
    });
}