import { UUID } from "crypto";

export async function getUserService(token: string, isUser: boolean = true, userID?: UUID): Promise<unknown> {

    const URL = isUser ? "/api/v1/users/profile" : `/api/v1/users/profile?user-id=${userID}`;

    const headers = isUser ? { "X_CSRF_TOKEN": token } : undefined;

    try {
        const response = await fetch(URL, {
            headers: headers
        })

        return response.json();
    } catch (e) {
        console.log(e);
    }
}