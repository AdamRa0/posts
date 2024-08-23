import React, { useState } from "react";
import styles from "./homepage.module.css";
import ListComponent from "@components/ui/ListComponent";
import useFetchPosts from "@hooks/useFetchPosts";

export default function HomePage(): React.JSX.Element {
  const [page, setPage] = useState<number>(1);

  const { isLoading, posts, error } = useFetchPosts(page);

  if (error)
    return (
      <div className={styles.loaderContainer}>
        <p>Could not fetch posts</p>
      </div>
    );

  return (
    <>
      {isLoading ? (
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
