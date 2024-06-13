import { User } from "types/data/userData";

export type authContextProp = {
    user: User | null,
    signOut?: () => void,
}