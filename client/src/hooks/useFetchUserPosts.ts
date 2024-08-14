import { PostData } from "types/data/postData"
import { useEffect, useState } from "react"
import fetchUserPostsService from "@services/posts/fetchUserPosts";

export default function useFetchUserPosts(userId: string, page: number = 1): { posts: PostData[] | undefined, error: string | undefined } {
    const [posts, setPosts] = useState<PostData[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchUserPostsService(userId, page.toString()).then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                setError(error.message);
                console.log(error);
            });
    }, [userId, page])

    return { posts, error };
}