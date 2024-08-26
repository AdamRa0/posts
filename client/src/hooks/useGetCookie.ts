import { useQuery } from "@tanstack/react-query";

import { getCookie } from "@helpers/extractCookie";

export function useGetCookie(name: string) {
    const { data: cookie, error } = useQuery({
        queryKey: ["authCookie", name],
        queryFn: () => getCookie(name)
    });


    return { cookie, error };
}