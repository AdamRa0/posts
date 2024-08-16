import { PostData } from "types/data/postData"
import { useEffect, useState } from "react"
import fetchUserRepliesService from "@services/posts/fetchUserRepiesService";

export default function useFetchUserReplies(userId: string): { replies: PostData[] | undefined, error: string | undefined } {
    const [replies, setReplies] = useState<PostData[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchUserRepliesService(userId).then(response => response.json())
            .then(data => setReplies(data))
            .catch(error => {
                setError(error.message);
                console.log(error);
            });
    }, [userId])

    return { replies, error };
}