import React from "react";
import styles from './homepage.module.css';
import ListComponent from "@components/ui/ListComponent";
import { PostData } from "types/data/postData";
import useFetchPosts from "@hooks/useFetchPosts";

export default function HomePage(): React.JSX.Element {
  const posts: PostData[] | undefined = useFetchPosts();
  return (
    <>
      {posts === undefined ? (
        <div className={styles.loaderContainer}>
          <p>Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.container}>
          <p>No posts</p>
        </div>
      ) : (
        <ListComponent data={posts} typeOfData={"post"} />
      )}
    </>
  );
}
