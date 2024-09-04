import { useMutation } from "@tanstack/react-query";

import { resetPasswordService } from "@services/auth/resetPasswordService";

export function useResetPassword() {
    const { mutate: resetPassword } = useMutation({
        mutationFn: ({ emailAddress, username, password, id }: { emailAddress?: string, username?: string, password?: string, id?: string }) => resetPasswordService(emailAddress, username, password, id),
    });

    return { resetPassword };
}