import { getCookie } from "@helpers/extractCookie";

export default async function subscribeToUserService(userId: string) {
    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    fetch(`/api/v1/users/${userId}/subscribe`, {
        headers: header,
        method: "PATCH",
    })
}