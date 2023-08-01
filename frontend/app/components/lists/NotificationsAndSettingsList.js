import Image from "next/image";
import { useState } from "react";
import styles from "./notificationsandsettingslist.module.scss";

export default function NotificationsAndSettingsList() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [focusedItem, setFocusedItem] = useState(selectedItem);

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
    setSelectedItem(index);
  }

  function handleKeyPress(event, index) {
    if (event.key === "Enter") {
      handleClick(index);
    }
  }

  function handleMouseLeave(index) {
    if (index !== selectedItem) {
      setFocusedItem(selectedItem);
    }
  }

  const sideNavItems = sideNavIconsListItems.map((icon, index) => (
    <li
      className={focusedItem === index ? styles.active : ""}
      onFocus={() => handleFocusedItem(index)}
      onMouseEnter={() => handleFocusedItem(index)}
      onClick={() => handleClick(index)}
      onKeyDown={(event) => handleKeyPress(event, index)}
      onMouseLeave={() => handleMouseLeave(index)}
      onBlur={() => handleMouseLeave(index)}
      key={Math.floor(Math.random() * 100000) ** 2}
    >
      <div className={styles.listItem} tabIndex={0}>
        <Image src={icon.src} width={24} height={24} alt={icon.alt} />
        <p>{icon.title}</p>
      </div>
    </li>
  ));

  return <ul className={styles.list}>{sideNavItems}</ul>;
}
