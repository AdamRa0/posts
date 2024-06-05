import styles from "./listcomponent.module.css";
import { postsData } from "../data/dummyPostsData";
import ListItemComponent from "./ListItemComponent";

export default function ListComponent(posts: { posts: postsData[] }): React.JSX.Element {

    const postItems = posts.posts.map((post) => (
      <ListItemComponent data={post}/>
    ));
    return (
      <>
        <ul className={styles.list}>{postItems}</ul>
      </>
    );
  }