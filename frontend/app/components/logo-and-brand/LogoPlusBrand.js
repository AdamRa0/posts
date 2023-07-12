import styles from "./logoplusbrand.module.scss";

import Image from "next/image";

export default function LogoPlusBrand({ logoDimens }) {
  return (
    <div className={styles.logoAndSiteName}>
      <Image
        src="/post.svg"
        width={logoDimens}
        height={logoDimens}
        alt="Site icon logo"
      />
      <h1>Posts</h1>
    </div>
  );
}
