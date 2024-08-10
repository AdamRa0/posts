import { getCookie } from "@helpers/extractCookie";

export default function deleteUserService() {
    const URL = "/api/v1/users/user/delete";

    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    fetch(URL, {
        headers: header,
        method: "DELETE"
    });
}