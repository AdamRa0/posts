import styles from "./listitemcomponent.module.css";
import PostItemComponent from "@components/feature/PostItemComponent";
import { useNavigate } from "react-router-dom";
import { PostData } from "types/data/postData";
import { User } from "types/data/userData";

type ListComponentData = {
  item: PostData | User;
  typeOfData: string;
};

export default function ListItemComponent({
  item,
  typeOfData,
}: ListComponentData): React.JSX.Element {
  const link =
    typeOfData === "post"
      ? `/post/${item.id}`
      : `/user/${(item as User).handle}`;

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
          <PostItemComponent post={item as PostData} />
        ) : null}
      </li>
    </>
  );
}
