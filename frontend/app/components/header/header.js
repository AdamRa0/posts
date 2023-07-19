import styles from "./header.module.scss";
import { useState } from "react";
import Image from "next/image";
import LogoPlusBrand from "../logo-and-brand/LogoPlusBrand";
import SvgComponent from "../SearchIconComponent";
import InputComponent from "../InputComponent";
import AuthButton from "../AuthButton";
import MobileSideNav from "../MobileSideNav";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleOnInteractMenu() {
    setIsOpen(!isOpen);
  }

  function handleOnMenuPressEnter(event) {
    if (event.key === "Enter") {
      handleOnInteractMenu();
    }
  }

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
        <AuthButton
          text={"Login"}
          handleOnClick={() => router.push("/auth/login")}
        />
      </header>
      <MobileSideNav isOpen={isOpen} />
      <div className={isOpen ? styles.rightInactive : ""}></div>
    </>
  );
};
