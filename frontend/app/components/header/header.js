import styles from "./header.module.scss";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import axios from "axios";

import LogoPlusBrand from "../logo-and-brand/LogoPlusBrand";
import SvgComponent from "../icons/SearchIconComponent";
import InputComponent from "../inputs/InputComponent";
import Button from "../buttons/Button";
import MobileSideNav from "../sidenavs/MobileSideNav";

export const Header = ({ authenticatedUser, inflatePostUI }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleOnInteractMenu() {
    setIsOpen(!isOpen);
  }

  function handleOnMenuPressEnter(event) {
    if (event.key === "Enter") {
      handleOnInteractMenu();
    }
  }

  const signOutUser = () => {
    axios
      .get("/api/v1/auth/signout")
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          if (router.pathname !== "/") {
            router.push("/");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.menuLogo}
          tabIndex={0}
          onClick={() => handleOnInteractMenu()}
          onKeyDown={(event) => handleOnMenuPressEnter(event)}
        >
          <Image
            src={isOpen ? "/close.svg" : "/menu.svg"}
            height={36}
            width={36}
            alt="Menu Icon"
          />
        </div>
        <LogoPlusBrand logoDimens={36} />
        <div className={styles.inputGroup}>
          <span aria-hidden="true">
            <SvgComponent />
          </span>
          <InputComponent type={"search"} placeholder={"Search Posts"} />
        </div>
        {authenticatedUser === null ? (
          <div className={styles.unauthContainer}>
            <Button
              text={"Login"}
              handleOnClick={() => router.push("/auth/login")}
            />
          </div>
        ) : (
          <div className={styles.authContainer}>
            <Button text={"Create Post"} handleOnClick={inflatePostUI} />
            <Button text={"Signout"} handleOnClick={signOutUser} />
          </div>
        )}
      </header>
      <MobileSideNav isOpen={isOpen} authenticatedUser={authenticatedUser} />
      <div className={isOpen ? styles.rightInactive : ""}></div>
    </>
  );
};
