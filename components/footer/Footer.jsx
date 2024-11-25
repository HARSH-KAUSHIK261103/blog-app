import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>HARSH KAUSHIK</h1>
          <p className={styles.desc}>harshkaushik261103@gmail.com</p>
        </div>

        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={35} height={15} />
          <Image src="/instagram.png" alt="" width={35} height={18} />
          <Image src="/tiktok.png" alt="" width={35} height={18} />
          <Image src="/youtube.png" alt="" width={35} height={18} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
