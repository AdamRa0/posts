"use client";

import styles from "./privacyandsecurity.module.scss";

import Button from "../buttons/Button";

import { AuthContext } from "@/app/providers/AuthProvider";
import { useContext } from "react";

export default function PrivacyAndSecurity() {
  const authenticatedUser = useContext(AuthContext);

  return (
    <>
      <section className={styles.privacySection}>
        <div className={styles.privacyItem}>
          <p>Set Account to private: </p>
          <label className={styles.switch}>
            <input type="checkbox" value={authenticatedUser.is_private} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <Button text={"Save privacy settings"} />
      </section>
    </>
  );
}
