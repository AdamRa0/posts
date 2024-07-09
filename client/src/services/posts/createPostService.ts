import { getCookie } from "@helpers/extractCookie";
import { PostType } from "types/data/postFormType";

/**
 * Serves as service for both post and comment creation
 * @param postData - The post content and file if file uploaded
 * @param route - backend route to create a post or comment
 */

export default async function createPostService(postData: PostType, route: string) {
    const token: string | undefined = getCookie("csrf_access_token");

    const postForm = new FormData();

    postForm.append("body", postData.body);

    if (postData.file !== undefined) postForm.append("file", postData.file)

    await fetch(route, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token!
        },
        body: postForm,
    });
}