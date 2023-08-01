"use client";

import LogoPlusBrand from "@/app/components/logo-and-brand/LogoPlusBrand";
import styles from "./page.module.scss";
import Button from "@/app/components/buttons/Button";
import Loader from "@/app/components/loader/Loader";
import Link from "next/link";
import InputComponent from "@/app/components/inputs/InputComponent";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  function handleOnChange(event, value) {
    switch (value) {
      case "username":
        setUsername(event.target.value);
        break;

      case "email":
        setEmailAddress(event.target.value);
        break;

      case "handle":
        setHandle(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();

    form.append("username", username);
    form.append("email_address", emailAddress);
    form.append("handle", handle);
    form.append("password", password);

    setIsAuthenticating(true);

    try {
      const response = await axios.postForm("/api/v1/auth/signup", form);

      if (response.status === 200) {
        setIsAuthenticating(false);
        router.push("/");
      }
    } catch (error) {
      setIsAuthenticating(false);
      setError(error.message);
    }
  }

  return (
    <section className={styles.signInPage}>
      <div className={isAuthenticating ? styles.loadingPageOverlay : undefined}>
        {isAuthenticating && <Loader />}
      </div>
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
        <form onSubmit={handleSubmit}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <InputComponent
              id={"email"}
              type={"email"}
              placeholder={"email@example.com"}
              name={"email"}
              handleOnChange={handleOnChange}
              required={true}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="username">Username</label>
            <InputComponent
              id={"username"}
              name={"username"}
              handleOnChange={handleOnChange}
              required={true}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="username">Handle</label>
            <InputComponent
              id={"handle"}
              name={"handle"}
              handleOnChange={handleOnChange}
              required={true}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <InputComponent
              id={"password"}
              type={"password"}
              name={"password"}
              handleOnChange={handleOnChange}
              required={true}
            />
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
