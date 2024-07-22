import { createContext } from "react";

import { PostContextProps } from "types/props/PostContextProviderProps";

export const PostContext = createContext<PostContextProps>({ post: null });