import { User } from "types/data/userData";
import { AuthFormState } from "../states/authFomState";

export type authContextProp = {
    user: User | null,
    signOut?: () => void,
    signIn?: (param: AuthFormState) => void,
    signUp?: (param: AuthFormState) => void,
}