import { getUserService } from "@services/user/getUserService";
import { getCookie } from "@helpers/extractCookie";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";

export default function useFetchPostAuthorDetails(authorID: UUID) {
    const token = getCookie("csrf_access_token");
    const userID = authorID;
    const isUser = false;
    
    const { isLoading, data: author, error } = useQuery({
        queryKey: ['users', token, userID, isUser],
        queryFn: () => getUserService(token, isUser, userID),
    })

    return { isLoading, author, error }
}