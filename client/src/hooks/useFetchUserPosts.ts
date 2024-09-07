import fetchUserPostsService from "@services/posts/fetchUserPosts";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFetchUserPosts(userId: string) {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts', userId],
        queryFn: ({ pageParam }: { pageParam: number }) => fetchUserPostsService(userId, pageParam.toString()),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => lastPage.length === 20 ? allPages.length + 1 : undefined,
    });

    return { data, error, fetchNextPage, hasNextPage, status };
}