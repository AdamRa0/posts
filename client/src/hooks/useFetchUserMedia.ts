import { PostData } from "types/data/postData"
import { useEffect, useState } from "react"
import fetchUserRepliesService from "@services/media/getUserMediaService";

export default function useFetchUserMedia(userId: string): { postsWithMedia: PostData[] | undefined, error: string | undefined } {
    const [postsWithMedia, setPostsWithMedia] = useState<PostData[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchUserRepliesService(userId).then(response => response.json())
            .then(data => setPostsWithMedia(data))
            .catch(error => {
                setError(error.message);
                console.log(error);
            });
    }, [userId])

    return { postsWithMedia, error };
}