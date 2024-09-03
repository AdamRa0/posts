import { getCookie } from "@helpers/extractCookie";
import { UUID } from "crypto";

export async function approvePostService(postId: UUID) {
    const token: string | undefined = getCookie("csrf_access_token");

    const response = await fetch(`/api/v1/posts/${postId}/approve`, {
        method: "PATCH",
        headers: {
            "X-CSRF-TOKEN": token!
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}

export async function unapprovePostService(postId: UUID) {
    const token: string | undefined = getCookie("csrf_access_token");

    const response = await fetch(`/api/v1/posts/${postId}/unapprove`, {
        method: "PATCH",
        headers: {
            "X-CSRF-TOKEN": token!
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}