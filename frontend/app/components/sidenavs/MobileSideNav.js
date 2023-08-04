import styles from "./mobilesidenav.module.scss";
import Button from "../buttons/Button";
import NotificationsAndSettingsList from "../lists/NotificationsAndSettingsList";
import SquaresList from "../lists/SquaresList";

import Link from "next/link";
import Image from "next/image";

export default function MobileSideNav({ isOpen, authenticatedUser }) {
  return (
    <section
      className={
        isOpen
          ? authenticatedUser !== null
            ? `${styles.mobileSideNav} ${styles.mobileSideNavAuthenticated} ${styles.active}`
            : `${styles.mobileSideNav} ${styles.active}`
          : styles.mobileSideNav
      }
    >
      <section className={styles.mobileSideNavUpper}>
        <div>
          <p className={styles.sectionTitle}>Feed</p>
          <SquaresList />
        </div>
        <div>
          <p className={styles.sectionTitle}>Profile</p>
          {authenticatedUser !== null ? (
            <div className={styles.detailsAndSettingsContainer}>
              <div className={styles.userDetails}>
                <Image
                  src={`/api/v1/media/${authenticatedUser.profile_image}`}
                  width={60}
                  height={60}
                  alt="User profile image"
                />
                <div className={styles.userInternetNames}>
                  <Link href="/[profile]" as={`/${authenticatedUser.handle}`}>
                    <p className={styles.username}>
                      {authenticatedUser.username}
                    </p>
                  </Link>
                  <Link href="/[profile]" as={`/${authenticatedUser.handle}`}>
                    <p className={styles.handle}>{authenticatedUser.handle}</p>
                  </Link>
                </div>
              </div>
              <div className={styles.notificationsAndSettings}>
                <NotificationsAndSettingsList />
              </div>
            </div>
          ) : (
            <p>Sign up now for a personalized square</p>
          )}
        </div>
      </section>
      {authenticatedUser !== null ? (
        <div></div>
      ) : (
        <section className={styles.mobileSideNavLower}>
          <div>
            <div className={styles.mobileSideNavLowerUpper}>
              <h2>New to posts?</h2>
              <Button
                text={"Join Posts"}
                handleOnClick={() => router.push("/auth/signup")}
              />
            </div>
            <p>
              By signing up, you agree to our <span>terms of service</span> and{" "}
              <span>privacy policy</span> including <span>cookie use</span>
            </p>
          </div>
        </section>
      )}
    </section>
  );
}
