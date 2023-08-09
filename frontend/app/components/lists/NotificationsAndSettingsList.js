import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./notificationsandsettingslist.module.scss";
import createUUID from "@/app/utils/clientUUIDGenerator";

export default function NotificationsAndSettingsList() {
  const [focusedItem, setFocusedItem] = useState();
  const router = useRouter();

  const sideNavIconsListItems = [
    {
      src: "/notifications.svg",
      alt: "Notifications icon.",
      title: "No active notifications",
    },
    {
      src: "/settings.svg",
      alt: "Settings icon.",
      title: "Settings",
    },
  ];

  function handleFocusedItem(index) {
    setFocusedItem(index);
  }

  function handleClick(index) {
    const { title } = sideNavIconsListItems[index];

    if (title === "Settings") {
      if (router.pathname !== "/settings") {
        router.push("/settings");
      }
    }
  }

  function handleKeyPress(event, index) {
    if (event.key === "Enter") {
      handleClick(index);
    }
  }

  function handleMouseLeave() {
    setFocusedItem();
  }

  const sideNavItems = sideNavIconsListItems.map((item, index) => (
    <li
      className={focusedItem === index ? styles.active : ""}
      onFocus={() => handleFocusedItem(index)}
      onMouseEnter={() => handleFocusedItem(index)}
      onClick={() => handleClick(index)}
      onKeyDown={(event) => handleKeyPress(event, index)}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      key={createUUID()}
    >
      <div className={styles.listItem} tabIndex={0}>
        <Image src={item.src} width={24} height={24} alt={item.alt} />
        <p>{item.title}</p>
      </div>
    </li>
  ));

  return <ul className={styles.list}>{sideNavItems}</ul>;
}
