import fetchUserPostsService from "@services/posts/fetchUserPosts";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUserPosts(userId: string, page: number = 1) {
    const { isLoading, data: userPosts, error } = useQuery({
        queryKey: ["posts", userId, page],
        queryFn: () => fetchUserPostsService(userId, page.toString())
    });

    return { isLoading, userPosts, error };
}