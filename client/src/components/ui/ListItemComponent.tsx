import styles from "./listitemcomponent.module.css";
import PostItemComponent from "../feature/PostItemComponent";
import { postsData } from "../../data/dummyPostsData";
import { userData } from "../../data/dummyUserData";
import { useNavigate } from "react-router-dom";

type ListComponentData = {
  item: postsData | userData;
  typeOfData: string;
};

export default function ListItemComponent({
  item,
  typeOfData,
}: ListComponentData): React.JSX.Element {
  const link =
    typeOfData === "post" ? `post/${item.id}` : `user/${item.handle}`;

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(link);
  }

  return (
    <>
      <li
        className={styles.item}
        key={item.id}
        onClick={handleNavigate}
        tabIndex={0}
      >
        {typeOfData === "post" ? (
          <PostItemComponent post={item as postsData} />
        ) : null}
      </li>
    </>
  );
}
