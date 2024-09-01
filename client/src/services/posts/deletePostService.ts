import { UUID } from "crypto";
import { getCookie } from "@helpers/extractCookie";

export default async function deletePostService(postId: UUID) {
    const token = getCookie("csrf_access_token");
    const DELETE_POST_ROUTE: string = `/api/v1/posts/${postId}`;

    const response = await fetch(DELETE_POST_ROUTE, {
        headers: { "X-CSRF-TOKEN": token! },
        method: "DELETE"
    });

    console.log(response);

    if (!response.ok) {
        console.log(response);
        const error = await response.json();

        throw new Error(`${error.message}`);
    }
}