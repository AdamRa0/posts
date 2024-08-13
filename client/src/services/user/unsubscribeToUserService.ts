import { getCookie } from "@helpers/extractCookie";

export default async function unsubscribeToUserService(userId: string) {
    const token = getCookie("csrf_access_token");

    const header = { "X-CSRF-TOKEN": token! };

    fetch(`/api/v1/users/${userId}/unsubscribe`, {
        headers: header,
        method: "PATCH",
    })
}