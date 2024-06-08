import React from "react";
import ListComponent from "../components/ui/ListComponent";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";

export default function HomePage(): React.JSX.Element {
  const posts: postsData[] = provideDummyPosts();
  return (
    <>
      <ListComponent data={posts} typeOfData={"post"} />
    </>
  );
}
