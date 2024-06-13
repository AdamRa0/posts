import { User } from "types/data/userData";
import { createContext } from "react";

export const AuthContext = createContext<User | null>(null);