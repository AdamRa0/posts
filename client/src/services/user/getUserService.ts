import { UUID } from "crypto";

export async function getUserService(token?: string, isUser: boolean = true, userID?: UUID): Promise<Response> {

    const URL = isUser ? "/api/v1/users/profile" : `/api/v1/users/profile?user-id=${userID}`;

    const headers = isUser ? { "X-CSRF-TOKEN": token! } : undefined;

    const response = await fetch(URL, {
        headers: headers
    })

    return response;
}