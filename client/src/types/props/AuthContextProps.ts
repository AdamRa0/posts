import { AuthFormState } from "../states/authFomState";

export type authContextProp = {
    signOut?: () => void,
    signIn?: (param: AuthFormState) => void,
    signUp?: (param: AuthFormState) => void,
}