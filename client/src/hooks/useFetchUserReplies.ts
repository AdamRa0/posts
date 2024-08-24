import fetchUserRepliesService from "@services/posts/fetchUserRepiesService";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUserReplies(userId: string) {
    const { isLoading, data: replies, error } = useQuery({
        queryKey: ["replies", userId],
        queryFn: () => fetchUserRepliesService(userId)
    });

    return { isLoading, replies, error };
}