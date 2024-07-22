import { UUID } from "crypto";
import { useEffect, useState } from "react";
import updatePostService from "@services/posts/updatePostService";

export default function useUpdatePost(postId: UUID, body: string) {
    const [status, setStatus] = useState<string>();

    useEffect(() => {
        updatePostService(postId, body).then(statusCode => {
            if (statusCode === 200) {
                setStatus("Updated successfully");
            } else {
                setStatus("Bad request");
            }
        })
    }, [postId, body]);

    return status;
}