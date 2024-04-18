import React from "react";
import styles from "./tabcomponent.module.css";

type TabComponentProps = {
  children: React.ReactNode;
};

export default function TabComponent({
  children,
}: TabComponentProps): React.JSX.Element {
  return <div className={styles.contentTabs}>{children}</div>;
}
