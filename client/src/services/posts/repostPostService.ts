import { getCookie } from "@helpers/extractCookie";
import { UUID } from "crypto";

export default async function repostPostService(postId: UUID) {
    const token: string | undefined = getCookie("csrf_access_token");

    await fetch(`/api/v1/posts/${postId}/repost`, {
        method: "PATCH",
        headers: {
            "X-CSRF-TOKEN": token!
        },
    });
}