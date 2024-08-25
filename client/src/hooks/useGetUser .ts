import { getUserService } from "@services/user/getUserService";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(userId: string | UUID) {
    const userID = userId;
    const isUser = false;
    
    const { isLoading: appUserLoading, data: appUser, error } = useQuery({
        queryKey: ['users', userID, isUser],
        queryFn: () => getUserService(undefined, isUser, userID),
    })

    return { appUserLoading, appUser, error }
}