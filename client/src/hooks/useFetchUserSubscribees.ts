import fetchSubscribeesService from "@/services/user/fetchSubscribeesService";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useFetchUserSubscribees(userId: string | UUID) {
    const { data: subscribees, error: subscribeesError } = useQuery({
        queryKey: ["user-subscribees", userId],
        queryFn: () => fetchSubscribeesService(userId),
    });

    return { subscribees, subscribeesError };
}