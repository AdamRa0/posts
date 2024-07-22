import { UUID } from "crypto";
import { getCookie } from "@helpers/extractCookie";

export default async function deletePostService(postId: UUID): Promise<number> {
    const token = getCookie("csrf_access_token");
    const DELETE_POST_ROUTE: string = `api/v1/posts/${postId}`;

    let responseCode: number = 0;

    await fetch(DELETE_POST_ROUTE, {
        headers: { "X-CSRF-TOKEN": token! },
        method: "DELETE"
    }).then(response => responseCode = response.status).catch(e => {
        responseCode = 400;
        console.log(e);
    });

    return responseCode;
}