import { useMutation } from "@tanstack/react-query";

import { forgotUsernameService } from "@services/auth/forgotUsernameService";

export function useForgetUsername() {
    const { mutate: forgotUsername, error } = useMutation({
        mutationFn: forgotUsernameService,
    });

    return { forgotUsername, error };
}