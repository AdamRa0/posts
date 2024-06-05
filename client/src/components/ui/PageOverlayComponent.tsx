import { ReactNode } from "react";
import styles from "./pageoverlaycomponent.module.css";

type pageOverlayProps = {
  children: ReactNode;
};

export default function PageOverlayComponent({ children }: pageOverlayProps) {
  return <section className={styles.pageOverlay}>{children}</section>;
}
