import { getCookie } from "@helpers/extractCookie";
import { PostType } from "types/data/postFormType";

export default async function createPostService(postData: PostType, route: string) {
    const token: string | undefined = getCookie("csrf_access_token");

    const postForm = new FormData();

    postForm.append("body", postData.body);

    if (postData.file !== undefined) postForm.append("file", postData.file)

    const response = await fetch(route, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token!
        },
        body: postForm,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}