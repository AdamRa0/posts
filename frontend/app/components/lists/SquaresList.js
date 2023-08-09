import Image from "next/image";
import { useState } from "react";
import styles from "./squareslist.module.scss";

import createUUID from "@/app/utils/clientUUIDGenerator";

export default function SquaresList() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [focusedItem, setFocusedItem] = useState(selectedItem);

  const sideNavIconsListItems = [
    {
      src: "/public.svg",
      alt: "Public square icon.",
      title: "Public Square",
    },
    {
      src: "/community.svg",
      alt: "Private square icon.",
      title: "Private Square",
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
      key={createUUID()}
    >
      <div className={styles.listItem} tabIndex={0}>
        <Image src={icon.src} width={24} height={24} alt={icon.alt} />
        <p>{icon.title}</p>
      </div>
    </li>
  ));

  return <ul className={styles.list}>{sideNavItems}</ul>;
}
