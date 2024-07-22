import { useEffect, useState } from "react";
import { PostContext } from "@contexts/postContext";
import useFetchPost from "@hooks/useFetchPost";
import { PostContextProviderProps } from "types/props/PostContextProps";
import { PostData } from "types/data/postData";
import createPostService from "@/services/posts/createPostService";

async function createPost(post: PostData, route: string) {
  await createPostService(post, route);
}

export default function PostContextProvider({
  children,
  postId,
}: PostContextProviderProps) {
  const [post, setPost] = useState<PostData | undefined>();

  setPost(useFetchPost(postId).post);

  useEffect(() => { }, [])

  if (post === undefined) return <p>Loading...</p>;

  return (
    <>
      <PostContext.Provider value={{ post: post!, createPost: createPost }}>
        {children}
      </PostContext.Provider>
    </>
  );
}
