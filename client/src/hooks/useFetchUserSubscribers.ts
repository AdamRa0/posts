import fetchSubscribersService from "@/services/user/fetchSubscribersService";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useFetchUserSubscribers(userId: string | UUID) {
    const { data: subscribers, error: subscribersError } = useQuery({
        queryKey: ["subscribers", userId],
        queryFn: () => fetchSubscribersService(userId)
    });

    return { subscribers, subscribersError };
}