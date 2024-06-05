import { postsData } from "../../data/dummyPostsData";
import { userData } from "../../data/dummyUserData";
import ListItemComponent from "./ListItemComponent";
import styles from "./listcomponent.module.css";

type ListComponentProps = {
  data: postsData[] | userData[];
  typeOfData: string;
};

export default function ListComponent({
  data,
  typeOfData,
}: ListComponentProps): React.JSX.Element {
  const items = data.map((item: postsData | userData) => (
    <ListItemComponent item={item} typeOfData={typeOfData} />
  ));

  return (
    <>
      <ul className={styles.list}>{items}</ul>
    </>
  );
}
