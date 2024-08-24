import { getUserLikesService } from "@services/user/getUserLikes";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserLikes(userId: string) {
    const { isLoading, data: likes, error } = useQuery({
        queryKey: ["likes", userId],
        queryFn: () => getUserLikesService(userId)
    });

    return { isLoading, likes, error };
}