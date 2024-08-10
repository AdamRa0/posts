import { getCookie } from "@helpers/extractCookie";

export default function setAccountPrivacyService() {
    const URL = "/api/v1/users/set-account-privacy";

    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    fetch(URL, {
        headers: header,
        method: "PATCH"
    });
}