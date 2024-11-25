import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <div className={styles.container} key={item.id}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.created_at.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.category}</span>
        </div>
        <Link href={`/posts/${item.id}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: item?.description.substring(0, 60),
          }}
        />
        <Link href={`/posts/${item.id}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
