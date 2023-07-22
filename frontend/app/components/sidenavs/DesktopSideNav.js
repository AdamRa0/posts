import styles from "./desktopsidenav.module.scss";

import { useRouter } from "next/navigation";

import Button from "../Button";
import SquaresList from "../lists/SquaresList";

export default function DesktopSideNav() {
  const router = useRouter();

  return (
    <>
      <section className={styles.left}>
        <section className={styles.leftUpper}>
          <div>
            <p className={styles.sectionTitle}>Feed</p>
            <SquaresList />
          </div>
          <div>
            <p className={styles.sectionTitle}>Profile</p>
            {/* Show message if unauthenticated, else, show pfp, username, handle, notifications and settings */}
            <p>Sign up now for a personalized square</p>
          </div>
        </section>
        <section className={styles.leftLower}>
          <div>
            <div className={styles.leftLowerUpper}>
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
      </section>
    </>
  );
}
