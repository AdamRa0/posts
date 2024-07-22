import { UUID } from "crypto";
import { useEffect, useState } from "react";
import deletePostService from "@services/posts/deletePostService";

export default function useDeletePost(postId: UUID): string {
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        deletePostService(postId).then(statusCode => {
            if (statusCode === 204) {
                setStatus("Updated successfully");
            } else {
                setStatus("Bad request");
            }
        })
    }, [postId]);

    return status;
}