import LogoPlusBrand from "@/app/components/logo-and-brand/LogoPlusBrand";
import styles from "./page.module.scss";
import Button from "@/app/components/Button";
import Link from "next/link";
import InputComponent from "@/app/components/InputComponent";

export default function Page() {
  return (
    <section className={styles.signInPage}>
      <div className={styles.signInLeft}>
        <LogoPlusBrand logoDimens={24} />
        <ul>
          <li>
            <div>
              <h3>Meet</h3>
              <p>
                Join this robust community consisting of members from all over
                the globe
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3>Greet</h3>
              <p>
                Say hello by engaging in the numerous conversions available or
                by starting one.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3>Connect</h3>
              <p>
                Subscribe to members with simlar insights as your; to develop a
                personalized feed.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.signInRight}>
        <p className={styles.formTitle}>Create your Posts account</p>
        <form>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <InputComponent
              id={"email"}
              type={"email"}
              placeholder={"email@example.com"}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="username">Username</label>
            <InputComponent id={"username"} />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <InputComponent id={"password"} type={"password"} />
          </div>
          <Button type={"submit"} text={"Create account"} />
        </form>
        <p>
          Already have an account? <Link href={"/auth/login"}>Login</Link>
        </p>
      </div>
    </section>
  );
}
