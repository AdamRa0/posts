import { useEffect, useState } from "react";
import { PostContext } from "@contexts/postContext";
import useFetchPost from "@hooks/useFetchPost";
import useUpdatePost from "@hooks/useUpdatePost";
import useDeletePost from "@hooks/useDeletePost";
import createPostService from "@services/posts/createPostService";
import { PostContextProviderProps } from "types/props/PostContextProps";
import { PostData } from "types/data/postData";

async function createPost(post: PostData, route: string) {
  await createPostService(post, route);
}

export default function PostContextProvider({
  children,
  postId,
}: PostContextProviderProps) {
  const [post, setPost] = useState<PostData | undefined>();

  setPost(useFetchPost(postId).post);

  useEffect(() => {}, []);

  if (post === undefined) return <p>Loading...</p>;

  return (
    <>
      <PostContext.Provider
        value={{
          post: post!,
          createPost: createPost,
          updatePost: useUpdatePost,
          deletePost: useDeletePost,
        }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
}
