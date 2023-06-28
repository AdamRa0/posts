"use client";

import Navbar from "@/components/navbar";
import styles from "./page.module.scss";
import AuthRight from "@/components/sidenavs/authRight";
import SideNav from "@/components/sidenavs/sidenav";
import UnauthRight from "@/components/sidenavs/unauthRight";
import { useState } from "react";

export default function Home() {
  const testUser = {
    username: "WittyUsername",
    handle: "@wittyusername",
  };

  const [authenticated, setAuthentiated] = useState(true);

  return (
    <div className={styles.homeDisplay}>
      <Navbar>
        <h2>Public Square</h2>
      </Navbar>
      <SideNav />
      {authenticated ? (
        <AuthRight user={testUser} onButtonClick={() => setAuthentiated(false)} />
      ) : (
        <UnauthRight onButtonClick={() => setAuthentiated(true)} />
      )}
    </div>
  );
}
