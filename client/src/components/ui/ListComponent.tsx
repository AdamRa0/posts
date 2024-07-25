import { PostData } from "types/data/postData";
import ListItemComponent from "./ListItemComponent";
import styles from "./listcomponent.module.css";
import { User } from "types/data/userData";

type ListComponentProps = {
  data: PostData[] | User[];
  typeOfData: string;
};

export default function ListComponent({
  data,
  typeOfData,
}: ListComponentProps): React.JSX.Element {
  const items = data.map((item: PostData | User) => (
    <ListItemComponent item={item} typeOfData={typeOfData} />
  ));

  return (
    <>
      <ul
        className={typeOfData !== "comment" ? styles.generalList : styles.list}
      >
        {items}
      </ul>
    </>
  );
}
