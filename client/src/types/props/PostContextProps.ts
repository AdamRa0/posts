import { UUID } from "crypto";
import { ReactNode } from "react";

export type PostContextProviderProps = {
    children: ReactNode;
    postId: UUID;
};