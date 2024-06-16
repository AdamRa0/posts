import { getCookie } from "@helpers/extractCookie";
import { PostType } from "types/data/postFormType";

export default async function createPostService(postData: PostType) {
    const token: string | undefined = getCookie("csrf_access_token");

    const postForm = new FormData();

    postForm.append("body", postData.body);

    if (postData.file !== undefined) postForm.append("file", postData.file)

    await fetch("/api/v1/posts/create_post", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token!
        },
        body: postForm,
    });
}