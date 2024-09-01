import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "@contexts/authContext";
import { changePasswordService } from "@services/user/changePasswordService";


export function useChangePassword() {

    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const { mutate: changePassword } = useMutation({
        mutationFn: ({ password }: { password: string }) => changePasswordService(password),
        onSuccess: () => {
            toast.success("Password change successfull");
            signOut!();
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { changePassword };
}
