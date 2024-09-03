import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "@services/user/getUsersService";

export default function useGetUsers() {
    const { isLoading: usersLoading, data: users, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsersService,
    })

    return { usersLoading, users, error }
}