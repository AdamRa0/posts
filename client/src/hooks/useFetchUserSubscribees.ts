import fetchSubscribeesService from "@/services/user/fetchSubscribeesService";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useFetchUserSubscribees(userId: string | UUID) {
    const { isLoading: subscribeesLoading, data: subscribees, error: subscribeesError } = useQuery({
        queryKey: ["subscribees", userId],
        queryFn: () => fetchSubscribeesService(userId),
    });

    return { subscribeesLoading, subscribees, subscribeesError };
}