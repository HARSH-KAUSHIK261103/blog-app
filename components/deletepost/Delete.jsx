import Image from "next/image";
import styles from "../card/card.module.css";
import Link from "next/link";
import { useState } from "react";

const Card = ({ item }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmed) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/delete-blog/${postId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Blog deleted successfully!");
          // Optionally, you can redirect the user or update the state to remove the blog from the UI
        } else {
          alert("Failed to delete the blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("An error occurred while deleting the blog.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

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
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: item?.description.substring(0, 60),
          }}
        />
        <div className="flex gap-10">
          {/* <Link href={`/posts/${item.id}`} className="inline-block">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 w-32">
              EDIT
            </button>
          </Link> */}

          <button
            onClick={() => handleDelete(item.id)}
            disabled={isDeleting}
            className={`px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer transition duration-300 w-32 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isDeleting ? "Deleting..." : "DELETE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
