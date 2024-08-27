import fetchPostsService from "@/services/posts/fetchPostsService"
import { useQuery } from "@tanstack/react-query"

export default function useFetchPosts(page: number) {
    const { isLoading, data: posts, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPostsService(page),
    });

    return { isLoading, posts, error };
}