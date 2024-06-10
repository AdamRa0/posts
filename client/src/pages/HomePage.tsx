import React from "react";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";
import ListComponent from "@components/ui/ListComponent";

export default function HomePage(): React.JSX.Element {
  const posts: postsData[] = provideDummyPosts();
  return (
    <>
      <ListComponent data={posts} typeOfData={"post"} />
    </>
  );
}
