import { createContext } from "react";
import { authContextProp } from "types/props/AuthContextProps";

export const AuthContext = createContext<authContextProp>({ user: null });