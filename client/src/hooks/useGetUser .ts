import { getUserService } from "@services/user/getUserService";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(userId?: string | UUID, token?: string, isAppUser?: boolean) {
    const authToken = token || undefined;
    const userID = userId || undefined;
    const isUser = isAppUser || false;
    
    const { isLoading: appUserLoading, data: appUser, error } = useQuery({
        queryKey: ['users', userID, isUser],
        queryFn: () => getUserService(authToken, isUser, userID),
    })

    return { appUserLoading, appUser, error }
}

export function useGetAuthenticatedUser() {
    const { isLoading: authenticatedUserLoading, data: authenticatedUser, error } = useQuery({
        queryKey: ["authenticatedUser"],
        queryFn: () => getUserService(undefined, true),
    })

    return { authenticatedUserLoading, authenticatedUser, error }
}