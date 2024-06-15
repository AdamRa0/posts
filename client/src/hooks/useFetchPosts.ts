import { PostData } from "types/data/postData"
import { useEffect, useState } from "react"
import fetchPostsService from "@/services/posts/fetchPostsService"

export default function useFetchPosts(): PostData[] | undefined {
    const [posts, setPosts] = useState<PostData[]>()

    useEffect(() => {
        fetchPostsService().then(response => response.json())
            .then(data => setPosts(data))
            // 404 occurs since page does not exist
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch(_ => setPosts([])); 
    }, [])

    return posts;
}