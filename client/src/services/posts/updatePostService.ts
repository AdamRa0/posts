import { getCookie } from "@helpers/extractCookie";
import { UUID } from "crypto";

export default async function updatePostService(postId: UUID, body: string): Promise<number> {
    const token = getCookie("csrf_access_token");

    const UPDATE_POST_ROUTE = "/api/v1/posts/update_post";

    const data: { id: UUID, body: string } = {
        id: postId,
        body
    }

    let responseCode: number = 0;

    await fetch(UPDATE_POST_ROUTE, {
        body: JSON.stringify(data),
        headers: {
            "X-CSRF-TOKEN": token!
        }
    }).then(response => responseCode = response.status).catch(e => {
        responseCode = 400;
        console.log(e);
    })

    return responseCode;
}