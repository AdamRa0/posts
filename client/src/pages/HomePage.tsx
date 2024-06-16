import React, { useEffect } from "react";
import styles from "./homepage.module.css";
import ListComponent from "@components/ui/ListComponent";
import { PostData } from "types/data/postData";
import useFetchPosts from "@hooks/useFetchPosts";

export default function HomePage(): React.JSX.Element {
  const posts: PostData[] | undefined = useFetchPosts();

  useEffect(() => {
    const eventSrc: EventSource = new EventSource("/listen");

    eventSrc.addEventListener("new-post", (event) => {
      console.log(JSON.stringify(event.data));
    });

    eventSrc.onerror = (err) => {
      console.log("Event Source failed: " + err);
      eventSrc.close();
    };

    return () => eventSrc.close();
  }, []);

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
